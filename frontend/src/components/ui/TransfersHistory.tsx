import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { DownloadPDF } from "../Vectors";
interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface TransferInterface {
  fromUser: User;
  toUser: User;
  amount: string;
  id: number;
  timestamp: string;
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
      head: [["Transaction", "To User", "Amount(INR)", "Time"]],
      body: transfers.map((transfer) => [
        `${Number(transfer.amount) > 0 ? "Received from" : "Sent to"}`,
        `${transfer.toUser.firstname} ${transfer.toUser.lastname}\n${transfer.toUser.email}`,
        `${transfer.amount}`,
        transfer.timestamp,
      ]),
    });
    doc.save("Transactions.pdf");
  }
  return (
    <>
      <div className="text-right mt-4 mr-4">
        <span className="inline-block mx-auto" onClick={generatePDF}>
          <DownloadPDF />
        </span>
      </div>

      <div className="bg-white pdf-content h-full w-full rounded-xl p-2 md:p-8 mt-4 mb-8">
        <h1 className="text-center text-2xl font-semibold my-3">
          All transactions
        </h1>
        <table className="table-auto w-full sm:text-base text-xs py-4 bg-white rounded-2xl text-center">
          <thead className="font-semibold">
            <tr className="shadow-lg bg-white px-3 md:px-8 border-y border-gray-300">
              <td className="px-1 md:px-4 border-l-2 border-gray-300  py-3">
                Transaction
              </td>
              <td className="px-1 md:px-4  py-3 border-x-2 border-gray-300">
                User
              </td>
              <td className="border-r-2 px-1 md:px-4 py-3 border-gray-300">
                Amount in Rs
              </td>
              <td className="border-r-2 px-1 md:px-4 py-3 border-gray-300">
                Time
              </td>
            </tr>
          </thead>
          <tbody>
            {transfers.length > 0 &&
              transfers.map((transfer) => (
                <tr
                  className="shadow-lg bg-white px-1 md:px-8 border-y border-gray-300"
                  key={transfer.id}
                >
                  <td className="px-1 md:px-2 border-l-2 border-gray-300  py-3">
                    {Number(transfer.amount) > 0 ? "Received from" : "Sent to"}
                  </td>
                  <td className="px-1 md:px-2  py-3 border-x-2 border-gray-300">
                    {`${transfer.toUser.firstname} ${transfer.toUser.lastname}`}{" "}
                    <br />
                    <span className="text-gray-500">
                      {transfer.toUser.email}
                    </span>
                  </td>
                  <td
                    className={`border-r-2 px-1 md:px-2 border-gray-300 ${
                      Number(transfer.amount) > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transfer.amount}
                  </td>
                  <td className="border-r-2 px-2 border-gray-300">
                    {transfer.timestamp}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
