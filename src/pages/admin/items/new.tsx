import { formatAsPrice } from '@/helpers';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBInput,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { useMemo, useState } from 'react';

export default function NewItem() {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [delivery, setDelivery] = useState(0);

  const calculateTotalPrice = useMemo(
    () => Number(price) - Number(discount) + Number(delivery),
    [price, discount, delivery]
  );

  return (
    <MDBCard>
      <MDBCardHeader>
        <h1>Create new item form</h1>
      </MDBCardHeader>
      <MDBCardBody>
        <form>
          <MDBInput className="mb-4" label="Name" type="text" name="name" />
          <MDBTextArea
            className="mb-4"
            label="Description"
            name="description"
          />
          <MDBInput
            className="mb-4"
            label="Price"
            type="number"
            name="price"
            onChange={(e) => setPrice(Number(e.currentTarget.value))}
          />
          <MDBInput
            className="mb-4"
            label="Discount"
            type="number"
            name="discount"
            onChange={(e) => setDiscount(Number(e.currentTarget.value))}
          />
          <MDBInput
            className="mb-4"
            label="Delivery cost"
            type="number"
            name="delivery"
            onChange={(e) => setDelivery(Number(e.currentTarget.value))}
          />
          <MDBInput
            className="mb-4"
            label="Total price"
            disabled
            type="text"
            value={formatAsPrice(calculateTotalPrice)}
          />
          <MDBInput className="mb-4" label="Stock" type="number" name="stock" />
          <label htmlFor="title-image">Title image: </label>
          <MDBInput className="mb-4" type="file" name="title-image" />
          <MDBBtn size="lg">Submit</MDBBtn>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
}
