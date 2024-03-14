import { getData } from "@/lib/axios/axios";

export const getTransfers = async (token: string) => {
  return await getData("/transaction/transfer", token);
};
