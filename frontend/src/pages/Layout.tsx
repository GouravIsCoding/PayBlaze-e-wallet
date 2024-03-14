import { Outlet } from "react-router-dom";
import Navbar from "../components/Nav/Navbar";
import { useLocation } from "react-router-dom";
import Message from "@/components/ui/message";
import ErrorMessage from "@/components/ui/errorMessage";
import ScrollToTop from "@/components/Util/ScrollToTop";
import AuthWrap from "@/components/Util/AuthWrap";

export default function Layout() {
  const { state } = useLocation();
  const stateMessage: string = state?.message;
  const stateError: string = state?.error;
  return (
    <>
      <AuthWrap>
        <ScrollToTop />
        <Navbar />
        <div className="pt-16">
          {stateMessage && <Message message={stateMessage} />}
          {stateError && <ErrorMessage error={stateError} />}
        </div>

        <main className=" bg-gray-200">
          <Outlet />
        </main>
      </AuthWrap>
    </>
  );
}
