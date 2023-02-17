import useSWR from 'swr';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetcher } from '@/helpers';
import Head from 'next/head';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { Product as IProduct } from 'types';

export default function Product() {
  const router = useRouter();
  const { data, error } = useSWR(
    `http://localhost:3001/products/${router.query.id}`,
    fetcher
  );
  const product: IProduct = data && data.product;

  return (
    <>
      <Head>
        <title>{`${router.query.name} | Jetzt ist die beste Zeit Online Shop`}</title>
      </Head>
      <MDBCard>
        {error && <h1>Product not found</h1>}
        {!product ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <MDBCardHeader>
              <MDBRow>
                <MDBCol>
                  <Image
                    src={product.titleImage}
                    width={300}
                    height={500}
                    alt={`${product.name}-title-image`}
                  />
                </MDBCol>
                <MDBCol
                  size="md"
                  className="d-flex flex-column justify-content-center"
                >
                  <MDBCardTitle>{product.name}</MDBCardTitle>
                  {product.discount > 0 ? (
                    <>
                      <MDBCardTitle>
                        <s>
                          €{(product.price + product.deliveryPrice).toFixed(2)}
                        </s>
                        <MDBTypography color="danger">
                          €{product.totalPrice.toFixed(2)}
                        </MDBTypography>
                      </MDBCardTitle>
                    </>
                  ) : (
                    <MDBCardTitle>
                      €{product.totalPrice.toFixed(2)}
                    </MDBCardTitle>
                  )}
                  <MDBCardText>{product.description}</MDBCardText>
                  <MDBBtn className="m-1" color="success">
                    Add to cart
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                {product.subImages.map((image, index) => {
                  return (
                    <MDBCol size="sm" key={index}>
                      <Image
                        src={image}
                        alt={`${product.name}-sub-image-${index}`}
                        width={300}
                        height={500}
                      />
                    </MDBCol>
                  );
                })}
              </MDBRow>
            </MDBCardBody>
          </>
        )}
      </MDBCard>
    </>
  );
}
