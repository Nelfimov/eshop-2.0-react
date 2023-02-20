import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';

export default function Auth() {
  return (
    <form className="mx-auto lg col-12 col-sm-8 col-md-6">
      <MDBInput
        className="mb-4"
        type="email"
        name="email"
        id="email"
        label="Email address"
      />
      <MDBInput
        className="mb-4"
        type="text"
        name="password"
        id="password"
        label="Password"
      />
      <MDBInput
        className="mb-4"
        type="text"
        name="password-confirm"
        id="password-confirm"
        label="Confirm password"
      />
      <MDBBtn className="w-100" type="submit">
        Log in
      </MDBBtn>
    </form>
  );
}
