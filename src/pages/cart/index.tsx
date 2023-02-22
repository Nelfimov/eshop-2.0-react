import useSWR from 'swr';
import { MDBBtn, MDBCard, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import Link from 'next/link';
import Head from 'next/head';
import { useContext } from 'react';
import { CartContext } from '@/context';
import { CartItem, Product } from '@/types';
import { fetcher } from '@/helpers';
import { ItemList, Loader } from '@/components';

export default function Cart() {
  // @ts-expect-error: ignore
  const { cartItems } = useContext(CartContext);

  const url = `http://localhost:3000/products?ids=${JSON.stringify(
    cartItems.map((item: CartItem) => item.id)
  )}`;
  const { data, error, isLoading, isValidating } = useSWR(url, fetcher);

  console.log(data);

  if (error)
    return (
      <>
        <Head>
          <title>Cart | Jetzt ist die beste Zeit</title>
        </Head>
        <h1>Failed to load cart</h1>
      </>
    );

  return (
    <>
      <Head>
        <title>Cart | Jetzt ist die beste Zeit</title>
      </Head>
      <MDBCard className="p-3">
        <h1>Cart</h1>
        <MDBRow>
          <MDBCol>#</MDBCol>
          <MDBCol>Name</MDBCol>
          <MDBCol>Quantity</MDBCol>
          <MDBCol>Total amount</MDBCol>
        </MDBRow>
        {isLoading || isValidating ? (
          <Loader />
        ) : (
          data &&
          data.products.map((product: Product, index: number) => (
            <ItemList
              key={product._id}
              product={product}
              index={index}
              quantity={1}
            />
          ))
        )}
        <MDBRow>
          <MDBCol>
            <Link href="/">
              <MDBBtn color="secondary">Continue shopping</MDBBtn>
            </Link>
          </MDBCol>
          <MDBCol>
            <Link href="/cart/checkout">
              <MDBBtn color="success">To checkout</MDBBtn>
            </Link>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </>
  );
}
