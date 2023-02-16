import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
} from 'mdb-react-ui-kit';
import Link from 'next/link';

export function ProductCard({ product }: any) {
  return (
    <MDBCard className="m-0 h-100">
      <Link href={`/products/${product._id}`}>
        <MDBCardBody>
          <MDBCardImage
            src={product.titleImage}
            alt={`${product.name}-title-image`}
            position="top"
          />
          <MDBCardTitle>{product.name}</MDBCardTitle>
          <MDBCardTitle>{product.price}</MDBCardTitle>
        </MDBCardBody>
      </Link>
    </MDBCard>
  );
}
