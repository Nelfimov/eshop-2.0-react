import { fetcher } from '@/helpers';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from 'mdb-react-ui-kit';
import Head from 'next/head';
import useSWR from 'swr';
import { CheckoutForm } from '@/components';

export default function Checkout() {
  const { data, error, isLoading, isValidating } = useSWR(
    'https://restcountries.com/v3.1/subregion/eu',
    fetcher
  );

  return (
    <>
      <Head>
        <title>Checkout | Jetzt ist die beste Zeit</title>
      </Head>
      <MDBCard>
        <MDBCardHeader>
          <h1>Checkout</h1>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBRow>
            <MDBCol size="md">
              <h2>Delivery address</h2>
              <CheckoutForm name="delivery" data={data} />
            </MDBCol>
            <MDBCol
              size="md-1"
              className="d-flex row-1 align-items-center justify-content-center align-content-center"
            >
              <MDBBtn className="text-center">
                <MDBIcon fas icon="angle-double-right d-none d-md-block" />
                <MDBIcon fas icon="angle-double-down d-block d-md-none" />
              </MDBBtn>
            </MDBCol>
            <MDBCol size="md">
              <h2>Billing address</h2>
              <CheckoutForm name="billing" data={data} />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
