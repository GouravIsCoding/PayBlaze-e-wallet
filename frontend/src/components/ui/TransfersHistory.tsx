import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { DownloadPDF } from "../Vectors";
interface User {
  firstname: string;
  lastname: string;
  email: string;
}

export interface TransferInterface {
  fromUser: { user: User };
  toUser: { user: User };
  amount: number;
  id: number;
}

export default function TransfersHistory({
  transfers,
}: {
  transfers: TransferInterface[];
}) {
  function generatePDF() {
    const doc = new jsPDF();
    doc.text("All transactions", 90, 10);
    autoTable(doc, {
      head: [["From User", "  ", "To User", "Amount in INR"]],
      body: transfers.map((transfer) => [
        `${transfer.fromUser.user.firstname} ${transfer.fromUser.user.lastname}\n${transfer.fromUser.user.email}`,
        "  ",
        `${transfer.toUser.user.firstname} ${transfer.toUser.user.lastname}\n${transfer.toUser.user.email}`,
        `Rs ${transfer.amount}`,
      ]),
    });
    doc.save("Transactions.pdf");
  }
  return (
    <>
      <div className="float-right mt-4 mr-4">
        <span className="inline-block" onClick={generatePDF}>
          <DownloadPDF />
        </span>
      </div>

      <div className="bg-white pdf-content h-full w-full sm:overflow-y-auto overflow-x-scroll overflow-y-scroll rounded-xl p-8 mt-4">
        <h1 className="text-center text-2xl font-semibold my-3">
          All transactions
        </h1>
        <table className="table-auto w-full sm:text-base text-xs py-4 bg-white rounded-2xl text-center">
          <thead className="font-semibold">
            <tr className="shadow-lg bg-white px-8 border-y border-gray-300">
              <td className="px-4  py-3 border-x-2 border-gray-300">
                From User
              </td>
              <td className="px-4  py-3"></td>
              <td className="px-4  py-3 border-x-2 border-gray-300">TO User</td>
              <td className="border-r-2 px-4 py-3 border-gray-300">
                Amount in Rs
              </td>
            </tr>
          </thead>
          <tbody>
            {transfers.length > 0 &&
              transfers.map((transfer) => (
                <tr
                  className="shadow-lg bg-white px-8 border-y border-gray-300"
                  key={transfer.id}
                >
                  <td className="px-2  py-3 border-x-2 border-gray-300">
                    {`${transfer.fromUser.user.firstname} ${transfer.fromUser.user.lastname}`}{" "}
                    <br />
                    <span className="text-gray-500">
                      {transfer.fromUser.user.email}
                    </span>
                  </td>
                  <td className="px-2  py-3">TO</td>
                  <td className="px-2  py-3 border-x-2 border-gray-300">
                    {`${transfer.toUser.user.firstname} ${transfer.toUser.user.lastname}`}{" "}
                    <br />
                    <span className="text-gray-500">
                      {transfer.toUser.user.email}
                    </span>
                  </td>
                  <td className="border-r-2 px-2 border-gray-300">
                    Rs {transfer.amount}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
