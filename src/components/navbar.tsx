import Link from 'next/link';
import {
  MDBContainer,
  MDBIcon,
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
              <MDBIcon className="me-1" icon="home" />
              Home
            </Link>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <Link href="/products" className="nav-link">
              <MDBIcon className="me-1" icon="book-open" />
              Catalogue
            </Link>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <Link href="/cart" className="nav-link">
              <MDBIcon className="me-1" icon="shopping-cart" />
              Cart
            </Link>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <Link href="/auth" className="nav-link">
              <MDBIcon className="me-1" icon="sign-in-alt" />
              Authorize
            </Link>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
}
