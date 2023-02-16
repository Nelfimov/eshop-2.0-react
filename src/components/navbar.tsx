import Link from 'next/link';

export function Navbar() {
  return (
    <div className="Navbar">
      <Link href="/">Home</Link>
      <Link href="/products">Catalogue</Link>
    </div>
  );
}
