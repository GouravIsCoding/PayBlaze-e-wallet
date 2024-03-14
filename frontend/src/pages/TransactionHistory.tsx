import TransfersHistory from "@/components/ui/TransfersHistory";
import { authTokenAtom } from "@/recoil";
import { getTransfers } from "@/services/api/transaction";
import { Canceler } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { TransferInterface } from "@/components/ui/TransfersHistory";
import Container from "@/components/container/Container";

export default function TransactionHistory() {
  const authToken = useRecoilValue(authTokenAtom);
  const [transfers, setTransfers] = useState<TransferInterface[]>([]);
  const { pathname } = useLocation();
  useEffect(() => {
    let cancelFn: Canceler;
    getTransfers(authToken)
      .then((res) => {
        const { data, cancel } = res;
        if (cancel) cancelFn = cancel;
        if (data?.data) {
          setTransfers(() => data.data);
        }
        if (data?.error) {
          console.log(data.error);
        }
      })
      .catch((err) => console.log(err));
    return () => {
      if (cancelFn) cancelFn();
    };
  }, [pathname]);
  return (
    <>
      <Container>
        <div className=" w-full h-screen rounded-2xl">
          <TransfersHistory transfers={transfers} />
        </div>
      </Container>
    </>
  );
}
