import { getUserInfo } from "@/services/api/user";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const authStatusAtom = atom({
  key: "authstatus",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const authTokenAtom = atom({
  key: "authtoken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userInfoSelector = selector({
  key: "CurrentUserInfo",
  get: async ({ get }) => {
    const token = get(authTokenAtom);
    if (token === "") return null;
    const result = await getUserInfo(get(authTokenAtom));
    const data = result.data?.data;
    const error = result.error;
    if (error) return null;
    if (data) return data;
  },
});
