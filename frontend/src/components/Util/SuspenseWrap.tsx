import React, { Suspense } from "react";

interface customProps {
  children?: React.ReactElement;
}

export default function SuspenseWrap(props: customProps) {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        }
      >
        {props.children}
      </Suspense>
    </>
  );
}
