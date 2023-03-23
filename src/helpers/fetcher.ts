import { Response } from '@/types';

export const fetcherGetUnauthorized = (url: string) =>
  fetch(url).then((res) => res.json());

export const fetcherGetAuthorized = (url: string) =>
  fetch(url, { credentials: 'include' }).then((res) => res.json());

export const fetcherPostAuthorized = (url: string) =>
  fetch(url, { method: 'POST', credentials: 'include' }).then((res) =>
    res.json()
  );

interface CreateAddressArgs {
  type: 'shipping' | 'billing';
  street: string;
  city: string;
  zip: string;
  country: string;
  fullName: string;
  email: string;
}

export async function createAddress({
  street,
  city,
  zip,
  country,
  fullName,
  email,
  type,
}: CreateAddressArgs): Promise<Response> {
  return await (
    await fetch('http://localhost:3001/addresses/', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        street,
        city,
        zip,
        country,
        fullName,
        type,
        email,
      }),
    })
  ).json();
}
