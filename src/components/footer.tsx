import { MDBContainer, MDBFooter } from 'mdb-react-ui-kit';
import Link from 'next/link';

export function Footer() {
  return (
    <MDBFooter bgColor="light">
      <MDBContainer className="text-center py-3">
        <Link href="https://github.com/nelfimov/">GitHub</Link>
      </MDBContainer>
    </MDBFooter>
  );
}
