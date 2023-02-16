import useSWR from 'swr';
import Head from 'next/head';
import { fetcher } from '@/helpers';
import { ProductCard } from '@/components';
import { MDBCol, MDBContainer } from 'mdb-react-ui-kit';

export default function Products() {
  const { data, error } = useSWR('http://127.0.0.1:3001/products', fetcher);

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
      <MDBContainer className="row row-cols-1 row-cols-md-5 gap-4 justify-content-center">
        {data &&
          data.products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </MDBContainer>
    </>
  );
}
