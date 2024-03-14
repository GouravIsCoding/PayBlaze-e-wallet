import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authTokenAtom } from "@/recoil";
import { transferAmount } from "@/services/api/account";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Container from "../container/Container";

export interface customProps {
  name?: string | null | undefined;
  id?: number | null | undefined;
  email?: string | null | undefined;
}

interface originalProps extends customProps {
  setCur: React.Dispatch<React.SetStateAction<"page" | "send" | "receive">>;
}
interface IFormInput {
  amount: number;
}

export default function SendMoney(props: originalProps) {
  const authToken = useRecoilValue(authTokenAtom);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (datas) => {
    if (props.id) {
      const result = await transferAmount(
        authToken,
        props.id,
        Number(datas.amount)
      );
      const data = result.data?.data;
      const error = result.error;
      const message = result.data?.message;
      if (error) {
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
        navigate("/transaction/transfer", { state: { error } });
      } else if (data) {
        navigate("/transaction/transfer/complete", {
          state: {
            id: data?.id,
            amount: data?.amount,
            toUser: props.name,
            message,
          },
        });
      }
    }
  };
  const cancelOnClick = () => {
    props.setCur("page");
  };

  return (
    <Container>
      <div className="h-screen w-full flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="md:w-[500px] rounded-xl w-[350px]">
            <CardHeader>
              <CardTitle className="my-3">
                Send to{" "}
                <span className="bg-violet-500 px-4 py-2 rounded-2xl text-white mx-2">
                  {props.name}
                </span>
              </CardTitle>
              <CardDescription>{props.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    {...register("amount")}
                    type="number"
                    min={0}
                    id="amount"
                    placeholder="1000"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" onClick={cancelOnClick} variant="outline">
                Cancel
              </Button>
              <Button className="bg-customColor" type="submit">
                Send
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </Container>
  );
}
