import { Outlet } from "react-router-dom";
import Navbar from "../components/Nav/Navbar";
import { useLocation } from "react-router-dom";
import Message from "@/components/ui/message";
import ErrorMessage from "@/components/ui/errorMessage";
import ScrollToTop from "@/components/Util/ScrollToTop";
import AuthWrap from "@/components/Util/AuthWrap";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY || "");

export default function Layout() {
  const { state } = useLocation();
  const stateMessage: string = state?.message;
  const stateError: string = state?.error;
  return (
    <>
      <Elements stripe={stripePromise}>
        <AuthWrap>
          <ScrollToTop />
          <Navbar />
          <div className="pt-16">
            {stateMessage && <Message message={stateMessage} />}
            {stateError && <ErrorMessage error={stateError} />}
          </div>

          <main className=" bg-gray-200">
            <Outlet />
          </main>
        </AuthWrap>
      </Elements>
    </>
  );
}
