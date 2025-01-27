import { Token } from './client.interface';

export enum USER_TYPE {
  CUSTOMER = 'CUSTOMER',
  MERCHANT = 'MERCHANT',
}

export enum RegistrationStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  REJECTED = 'rejected',
  RESOLVED = 'resolved',
}

export interface FetchingStatus<T, K> {
  status: string;
  data: T | null;
  error: K | string | null;
}

export enum AUTHENTICATION_METHOD {
  PIN = 'pin',
  EMAIL = 'email',
}

export type LoginData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export interface SignUpData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  referredBy: string;
  acceptedTermsAndConditions: boolean;
  country: string;
  defaultCurrency: string;
  phoneNumber: string;
}

export type VerifyLoginData = {
  userId: string;
  code: string;
};
export type ValidateLoginData = {
  userId: string;
  code: string;
  method: `${AUTHENTICATION_METHOD}`;
};

export const initLogin: LoginData = {
  email: '',
  password: '',
};

export interface IProfile {
  id: string;
  email: string;
  username: string;
  profile: {
    firstName: string;
    lastName: string;
    dob: string;
    image: string;
  };
  refererId: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  isConfirmed: true;
  referredBy: string;
  hasPin: boolean;
  role: USER_TYPE;
  createdAt: Date;
  kycLevel: string;
  defaultCurrency: string;
  merchantActive: boolean;
  isMasterUser: boolean;
  preferred2faMethod?: `${AUTHENTICATION_METHOD}`;
  country: string;
  merchantSettings?: {
    minTopUpAmount?: number;
    minWithdrawalAmount?: number;
    allowTopUp?: boolean;
    allowWithdrawal?: boolean;
  };
}

export interface ISession {
  user?: User;
  token?: Token;
  isLoggedIn?: boolean;
}

export interface AccessToken {
  accessToken: string;
  expiresIn: number;
  refreshToken?: string;
}

export interface IUser {
  bankDetails: string;
  email: string;
  firstName: string;
  id: string;
  image: string;
  lastName: string;
  role: string;
  username: string;
}

export interface IBaseUser {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image?: string;
  role?: string;
}

export interface IBankAccount {
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  operator?: string;
  phoneNumber?: string;
}
export interface IBankDetails extends IBankAccount {
  country: string;
  accountNumberType: 'PHONE' | 'BANK';
}

export interface IBankInformation extends IBankDetails {
  addedById: string;
  createdAt: string;
  id: string;
  updatedAt: string;
}

export interface User {
  preferred2faMethod: string;
  id: string;
  email: string;
  username: string;
  profile: {
    firstName: string;
    lastName: string;
    dob: string;
    image: string;
  };
  refererId: string;
  phoneNumber: string;
  isConfirmed: boolean;
  referredBy: string;
  hasPin: boolean;
  role: string;
  createdAt: string;
  kycLevel: number;
  defaultCurrency: string;
  merchantActive: boolean;
  country?: string;
  isMasterUser: boolean;
  merchantSettings: null;
  isDeleted: boolean;
}

export interface IAddBankInformationParams {
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  password: string;
}

export interface IAddMobileMoneyParams {
  phoneNumber: string;
  operator: string;
  country: string;
  password: string;
}

export interface IAddMobileMoneyDto {
  bankDetails: {
    phoneNumber: string;
    operator: string;
    isDefault: boolean;
    country: string;
  };
  password: string;
}

export interface IEditProfileInformationParams {
  username?: string;
  phoneNumber?: string | null;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  preferred2faMethod?: string;
}

export interface IResetPasswordParams {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ICompleteTxnPinResetParams {
  pin: string;
  confirmPin: string;
}

export interface IChangeTransactionPinParams {
  currentPin: string;
  newPin: string;
  confirmPin: string;
}

export interface IAvailableCountry {
  code: string;
  currencyCode: string;
  currencyName: string;
  id: string;
  name: string;
  phoneCode: string;
}
