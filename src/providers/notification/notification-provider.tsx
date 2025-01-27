'use client';

import { SocketContext } from '@/constants';
import { sessionAtom } from '@/state';
import { refreshNotificationAtom } from '@/state/notification/notification.atom';
import { useContext, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface Props {
  children: React.ReactNode;
}

export const NotificationProvider = ({ children }: Props) => {
  const socket = useContext(SocketContext);
  const session = useRecoilValue(sessionAtom);
  const setRefreshNotifications = useSetRecoilState(refreshNotificationAtom);

  const listenForNotificationEvent = () => {
    if (!session?.user?.id) return;

    const eventId = `notify-${session.user.id}`;

    if (socket.hasListeners(eventId)) return;

    socket.on(eventId, () => {
      // Handle notification event here.
      setRefreshNotifications((old) => !old);
    });
  };

  useEffect(() => {
    listenForNotificationEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket?.connected, session?.user?.id]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
  }, [socket]);

  return <>{children}</>;
};
