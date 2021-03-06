import Head from "next/head";
import { getAllPreviewVideos } from "src/lib/db";
import { Layout } from "src/components/Layout";
import { PreviewVideo } from "src/components/PreviewVideo";
import { Nav } from "src/components/Nav";

export default function Home({ previewVideos }) {
  return (
    <div>
      <Head>
        <title>AVANT dev</title>
        <link rel="icon" href="/avant_creative_favicon.svg" />
      </Head>
      <Layout>
        <Nav />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 lg:py-0">
          {previewVideos.map((video) => (
            <PreviewVideo key={video.id} video={video} />
          ))}
        </div>
      </Layout>
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
