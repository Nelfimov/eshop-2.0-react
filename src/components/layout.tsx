import { MDBContainer } from 'mdb-react-ui-kit';
import { PropsWithChildren } from 'react';
import { Navbar, Footer } from './index';

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>
        <MDBContainer>{children}</MDBContainer>
      </main>
      <Footer />
    </>
  );
}
