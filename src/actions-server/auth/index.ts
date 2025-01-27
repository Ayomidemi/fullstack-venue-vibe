/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { ISession, IUser, LoginData, Token, User, ValidateLoginData } from '@/interface';
import { defaultSession, sessionOptions } from '@/libs/custom-auth';
import { getIronSession } from 'iron-session';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getSession = async () => {
  try {
    const session = await getIronSession<ISession>(await cookies(), sessionOptions);
    if (!session?.isLoggedIn) {
      session.isLoggedIn = defaultSession?.isLoggedIn;
    }

    const plainSession: any = {
      isLoggedIn: session?.isLoggedIn || defaultSession.isLoggedIn,
    };
    if (session?.user) {
      plainSession.user = session.user;
    }
    if (session?.token) {
      plainSession.token = session.token;
    }
    return plainSession;
    // return session;
  } catch (error) {
    throw error;
    return defaultSession;
  }
};

export const login = async (payload: LoginData, type?: 'signup' | 'login') => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  let url = `${BASE_URL}/accounts/v2/auth/login`;

  if (type === 'signup') {
    url = `${BASE_URL}/accounts/v2/auth/signup`;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const res = await response.json();
    if (response.ok) {
      return res;
    } else {
      return { ...res, error: true };
    }
  } catch (error: any) {
    const errorMessage = error.toString();
    return {
      error: true,
      message: errorMessage || 'Something went wrong, try again',
    };
  }
};

export const validate2FA = async (payload: ValidateLoginData) => {
  const session = await getIronSession<ISession>(await cookies(), sessionOptions);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${BASE_URL}/accounts/v2/auth/login/validate-2fa`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const res = await response.json();
    if (response.ok) {
      const user = res;
      session.isLoggedIn = true;
      session.user = user?.user;
      session.token = user?.token?.accessToken;
      await session.save();
      revalidatePath('');
      return res;
    } else {
      return { ...res, error: true };
    }
  } catch (error: any) {
    const errorMessage = error.toString();
    return {
      error: true,
      message: errorMessage || 'Something went wrong, try again',
    };
  }
};

export const logout = async () => {
  const session = await getIronSession<ISession>(cookies(), sessionOptions);
  session.destroy();
  revalidatePath('');
  redirect('/login');
};

export const updateSessionData = async (user: User, token?: Token, isLoggedIn?: boolean) => {
  const session = await getIronSession<ISession>(cookies(), sessionOptions);
  session.user = user;
  if (token) {
    session.token = token;
  }
  if (isLoggedIn) {
    session.isLoggedIn = isLoggedIn;
  }
  await session.save();
  revalidatePath('');
};
