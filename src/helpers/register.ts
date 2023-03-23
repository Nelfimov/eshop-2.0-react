import { IUserContext } from '@/context';
import { Response } from '@/types';

export async function registerAnonUser(user: IUserContext) {
  const response: Response = await (
    await fetch('http://localhost:3001/auth/register-anon/', {
      credentials: 'include',
    })
  ).json();
  if (response.user) user.login(response.user);
  return response.success;
}
