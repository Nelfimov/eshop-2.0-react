import React from 'react';
import { useTimeout } from '@/hooks/use-timeout';

interface Props {
  close: () => void;
  children: any;
}

export function Notification(props: Props) {
  useTimeout(props.close, 5000);

  return (
    <div className="Notification">
      <div>{props.children}</div>
      <button onClick={props.close}>X</button>
    </div>
  );
}
