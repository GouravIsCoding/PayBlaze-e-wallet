import { authTokenAtom, userInfoSelector } from "@/recoil";
import { useRecoilValue } from "recoil";

import { userInfoType } from "../Nav/User";
import Container from "../container/Container";
import { NoImage } from "../Vectors";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormEvent, useRef, useState } from "react";

import { uploadImage } from "@/services/api/user";
const titleCase = (name: string | undefined) => {
  if (!name) return "";
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
};

export default function ProfileCard() {
  const userInfo = useRecoilValue<userInfoType>(userInfoSelector);
  const authToken = useRecoilValue(authTokenAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const [err, setErr] = useState<Error>();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const files = inputRef?.current?.files;
    if (!files?.length) return setErr(() => new Error("No file found"));
    if (files?.length && files.length > 1)
      return setErr(() => new Error("Cannot accept more than a single file"));
    const { data, error } = await uploadImage(authToken, files[0]);

    if (data) return window.location.reload();
    else if (error) {
      return setErr(() => new Error(error));
    }
  };
  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const el = document.querySelector("#handle-image");
    const button = document.querySelector("#view-hide");
    el?.classList.toggle("hidden");
    button?.classList.toggle("hidden");
  };

  return (
    <>
      <Container>
        <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow p-8 m-6">
          <div className="flex flex-col items-center justify-evenly pb-4">
            {userInfo?.image_url ? (
              <img
                crossOrigin="anonymous"
                className="w-full h-auto mb-3 rounded-2xl shadow-lg"
                src={userInfo?.image_url}
              />
            ) : (
              <>
                <NoImage />
              </>
            )}
            <div id="handle-image" className="hidden">
              <form onSubmit={onSubmit}>
                <Label htmlFor="image" className="text-left">
                  Image
                </Label>
                <Input id="image" ref={inputRef} type={"file"} />
                <Button
                  className="bg-customColor w-full my-2"
                  onClick={onClick}
                  type="button"
                >
                  Cancel
                </Button>
                <Button className="bg-customColor w-full" type="submit">
                  Upload Image
                </Button>
              </form>
            </div>
            <Button
              id="view-hide"
              className="bg-customColor click-button w-full my-2"
              onClick={onClick}
            >
              {userInfo?.image_url ? "Edit" : "Add"}
            </Button>
            <div className="my-2">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {`${titleCase(userInfo?.firstname)} ${titleCase(
                  userInfo?.lastname
                )}`}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {userInfo?.email}
              </span>
            </div>
            <div className="my-2">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Balance
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Rs {userInfo?.account.balance}
              </span>
            </div>
            {err && (
              <div className="text-red-500 text-center">{err.message}</div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
