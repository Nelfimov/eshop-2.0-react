import { fetcherGetAuthorized } from '@/helpers';
import { MDBCard, MDBCardBody, MDBCardHeader } from 'mdb-react-ui-kit';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Head from 'next/head';
import useSWR from 'swr';
import { useContext } from 'react';
import { CartContext } from '@/context';

export default function Payment() {
  const cart = useContext(CartContext);

  const { data, error, isLoading, isValidating } = useSWR(
    'http://localhost:3001/orders/',
    fetcherGetAuthorized
  );

  if (error) {
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
      <MDBCard>
        <MDBCardHeader>
          <h1>Hello, please pay in cash</h1>
        </MDBCardHeader>
        <MDBCardBody>
          <PayPalButtons
            createOrder={(data, action) => {
              return action.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: cart!.total.toString(),
                    },
                    items: [],
                  },
                ],
              });
            }}
          />
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
