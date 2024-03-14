import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Container from "@/components/container/Container";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { authTokenAtom } from "@/recoil";
import { getUserInfo, searchUser } from "@/services/api/user";
import { Button } from "@/components/ui/button";
import SendMoney from "@/components/modal/SendMoney";

import { customProps as curInfoType } from "@/components/modal/SendMoney";

interface getDataType {
  firstname: string;
  lastname: string;
  email: string;
  id: number;
  account: {
    balance: number;
  };
}

export default function Transfer() {
  const authToken = useRecoilValue(authTokenAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const [getData, setGetData] = useState<getDataType[]>([]);
  const [input, setInput] = useState("");
  const [balance, setBalance] = useState("");
  const [current, setCurrent] = useState<"page" | "send" | "receive">("page");
  const [currInfo, setCurInfo] = useState<curInfoType>();
  let timer: NodeJS.Timeout;
  let cancel: any;

  useEffect(() => {
    getUserInfo(authToken).then((res) => {
      setBalance(res.data?.data.account.balance);
    });
  }, [authToken]);

  useMemo(() => {
    searchUser(authToken, input || "").then((result) => {
      const data = result.data.data;

      cancel = result.cancel;
      setGetData(() => data);
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    });
    return () => {
      if (cancel) cancel();
    };
  }, [authToken, input]);

  const inputChange = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const value = inputRef.current?.value || "";

      setInput(value);
    }, 300);
  };

  const sendOnClick = (e: MouseEvent) => {
    const target = e?.target;
    if (target instanceof HTMLElement) {
      const targetLi = target.closest(".user");

      const id = Number(targetLi?.getAttribute("data-user-id"));
      const name = targetLi?.getAttribute("data-user-name");
      const email = targetLi?.getAttribute("data-user-email");

      setCurInfo({ id, name, email });
      setCurrent("send");
    }
  };
  if (current === "page")
    return (
      <>
        <Container>
          <div className=" w-full min-h-screen p-6">
            <div className="p-4 my-3">
              <h1 className="text-left text-white text-bold text-3xl">
                Current Balance <br />
                <span className="text-2xl">Rs {balance}</span>
              </h1>
            </div>
            <div className="bg-white px-2 py-4 rounded-2xl">
              <Label className=" text-left text-bold text-3xl">
                Search Users
              </Label>
              <Input
                ref={inputRef}
                onChange={inputChange}
                className="rounded-xl bg-slate-200"
                placeholder="Name/Email of User"
              />
            </div>
            <div>
              {getData.length > 0 &&
                getData.map((item) => (
                  <>
                    <li
                      data-user-id={item.id}
                      data-user-name={`${item.firstname} ${item.lastname}`}
                      data-user-email={item.email}
                      className="bg-customColor user list-none md:text-left text-center my-4 border-2 border-black text-white border-opacity-80 rounded-lg px-2 flex md:flex-row flex-col md:justify-between py-2"
                      key={item.id}
                    >
                      <div className=" inline-block my-2">
                        <h1 className=" font-semibold">
                          {item.firstname} {item.lastname}
                        </h1>
                        <h1 className="font-thin text-white">{item.email}</h1>
                      </div>
                      <div className="inline-block">
                        <Button
                          variant={"outline"}
                          onClick={sendOnClick}
                          className="mx-3 my-2 sm:text-sm text-xs"
                        >
                          Send Money
                        </Button>
                        <Button
                          variant={"outline"}
                          className="sm:text-sm text-xs"
                        >
                          Request Money
                        </Button>
                      </div>
                    </li>
                  </>
                ))}
            </div>
          </div>
        </Container>
      </>
    );
  else if (current === "send")
    return <>{currInfo && <SendMoney setCur={setCurrent} {...currInfo} />}</>;
}
