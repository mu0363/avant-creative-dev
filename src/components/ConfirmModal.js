import Link from "next/link";
import { Fragment } from "react";
import { format } from "date-fns";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { FilmIcon } from "@heroicons/react/outline";
import { AiFillCloseCircle } from "react-icons/ai";

import { uploadImages } from "src/lib/uploadImages";
import { appendSpreadsheet } from "src/lib/appendSpreadSheet";
import { generateFilename } from "src/lib/generateFilename";
import { generateId } from "src/lib/generateId";
import { deleteAllScenes } from "src/features/scenes/scenesSlice";
import { setLoading } from "src/features/loading/loadingSlice";

export const ConfirmModal = (props) => {
  const { children, cancelButtonRef, setIsOpen, isOpen, avantName, aepPath } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const { texts, images } = useSelector((state) => state.scenes);
  const username = "JohnDoe";

  const onSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
    dispatch(setLoading(true));

    //idをobjectから外す！
    const textsArray = texts.map((text, index) => {
      const value = Object.values(text);
      return { [`text${index + 1}`]: value[1] };
    });
    //objectに変換
    const textsObject = textsArray.reduce((l, r) => Object.assign(l, r), {});

    if (images.length > 0) {
      uploadImages(images, avantName).then((result) => {
        const { urls, id } = result;
        //objectに変換
        const urlsObject = urls[0].reduce((l, r) => Object.assign(l, r), {});
        const { outputName } = generateFilename(username, avantName, id);

        // スプレッドシートに書き込むデータのオブジェクト;
        const newRow = {
          date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
          username: username,
          output: outputName,
          "render-status": "ready",
          aep: aepPath,
          id: id,
          avantName: avantName,
          bot: "HAL",
          target: "FINAL1080p",
          ...textsObject,
          ...urlsObject,
        };
        // スプレッドシートに書き込む！！
        appendSpreadsheet(newRow);
        router.push("/redirect/confirm-complete");
        dispatch(deleteAllScenes());
      });
    } else {
      const id = generateId();
      const { outputName } = generateFilename(username, avantName, id);
      // スプレッドシートに書き込むデータのオブジェクト;
      const newRow = {
        date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        username: username,
        output: outputName,
        "render-status": "ready",
        aep: aepPath,
        id: id,
        avantName: avantName,
        bot: "HAL",
        target: "FINAL1080p",
        ...textsObject,
      };
      // スプレッドシートに書き込む！！
      appendSpreadsheet(newRow);
      setIsOpen(false);
      router.push("/redirect/confirm-complete");
      dispatch(deleteAllScenes());
    }
  };
  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="overflow-y-auto fixed inset-0 z-10"
          initialFocus={cancelButtonRef}
          open={isOpen}
          onClose={setIsOpen}
        >
          <div className="flex sm:block justify-center items-center sm:p-0 px-4 min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-filter backdrop-blur-sm transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block overflow-hidden static p-3 sm:my-8 sm:w-full sm:max-w-lg text-left align-bottom sm:align-middle bg-transparent shadow-xl transition-all transform">
                {children}
                <div className="sm:flex sm:flex-row-reverse py-3 px-4 sm:px-3 bg-gray-100 rounded-b-lg">
                  <Link href="#" passHref>
                    <div
                      onClick={onSubmit}
                      className="flex justify-center items-center py-2 px-4 space-x-2 w-full text-base font-medium text-white bg-ai hover:bg-ai-dark rounded-md border border-transparent focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-sm cursor-pointer focus:outline-none"
                    >
                      <FilmIcon className="h-5" />
                      <p>Render Video</p>
                    </div>
                  </Link>
                  <div
                    ref={cancelButtonRef}
                    className="absolute top-0 right-0 bg-white rounded-full shadow-lg cursor-pointer"
                  >
                    <AiFillCloseCircle
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-7 sm:w-8 h-7 sm:h-8"
                    />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
