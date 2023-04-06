import { checkFields, formatAsPrice } from '@/helpers';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBInput,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { FormEvent, useMemo, useState } from 'react';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
  price: HTMLInputElement;
  delivery: HTMLInputElement;
  discount: HTMLInputElement;
  stock: HTMLInputElement;
  totalImage: HTMLInputElement;
  otherImages: HTMLInputElement;
}
interface CustomFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function NewItem() {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [delivery, setDelivery] = useState(0);

  const calculateTotalPrice = useMemo(
    () => Number(price) - Number(discount) + Number(delivery),
    [price, discount, delivery]
  );

  function handleSubmit(e: FormEvent<CustomFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const formData: { [key: string]: string | File | File[] } = {};
    data.forEach((value, key) => (formData[key] = value));

    console.log(formData);
  }

  return (
    <MDBCard>
      <MDBCardHeader>
        <h1>Create new item form</h1>
      </MDBCardHeader>
      <MDBCardBody>
        <form onSubmit={handleSubmit}>
          <MDBInput
            className="mb-4"
            label="Name"
            type="text"
            name="name"
            id="name"
          />
          <MDBTextArea
            className="mb-4"
            label="Description"
            name="description"
            id="description"
          />
          <MDBInput
            className="mb-4"
            label="Price"
            type="number"
            name="price"
            id="price"
            onChange={(e) => setPrice(Number(e.currentTarget.value))}
          />
          <MDBInput
            className="mb-4"
            label="Discount"
            type="number"
            name="discount"
            id="discount"
            onChange={(e) => setDiscount(Number(e.currentTarget.value))}
          />
          <MDBInput
            className="mb-4"
            label="Delivery cost"
            type="number"
            name="delivery"
            id="delivery"
            onChange={(e) => setDelivery(Number(e.currentTarget.value))}
          />
          <MDBInput
            className="mb-4"
            label="Total price"
            disabled
            value={formatAsPrice(calculateTotalPrice)}
          />
          <MDBInput
            className="mb-4"
            label="Stock"
            type="number"
            name="stock"
            id="stock"
          />
          <label htmlFor="title-image">Title image: </label>
          <MDBInput
            className="mb-4"
            type="file"
            name="titleImage"
            id="title-image"
          />
          <label htmlFor="title-image">Other images: </label>
          <MDBInput
            className="mb-4"
            type="file"
            name="otherImages"
            id="other-images"
            multiple
          />
          <MDBBtn size="lg">Submit</MDBBtn>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
}
