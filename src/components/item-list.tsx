import { CartContext } from '@/context';
import { Product } from '@/types';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { useContext } from 'react';

interface Props {
  product: Product;
  index: number;
  quantity: number;
}

export function ItemList({ product, index, quantity }: Props) {
  const cart = useContext(CartContext);

  return (
    <tr>
      <td align="center">{index}</td>
      <td align="center">{product.name}</td>
      <td align="center">
        <MDBBtn
          className="p-1 me-1"
          color="danger"
          onClick={() => cart?.decrease(product)}
        >
          <MDBIcon icon="minus" />
        </MDBBtn>
        {quantity}
        <MDBBtn
          className="p-1 ms-1"
          color="success"
          onClick={() => cart?.increase(product)}
        >
          <MDBIcon icon="plus" />
        </MDBBtn>
      </td>
      <td align="center">€{product.totalPrice}</td>
      <td align="center">€{product.totalPrice * quantity}</td>
    </tr>
  );
}
