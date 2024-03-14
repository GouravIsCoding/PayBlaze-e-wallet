import { jsPDF } from "jspdf";
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
    const doc = new jsPDF("p", "pt", "a4");
    const el = document.querySelector(".pdf-content");

    let scale = 1;
    if (el instanceof HTMLElement) {
      const div = document.createElement("div");
      div.innerHTML = `
      <div>
      <h1 style="idth: 100%;text-align: center; font-size: 18px;margin:10px; padding:10px;">All transactions</h1>
  <table style="width: 100%; padding: 32px; background-color: #ffffff; border-radius: 20px; text-align: center;" class="table">
    <thead style="font-weight: 600; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); background-color: #ffffff; padding: 32px; border: 1px solid #e5e7eb;">
      <tr>
        <th style="padding: 16px; border-top: 2px solid #e5e7eb; border-bottom: 2px solid #e5e7eb; border-left: 2px solid #e5e7eb; border-right: none;">From User</th>
        <th style="padding: 16px; border-left:2px solid #e5e7eb;"></th>
        <th style="padding: 16px; border-top: 2px solid #e5e7eb; border-bottom: 2px solid #e5e7eb; border-left: 2px solid #e5e7eb; border-right: none;">TO User</th>
        <th style="padding: 16px; border-top: 2px solid #e5e7eb; border-left:2px solid #e5e7eb; border-bottom: 2px solid #e5e7eb; border-left: 2px solid #e5e7eb; border-right: 2px solid #e5e7eb;">Amount in Rs</th>
      </tr>
    </thead>
    <tbody style="font-size: 16px;">
      ${transfers
        .map(
          (transfer) => `
        <tr style="box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); background-color: #ffffff; padding: 32px; border: 1px solid #e5e7eb;">
          <td style="padding: 8px; border-top: 2px solid #e5e7eb; border-bottom: 2px solid #e5e7eb; border-left: 2px solid #e5e7eb; border-right: none;">${transfer.fromUser.user.firstname} ${transfer.fromUser.user.lastname}<br><span style="color: #6b7280;">${transfer.fromUser.user.email}</span></td>
          <td style="padding: 8px; border-left:2px solid #e5e7eb;">TO</td>
          <td style="padding: 8px; border-top: 2px solid #e5e7eb; border-bottom: 2px solid #e5e7eb; border-left: 2px solid #e5e7eb; border-right: none;">${transfer.toUser.user.firstname} ${transfer.toUser.user.lastname}<br><span style="color: #6b7280;">${transfer.toUser.user.email}</span></td>
          <td style="padding: 8px; border-top: 2px solid #e5e7eb; border-left: 2px solid #e5e7eb; border-bottom: 2px solid #e5e7eb;  border-right: 2px solid #e5e7eb;">Rs ${transfer.amount}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>
  </div>
`;
      doc.html(div, {
        callback: function (doc: any) {
          doc.save("MyTransactions.pdf");
        },
        x: 16,
        y: 12,
        html2canvas: { scale },
      });
    }
  }
  return (
    <>
      <div className="float-right mt-4 mr-4">
        <span className="inline-block" onClick={generatePDF}>
          <DownloadPDF />
        </span>
      </div>

      <div className="bg-white pdf-content h-full w-full sm:overflow-y-auto overflow-x-scroll overflow-y-scroll rounded-xl p-8 mt-4">
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
