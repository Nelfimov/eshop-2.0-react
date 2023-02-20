import { validateEmail } from '@/helpers';
import {
  MDBInput,
  MDBBtn,
  MDBValidation,
  MDBValidationItem,
} from 'mdb-react-ui-kit';
import { NextRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

interface Props {
  router: NextRouter;
}

export function SignUpForm({ router }: Props) {
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({});
    const { name, value } = e.target;
    setFormInput((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleValidation() {
    let formIsValid = true;
    let errors: { [key: string]: string } = {};

    if (!formInput.email) {
      formIsValid = false;
      errors['email'] = 'Cannot be empty.';
    }

    if (!validateEmail(formInput.email)) {
      formIsValid = false;
      errors['email'] = 'Should be a valid email address.';
      const email = document.getElementById('email') as HTMLInputElement;
      email.setCustomValidity(errors['email']);
    }
    if (formInput.password !== formInput.confirmPassword) {
      formIsValid = false;
      errors['password'] = 'Passwords should match.';
      const password = document.getElementById('password') as HTMLInputElement;
      password.setCustomValidity(errors['password']);
      const confirmPassword = document.getElementById(
        'password'
      ) as HTMLInputElement;
      confirmPassword.setCustomValidity(errors['password']);
    }
    if (formInput.password.length < 5 || formInput.confirmPassword.length < 5) {
      formIsValid = false;
      errors['password'] = 'Passwords should be longer than 5 symbols.';
      const password = document.getElementById(
        'confirmPassword'
      ) as HTMLInputElement;
      password.setCustomValidity(errors['password']);
    }
    setErrors(errors);
    return formIsValid;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!handleValidation()) return;

    const { value: email } = document.getElementById(
      'email'
    ) as HTMLInputElement;
    const { value: password } = document.getElementById(
      'password'
    ) as HTMLInputElement;

    const body = { email, password };
    const response = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!data.success) {
      return console.error(data.message);
    }
    localStorage.setItem('token', data.token);
    router.push('/');
  }

  return (
    <MDBValidation onSubmit={handleSubmit}>
      <h1 className="mb-4">Sign Up</h1>
      <MDBValidationItem
        // @ts-expect-error: expect
        feedback={errors['email']}
        invalid
        className="mb-3 pb-1"
      >
        <MDBInput
          type="email"
          name="email"
          id="email"
          value={formInput.email}
          label="Email address"
          minLength={5}
          onChange={handleChange}
          required
        />
      </MDBValidationItem>
      <MDBValidationItem
        // @ts-expect-error: ignore
        feedback={errors['password']}
        className="mb-3 pb-1"
        invalid
      >
        <MDBInput
          type="password"
          name="password"
          id="password"
          value={formInput.password}
          label="Password"
          onChange={handleChange}
          required
        />
      </MDBValidationItem>
      <MDBValidationItem
        // @ts-expect-error: ignore
        feedback={errors['password']}
        className="mb-3 pb-1"
        invalid
      >
        <MDBInput
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formInput.confirmPassword}
          label="Confirm password"
          onChange={handleChange}
          required
        />
      </MDBValidationItem>
      <MDBBtn
        className="w-100 my-3"
        type="submit"
        disabled={Object.keys(errors).length > 0}
      >
        Sign up
      </MDBBtn>
    </MDBValidation>
  );
}
