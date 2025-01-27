import { Notification } from '@/interface';
import { atom } from 'recoil';

export const notificationsAtom = atom<{ total: number; data: Notification[] }>({
  key: 'notifications',
  default: { total: 0, data: [] },
});

export const unreadNotificationCountAtom = atom<number>({
  key: 'notifications-unread-count',
  default: 0,
});

export const refreshNotificationAtom = atom<boolean>({
  key: 'refresh-notification',
  default: true,
});
