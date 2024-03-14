import React from "react";
import PayBlazePic from "../../assets/PayBlaze.png";

interface customProps {
  children?: React.ReactElement | React.ReactElement[];
  className?: string;
}

const Container = (props: customProps) => {
  return (
    <div
      style={{ backgroundImage: `url(${PayBlazePic})` }}
      className="text-center bg-fixed bg-center shadow"
    >
      <div
        className={`flex flex-col justify-center items-center min-h-screen ${props.className}`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Container;
