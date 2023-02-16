import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '@/helpers';
import Head from 'next/head';
import { MDBCard } from 'mdb-react-ui-kit';

export default function Product() {
  const router = useRouter();
  const { data, error } = useSWR(`/products/${router.query.id}`, fetcher);

  return (
    <>
      <Head>
        <title>{`${data.product.name} | Jetzt ist die beste Zeit Online Shop`}</title>
      </Head>
      <MDBCard></MDBCard>
    </>
  );
}
