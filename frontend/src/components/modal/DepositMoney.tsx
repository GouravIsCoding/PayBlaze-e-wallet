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
import { authTokenAtom, clientSecretAtom } from "@/recoil";
import { initiateDepositAmount } from "@/services/api/account";

import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Container from "../container/Container";

export interface customProps {
  name?: string | null | undefined;
  email?: string | null | undefined;
}

interface IFormInput {
  amount: number;
}

export default function DepositMoney(props: customProps) {
  const authToken = useRecoilValue(authTokenAtom);
  const setClientSecret = useSetRecoilState(clientSecretAtom);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (datas) => {
    const result = await initiateDepositAmount(authToken, Number(datas.amount));
    console.log(result);
    const data: { amount: number; clientSecret: string } = result.data;
    const error = result.error;
    if (error) {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
      navigate("/transaction/deposit", { state: { error } });
    } else if (data) {
      setClientSecret(data.clientSecret);
      navigate("/deposit/complete");
    }
  };
  const cancelOnClick = () => {
    navigate("/dashboard");
  };

  return (
    <Container>
      <div className="h-screen w-full flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-[350px] md:w-[500px] rounded-xl">
            <CardHeader>
              <CardTitle className="my-3">
                Deposit Amount{" "}
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
                Deposit
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </Container>
  );
}
