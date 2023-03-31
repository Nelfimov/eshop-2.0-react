import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { MDBCard } from 'mdb-react-ui-kit';
import { Product as IProduct } from '@/types';
import { fetcherGetUnauthorized } from '@/helpers';
import { Loader, ProductBodyImages, ProductHeader } from '@/components';

export default function Product() {
  const router = useRouter();
  const { data, error, isLoading, isValidating } = useSWR(
    router.isReady
      ? `${process.env.backEndUrl}products/${router.query.id}`
      : null,
    fetcherGetUnauthorized
  );
  const product: IProduct = !isLoading && data?.product;

  return (
    <>
      <Head>
        <title>{`${
          product?.name ?? 'Loading'
        } | Jetzt ist die beste Zeit Online Shop`}</title>
      </Head>
      <MDBCard>
        {error && <h1>Product not found</h1>}
        {isLoading || isValidating ? (
          <Loader />
        ) : (
          data && (
            <>
              <ProductHeader product={product} />
              <ProductBodyImages product={product} />
            </>
          )
        )}
      </MDBCard>
    </>
  );
}
