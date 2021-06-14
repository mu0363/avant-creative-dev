import { useState } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { format } from 'date-fns';

import { getPreviewVideo } from 'src/lib/db';
import { InputBox } from 'src/components/InputBox';
import { Layout } from 'src/components/Layout';
import { Stepper } from 'src/components/Stepper';
import { appendSpreadsheet } from 'src/lib/appendSpreadSheet';
import { generateFilename } from 'src/lib/generateFilename';
import { uploadImages } from 'src/lib/uploadImages';

export default function Video({ previewVideo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { previewSteps } = previewVideo;
  const { images, texts } = useSelector((state) => state.stepper);
  const avantName = previewVideo.templateName;
  const aepPath = previewVideo.aepPath;
  const username = 'JohnDoe';

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
        bot: 'HAL',
        target: 'FINAL1080p',
        ...texts,
        ...urlsObject,
      };

      // スプレッドシートに書き込む！！
      appendSpreadsheet(newRow);
    });
  };

  return (
    <div>
      <Head>
        <title>Create Video</title>
        <link rel="icon" href="/avant_creative_favicon.svg" />
      </Head>

      <Layout>
        <div className="m-2">
          <div className="mt-3 sm:mt-10">
            {previewSteps.length > 1 && (
              <div>
                <Stepper steps={previewSteps} currentStepNumber={currentIndex + 1} />
              </div>
            )}

            <SwipeableViews enableMouseEvents index={currentIndex}>
              {previewSteps.map((step, index) => (
                <div key={index} className="max-w-4xl m-auto bg-white shadow-lg rounded-lg mt-3 sm:mt-10">
                  <div className="flex flex-col sm:flex-row">
                    <img
                      src={step.referenceImage}
                      className="rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none flex-1 max-w-lg"
                    />
                    <div className="flex-1">
                      <InputBox stepNumber={index + 1} />
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
                  onClick={onSubmit}
                  className={`w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center font-medium border text-white bg-ai hover:bg-ai-dark
                  }`}
                  // className='w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-ai hover:bg-ai-dark font-medium'
                >
                  Confirm
                </button>
              ) : (
                <button
                  type="button"
                  onClick={forwardSwipe}
                  className={`w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center bg-white hover:bg-gray-100 font-medium border`}
                  // className='w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-ai hover:bg-ai-dark font-medium'
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const data = await getPreviewVideo(ctx.query.id);
  const previewVideo = data[0];

  return {
    props: {
      previewVideo,
    },
  };
};
