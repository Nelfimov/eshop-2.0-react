import { Product } from '@/types';
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';

interface Props {
  products: Product[];
  total: string;
}

export function CartSnippet({ products, total }: Props) {
  return (
    <MDBCard>
      <MDBCardHeader>
        <h1>Cart overview</h1>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBListGroup light>
          {products.map((item: Product) => {
            return (
              <MDBListGroupItem key={item.id}>
                {item.name}: {item.totalPrice}
              </MDBListGroupItem>
            );
          })}
        </MDBListGroup>
      </MDBCardBody>
      <MDBCardFooter>Total amount: {total}</MDBCardFooter>
    </MDBCard>
  );
}
