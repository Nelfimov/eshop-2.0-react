import { SignUpForm } from '@/components';
import { MDBBtnGroup, MDBCard, MDBRadio } from 'mdb-react-ui-kit';
import { useState, useRef, useEffect } from 'react';

export default function Auth() {
  const [showSignUp, setShowSignUp] = useState(true);
  const signUp = useRef();

  useEffect(() => {
    setShowSignUp(!showSignUp);
  }, [signUp.current]);

  return (
    <MDBCard className="p-4 col-12 col-sm-10 col-md-8 mx-auto">
      <MDBBtnGroup className="mx-auto mb-4">
        <MDBRadio
          inputRef={signUp}
          btn
          btnColor="secondary"
          id="sign-up-check"
          name="options"
          wrapperTag="span"
          label="Sign up"
          defaultChecked
        />
        <MDBRadio
          btn
          btnColor="secondary"
          id="log-in-check"
          name="options"
          wrapperTag="span"
          label="Log in"
        />
      </MDBBtnGroup>
      {showSignUp ? <SignUpForm /> : <LogInForm />}
    </MDBCard>
  );
}
