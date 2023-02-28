import { fetcher } from '@/helpers';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBValidation,
} from 'mdb-react-ui-kit';
import Head from 'next/head';
import useSWR from 'swr';
import { CheckoutForm, Loader } from '@/components';
import { useRef } from 'react';

export default function Checkout() {
  const { data, error, isLoading, isValidating } = useSWR(
    'https://restcountries.com/v3.1/subregion/eu',
    fetcher
  );
  const nameShipping = useRef();
  const streetShipping = useRef();
  const cityShipping = useRef();
  const countryShipping = useRef();
  const zipShipping = useRef();
  const nameBilling = useRef();
  const streetBilling = useRef();
  const cityBilling = useRef();
  const countryBilling = useRef();
  const zipBilling = useRef();

  function handleClick() {
    // @ts-expect-error: ignore
    if (nameShipping.current.value) {
      // @ts-expect-error: ignore
      nameBilling.current.value = nameShipping.current.value;
      // @ts-expect-error: ignore
      nameBilling.current.focus();
    }
    // @ts-expect-error: ignore
    if (streetShipping.current.value) {
      // @ts-expect-error: ignore
      streetBilling.current.value = streetShipping.current.value;
      // @ts-expect-error: ignore
      streetBilling.current.focus();
    }
    // @ts-expect-error: ignore
    if (cityShipping.current.value) {
      // @ts-expect-error: ignore
      cityBilling.current.value = cityShipping.current.value;
      // @ts-expect-error: ignore
      cityBilling.current.focus();
    }
    // @ts-expect-error: ignore
    if (countryShipping.current.value) {
      // @ts-expect-error: ignore
      countryBilling.current.value = countryShipping.current.value;
      // @ts-expect-error: ignore
      countryBilling.current.focus();
    }
    // @ts-expect-error: ignore
    if (zipShipping.current.value) {
      // @ts-expect-error: ignore
      zipBilling.current.value = zipShipping.current.value;
      // @ts-expect-error: ignore
      zipBilling.current.focus();
    }
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Checkout | Jetzt ist die beste Zeit</title>
        </Head>
        <h1>Error</h1>
      </>
    );
  }

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
          {isLoading || isValidating ? (
            <Loader />
          ) : (
            <MDBValidation>
              <MDBRow>
                <MDBCol size="md">
                  <h2>Delivery address</h2>
                  <CheckoutForm
                    name="delivery"
                    data={data}
                    refs={[
                      nameShipping,
                      streetShipping,
                      cityShipping,
                      countryShipping,
                      zipShipping,
                    ]}
                  />
                </MDBCol>
                <MDBCol
                  size="md-1"
                  className="d-flex row-1 align-items-center justify-content-center align-content-center"
                >
                  <MDBBtn
                    type="button"
                    color="info"
                    className="text-center mb-4"
                    onClick={handleClick}
                  >
                    <MDBIcon fas icon="angle-double-right d-none d-md-block" />
                    <MDBIcon fas icon="angle-double-down d-block d-md-none" />
                  </MDBBtn>
                </MDBCol>
                <MDBCol size="md">
                  <h2>Billing address</h2>
                  <CheckoutForm
                    name="billing"
                    data={data}
                    refs={[
                      nameBilling,
                      streetBilling,
                      cityBilling,
                      countryBilling,
                      zipBilling,
                    ]}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBBtn color="success">Submit</MDBBtn>
              </MDBRow>
            </MDBValidation>
          )}
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
