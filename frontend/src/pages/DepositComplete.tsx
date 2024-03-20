import { Button } from "@/components/ui/button";
import { authTokenAtom, clientSecretAtom } from "@/recoil";
import { completeDepositAmount } from "@/services/api/account";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#495057",
      fontFamily: "inherit",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#6c757d",
      },
    },
    invalid: {
      color: "#dc3545",
      iconColor: "#dc3545",
    },
  },
};

export default function DepositComplete() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useRecoilState(clientSecretAtom);
  const authToken = useRecoilValue(authTokenAtom);
  const [msg, setMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!stripe || !elements) {
        return;
      }
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

        if (result.error) {
          navigate("/deposit/complete", {
            state: { error: result.error.message },
          });
        } else {
          if (result.paymentIntent.status === "succeeded") {
            setMsg(() => "Updating Balance. Please don't close this window!");
            await completeDepositAmount(
              authToken,
              Math.floor(result.paymentIntent.amount / 100)
            );
            setClientSecret("");
            setMsg(
              () =>
                `Balance updated. ${Math.floor(
                  result.paymentIntent.amount / 100
                )} ${result.paymentIntent.currency} added succesfully to wallet`
            );
            navigate("/dashboard", {
              state: {
                message: `Balance updated. ${Math.floor(
                  result.paymentIntent.amount / 100
                )} ${
                  result.paymentIntent.currency
                } added succesfully to wallet`,
              },
            });
          }
        }
      }
    } catch (error) {
      if (error instanceof Error)
        navigate("/dashboard", { state: { error: error.message } });
    }
  };

  if (!msg)
    return (
      <>
        <div className="min-h-screen w-full flex justify-center items-center">
          <div className="md:w-1/2 bg-white text-center text-2xl font-semibold p-4 sm:p-6 md:p-8 rounded-lg">
            <div className="text-sm">
              This is a test environment you can only use the following card
              number with any future expiry date and any cvv
              <br />
              4000003560000008
            </div>
            <form onSubmit={handlePayment}>
              <CardElement
                className="border-2 border-slate-300 px-4 py-2 rounded-lg m-2 flex flex-col"
                options={CARD_ELEMENT_OPTIONS}
              />
              <Button disabled={!stripe} className="mt-4">
                <span className="font-weight-bold">Pay</span>
              </Button>
            </form>
          </div>
        </div>
      </>
    );
  else if (msg)
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center text-2xl font-semibold bg-white rounded-xl p-12">
          {msg}
        </div>
      </div>
    );
}
