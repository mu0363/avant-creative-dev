import { useRouter } from 'next/router';
import { Layout } from 'src/components/Layout';
import { InputBox } from 'src/components/InputBox';

export default function Video() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <InputBox />
      <p>{id}</p>
    </Layout>
  );
}
