import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";
import { useRecoilValue } from "recoil";
import { authStatusAtom } from "@/recoil";

import User from "./User";
import WarningLogout from "./WarningLogout";

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(true);
  const curAuth = useRecoilValue(authStatusAtom);
  const navArr = [
    { name: "Home", path: "/", authStatus: true },
    { name: "Dashboard", path: "/dashboard", authStatus: curAuth },
    { name: "Signin", path: "/signin", authStatus: !curAuth },
    { name: "About", path: "/about", authStatus: true },
  ];
  return (
    <>
      <nav className="py-4 block bg-customColor text-white px-12 fixed left-0 top-0 right-0 z-50">
        <Link to={"/"}>
          <Logo />
        </Link>
        <div
          className={`${
            collapsed ? "w-0" : "w-1/2 "
          } md:inline-block md:static md:float-right md:w-auto text-lg absolute top-10 right-0 bg-customColor h-screen md:h-auto transition-all duration-200 z-50`}
        >
          <li className="list-none ml-7 my-4 md:my-0 md:inline-block block">
            <User />
          </li>
          {navArr.map(
            (item) =>
              item.authStatus && (
                <li className="list-none ml-5 my-4 md:my-0 md:inline-block block">
                  <NavLink
                    onClick={() => setCollapsed(true)}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-red-500 font-bold" : "text-while"
                      } px-4`
                    }
                    to={item.path}
                  >
                    {item.name}
                  </NavLink>
                </li>
              )
          )}
          {curAuth && <WarningLogout fn={setCollapsed} />}
        </div>

        <span
          onClick={() => setCollapsed((prev) => !prev)}
          className="md:hidden inline-block absolute right-10"
        >
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          )}
        </span>
      </nav>
    </>
  );
}
