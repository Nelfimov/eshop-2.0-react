import { MDBContainer, MDBFooter } from 'mdb-react-ui-kit';
import Link from 'next/link';

export function Footer() {
  return (
    <MDBFooter bgColor="secondary">
      <MDBContainer className="text-center p-3">
        <Link className="text-light" href="https://github.com/nelfimov/">
          GitHub
        </Link>
      </MDBContainer>
    </MDBFooter>
  );
}
