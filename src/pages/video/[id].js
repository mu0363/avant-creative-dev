import Head from 'next/head';
import Image from 'next/image';
import { getPreviewVideo } from 'src/lib/db';
import { InputBox } from 'src/components/InputBox';
import { Layout } from 'src/components/Layout';
import { StepBottom } from 'src/components/StepBottom';
import { StepNav } from 'src/components/StepNav';
import { previewSteps } from 'src/lib/previewSteps';

export default function Video({ previewVideo }) {
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

  return (
    <div>
      <Head>
        <title>Create Video</title>
        <link rel='icon' href='/avant_creative_favicon.svg' />
      </Head>

      <Layout>
        <div className='m-2'>
          <div className='max-w-4xl m-auto mt-10'>
            {previewSteps.length > 1 && (
              <div className='flex justify-evenly'>
                {previewSteps.map((step, index) => (
                  <StepNav
                    key={index}
                    stepNum={index + 1}
                    check={true}
                    number={1}
                  />
                ))}
              </div>
            )}

            {/* <StepNav check={true} number={1} />
              <div className='rounded bg-gray-200 h-1 w-1/4 mb-4 md:mb-6 md:h-2' />
              <StepNav check={false} number={2} />
              <div className='rounded bg-gray-200 h-1 w-1/4 mb-4 md:mb-6 md:h-2' />
              <StepNav check={false} number={3} /> */}
            {previewSteps.map((step, index) => (
              <div key={index} className=' bg-white shadow-lg rounded-lg mt-10'>
                <div className='flex'>
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
