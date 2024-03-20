import { postData, putData } from "@/lib/axios/axios";

export const transferAmount = async (
  token: string,
  toUserId: number,
  amount: number
) => {
  return await postData("/account/transfer", { toUserId, amount }, token);
};
export const initiateDepositAmount = async (token: string, amount: number) => {
  return await putData("/account/balance/deposit/initiate", { amount }, token);
};
export const completeDepositAmount = async (token: string, amount: number) => {
  return await putData("/account/balance/deposit/complete", { amount }, token);
};
