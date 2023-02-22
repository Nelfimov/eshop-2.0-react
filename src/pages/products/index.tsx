import useSWR from 'swr';
import Head from 'next/head';
import { fetcher } from '@/helpers';
import { Loader, ProductCard } from '@/components';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';

export default function Products() {
  const { data, error, isLoading, isValidating } = useSWR(
    'http://127.0.0.1:3001/products',
    fetcher
  );

  if (error) {
    return <h1>Failed to load products</h1>;
  }
  return (
    <>
      <Head>
        <title>Catalogue | Jetzt ist die beste Zeit Online Shop</title>
      </Head>
      <MDBRow className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        {isLoading || isValidating ? (
          <Loader />
        ) : (
          data &&
          data.products.map((product: any) => (
            <MDBCol key={product._id}>
              <ProductCard product={product} />
            </MDBCol>
          ))
        )}
      </MDBRow>
    </>
  );
}
