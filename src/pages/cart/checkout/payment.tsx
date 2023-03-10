import { fetcherGetAuthorized, fetcherGetUnauthorized } from '@/helpers';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Head from 'next/head';
import useSWR from 'swr';
import { useContext, useEffect } from 'react';
import { CartContext, UserContext } from '@/context';
import { CartSnippet } from '@/components';
import { useRouter } from 'next/router';

export default function Payment() {
  const router = useRouter();
  const cart = useContext(CartContext);
  const user = useContext(UserContext);

  useEffect(() => {
    if (user?.id === '') {
      console.log('You are not authorized');
      router.push('/');
    }
  }, []);

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
            <MDBCardBody className="">
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
              count={cart!.itemCount}
              cart={cart!}
            />
          )}
        </MDBCol>
      </MDBRow>
    </>
  );
}
