import { Product } from '@/types';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';

interface Props {
  product: Product;
  index: number;
  quantity: number;
}

export function ItemList({ product, index, quantity }: Props) {
  return (
    <MDBRow>
      <MDBCol>{index}</MDBCol>
      <MDBCol>{product.name}</MDBCol>
      <MDBCol>{quantity}</MDBCol>
      <MDBCol>€{product.totalPrice * quantity}</MDBCol>
    </MDBRow>
  );
}
