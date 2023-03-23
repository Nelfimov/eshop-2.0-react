/* eslint-disable react-hooks/exhaustive-deps */
import { fetcherGetAuthorized, fetcherGetUnauthorized } from '@/helpers';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  ShippingInfo,
  PurchaseItem,
} from '@paypal/paypal-js/types/apis/orders';
import Head from 'next/head';
import useSWR from 'swr';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/context';
import { CartSnippet, Loader } from '@/components';
import { Address, Product } from '@/types';
import { useRouter } from 'next/router';

export default function Payment() {
  const router = useRouter();
  const [{ isPending }] = usePayPalScriptReducer();
  const cart = useContext(CartContext);
  const [cartItems, setCartItems] = useState<PurchaseItem[]>([]);
  const [shippingDetails, setShippingDetails] = useState<ShippingInfo>();

  const order = useSWR('http://localhost:3001/orders/', fetcherGetAuthorized);
  const products = useSWR(
    `http://localhost:3001/products?ids=${JSON.stringify(
      cart!.cartItems.map((item) => item.id)
    )}`,
    fetcherGetUnauthorized
  );

  useEffect(() => {
    if (order.isLoading || !order.data || !order.data.success) return;
    const orderAddress: Address | undefined = order.data.order.addressShipping;
    if (!orderAddress) return;
    setShippingDetails({
      type: 'SHIPPING',
      email_address: orderAddress.email,
      name: {
        full_name: orderAddress.fullName,
      },
      address: {
        country_code: orderAddress.country,
        address_line_1: orderAddress.street,
        admin_area_2: orderAddress.city,
        postal_code: orderAddress.zip,
      },
    });
  }, [order.isLoading]);

  useEffect(() => {
    if (products.isLoading || !products.data || !products.data.success) return;
    cart!.updatePrices(products.data.products);

    let result: PurchaseItem[] = [];

    products.data.products.forEach((item: Product) => {
      const quantity =
        cart!.cartItems.find((_) => item.id === _.id)?.quantity.toString() ??
        '0';

      result.push({
        name: item.name,
        quantity,
        unit_amount: {
          value: item.totalPrice.toString(),
          currency_code: 'EUR',
        },
        category: 'PHYSICAL_GOODS',
      });
    });

    setCartItems(result);
  }, [order.isLoading]);

  if (!order || products.error) {
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
              {isPending ? (
                <Loader />
              ) : (
                <PayPalButtons
                  forceReRender={[cart!.totalCart]}
                  createOrder={(data, action) => {
                    return action.order
                      .create({
                        application_context: {
                          shipping_preference: 'SET_PROVIDED_ADDRESS',
                        },
                        intent: 'CAPTURE',
                        purchase_units: [
                          {
                            amount: {
                              value: cart!.totalCart.toString(),
                              breakdown: {
                                item_total: {
                                  value: cart!.totalItems.toString(),
                                  currency_code: 'EUR',
                                },
                                shipping: {
                                  value: cart!.totalShippings.toString(),
                                  currency_code: 'EUR',
                                },
                                discount: {
                                  value: cart!.totalDiscounts.toString(),
                                  currency_code: 'EUR',
                                },
                              },
                            },
                            items: cartItems,
                            shipping: shippingDetails,
                            description: 'Antique toys',
                          },
                        ],
                      })
                      .then((orderID) => orderID);
                  }}
                  onApprove={(data, actions) => {
                    return actions.order!.capture().then(async (res) => {
                      const responsePayment = await (
                        await fetch('http://localhost:3001/payments/', {
                          credentials: 'include',
                          headers: {
                            'content-type': 'application/json',
                          },
                          method: 'POST',
                          body: JSON.stringify({
                            transactionID: res.id,
                            type: 'paypal',
                          }),
                        })
                      ).json();
                      if (responsePayment.success) {
                        const responseGetOrder = await (
                          await fetch('http://localhost:3001/orders/', {
                            credentials: 'include',
                          })
                        ).json();
                        await fetch(
                          `http://localhost:3001/orders/${responseGetOrder.order._id}/payment`,
                          {
                            method: 'PATCH',
                            headers: {
                              'content-type': 'application/json',
                            },
                            credentials: 'include',
                            body: JSON.stringify({
                              paymentID: responsePayment.payment._id,
                            }),
                          }
                        );
                        await fetch(
                          `http://localhost:3001/orders/${responseGetOrder.order._id}/items`,
                          {
                            method: 'PATCH',
                            headers: {
                              'content-type': 'application/json',
                            },
                            credentials: 'include',
                            body: JSON.stringify({
                              cartItems: cart?.cartItems.map((item) => {
                                return { id: item.id, quantity: item.quantity };
                              }),
                            }),
                          }
                        );
                        await fetch(
                          `http://localhost:3001/orders/${responseGetOrder.order._id}/ordered`,
                          {
                            credentials: 'include',
                            method: 'PATCH',
                          }
                        );
                        cart!.clearCart();
                        router.push('/');
                      }
                    });
                  }}
                  onCancel={(data, actions) => {
                    return actions.redirect();
                  }}
                  disabled={!shippingDetails || cart!.totalCart === 0}
                />
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol size={4}>
          {products.data && (
            <CartSnippet
              products={products.data.products}
              total={cart!.totalCart.toString()}
              count={cart!.itemCount}
              cart={cart!}
            />
          )}
        </MDBCol>
      </MDBRow>
    </>
  );
}
