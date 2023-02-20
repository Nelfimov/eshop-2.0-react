import { MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';

export function LogInForm() {
  return (
    <form>
      <h1 className="mb-4">Log In</h1>
      <MDBInput
        className="mb-4"
        type="email"
        name="email"
        id="email"
        label="Email address"
        required
      />
      <MDBInput
        className="mb-4"
        type="text"
        name="password"
        id="password"
        label="Password"
        required
      />
      <MDBCheckbox name="remember" label="Remember me" />
      <MDBBtn className="w-100 mt-3" type="submit">
        Log in
      </MDBBtn>
    </form>
  );
}
