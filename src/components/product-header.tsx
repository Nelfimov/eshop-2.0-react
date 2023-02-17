import Image from 'next/image';
import {
  MDBCardHeader,
  MDBRow,
  MDBCol,
  MDBCardTitle,
  MDBTypography,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { Product as IProduct } from '@/types';

interface Props {
  product: IProduct;
}

export function ProductHeader({ product }: Props) {
  return (
    <MDBCardHeader>
      <MDBRow>
        <MDBCol className="position-relative">
          <Image
            src={product.titleImage}
            // width={640}
            // height={480}
            fill
            alt={`${product.name}-title-image`}
          />
        </MDBCol>
        <MDBCol size="md" className="d-flex flex-column justify-content-center">
          <MDBCardTitle>{product.name}</MDBCardTitle>
          {product.discount > 0 ? (
            <>
              <MDBCardTitle>
                <s>€{(product.price + product.deliveryPrice).toFixed(2)}</s>
                <MDBTypography color="danger">
                  €{product.totalPrice.toFixed(2)}
                </MDBTypography>
              </MDBCardTitle>
            </>
          ) : (
            <MDBCardTitle>€{product.totalPrice.toFixed(2)}</MDBCardTitle>
          )}
          <MDBCardText>{product.description}</MDBCardText>
          <MDBBtn className="m-1" color="success">
            <MDBIcon className="me-1" icon="cart-plus" />
            Add to cart
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBCardHeader>
  );
}
