import { Product } from '@/types';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';

interface Props {
  product: Product;
  index: number;
  quantity: number;
}

export function ItemList({ product, index, quantity }: Props) {
  return (
    <tr>
      <td align="center">{index}</td>
      <td align="center">{product.name}</td>
      <td align="center">{quantity}</td>
      <td align="center">€{product.totalPrice}</td>
      <td align="center">€{product.totalPrice * quantity}</td>
    </tr>
  );
}
