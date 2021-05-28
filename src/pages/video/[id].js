import Head from 'next/head';
import { getPreviewVideo } from 'src/lib/db';
import { InputBox } from 'src/components/InputBox';
import { Layout } from 'src/components/Layout';
import { ProgressBar } from 'src/components/ProgressBar';
import { StepBottom } from 'src/components/StepBottom';

export default function Video({ previewVideo }) {
  const { id, name, videoSrc, thumbnail, length, resolution, createdAt } =
    previewVideo;

  return (
    <div>
      <Head>
        <title>Create Video</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout>
        <div className='m-2'>
          <div className='max-w-2xl m-auto mt-10'>
            {/* :style="'width: '+ parseInt(step / 3 * 100) +'%'" */}
            <ProgressBar width={`1/1`} percent={30} />
            <div className=' bg-white shadow-lg rounded-lg p-3 mt-10'>
              <div className='max-w-2xl m-auto'>
                <p className='font-semibold text-lg'>{name}</p>
                <video poster={thumbnail} src={videoSrc} controls></video>
                <InputBox />
              </div>
              <StepBottom />
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
