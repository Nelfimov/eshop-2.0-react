import useSWR from 'swr';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCol,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
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

  const url = `http://localhost:3001/products?ids=${JSON.stringify(
    cartItems.map((item: CartItem) => item.id)
  )}`;
  const { data, error, isLoading, isValidating } = useSWR(url, fetcher);

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
      <MDBCard>
        <MDBCardHeader>
          <h1>Cart</h1>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBTable responsive="sm" striped hover>
            <MDBTableHead>
              <tr>
                <th style={{ textAlign: 'center' }} scope="col">
                  #
                </th>
                <th style={{ textAlign: 'center' }} scope="col">
                  Name
                </th>
                <th style={{ textAlign: 'center' }} scope="col">
                  Quantity
                </th>
                <th style={{ textAlign: 'center' }} scope="col">
                  Price
                </th>
                <th style={{ textAlign: 'center' }} scope="col">
                  Total amount
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {isLoading || isValidating ? (
                <Loader />
              ) : (
                data &&
                data.products.map((product: Product, index: number) => (
                  <ItemList
                    key={product._id}
                    product={product}
                    index={index + 1}
                    quantity={1}
                  />
                ))
              )}
            </MDBTableBody>
            <tfoot>
              <tr>
                <td colSpan={4} align="right">
                  TOTAL:
                </td>
                <td></td>
              </tr>
            </tfoot>
          </MDBTable>
        </MDBCardBody>
        <MDBCardFooter>
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
        </MDBCardFooter>
      </MDBCard>
    </>
  );
}
