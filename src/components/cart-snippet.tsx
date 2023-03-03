import { formatAsPrice } from '@/helpers';
import { Cart, Product } from '@/types';
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBCol,
  MDBBadge,
} from 'mdb-react-ui-kit';

interface Props {
  products: Product[];
  total: string;
  count: number;
  cart: Cart;
}

export function CartSnippet({ products, cart }: Props) {
  const totalShipping = products.reduce((total, current) => {
    const q = cart.cartItems.find((item) => item.id === current.id)?.quantity;
    return total + current.deliveryPrice * (q ?? 0);
  }, 0);
  const totalItems = products.reduce((total, current) => {
    const q = cart.cartItems.find((item) => item.id === current.id)?.quantity;
    return total + current.price * (q ?? 0);
  }, 0);
  const totalDiscount = products.reduce((total, current) => {
    const q = cart.cartItems.find((item) => item.id === current.id)?.quantity;
    return total + current.discount * (q ?? 0);
  }, 0);
  return (
    <MDBCard>
      <MDBCardHeader className="d-flex justify-content-between align-items-center">
        <h1>Cart overview</h1>
        <MDBBadge>
          <h3 className="mb-0">{cart.itemCount}</h3>
        </MDBBadge>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBListGroup light>
          {products.map((product: Product) => (
            <MDBListGroupItem key={product.id}>
              <MDBRow>
                <MDBCol className="d-flex align-items-center">
                  <MDBBadge className="me-2">
                    <h6 className="mb-0">
                      {
                        cart.cartItems.find((item) => item.id === product.id)
                          ?.quantity
                      }
                    </h6>
                  </MDBBadge>
                  {product.name}
                </MDBCol>
                <MDBCol align="right">
                  {formatAsPrice(
                    product.price *
                      cart.cartItems.find((item) => item.id === product.id)!
                        .quantity
                  )}
                </MDBCol>
              </MDBRow>
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      </MDBCardBody>
      <MDBCardFooter>
        <MDBRow>
          <MDBCol>
            <h6 className="mb-0">Total items:</h6>
          </MDBCol>
          <MDBCol align="right">
            <h6 className="mb-0">{formatAsPrice(totalItems)}</h6>
          </MDBCol>
        </MDBRow>
      </MDBCardFooter>
      <MDBCardFooter>
        <MDBRow>
          <MDBCol>
            <h6 className="mb-0">Total shipping:</h6>
          </MDBCol>
          <MDBCol align="right">
            <h6 className="mb-0">+ {formatAsPrice(totalShipping)}</h6>
          </MDBCol>
        </MDBRow>
      </MDBCardFooter>
      <MDBCardFooter>
        <MDBRow>
          <MDBCol>
            <h6 className="mb-0">Total discount:</h6>
          </MDBCol>
          <MDBCol align="right">
            <h6 className="mb-0">- {formatAsPrice(totalDiscount)}</h6>
          </MDBCol>
        </MDBRow>
      </MDBCardFooter>
      <MDBCardFooter>
        <MDBRow>
          <MDBCol>
            <h5>Total:</h5>
          </MDBCol>
          <MDBCol align="right">
            <h5>{formatAsPrice(cart.total)}</h5>
          </MDBCol>
        </MDBRow>
      </MDBCardFooter>
    </MDBCard>
  );
}
