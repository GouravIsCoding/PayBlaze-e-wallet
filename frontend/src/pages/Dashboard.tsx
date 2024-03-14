import { Deposit, History, SendReceive } from "@/components/Vectors";
import Container from "@/components/container/Container";
import DashboardComp from "@/components/ui/DashboardComp";
import Pie from "@/components/ui/Pie";
import { authTokenAtom } from "@/recoil";
import { useRecoilValue } from "recoil";
import { userInfoType } from "@/components/Nav/User";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserInfo } from "@/services/api/user";

export default function Dashboard() {
  const authToken = useRecoilValue(authTokenAtom);
  const { pathname } = useLocation();
  const [userInfo, setUserInfo] = useState<userInfoType>({
    firstname: "",
    lastname: "",
    email: "",
    id: 0,
    account: {
      balance: 0,
    },
  });
  useEffect(() => {
    getUserInfo(authToken).then((user) => {
      const data: userInfoType = user.data?.data;
      if (data) setUserInfo(() => data);
    });
  }, [pathname]);
  return (
    <>
      <Container className="justify-between py-10">
        <div className="grid md:grid-cols-9 grid-cols-3 gap-4 w-full px-6">
          <div className="col-span-3">
            <DashboardComp
              secTitle={"Transfer Money"}
              secLink={"/transaction/transfer"}
              amount={userInfo?.account.balance || 0}
              vector={SendReceive}
            />
          </div>
          <div className="col-span-3">
            <DashboardComp
              secTitle={"Deposit Money"}
              secLink={"/transaction/deposit"}
              amount={3000}
              vector={Deposit}
            />
          </div>
          <div className="col-span-3">
            <DashboardComp
              secTitle={"Transaction History"}
              secLink={"/transaction/historylist"}
              amount={4000}
              vector={History}
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between md:p-4 items-center w-full">
          <div className="md:w-full bg-white w-full h-full md:mx-2 my-2 m-4 shadow-lg rounded-xl">
            <h1 className="text-center py-4 text-xl">
              Most transactional amount.
            </h1>
            <div className="h-full w-auto inline-block self-center mx-auto">
              <Pie />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
