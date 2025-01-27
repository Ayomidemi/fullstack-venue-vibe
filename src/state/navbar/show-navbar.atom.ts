import { atom } from 'recoil';

const showNavBarAtom = atom({
  key: 'showNavBar',
  default: false,
});

export { showNavBarAtom };
