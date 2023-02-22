import { MDBBtn, MDBCard, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import Link from 'next/link';
import Head from 'next/head';

export default function Cart() {
  return (
    <>
      <Head>
        <title>Cart | Jetzt ist die beste Zeit</title>
      </Head>
      <MDBCard className="p-3">
        <h1>Cart</h1>
        <MDBRow>
          <MDBCol>#</MDBCol>
          <MDBCol>Name</MDBCol>
          <MDBCol>Quantity</MDBCol>
          <MDBCol>Total amount</MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <Link href="/">
              <MDBBtn color="secondary">Continue shopping</MDBBtn>
            </Link>
          </MDBCol>
          <MDBCol>
            <Link href="/cart/checkout">
              <MDBBtn color="success">To checkout</MDBBtn>
            </Link>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </>
  );
}
