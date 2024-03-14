interface customProps {
  error: string;
}

export default function errorMessage(props: customProps) {
  return (
    <>
      <div className="text-center p-4 bg-red-400 modal">
        <h1 className="text-2xl font-sans font-semibold text-white inline-block">
          {props.error}
        </h1>
      </div>
    </>
  );
}
