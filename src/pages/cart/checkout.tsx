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
  MDBInput,
  MDBValidationItem,
} from 'mdb-react-ui-kit';
import Head from 'next/head';
import useSWR from 'swr';
import { CheckoutForm, Loader } from '@/components';
import React, { useContext, useRef } from 'react';
import { UserContext } from '@/context';
import { Order, Response } from '@/types';

export default function Checkout() {
  // @ts-expect-error: ignore
  const { id, login } = useContext(UserContext);
  const { data, error, isLoading, isValidating } = useSWR(
    'https://restcountries.com/v3.1/subregion/eu',
    fetcher
  );

  const email = useRef<HTMLInputElement>(null);
  const nameShipping = useRef<HTMLInputElement>(null);
  const streetShipping = useRef<HTMLInputElement>(null);
  const cityShipping = useRef<HTMLInputElement>(null);
  const countryShipping = useRef<HTMLInputElement>(null);
  const zipShipping = useRef<HTMLInputElement>(null);
  const nameBilling = useRef<HTMLInputElement>(null);
  const streetBilling = useRef<HTMLInputElement>(null);
  const cityBilling = useRef<HTMLInputElement>(null);
  const countryBilling = useRef<HTMLInputElement>(null);
  const zipBilling = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (
      nameShipping.current &&
      nameBilling.current &&
      nameShipping.current.value
    ) {
      nameBilling.current.value = nameShipping.current.value;
      nameBilling.current.focus();
    }
    if (
      streetShipping.current &&
      streetBilling.current &&
      streetShipping.current.value
    ) {
      streetBilling.current.value = streetShipping.current.value;
      streetBilling.current.focus();
    }
    if (
      cityShipping.current &&
      cityBilling.current &&
      cityShipping.current.value
    ) {
      cityBilling.current.value = cityShipping.current.value;
      cityBilling.current.focus();
    }
    if (
      countryShipping.current &&
      countryBilling.current &&
      countryShipping.current.value
    ) {
      countryBilling.current.value = countryShipping.current.value;
      countryBilling.current.focus();
    }
    if (
      zipShipping.current &&
      zipBilling.current &&
      zipShipping.current.value
    ) {
      zipBilling.current.value = zipShipping.current.value;
      zipBilling.current.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();

      if (id === '') {
        const resRegisterAnon = await fetch(
          'http://localhost:3001/auth/register-anon/',
          { credentials: 'include' }
        );
        const AnonData = await resRegisterAnon.json();
        if (AnonData.success) login(AnonData.user);
      }

      const resShippingAddress = fetch('http://localhost:3001/addresses/', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          street: streetShipping.current!.value,
          city: cityShipping.current!.value,
          name: nameShipping.current!.value,
          zip: zipShipping.current!.value,
          country: countryShipping.current!.value,
          fullName: nameShipping.current!.value,
          type: 'shipping',
        }),
      });
      const resBillingAddress = fetch('http://localhost:3001/addresses/', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          street: streetBilling.current!.value,
          city: cityBilling.current!.value,
          name: nameBilling.current!.value,
          zip: zipBilling.current!.value,
          country: countryBilling.current!.value,
          fullName: nameBilling.current!.value,
          type: 'billing',
        }),
      });

      const [shipAddress, billAddress] = await Promise.all([
        resShippingAddress,
        resBillingAddress,
      ]);

      const resOrder = await fetch('http://localhost:3001/orders/', {
        credentials: 'include',
      });
      const dataOrder: Response = await resOrder.json();
    } catch (err) {
      console.error(err);
    }
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
            <MDBValidation onSubmit={handleSubmit}>
              <MDBValidationItem
                className="mb-3 pb-1"
                invalid
                feedback="Email is required"
              >
                <MDBInput
                  type="email"
                  name="email"
                  label="Email"
                  ref={email}
                  required
                />
              </MDBValidationItem>
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
