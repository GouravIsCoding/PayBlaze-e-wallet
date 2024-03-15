import { getData, postData } from "@/lib/axios/axios";

export const getUserInfo = async (token: string) => {
  return await getData(`/user/info`, token);
};
export const searchUser = async (token: string, filter: string) => {
  return await getData(`/user/search?filter=${filter}`, token);
};
export const uploadImage = async (token: string, image: File) => {
  return await postData(`/user/picture`, { image }, token, {
    "Content-Type": "multipart/form-data",
  });
};
