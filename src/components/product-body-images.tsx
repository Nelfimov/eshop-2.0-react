import Image from 'next/image';
import { MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Product as IProduct } from 'types';

interface Props {
  product: IProduct;
}

export function ProductBodyImages({ product }: Props) {
  return (
    <MDBCardBody>
      <MDBRow>
        {product.subImages.map((image, index) => {
          return (
            <MDBCol size="sm" key={index}>
              <Image
                src={image}
                alt={`${product.name}-sub-image-${index}`}
                width={300}
                height={500}
              />
            </MDBCol>
          );
        })}
      </MDBRow>
    </MDBCardBody>
  );
}
