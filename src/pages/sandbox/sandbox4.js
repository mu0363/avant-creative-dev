import { scenes } from "src/data/scenes";
import { texts } from "src/data/texts";
import toast, { Toaster } from "react-hot-toast";

export default function Sandbox4() {
  const notify = () =>
    toast.error("Here is your toast.", {
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  return (
    <div>
      <button className="bg-red-500 flex p-3 rounded-md">
        <svg
          className="animate-spin mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="text-white">processing</span>
      </button>
      <button className="p-4 bg-blue-300 w-full" onClick={() => console.log("ok")}>
        Button
      </button>
    </div>
  );
}
