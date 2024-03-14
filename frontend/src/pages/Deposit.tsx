import DepositMoney from "@/components/modal/DepositMoney";
import { userInfoSelector } from "@/recoil";

import { useRecoilValue } from "recoil";
import { userInfoType } from "@/components/Nav/User";

export default function Deposit() {
  const userInfo = useRecoilValue<userInfoType>(userInfoSelector);

  return (
    <>
      <DepositMoney
        name={`${userInfo?.firstname} ${userInfo?.lastname}`}
        email={userInfo?.email}
      />
    </>
  );
}
