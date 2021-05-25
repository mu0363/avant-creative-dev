import Head from 'next/head';
import { Header } from 'src/components/Header';
import { PreviewVideo } from 'src/components/PreviewVideo';
import { db } from 'src/lib/firebase';

export default function Crop({ previewVideos }) {
  const { id, name, videoSrc, thumbnail, length, resolution, createdAt } =
    previewVideos;
  return (
    <div>
      <Head>
        <title>Facebook 2.0</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <div className='grid gap-2 sm:grid-cols-3 lg:grid-cols-4 p-4'>
        {previewVideos.map((video) => (
          <PreviewVideo The key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const previewVideos = [];
  const snapshot = await db.collection('preview-videos').get();
  snapshot.forEach((doc) => {
    previewVideos.push({
      id: doc.id,
      name: doc.data().name,
      videoSrc: doc.data().videoSrc,
      thumbnail: doc.data().thumbnail,
      length: doc.data().length,
      resolution: doc.data().resolution,
      createdAt: JSON.parse(JSON.stringify(doc.data().createdAt)),
    });
  });

  return {
    props: {
      previewVideos,
    },
  };
};
