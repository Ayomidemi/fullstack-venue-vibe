import { IAvailableCountry, User } from '@/interface';
import { atom } from 'recoil';

const defaultUserInformation: User = {
  id: '',
  email: '',
  username: '',
  profile: {
    firstName: '',
    lastName: '',
    dob: '',
    image: '',
  },
  refererId: '',
  phoneNumber: '',
  isConfirmed: true,
  referredBy: '',
  hasPin: true,
  role: '',
  createdAt: '',
  kycLevel: 0,
  defaultCurrency: '',
  country: '',
  merchantActive: false,
  preferred2faMethod: '',
  isMasterUser: false,
  merchantSettings: null,
  isDeleted: false,
};

export const profileAtom = atom({
  key: 'profile',
  default: defaultUserInformation,
});

export const availableCountriesAtom = atom<IAvailableCountry[]>({
  default: [],
  key: 'countriesatom',
});
