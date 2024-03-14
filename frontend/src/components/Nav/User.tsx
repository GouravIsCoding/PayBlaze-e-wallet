import { userInfoSelector } from "@/recoil";
import { useRecoilValue } from "recoil";

export type userInfoType = {
  firstname: string;
  lastname: string;
  id: number;
  email: string;
  account: {
    balance: number;
  };
} | null;

const titleCase = (name: string | undefined) => {
  if (!name) return "";
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
};

export default function User() {
  const userInfo: userInfoType = useRecoilValue(userInfoSelector);

  return (
    <>
      {userInfo && (
        <div>
          <h1 className="text white">
            <span className="bg-red-500 md:py-1 md:px-3 py-2 inline-block px-4 rounded-full mx-1">
              {userInfo?.firstname[0].toUpperCase()}
            </span>
            {titleCase(userInfo?.firstname)}
          </h1>
        </div>
      )}
    </>
  );
}
