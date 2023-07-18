import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="absolute top-2/4 left-2/4 text-light-text dark:text-dark-text -translate-x-2/4 -translate-y-2/4 flex flex-col gap-2 items-center text-3xl font-semibold"
      >
        Lost your way?
        <button
          onClick={() => navigate("/")}
          className="py-2 px-4 bg-dark-primary text-base dark:bg-light-secondary text-dark-text dark:text-light-text outline-none border-none rounded-md"
        >
          Home
        </button>
      </div>
    </>
  );
}
