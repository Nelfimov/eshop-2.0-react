import { User } from '@/types';
import { createContext } from 'react';

interface IUserContext extends User {
  login: (payload: User) => void;
  logout: () => void;
}

export const UserContext = createContext<IUserContext | null>(null);
