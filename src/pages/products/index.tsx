import useSWR from 'swr';

export default function Products(): JSX.Element {
  const { data, error } = useSWR('/products', fetch);

  if (error) {
    return <h1>Failed to load products</h1>;
  }
  if (!data) {
    return <h1>Loading...</h1>;
  }
  return <h1>When nothing to be loaded</h1>;
}
