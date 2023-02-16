import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
} from 'mdb-react-ui-kit';

export function ProductCard(product: any) {
  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardImage
          src={product.titleImage}
          alt={`${product.name}-title-image`}
        />
        <MDBCardTitle>{product.name}</MDBCardTitle>
        <MDBCardTitle>{product.price}</MDBCardTitle>
      </MDBCardBody>
    </MDBCard>
  );
}
