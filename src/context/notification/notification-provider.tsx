import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { NotificationContext } from './notification-context';
import { Notification } from './notification';
import { Notification as INotification } from '@/types';

export function NotificationProvider(props: any) {
  const [notifications, setNotifications] = useState<INotification[]>([
    {
      id: 0,
      content: '',
    },
  ]);

  const open = (content: string) =>
    setNotifications((currentNotifications) => [
      ...currentNotifications,
      { id: Math.random(), content },
    ]);

  const close = (id: number) =>
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.id !== id)
    );

  const contextValue = useMemo(() => ({ id: 0, content: '', open, close }), []);

  return (
    <NotificationContext.Provider value={contextValue}>
      {props.children}

      {createPortal(
        <div className="notification-wrapper">
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              close={() => close(notification.id)}
            >
              {notification.content}
            </Notification>
          ))}
        </div>,
        document.body
      )}
    </NotificationContext.Provider>
  );
}
