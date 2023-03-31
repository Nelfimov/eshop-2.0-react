import { UserContext } from '@/context';
import { MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import { NextRouter } from 'next/router';
import { FormEvent, useContext } from 'react';

interface Props {
  router: NextRouter;
}

export function LogInForm({ router }: Props) {
  // @ts-expect-error: ignore
  const { login } = useContext(UserContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { value: email } = document.getElementById(
      'email'
    ) as HTMLInputElement;
    const { value: password } = document.getElementById(
      'password'
    ) as HTMLInputElement;

    if (!email || !password) {
      return console.error('Email or password not provided');
    }

    const body = { email, password };
    const response = await fetch(process.env.backEndUrl + 'auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!data.success) {
      return console.error(data.message);
    }
    login({ ...data.user });
    router.push('/');
  }

  return (
    <form onSubmit={handleSubmit}>
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
        type="password"
        name="password"
        id="password"
        label="Password"
        required
      />
      <MDBCheckbox name="remember" label="Remember me" id="remember" />
      <MDBBtn className="w-100 my-3" type="submit">
        Log in
      </MDBBtn>
    </form>
  );
}
