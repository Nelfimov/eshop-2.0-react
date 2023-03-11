import { fetcherGetUnauthorized } from '@/helpers';
import Head from 'next/head';
import useSWR from 'swr';
import { CheckoutForm, Loader } from '@/components';
import { useContext, useRef, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@/context';
import { Response } from '@/types';
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
import { userAgent } from 'next/server';

export default function Checkout() {
  const router = useRouter();
  const user = useContext(UserContext);
  const { data, error, isLoading, isValidating } = useSWR(
    'https://restcountries.com/v3.1/subregion/eu',
    fetcherGetUnauthorized
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

  async function handleSubmit(e: FormEvent) {
    try {
      e.preventDefault();

      if (user?.id === '') {
        const resRegisterAnon = await fetch(
          'http://localhost:3001/auth/register-anon/',
          { credentials: 'include' }
        );
        const AnonData = await resRegisterAnon.json();
        if (AnonData.success) user.login(AnonData.user);
      }

      const resShippingAddress = (
        await fetch('http://localhost:3001/addresses/', {
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
        })
      ).json();
      const resBillingAddress = (
        await fetch('http://localhost:3001/addresses/', {
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
        })
      ).json();

      const [shipAddress, billAddress]: Response[] = await Promise.all([
        resShippingAddress,
        resBillingAddress,
      ]);

      const order: Response = await (
        await fetch('http://localhost:3001/orders/', {
          credentials: 'include',
        })
      ).json();
      if (!order.success) return console.error(order);

      const resOrderAddress: Response = await (
        await fetch(`http://localhost:3001/orders/${order.order?.id}/address`, {
          method: 'PATCH',
          credentials: 'include',
          body: JSON.stringify({
            shippingAddress: shipAddress.address,
            billingAddress: billAddress.address,
          }),
        })
      ).json();
      if (!resOrderAddress.success) return console.error(resOrderAddress);
      router.push('/cart/checkout/payment');
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
                  value={user?.email ?? ''}
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
