import { ISession } from '@/interface';
import { atom } from 'recoil';

export const sessionAtom = atom<ISession>({
  default: {
    isLoggedIn: false,
  },
  key: 'auth-session-atom',
});
