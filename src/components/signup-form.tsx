import { validateEmail } from '@/helpers';
import {
  MDBInput,
  MDBBtn,
  MDBValidation,
  MDBValidationItem,
} from 'mdb-react-ui-kit';
import React, { FormEvent, useState } from 'react';

export function SignUpForm() {
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
    }
    if (formInput.password !== formInput.confirmPassword) {
      formIsValid = false;
      errors['password'] = 'Passwords should match.';
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
    const { value: confirmPassword } = document.getElementById(
      'password-confirm'
    ) as HTMLInputElement;

    if (!email || !password) {
      return console.error('Email or password not provided');
    }

    if (!confirmPassword || confirmPassword !== password) {
      return console.error('Passwords do not match');
    }

    const body = { email, password };
    const response = await fetch('http://localhost:3001/auth/login', {
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
      <MDBInput
        className="mb-4"
        type="password"
        name="password"
        id="password"
        value={formInput.password}
        label="Password"
        onChange={handleChange}
        minLength={5}
        required
      />
      <MDBValidationItem
        // @ts-expect-error: ignore
        feedback={errors['password']}
        className="mb-2 pb-1"
        invalid
      >
        <MDBInput
          type="password"
          name="confirmPassword"
          id="password-confirm"
          value={formInput.confirmPassword}
          label="Confirm password"
          onChange={handleChange}
          minLength={5}
          required
        />
      </MDBValidationItem>
      <MDBBtn className="w-100 mt-3" type="submit">
        Sign up
      </MDBBtn>
    </MDBValidation>
  );
}
