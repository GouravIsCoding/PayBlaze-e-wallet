import { GreenTick } from "@/components/Vectors";
import Container from "@/components/container/Container";
import { useLocation } from "react-router-dom";

interface customState {
  id: number;
  amount: number;
  toUser: string;
}

export default function TransferComplete() {
  const location = useLocation();
  const data: customState = location.state;

  return (
    <>
      <Container>
        <div className="flex justify-center items-center h-screen w-full px-6">
          <div className="flex flex-col justify-between items-center w-96 h-96 bg-white rounded-xl py-4 border-4 border-green-500">
            <h1 className="p-2 mx-4 my-2 border-x-2 border-gray-100 shadow-sm w-[8-%]  text-green-500 font-bold text-2xl">
              Transaction successful{" "}
              <span className="inline-block p-2 m-2">
                <GreenTick />
              </span>
            </h1>
            <p className="p-2 mx-4 my-2 border-x-2 border-gray-100 shadow-sm w-[80%] text-2xl">
              Transaction Id: {data.id}
            </p>
            <p className="p-2 mx-4 my-2 border-x-2 border-gray-100 shadow-sm w-[80%] text-2xl">
              Amount: {data.amount}
            </p>
            <p className="p-2 mx-4 my-2 border-x-2 border-gray-100 shadow-sm w-[80%] text-2xl">
              {" "}
              Transfered to: {data.toUser}
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
