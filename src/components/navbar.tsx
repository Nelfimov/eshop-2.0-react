import Link from 'next/link';
import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarToggler,
} from 'mdb-react-ui-kit';
import { useState } from 'react';

export function Navbar() {
  const [showNavToggler, setShowNavToggler] = useState(false);

  return (
    <MDBNavbar expand="md" light bgColor="light">
      <MDBContainer>
        <MDBNavbarBrand href="#">JETZT IST DIE BESTE ZEIT</MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavToggler(!showNavToggler)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavToggler}>
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
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
