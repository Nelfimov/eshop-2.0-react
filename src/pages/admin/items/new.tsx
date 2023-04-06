import { formatAsPrice } from '@/helpers';
import { useNotification } from '@/hooks';
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
  MDBTypography,
} from 'mdb-react-ui-kit';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';

export default function NewItem() {
  const notification = useNotification();
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

    notification?.open('Success', 'Product has been created');
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
          <MDBRow>
            <MDBCol md={3}>
              <MDBInput
                className="mb-4"
                label="Price"
                type="number"
                name="price"
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md={3}>
              <MDBInput
                className="mb-4"
                label="Discount"
                type="number"
                name="discount"
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md={3}>
              <MDBInput
                className="mb-4"
                label="Delivery cost"
                type="number"
                name="delivery"
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol>
              {formData.discount === '0' || formData.discount === '' ? (
                <h3 className="m-0 text-end">
                  <MDBTypography>
                    {formatAsPrice(calculateTotalPrice)}
                  </MDBTypography>
                </h3>
              ) : (
                <MDBRow>
                  <MDBCol>
                    <MDBTypography className="fw-bold fs-5" tag="s">
                      {formatAsPrice(
                        calculateTotalPrice + Number(formData.discount)
                      )}
                    </MDBTypography>
                  </MDBCol>
                  <MDBCol>
                    <MDBTypography
                      className="fw-bold fs-5"
                      style={{ color: 'red' }}
                    >
                      {formatAsPrice(calculateTotalPrice)}
                    </MDBTypography>
                  </MDBCol>
                </MDBRow>
              )}
            </MDBCol>
          </MDBRow>
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
          <MDBRow>
            <MDBBtn
              size="lg"
              disabled={Object.values(formData).some((i) => i === '')}
            >
              Submit
            </MDBBtn>
          </MDBRow>
        </MDBCardFooter>
      </form>
    </MDBCard>
  );
}
