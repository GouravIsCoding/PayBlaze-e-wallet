import { authStatusAtom } from "@/recoil";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface customProps {
  children: React.ReactElement | React.ReactElement[];
}

export default function AuthWrap(props: customProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const authStatus = useRecoilValue(authStatusAtom);

  const LoggedOutPaths = ["/signin", "/signup"];
  const LoggedInPaths = [
    "/dashboard",
    "/transaction/transfer",
    "/transaction/transfer/complete",
    "transaction/historylist",
    "transaction/deposit",
  ];

  useEffect(() => {
    if (LoggedInPaths.includes(pathname) && !authStatus)
      navigate("/signin", { state: { error: "You need to login first" } });
    if (LoggedOutPaths.includes(pathname) && authStatus)
      navigate("/dashboard", { state: { message: "Already logged in!" } });
  }, [navigate, authStatus]);

  return <>{props.children}</>;
}
