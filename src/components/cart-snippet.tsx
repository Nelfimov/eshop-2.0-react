import { formatAsPrice } from '@/helpers';
import { Product } from '@/types';
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
}

export function CartSnippet({ products, total, count }: Props) {
  return (
    <MDBCard>
      <MDBCardHeader className="d-flex justify-content-between align-items-center">
        <h1>Cart overview</h1>
        <MDBBadge>{count}</MDBBadge>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBListGroup light>
          {products.map((item: Product) => (
            <MDBListGroupItem key={item.id}>
              <MDBRow>
                <MDBCol>{item.name}</MDBCol>
                <MDBCol align="right">{formatAsPrice(item.totalPrice)}</MDBCol>
              </MDBRow>
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      </MDBCardBody>
      <MDBCardFooter>
        <MDBRow>
          <MDBCol>Total items:</MDBCol>
          <MDBCol align="right">{formatAsPrice(total)}</MDBCol>
        </MDBRow>
      </MDBCardFooter>
      <MDBCardFooter>
        <MDBRow>
          <MDBCol>Total shipping:</MDBCol>
          <MDBCol align="right">{formatAsPrice(total)}</MDBCol>
        </MDBRow>
      </MDBCardFooter>
      <MDBCardFooter>
        <MDBRow>
          <MDBCol>Total:</MDBCol>
          <MDBCol align="right">{formatAsPrice(total)}</MDBCol>
        </MDBRow>
      </MDBCardFooter>
    </MDBCard>
  );
}
