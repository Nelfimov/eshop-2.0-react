import { fetcherGetAuthorized, fetcherGetUnauthorized } from '@/helpers';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import { PayPalButtons } from '@paypal/react-paypal-js';
import {
  PurchaseUnit,
  PurchaseItem,
} from '@paypal/paypal-js/types/apis/orders';
import Head from 'next/head';
import useSWR from 'swr';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/context';
import { CartSnippet } from '@/components';
import { Product } from '@/types';

export default function Payment() {
  const cart = useContext(CartContext);
  const [cartItems, setCartItems] = useState<PurchaseItem[]>([]);
  const [itemCost, setItemCost] = useState<Number>(0);
  const [shippingCost, setShippingCost] = useState<Number>(0);
  const [discount, setDiscount] = useState<Number>(0);

  const order = useSWR('http://localhost:3001/orders/', fetcherGetAuthorized);
  const products = useSWR(
    `http://localhost:3001/products?ids=${JSON.stringify(
      cart!.cartItems.map((item) => item.id)
    )}`,
    fetcherGetUnauthorized
  );

  useEffect(() => {
    if (products.isLoading) return;
    cart!.updatePrices(products.data.products);

    let result: PurchaseItem[] = [];

    let shipping = 0;
    let discount = 0;
    let itemCost = 0;

    products.data.products.forEach((item: Product) => {
      const quantity =
        cart!.cartItems.find((_) => item.id === _.id)?.quantity.toString() ??
        '0';

      result.push({
        name: item.name,
        quantity,
        unit_amount: { value: item.totalPrice.toString() },
        category: 'PHYSICAL_GOODS',
      });
      shipping += item.deliveryPrice * Number(quantity);
      discount += item.discount * Number(quantity);
      itemCost += item.price * Number(quantity);
    });

    setShippingCost(shipping);
    setDiscount(discount);
    setItemCost(itemCost);
    setCartItems(result);
  }, []);

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
                forceReRender={[itemCost, shippingCost, discount, cart!.total]}
                createOrder={(data, action) => {
                  return action.order
                    .create({
                      purchase_units: [
                        {
                          amount: {
                            value: cart!.total.toString(),
                            breakdown: {
                              item_total: {
                                value: itemCost.toString(),
                                currency_code: 'EUR',
                              },
                              shipping: {
                                value: shippingCost.toString(),
                                currency_code: 'EUR',
                              },
                              discount: {
                                value: discount.toString(),
                                currency_code: 'EUR',
                              },
                            },
                          },
                          items: cartItems,
                        },
                      ],
                    })
                    .then((orderID) => orderID);
                }}
                onApprove={(data, actions) => {
                  return actions
                    .order!.capture()
                    .then((res) => console.log('Paypal order: ' + res.id));
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
