import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useSetRecoilState } from "recoil";

import { authStatusAtom, authTokenAtom } from "@/recoil";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface customProps {
  fn: (state: boolean) => void;
}

export default function WarningLogout(props: customProps) {
  const setAuthStatus = useSetRecoilState(authStatusAtom);
  const setAuthToken = useSetRecoilState(authTokenAtom);
  const navigate = useNavigate();
  const onCLick = () => {
    setAuthStatus(() => false);
    setAuthToken(() => "");
    navigate("/");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className="hover:bg-gray-300 ml-7">
          Logout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to logout?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out from this platform and required to enter
            email and password to login again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-customColor"
            onClick={() => {
              props.fn(false);
              onCLick();
            }}
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
