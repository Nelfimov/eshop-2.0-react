import { useContext } from 'react';
import { NotificationContext } from '@/context/notification';

export const useNotification = () => useContext(NotificationContext);
