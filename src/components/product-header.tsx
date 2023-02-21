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
import { Item, Product as IProduct } from '@/types';
import { addToCart } from '@/helpers';
import { useContext } from 'react';
import { CartContext } from '@/context';

interface Props {
  product: IProduct;
}

export function ProductHeader({ product }: Props) {
  const cart = useContext(CartContext);

  function isInCart() {
    return !!cart!.cartItems.find((item: Item) => item.id === product._id);
  }

  return (
    <MDBCardHeader>
      <MDBRow>
        <MDBCol className="position-relative" style={{ height: '400px' }}>
          <Image
            src={product.titleImage}
            fill
            style={{ objectFit: 'contain' }}
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
          {isInCart() ? (
            <MDBCol>
              <MDBRow>
                <MDBBtn
                  className="m-1"
                  color="success"
                  onClick={() => addToCart(product._id)}
                >
                  <MDBIcon className="me-1" icon="cart-plus" />
                  Add to cart
                </MDBBtn>
              </MDBRow>
            </MDBCol>
          ) : (
            <MDBBtn
              className="m-1"
              color="success"
              onClick={() => addToCart(product._id)}
            >
              <MDBIcon className="me-1" icon="cart-plus" />
              Add to cart
            </MDBBtn>
          )}
        </MDBCol>
      </MDBRow>
    </MDBCardHeader>
  );
}
