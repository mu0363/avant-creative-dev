import Head from "next/head";
import { getAllVideos } from "src/lib/db";
import { Layout } from "src/components/Layout";
import { Nav } from "src/components/Nav";
import { Footer } from "src/components/Footer";

export default function Videos({ allVideos }) {
  return (
    <div>
      <Head>
        <title>All Videos</title>
        <link rel="icon" href="/avant_creative_favicon.svg" />
      </Head>

      <Layout>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 lg:py-0 flex-1">
          {allVideos.map((video) => (
            <div key={video.id}>
              <video src={video.url} onClick={(e) => e.target.play()} preload="metadata" muted playsInline controls />
            </div>
          ))}
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const allVideos = await getAllVideos();

  return {
    props: {
      allVideos,
    },
  };
};
