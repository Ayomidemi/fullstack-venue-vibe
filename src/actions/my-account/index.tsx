'use client';

import { updateSessionData } from '@/actions-server/auth';
import { useClient } from '@/hooks';
import { IEditProfileInformationParams, SignUpData, User } from '@/interface';
import { availableCountriesAtom, profileAtom } from '@/state';

import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';

export const useAccountActions = () => {
  const client = useClient();
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

  const setProfile2 = useSetRecoilState(profileAtom);
  const setAvailableCountries = useSetRecoilState(availableCountriesAtom);

  const signUp = async (payload: SignUpData) => {
    const baseUrl = window?.location?.origin ? window?.location?.origin : BASE_URL;
    const callbackUrl = baseUrl + '/verify-email';

    const response = await client.post('accounts/v1/auth/signup', { ...payload, callbackUrl });

    if (response.data) {
      return response.data;
    } else {
      toast.error(response.error);
    }
  };

  const resendVerificationMail = async (email: string) => {
    const baseUrl = window?.location?.origin ? window?.location?.origin : BASE_URL;

    const callbackUrl = `${baseUrl}/verify-email`;

    const response = await client.post('accounts/v1/auth/resendVerification', {
      email,
      callbackUrl,
    });

    if (response.data) {
      return true;
    } else {
      toast.error(response.error);
    }
  };

  const sendLoginOtp = async (userId: string) => {
    const response = await client.post('accounts/v2/auth/login/send-otp', {
      userId,
    });

    if (response.data) {
      return response.data;
    } else {
      return response.error;
    }
  };

  const createAccountPin = async (payload: { pin: string; confirmPin: string }) => {
    const response = await client.post('accounts/v1/auth/user/create-pin', payload);

    if (response.data) {
      return response.data;
    } else {
      toast.error(response.error);
      return response.error;
    }
  };

  const editProfileInformation = async (payload: IEditProfileInformationParams) => {
    const response = await client.put('accounts/v1/user/profile', payload);

    if (response.data) {
      setProfile2(response.data);
      return response.data;
    } else {
      toast.error(response.error);
      return response.error;
    }
  };

  const verifyRegister = async (token: string) => {
    const response = await client.get(`/accounts/v1/auth/verify/${token}`);

    if (response.data) {
      return true;
    } else {
      toast.error(response.error);
    }
  };

  const fetchProfile = useCallback(async () => {
    const response = await client.get('accounts/v1/user/profile');

    if (response.data) {
      setProfile2(response.data);
      await updateSessionData(response.data);
      return response.data;
    } else {
      return response.error;
    }
  }, []);

  const getAvailableCountries = useCallback(async () => {
    const response = await client.get('accounts/v1/wallet/available-countries');

    if (Array.isArray(response.data)) {
      setAvailableCountries(response.data);
      return response.data;
    } else {
      return response.error;
    }
  }, []);

  return {
    signUp,
    resendVerificationMail,
    sendLoginOtp,
    verifyRegister,
    createAccountPin,
    editProfileInformation,
    fetchProfile,
    getAvailableCountries,
  };
};
