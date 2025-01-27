import { ModalType } from '@/interface';
import { atom } from 'recoil';

export const modalAtom = atom<ModalType | null>({
  key: 'modal-atom',
  default: null,
});
