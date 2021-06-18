import { useState, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { format } from 'date-fns';

import { getPreviewVideo, getAllPreviewVideos } from 'src/lib/db';
import { InputBox } from 'src/components/InputBox';
import { Layout } from 'src/components/Layout';
import { Stepper } from 'src/components/Stepper';
import { appendSpreadsheet } from 'src/lib/appendSpreadSheet';
import { generateFilename } from 'src/lib/generateFilename';
import { uploadImages } from 'src/lib/uploadImages';
import { deleteAllState } from 'src/redux/stepper';
import { ConfirmModal } from 'src/components/ConfirmModal';

export default function Video({ previewVideo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  let [isOpen, setIsOpen] = useState(false);
  let cancelButtonRef = useRef(null);
  const { previewSteps } = previewVideo;
  const router = useRouter();
  const { images, texts } = useSelector((state) => state.stepper);
  const dispatch = useDispatch();
  const avantName = previewVideo.templateName;
  const aepPath = previewVideo.aepPath;
  const username = 'JohnDoe';

  const openModal = () => {
    setIsOpen(true);
    Object.values(images).map((blob) => console.log(blob));
  };

  //前にすすむボタン
  const forwardSwipe = () => {
    if (currentIndex === previewSteps.length - 1) {
      setCurrentIndex(previewSteps.length - 1);
    } else {
      setCurrentIndex((currentIndex) => currentIndex + 1);
    }
  };

  //後ろに戻るボタン
  const backwardSwipe = () => {
    if (currentIndex > 0) {
      setCurrentIndex((currentIndex) => currentIndex - 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    uploadImages(images, avantName).then((result) => {
      const { urls, id } = result;
      const urlsObject = urls[0].reduce((l, r) => Object.assign(l, r), {});
      const { outputName } = generateFilename(username, avantName, id);

      //スプレッドシートに書き込むデータのオブジェクト
      const newRow = {
        date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        username: username,
        output: outputName,
        'render-status': 'ready',
        aep: aepPath,
        id: id,
        avantName: avantName,
        bot: 'HAL',
        target: 'FINAL1080p',
        ...texts,
        ...urlsObject,
      };

      // スプレッドシートに書き込む！！
      appendSpreadsheet(newRow);
      dispatch(deleteAllState());
      router.push('/');
    });
  };

  return (
    <div>
      <Head>
        <title>Create here</title>
        <link rel="icon" href="/avant_creative_favicon.svg" />
      </Head>

      <Layout>
        <div className="m-2 flex-1">
          <div className="mt-3 sm:mt-10">
            {previewSteps.length > 1 && (
              <div>
                <Stepper steps={previewSteps} currentStepNumber={currentIndex + 1} />
              </div>
            )}

            <SwipeableViews enableMouseEvents index={currentIndex}>
              {previewSteps.map((step, index) => (
                <div
                  key={index}
                  className={`${
                    step.checkImage
                      ? 'max-w-4xl m-auto bg-white shadow-lg rounded-lg mt-3 sm:mt-10'
                      : 'max-w-md m-auto bg-white shadow-lg rounded-lg mt-3 sm:mt-10'
                  }`}
                >
                  <div className={`${step.checkImage ? 'grid sm:grid-cols-2' : 'grid'}`}>
                    <div>
                      <img
                        src={step.referenceImage}
                        alt={step.name}
                        className={`${
                          step.checkImage
                            ? 'rounded-t-lg sm:rounded-lt-lg sm:rounded-tr-none max-w-auto object-cover'
                            : 'rounded-t-lg max-w-auto object-cover'
                        }`}
                      />
                      <p className="p-3">{step.description}</p>
                    </div>
                    <div>
                      <InputBox step={step} stepNumber={index + 1} />
                    </div>
                  </div>
                </div>
              ))}
            </SwipeableViews>
            <div className="flex justify-center my-2 sm:my-8 space-x-4">
              <button
                type="button"
                onClick={backwardSwipe}
                className={`w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center bg-white hover:bg-gray-100 font-medium border ${
                  currentIndex === 0 && 'text-gray-300'
                }`}
              >
                Previous
              </button>

              {currentIndex === previewSteps.length - 1 ? (
                <button
                  // onClick={onSubmit}
                  onClick={openModal}
                  className={`w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center font-medium border text-white bg-ai hover:bg-ai-dark
                  }`}
                >
                  Confirm
                </button>
              ) : (
                <button
                  type="button"
                  onClick={forwardSwipe}
                  className={`w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center bg-white hover:bg-gray-100 font-medium border`}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>

      {/* こっからモーダルだぜ */}
      <ConfirmModal cancelButtonRef={cancelButtonRef} isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-gray-100 rounded-t-lg p-3">
          {Object.values(images).map((blob, index) => (
            <div key={index} className="grid grid-cols-2">
              <img src={blob} alt={blob} />
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
