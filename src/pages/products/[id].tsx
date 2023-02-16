import useSWR from 'swr';
import { useRouter } from 'next/router.js';
import { fetcher } from '@/helpers';
import Head from 'next/head.js';

export default function Product() {
  const router = useRouter();

  const { data, error } = useSWR(`/products/${router.query.id}`, fetcher);
  if (error) return <h1>Cannot load product</h1>;
  if (!data) return <h1>Loading...</h1>;

  return (
    <>
      <Head>
        <title>{`${data.name} | Jetzt ist die beste Zeit Online Shop`}</title>
      </Head>
      <div className="Product">
        <div className="title">{data.name}</div>
      </div>
    </>
  );
}
