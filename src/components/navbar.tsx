import Link from 'next/link';
import {
  MDBCollapse,
  MDBContainer,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBInput,
  MDBBtn,
  MDBBadge,
  MDBInputGroup,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';
import { useContext, useEffect, useState } from 'react';
import { CartContext, UserContext } from '@/context';
import { useRouter } from 'next/router';

export function Navbar() {
  const [showNavToggler, setShowNavToggler] = useState(false);
  const [mounted, setMounted] = useState(false);
  const user = useContext(UserContext);
  const cart = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <MDBNavbar fixed="top" expand="lg" light bgColor="light">
      <MDBContainer breakpoint="lg">
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
              <form className="d-flex w-auto">
                <MDBInputGroup>
                  <MDBBtn>
                    <MDBIcon icon="search" />
                  </MDBBtn>
                  <MDBInput type="text" label="Search" id="search" />
                </MDBInputGroup>
              </form>
            </MDBNavbarItem>
            {user?.isAdmin ? (
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    <MDBIcon icon="toolbox" className="me-1" size="lg" />
                    Admin
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>
                      <Link href="/admin/new-item" className="nav-link">
                        <MDBIcon fas icon="plus" className="me-1" size="lg" />
                        Create new item
                      </Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem link>Orders</MDBDropdownItem>
                    <MDBDropdownItem link>Create new item</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            ) : null}
            <MDBNavbarItem onClick={() => setShowNavToggler(false)}>
              <Link
                href="/"
                className={`nav-link ${
                  router.pathname === '/' ? 'active' : ''
                }`}
              >
                <MDBIcon className="me-1" icon="home" />
                Home
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem onClick={() => setShowNavToggler(false)}>
              <Link
                href="/products"
                className={`nav-link ${
                  router.pathname === '/products' ? 'active' : ''
                }`}
              >
                <MDBIcon className="me-1" icon="book-open" />
                Catalogue
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem onClick={() => setShowNavToggler(false)}>
              <Link
                href="/cart"
                className={`nav-link d-flex align-items-center ${
                  router.pathname === '/cart' ? 'active' : ''
                }`}
              >
                {cart!.itemCount > 0 ? (
                  <MDBBadge color="danger">{cart!.itemCount}</MDBBadge>
                ) : null}
                <MDBIcon className="me-1" icon="shopping-cart" />
                Cart
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem onClick={() => setShowNavToggler(false)}>
              {user!.id === '' ? (
                <Link
                  href="/auth"
                  className={`nav-link ${
                    router.pathname === '/auth' ? 'active' : ''
                  }`}
                >
                  <MDBIcon className="me-1" icon="sign-in-alt" />
                  Authorize
                </Link>
              ) : (
                <Link
                  href=""
                  onClick={async () => {
                    const response = await fetch(
                      'http://localhost:3001/auth/logout',
                      {
                        credentials: 'include',
                      }
                    );
                    const data = await response.json();
                    if (data.success) user!.logout();
                  }}
                  className={`nav-link ${
                    router.pathname === '/auth' ? 'active' : ''
                  }`}
                >
                  <MDBIcon className="me-1" icon="sign-in-alt" />
                  Logout
                </Link>
              )}
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
