import useSWR from 'swr';
import Head from 'next/head.js';
import { fetcher } from '@/helpers/fetcher.js';

export default function Products() {
  const { data, error } = useSWR('/products', fetcher);

  if (error) {
    return <h1>Failed to load products</h1>;
  }
  if (!data) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Head>
        <title>Products | Jetzt ist die beste Zeit Online Shop</title>
      </Head>
      <h1>When nothing to be loaded</h1>
    </>
  );
}
