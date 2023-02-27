import useSWR from 'swr';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import Link from 'next/link';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { CartContext } from '@/context';
import { CartItem, Product } from '@/types';
import { fetcher } from '@/helpers';
import { ItemList, Loader } from '@/components';

export default function Cart() {
  const cart = useContext(CartContext);

  const url = `http://localhost:3001/products?ids=${JSON.stringify(
    cart!.cartItems.map((item: CartItem) => item.id)
  )}`;
  const { data, error, isLoading, isValidating } = useSWR(url, fetcher);

  useEffect(() => {
    !isLoading && cart!.updatePrices(data.products);
  }, []);

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
          {isLoading || isValidating ? (
            <Loader />
          ) : (
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
                  <th style={{ textAlign: 'center' }} scope="col">
                    Delete?
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {data &&
                  data.products.map((product: Product, index: number) => (
                    <ItemList
                      key={product._id}
                      product={product}
                      index={index + 1}
                      quantity={
                        // @ts-expect-error: ignore
                        cart!.cartItems.find(
                          (item: CartItem) => item.id === product._id
                        ).quantity
                      }
                    />
                  ))}
              </MDBTableBody>
              <tfoot>
                <tr className="table-info">
                  <td colSpan={5} align="right">
                    TOTAL:
                  </td>
                  <td align="center">€{cart?.total}</td>
                </tr>
              </tfoot>
            </MDBTable>
          )}
        </MDBCardBody>
        <MDBCardFooter>
          <MDBRow className="row-cols-1 row-cols-sm-2 g-4">
            <Link href="/" className="d-flex">
              <MDBBtn className="flex-fill" color="secondary">
                Continue shopping
              </MDBBtn>
            </Link>
            <Link href="/cart/checkout" className="d-flex">
              <MDBBtn color="success" className="flex-fill">
                To checkout
              </MDBBtn>
            </Link>
          </MDBRow>
        </MDBCardFooter>
      </MDBCard>
    </>
  );
}
