import { postData } from "@/lib/axios/axios";
import { z } from "zod";
import { formSchema } from "@/pages/Signup";

type registerUserType = z.infer<typeof formSchema>;
type loginUserType = Pick<registerUserType, "email" | "password">;

export const registerUser = async (data: registerUserType) => {
  return await postData(`/user/signup`, data, null);
};

export const loginUser = async (data: loginUserType) => {
  return await postData(`/user/signin`, data, null);
};
