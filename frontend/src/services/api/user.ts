import { getData } from "@/lib/axios/axios";

export const getUserInfo = async (token: string) => {
  return await getData(`/user/info`, token);
};
export const searchUser = async (token: string, filter: string) => {
  return await getData(`/user/search?filter=${filter}`, token);
};
