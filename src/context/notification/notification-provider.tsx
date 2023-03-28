import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NotificationContext } from './notification-context';
import { Notification } from './notification';
import { Notification as INotification } from '@/types';

export function NotificationProvider(props: any) {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const open = (content: string) => {
    setNotifications((currentNotifications) => [
      ...currentNotifications,
      { id: Math.random(), content },
    ]);
  };

  const close = (id: number) => {
    const element = document.querySelector(
      `.Notification[data-react-key="${id.toString()}"]`
    );
    element?.classList.add('hide');
    setTimeout(
      () =>
        setNotifications((currentNotifications) =>
          currentNotifications.filter((notification) => notification.id !== id)
        ),
      300
    );
  };

  const contextValue = useMemo(() => ({ id: 0, content: '', open, close }), []);

  if (!mounted) return null;

  return (
    <NotificationContext.Provider value={contextValue}>
      {props.children}

      {mounted
        ? createPortal(
            <div className="notification-wrapper">
              {notifications.map((notification) => (
                <Notification
                  key={notification.id}
                  close={() => close(notification.id)}
                  reactKey={notification.id}
                >
                  {notification.content}
                </Notification>
              ))}
            </div>,
            document.body
          )
        : null}
    </NotificationContext.Provider>
  );
}
