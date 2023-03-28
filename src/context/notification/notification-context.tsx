import { Notification } from '@/types';
import { createContext } from 'react';

export interface INotificationContext extends Notification {
  open: (content: string) => void;
  close: (close: number) => void;
}

export const NotificationContext = createContext<INotificationContext | null>(
  null
);
