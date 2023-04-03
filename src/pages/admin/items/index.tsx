import { Loader } from '@/components';
import { fetcherGetAuthorized, formatAsPrice } from '@/helpers';
import { Product } from '@/types';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBTable,
  MDBTableHead,
  MDBInput,
  MDBTableBody,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';

export default function AdminItems() {
  const { data, error, isLoading, isValidating } = useSWR(
    process.env.backEndUrl + 'products',
    fetcherGetAuthorized
  );

  if (error)
    return (
      <>
        <Head>
          <title>Cart | Jetzt ist die beste Zeit</title>
        </Head>
        <h1>Failed to load cart</h1>
      </>
    );

  return (
    <>
      <Head>
        <title>Admin | Items | Jetzt ist die beste Zeit</title>
      </Head>
      <MDBCard>
        <MDBCardHeader>
          <h1>Items</h1>
        </MDBCardHeader>
        <MDBCardBody>
          {isLoading || isValidating ? (
            <Loader />
          ) : (
            <>
              <MDBInput label="Search" className="mb-3" />
              <MDBTable responsive="sm" striped hover align="middle">
                <MDBTableHead light>
                  <tr>
                    <th scope="col" style={{ width: '30px' }}>
                      <MDBCheckbox />
                    </th>
                    <th
                      scope="col"
                      style={{ width: '50px', padding: 'auto 0' }}
                    >
                      id
                    </th>
                    <th scope="col">Name</th>
                    <th style={{ textAlign: 'right' }} scope="col">
                      On stock
                    </th>
                    <th style={{ textAlign: 'right' }} scope="col">
                      Price
                    </th>
                    <th style={{ textAlign: 'right' }} scope="col">
                      Delivery cost
                    </th>
                    <th style={{ textAlign: 'right' }} scope="col">
                      Discount
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {data &&
                    data.products.map((product: Product) => (
                      <tr key={product._id}>
                        <td>
                          <MDBCheckbox />
                        </td>
                        <td>
                          <Link href={`/products/${product._id}`}>
                            {product._id}
                          </Link>
                        </td>
                        <td>
                          <Link href={`/products/${product._id}`}>
                            {product.name}
                          </Link>
                        </td>
                        <td align="right">{product.quantityOnStock}</td>
                        <td align="right">{formatAsPrice(product.price)}</td>
                        <td align="right">
                          {formatAsPrice(product.deliveryPrice)}
                        </td>
                        <td align="right">{formatAsPrice(product.discount)}</td>
                      </tr>
                    ))}
                </MDBTableBody>
              </MDBTable>
            </>
          )}
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
