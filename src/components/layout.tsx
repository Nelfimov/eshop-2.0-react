import { MDBContainer } from 'mdb-react-ui-kit';
import { PropsWithChildren } from 'react';
import { Navbar, Footer } from './index';

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>
        <MDBContainer className="mt-5 mb-3">{children}</MDBContainer>
      </main>
      <Footer />
    </>
  );
}
