import Link from "next/link";
import { Fragment, useState } from "react";
import { format } from "date-fns";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { FilmIcon } from "@heroicons/react/outline";
import { AiFillCloseCircle } from "react-icons/ai";

import { sortArray } from "src/lib/sortArray";
import { uploadImages } from "src/lib/uploadImages";
import { appendSpreadsheet } from "src/lib/appendSpreadSheet";
import { generateFilename } from "src/lib/generateFilename";
import { generateId } from "src/lib/generateId";
import { deleteAllScenes } from "src/features/scenes/scenesSlice";
import { setLoading } from "src/features/scenes/loadingSlice";

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
    // 順番をid順にsortして
    const sortedTexts = sortArray(texts);
    //idをobjectから外す！
    const textsArray = sortedTexts.map((text, index) => {
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
        router.push("/confirm-complete");
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
      router.push("/confirm-complete");
      dispatch(deleteAllScenes());
    }
  };
  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          open={isOpen}
          onClose={setIsOpen}
        >
          <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
              <div className="static inline-block align-bottom text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-3 bg-transparent">
                {children}
                <div className="bg-gray-100 rounded-b-lg px-4 py-3 sm:px-3 sm:flex sm:flex-row-reverse">
                  <Link href="#" passHref>
                    <div
                      onClick={onSubmit}
                      className="flex items-center w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-ai text-base font-medium text-white space-x-2 hover:bg-ai-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                    >
                      <FilmIcon className="h-5" />
                      <p>Render Video</p>
                    </div>
                  </Link>
                  <div
                    ref={cancelButtonRef}
                    className="absolute top-0 right-0 rounded-full bg-white cursor-pointer shadow-lg"
                  >
                    <AiFillCloseCircle
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="sm:h-8 sm:w-8 h-7 w-7"
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
