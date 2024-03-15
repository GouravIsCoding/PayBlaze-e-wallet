import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";

import SuspenseWrap from "./components/Util/SuspenseWrap";
import { RecoilRoot } from "recoil";
import NotFound from "./pages/NotFound";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Signin = React.lazy(() => import("./pages/Signin"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Transfer = React.lazy(() => import("./pages/Transfer"));
const TransferComplete = React.lazy(() => import("./pages/TransferComplete"));
const Deposit = React.lazy(() => import("./pages/Deposit"));
const Profile = React.lazy(() => import("./pages/Profile"));
const TransactionHistory = React.lazy(
  () => import("./pages/TransactionHistory")
);

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SuspenseWrap>
                <Layout />
              </SuspenseWrap>
            }
          >
            <Route
              path=""
              element={
                <SuspenseWrap>
                  <Home />
                </SuspenseWrap>
              }
            />
            <Route
              path="dashboard"
              element={
                <SuspenseWrap>
                  <Dashboard />
                </SuspenseWrap>
              }
            />
            <Route
              path="about"
              element={
                <SuspenseWrap>
                  <About />
                </SuspenseWrap>
              }
            />
            <Route
              path="signin"
              element={
                <SuspenseWrap>
                  <Signin />
                </SuspenseWrap>
              }
            />
            <Route
              path="signup"
              element={
                <SuspenseWrap>
                  <Signup />
                </SuspenseWrap>
              }
            />
            <Route
              path="transaction/transfer"
              element={
                <SuspenseWrap>
                  <Transfer />
                </SuspenseWrap>
              }
            />
            <Route
              path="transaction/transfer/complete"
              element={
                <SuspenseWrap>
                  <TransferComplete />
                </SuspenseWrap>
              }
            />
            <Route
              path="transaction/deposit"
              element={
                <SuspenseWrap>
                  <Deposit />
                </SuspenseWrap>
              }
            />
            <Route
              path="transaction/historylist"
              element={
                <SuspenseWrap>
                  <TransactionHistory />
                </SuspenseWrap>
              }
            />
            <Route
              path="profile"
              element={
                <SuspenseWrap>
                  <Profile />
                </SuspenseWrap>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
