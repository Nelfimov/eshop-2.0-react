import { MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';

export function SignUpForm() {
  return (
    <form>
      <h1 className="mb-4">Sign Up</h1>
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
      <MDBInput
        className="mb-4"
        type="text"
        name="password-confirm"
        id="password-confirm"
        label="Confirm password"
        required
      />
      <MDBCheckbox name="remember" label="Remember me" />
      <MDBBtn className="w-100 mt-3" type="submit">
        Sign up
      </MDBBtn>
    </form>
  );
}
