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
        <MDBNavbarBrand href="/">JETZT IST DIE BESTE ZEIT</MDBNavbarBrand>
        <MDBNavbarNav right fullWidth={false}>
          <MDBNavbarItem>
            <Link href="/" className="nav-link">
              Home
            </Link>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <Link href="/products" className="nav-link">
              Catalogue
            </Link>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
}
