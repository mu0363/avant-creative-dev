import { useState, useRef } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import { getPreviewVideo, getAllPreviewVideos } from "src/lib/db";
import { InputBox } from "src/components/InputBox";
import { Layout } from "src/components/Layout";
import { Stepper } from "src/components/Stepper";
import { ConfirmModal } from "src/components/ConfirmModal";
import { addTexts, addPreviewTexts } from "src/features/scenes/scenesSlice";

export default function Video({ previewVideo }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [currentIndex, setCurrentIndex] = useState(0);
  let [isOpen, setIsOpen] = useState(false);
  let cancelButtonRef = useRef(null);
  const { previewSteps, imageRequired } = previewVideo;
  const dispatch = useDispatch();
  const { scenes, images } = useSelector((state) => state.scenes);
  const avantName = previewVideo.templateName;
  const aepPath = previewVideo.aepPath;

  //前にすすむボタン
  const forwardButton = () => {
    if (currentIndex === previewSteps.length - 1) {
      setCurrentIndex(previewSteps.length - 1);
    } else {
      setCurrentIndex((currentIndex) => currentIndex + 1);
    }
  };

  //後ろに戻るボタン
  const backwardButton = () => {
    if (currentIndex > 0) {
      setCurrentIndex((currentIndex) => currentIndex - 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const onSubmit = (data) => {
    if (previewSteps.length === images.length || imageRequired === false) {
      dispatch(addTexts(data));
      dispatch(addPreviewTexts(data));
      setIsOpen(true);
    } else {
      toast.error("You need to select all images.", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Create here</title>
        <link rel="icon" href="/avant_creative_favicon.svg" />
      </Head>
      <Layout>
        <div className="m-2">
          <div className="mt-4">
            <div className="flex justify-center">
              {previewSteps.length > 1 && (
                <div>
                  <Stepper steps={previewSteps} currentStepNumber={currentIndex + 1} />
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <SwipeableViews enableMouseEvents onChangeIndex={(index) => setCurrentIndex(index)} index={currentIndex}>
                {previewSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`${
                      step.checkImage
                        ? "max-w-4xl m-auto bg-white shadow-lg rounded-lg mt-3 sm:mt-5"
                        : "max-w-md m-auto bg-white shadow-lg rounded-lg mt-3 sm:mt-5"
                    }`}
                  >
                    <div className={`${step.checkImage ? "grid sm:grid-cols-2" : "grid"}`}>
                      <div>
                        <img
                          src={step.referenceImage}
                          alt={step.name}
                          className={`${
                            step.checkImage
                              ? "rounded-t-lg sm:rounded-lt-lg sm:rounded-tr-none max-w-auto object-cover"
                              : "rounded-t-lg max-w-auto object-cover"
                          }`}
                        />
                        <p className="p-3">{step.description}</p>
                      </div>
                      <div>
                        <InputBox
                          step={step}
                          stepNumber={index + 1}
                          currentIndex={currentIndex}
                          register={register}
                          errors={errors}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </SwipeableViews>
              <div className="flex justify-center my-4 sm:my-8 space-x-4">
                <button
                  type="button"
                  onClick={backwardButton}
                  className={`w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center bg-white hover:bg-gray-100 font-medium border ${
                    currentIndex === 0 && "text-gray-300"
                  }`}
                >
                  Previous
                </button>

                {currentIndex !== previewSteps.length - 1 && (
                  <button
                    type="button"
                    onClick={forwardButton}
                    className={
                      "bg-white hover:bg-gray-100 font-medium border w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center"
                    }
                  >
                    Next
                  </button>
                )}
                {currentIndex === previewSteps.length - 1 && (
                  <button
                    className={
                      "w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center font-medium border text-white bg-ai hover:bg-ai-dark"
                    }
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <Toaster />
      </Layout>
      {/* こっからモーダルだぜ */}
      <ConfirmModal
        cancelButtonRef={cancelButtonRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        avantName={avantName}
        aepPath={aepPath}
      >
        <div className="bg-gray-100 rounded-t-lg p-3">
          <p className="font-semibold text-center text-2xl">Are you sure to send the info?</p>
          {scenes.map((scene, index) => (
            <div key={index} className="bg-gray-200 mt-5 rounded-md shadow-md">
              <p className="bg-ai-light text-white py-1 px-2 rounded-t-md">{`Scene${index + 1}`}</p>
              <div className="grid sm:grid-cols-2">
                {scene[`image${index + 1}`] && (
                  <img src={scene[`image${index + 1}`]} alt={scene[`image${index + 1}`]} className="sm:rounded-bl-md" />
                )}
                <p className="p-2">{scene[`text${index + 1}`]}</p>
              </div>
            </div>
          ))}
        </div>
      </ConfirmModal>
    </div>
  );
}

export async function getStaticPaths() {
  const previewVideos = await getAllPreviewVideos();
  const paths = previewVideos.map((video) => `/video/${video.id}`);
  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const data = await getPreviewVideo(params.id);
  const previewVideo = data[0];

  return {
    props: {
      previewVideo,
    },
  };
};
