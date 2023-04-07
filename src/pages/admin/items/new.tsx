import { formatAsPrice } from '@/helpers';
import { useNotification } from '@/hooks';
import { Response } from '@/types';
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
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import imageCompression from 'browser-image-compression';

export default function NewItem() {
  const notification = useNotification();
  const router = useRouter();
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (Object.values(formData).some((i) => i === '')) {
      notification.open('Failure', 'Form is not filled fully', 'error');
    }

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const data: Response = await (
      await fetch(process.env.BACKEND_URL! + 'products', {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify(formData),
      })
    ).json();

    if (data.success) {
      notification.open('Success', 'Product has been created');
      return router.push(`/products/${data.product?._id}`);
    }
    notification.open(
      'Failure',
      data.message ?? 'Could not create new product',
      'error'
    );
  }

  return (
    <>
      <Head>
        <title>Create new product | Jetzt ist die beste Zeit</title>
      </Head>
      <MDBCard>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            <hr className="d-sm-block d-md-none" />
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
            <hr className="d-sm-block d-md-none" />
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
    </>
  );
}
