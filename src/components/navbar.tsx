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
  MDBInput,
  MDBBtn,
  MDBBadge,
} from 'mdb-react-ui-kit';
import { useContext, useState } from 'react';
import { CartContext } from '@/context';

export function Navbar() {
  const [showNavToggler, setShowNavToggler] = useState(false);
  const cart = useContext(CartContext);

  return (
    <MDBNavbar fixed="top" expand="lg" light bgColor="light">
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
                <MDBBadge
                  color="danger"
                  className={cart!.itemCount > 0 ? 'visible' : 'invisible'}
                >
                  {cart!.itemCount}
                </MDBBadge>
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
            <MDBNavbarItem>
              <form className="d-flex input-group w-auto">
                <MDBInput type="text" label="Search" id="search" />
                <MDBBtn color="primary">
                  <MDBIcon icon="search" />
                </MDBBtn>
              </form>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
