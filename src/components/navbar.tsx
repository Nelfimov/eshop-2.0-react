import Link from 'next/link';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,
} from 'mdb-react-ui-kit';

export function Navbar() {
  return (
    <MDBNavbar expand="md" bgColor="light">
      <MDBContainer>
        <MDBNavbarBrand href="/">Jetzt ist die beste Zeit</MDBNavbarBrand>
        <MDBNavbarNav right fullWidth={false} className="gap-3">
          <MDBNavbarItem>
            <Link href="/">Home</Link>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <Link href="/products">Catalogue</Link>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
}
