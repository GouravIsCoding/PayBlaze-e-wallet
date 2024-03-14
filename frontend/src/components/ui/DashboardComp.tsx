import React from "react";
import { Button } from "./button";
import { Link } from "react-router-dom";
interface customProps {
  vector: React.FC;
  secLink: string;
  secTitle: string;
  amount: number;
}

export default function DashboardComp(props: customProps) {
  return (
    <>
      <div className="bg-white h-full shadow-lg rounded-xl">
        <div className="flex flex-col align-middle shadow w-full h-full justify-between p-4">
          <div className="flex justify-between">
            <h1 className="inline-block font-bold text-lg">{props.secTitle}</h1>
            <div className="inline-block self-end mx-au">
              {<props.vector />}
            </div>
          </div>
          <div className="my-4 py-2 border-y">
            <h1 className="text-3xl text-left">Rs {props.amount}</h1>
            <p className="text-gray-500 text-left">till now</p>
          </div>
          <Link to={props.secLink}>
            <Button variant={"default"} className="w-full bg-customColor">
              {props.secTitle}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
