import { MDBContainer } from 'mdb-react-ui-kit';
import { PropsWithChildren } from 'react';
import { Navbar, Footer } from './index';

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>
        <MDBContainer className="my-4">{children}</MDBContainer>
      </main>
      <Footer />
    </>
  );
}
