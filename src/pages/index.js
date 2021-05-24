import Head from 'next/head';
import { Header } from 'src/components/Header';
import { Sidebar } from 'src/components/Sidebar';
import { Feed } from 'src/components/Feed';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Facebook 2.0</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <div className='flex'>
        <Sidebar />
        <Feed />
      </div>
    </div>
  );
}
