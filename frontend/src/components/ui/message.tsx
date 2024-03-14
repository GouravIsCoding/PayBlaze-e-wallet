import { useEffect } from "react";
interface customProps {
  message: string;
}

export default function Message(props: customProps) {
  const toClose = () => {
    document.querySelector(".modal")?.classList.add("hidden");
  };
  useEffect(() => {
    document.querySelector(".close-button")?.addEventListener("click", toClose);
    return () =>
      document
        .querySelector(".close-button")
        ?.removeEventListener("click", toClose);
  }, []);
  return (
    <>
      <div className="text-center p-4 bg-green-400 modal">
        <h1 className="text-2xl font-sans font-semibold text-white inline-block">
          {props.message}
        </h1>
        <span className="float-right close-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
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
        </span>
      </div>
    </>
  );
}
