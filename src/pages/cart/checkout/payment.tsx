import { fetcherGetAuthorized, fetcherGetUnauthorized } from '@/helpers';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Head from 'next/head';
import useSWR from 'swr';
import { useContext } from 'react';
import { CartContext } from '@/context';
import { Product } from '@/types';
import { CartSnippet } from '@/components';

export default function Payment() {
  const cart = useContext(CartContext);

  const order = useSWR('http://localhost:3001/orders/', fetcherGetAuthorized);
  const products = useSWR(
    `http://localhost:3001/products?ids=${JSON.stringify(
      cart!.cartItems.map((item) => item.id)
    )}`,
    fetcherGetUnauthorized
  );

  if (order.error || products.error) {
    return (
      <>
        <Head>
          <title>Payment | Jetzt ist die beste Zeit</title>
        </Head>
        <MDBCard>
          <MDBCardHeader>
            <h1>Error</h1>
          </MDBCardHeader>
        </MDBCard>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Payment | Jetzt ist die beste Zeit</title>
      </Head>
      <MDBRow>
        <MDBCol size={8}>
          <MDBCard>
            <MDBCardHeader>
              <h1>Payment options </h1>
            </MDBCardHeader>
            <MDBCardBody>
              <h2>{products.data && JSON.stringify(products.data.products)}</h2>
              <PayPalButtons
                createOrder={(data, action) => {
                  return action.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: cart!.total.toString(),
                          breakdown: {
                            item_total: { value: '', currency_code: 'EUR' },
                            shipping: { value: '', currency_code: 'EUR' },
                            discount: { value: '', currency_code: 'EUR' },
                          },
                        },
                        items: [
                          {
                            name: '',
                            quantity: '',
                            unit_amount: { value: '123' },
                            category: 'PHYSICAL_GOODS',
                          },
                        ],
                      },
                    ],
                  });
                }}
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol size={4}>
          {products.data && (
            <CartSnippet
              products={products.data.products}
              total={cart!.total.toString()}
            />
          )}
        </MDBCol>
      </MDBRow>
    </>
  );
}
