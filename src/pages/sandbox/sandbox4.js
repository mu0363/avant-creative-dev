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
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
}
