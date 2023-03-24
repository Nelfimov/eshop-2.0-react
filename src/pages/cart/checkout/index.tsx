import {
  addAddressesToOrder,
  checkFields,
  copyShippingToBilling,
  createAddress,
  fetcherGetAuthorized,
  fetcherGetUnauthorized,
  registerAnonUser,
} from '@/helpers';
import Head from 'next/head';
import useSWR from 'swr';
import { CheckoutForm, CheckoutModal, Loader } from '@/components';
import {
  useContext,
  useRef,
  FormEvent,
  useState,
  SetStateAction,
  Dispatch,
  useMemo,
} from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@/context';
import { Order, Response } from '@/types';
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

export default function Checkout() {
  const router = useRouter();
  const user = useContext(UserContext);
  const [modalOrderWithAddress, setModalOrderWithAddress] = useState(false);
  const [modalPreviousAddress, setModalPreviousAddress] = useState(false);
  const toggleShow = (
    action: Dispatch<SetStateAction<boolean>>,
    state: boolean
  ) => action(!state);
  const countriesList = useSWR(
    'https://restcountries.com/v3.1/subregion/eu',
    fetcherGetUnauthorized
  );
  const order = useSWR('http://localhost:3001/orders/', fetcherGetAuthorized);
  const address = useSWR(
    'http://localhost:3001/addresses/',
    fetcherGetAuthorized
  );

  useMemo(() => {
    if (!address.isLoading && address.data && address.data.success) {
      if (address.data.addresses.length > 0) {
        setModalPreviousAddress(true);
      }
    }
  }, [address.isLoading]);

  useMemo(() => {
    if (order.isLoading || !order.data || order.error || !order.data.success)
      return;
    const loadedOrder: Order = order.data.order;
    if (loadedOrder.addressShipping && loadedOrder.addressBilling)
      setModalOrderWithAddress(true);
  }, [order.isLoading]);

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
    const source = [
      nameShipping,
      streetShipping,
      cityShipping,
      countryShipping,
      zipShipping,
    ];
    const target = [
      nameBilling,
      streetBilling,
      cityBilling,
      countryBilling,
      zipBilling,
    ];
    for (let [index, value] of source.entries())
      copyShippingToBilling(value, target[index]);
  }

  async function handleSubmit(e: FormEvent) {
    try {
      e.preventDefault();
      if (!order.data) return console.error(order);
      if (
        !checkFields([
          email,
          nameShipping,
          streetShipping,
          cityShipping,
          countryShipping,
          zipShipping,
          nameBilling,
          streetBilling,
          cityBilling,
          countryBilling,
          zipBilling,
        ])
      )
        return;

      if (user?.id === '') {
        const reg = await registerAnonUser(user);
        if (!reg) return;
      }

      const [shippingAddress, billingAddress]: Response[] = await Promise.all([
        createAddress({
          type: 'billing',
          street: streetBilling.current!.value,
          city: cityBilling.current!.value,
          country: countryBilling.current!.value,
          email: email.current!.value,
          fullName: nameBilling.current!.value,
          zip: zipBilling.current!.value,
        }),
        createAddress({
          type: 'shipping',
          street: streetShipping.current!.value,
          city: cityShipping.current!.value,
          country: countryShipping.current!.value,
          email: email.current!.value,
          fullName: nameShipping.current!.value,
          zip: zipShipping.current!.value,
        }),
      ]);

      const orderID: string = order.data.order._id;

      const result = await addAddressesToOrder(
        orderID,
        shippingAddress.address!,
        billingAddress.address!
      );

      if (!result.success) return console.error(result.message);
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
      <CheckoutModal
        action={() =>
          toggleShow(setModalOrderWithAddress, modalOrderWithAddress)
        }
        show={modalOrderWithAddress}
        redirect={() => router.push('/cart/checkout/payment')}
      />
      <CheckoutModal
        action={() => toggleShow(setModalPreviousAddress, modalPreviousAddress)}
        show={modalPreviousAddress}
        redirect={() => router.push('/cart/checkout/payment')}
      />
      <MDBCard>
        <MDBCardHeader>
          <h1>Checkout</h1>
        </MDBCardHeader>
        <MDBCardBody>
          {countriesList.isLoading || countriesList.isValidating ? (
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
                    data={countriesList.data}
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
                    data={countriesList.data}
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
