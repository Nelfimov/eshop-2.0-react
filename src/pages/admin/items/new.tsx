import { formatAsPrice } from '@/helpers';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCol,
  MDBInput,
  MDBRow,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';

export default function NewItem() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    delivery: '',
    stock: '',
    titleImage: '',
    otherImages: '',
  });

  const calculateTotalPrice = useMemo(
    () =>
      Number(formData.price) -
      Number(formData.discount) +
      Number(formData.delivery),

    [formData.price, formData.discount, formData.delivery]
  );

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <MDBCard>
      <form onSubmit={handleSubmit}>
        <MDBCardHeader>
          <h1>Create new item form</h1>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBInput
            className="mb-4"
            label="Name"
            type="text"
            name="name"
            onChange={handleChange}
          />
          <MDBTextArea
            className="mb-4"
            label="Description"
            name="description"
            onChange={handleChange}
          />
          <MDBInput
            className="mb-4"
            label="Price"
            type="number"
            name="price"
            onChange={handleChange}
          />
          <MDBInput
            className="mb-4"
            label="Discount"
            type="number"
            name="discount"
            onChange={handleChange}
          />
          <MDBInput
            className="mb-4"
            label="Delivery cost"
            type="number"
            name="delivery"
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <label htmlFor="title-image">Title image: </label>
          <MDBInput
            className="mb-4"
            type="file"
            name="titleImage"
            onChange={handleChange}
          />
          <label htmlFor="title-image">Other images: </label>
          <MDBInput
            type="file"
            name="otherImages"
            onChange={handleChange}
            multiple
          />
        </MDBCardBody>
        <MDBCardFooter>
          <MDBRow center>
            <MDBCol size={6}>
              <MDBBtn
                size="lg"
                disabled={Object.values(formData).some((i) => i === '')}
              >
                Submit
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCardFooter>
      </form>
    </MDBCard>
  );
}
