import { fetcher } from '@/helpers';
import { MDBCard, MDBCardHeader } from 'mdb-react-ui-kit';
import useSWR from 'swr';

export default function Payment() {
  const { data } = useSWR('http://localhost:3001/orders/', fetcher);

  return (
    <MDBCard>
      <MDBCardHeader>
        <h1>Hello, please pay in cash</h1>
      </MDBCardHeader>
    </MDBCard>
  );
}
