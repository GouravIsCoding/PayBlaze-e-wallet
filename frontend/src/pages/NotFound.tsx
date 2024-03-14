export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-16 inline-block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <h1 className="text-center text-2xl font-bold inline-block">
          404 page not Found
        </h1>
      </div>
    </div>
  );
}
