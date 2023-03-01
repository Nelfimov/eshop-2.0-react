import { User } from '@/types';
import { createContext } from 'react';

interface UserContext extends User {
  login: (payload: User) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContext | null>(null);
