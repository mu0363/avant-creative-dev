import Head from 'next/head';
import { getAllPreviewVideos } from 'src/lib/db';
import { Layout } from 'src/components/Layout';
import { PreviewVideo } from 'src/components/PreviewVideo';
import { Nav } from 'src/components/Nav';
import { Footer } from 'src/components/Footer';

export default function Home({ previewVideos }) {
  return (
    <div>
      <Head>
        <title>AVANT dev</title>
        <link rel="icon" href="/avant_creative_favicon.svg" />
      </Head>
      <Layout>
        <Nav />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 lg:py-0">
          {previewVideos.map((video) => (
            <PreviewVideo key={video.id} video={video} />
          ))}
        </div>
      </Layout>
      <Footer />
    </div>
  );
}

export const getStaticProps = async (ctx) => {
  const previewVideos = await getAllPreviewVideos();

  return {
    props: {
      previewVideos,
    },
  };
};
