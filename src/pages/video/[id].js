import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { getPreviewVideo } from 'src/lib/db';
import SwipeableViews from 'react-swipeable-views';

import { InputBox } from 'src/components/InputBox';
import { Layout } from 'src/components/Layout';
import { StepBottom } from 'src/components/StepBottom';
import { StepNav } from 'src/components/StepNav';
import { previewSteps } from 'src/lib/previewSteps';

export default function Video({ previewVideo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState(false);

  const {
    id,
    name,
    videoSrc,
    thumbnail,
    length,
    resolution,
    createdAt,
    previewSteps,
  } = previewVideo;

  const setComplete = () => {
    if (currentIndex === previewSteps.length - 2) {
      setStatus(true);
    }
  };

  const forwardSwipe = () => {
    if (currentIndex === previewSteps.length - 1) {
      setCurrentIndex(previewSteps.length - 1);
    } else {
      setCurrentIndex((currentIndex) => currentIndex + 1);
      setComplete();
    }
  };
  const backwardSwipe = () => {
    if (currentIndex > 0) {
      setCurrentIndex((currentIndex) => currentIndex - 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div>
      <Head>
        <title>Create Video</title>
        <link rel='icon' href='/avant_creative_favicon.svg' />
      </Head>

      <Layout>
        <div className='m-2'>
          <div className=' mt-10'>
            {previewSteps.length > 1 && (
              <div className='flex'>
                {previewSteps.map((step, index) => (
                  <StepNav
                    key={index}
                    stepNum={index}
                    currentIndex={currentIndex}
                    status={status}
                  />
                ))}
              </div>
            )}
            <SwipeableViews enableMouseEvents index={currentIndex}>
              {previewSteps.map((step, index) => (
                <div
                  key={index}
                  className='max-w-4xl m-auto bg-white shadow-lg rounded-lg mt-10'
                >
                  <div className='flex flex-col sm:flex-row'>
                    <Image
                      src={step.referenceImage}
                      width={960}
                      height={540}
                      objectFit='contain'
                      className='rounded-l-lg'
                    />
                    <InputBox />
                  </div>
                </div>
              ))}
            </SwipeableViews>
            <StepBottom
              forwardSwipe={forwardSwipe}
              backwardSwipe={backwardSwipe}
              currentIndex={currentIndex}
              length={previewSteps.length}
            />
          </div>
        </div>
        <p>currentIndex: {currentIndex}</p>
        <p>totalLength: {previewSteps.length - 1}</p>
        <p>status: {status ? 'true' : 'false'}</p>
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
