import { PropsWithChildren } from 'react';
import { Navbar, Footer } from './index';

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
