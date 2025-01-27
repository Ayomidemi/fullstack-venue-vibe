'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import styles from './index.module.scss';
import { AuthBackGround } from '@/components/UI/auth-background';
import { Slogan } from '@/components/UI/slogan';
import Header from '@/components/UI/header';
import { ErrorMessage } from '@/components/UI/error-text';
import Input from '@/components/input-field';
import Checkbox from '@/components/checkbox';
import Button from '@/components/button';
import { Storage } from '@/utils/storage';
import { login } from '@/actions-server/auth';
import toast from 'react-hot-toast';

interface LoginProps {
  redirectConfig?: string;
}

const SignIn = ({}: LoginProps) => {
  const { push } = useRouter();
  const emailFromUrl = useSearchParams().get('email');

  const [error, setError] = useState({
    email: '',
    password: '',
    otp: '',
  });
  const [regInfo, setRegInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    email: '',
    password: '',
    otp: '',
    rememberMe: false,
  });

  const constructErrorMessage = (err: string) => {
    if (/fetch/gi.test(err)) {
      return 'Please check your internet connection and try again.';
    }

    return err;
  };

  const handleInputChange = (e: { name: string; value: string }) => {
    const { name, value } = e;

    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSignIn = async () => {
    setError({
      email: !details?.email ? 'Email is required' : '',
      password: !details?.password ? 'Password is required' : '',
      otp: '',
    });
    setLoading(true);

    try {
      const payload = {
        email: details?.email,
        password: details?.password,
        rememberMe: details?.rememberMe,
      };

      const response = await login(payload);

      if (response.id) {
        toast.success('Login successful');
        push('/home');
      } else {
        if (String(response)) {
          throw new Error(response);
        }

        setRegInfo(response);
        throw new Error('Invalid login credentials');
      }

      if (details?.email && details?.rememberMe) {
        Storage.setItem('rememberMe', JSON.stringify({ email: details?.email }));
      } else {
        Storage.removeItem('rememberMe');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (_e: any) {
      setRegInfo(_e.message);
      return _e;
    }

    setLoading(false);
  };

  const inValidLogin = !details?.email || !details?.password;

  useEffect(() => {
    const userEmail = Storage.getItem('rememberMe') || '';

    if (userEmail?.email) {
      setDetails({ ...details, email: userEmail?.email, rememberMe: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailFromUrl]);

  return (
    <AuthBackGround>
      <div className={styles.login_container}>
        <Slogan />

        <div className={styles.login_white_container}>
          <Header label="Log Into your Account" />

          {regInfo ? (
            <ErrorMessage
              message={constructErrorMessage(regInfo)}
              errorStyles={{
                marginBottom: 15,
              }}
            />
          ) : null}

          <form className={styles.login_form}>
            <div className={styles.input_container}>
              <Input
                onChange={handleInputChange}
                name="email"
                defaultValue={details.email}
                label="Email"
                type="email"
                helperText={error.email && error.email}
              />
            </div>

            <div className={styles.input_container}>
              <Input
                onChange={handleInputChange}
                name="password"
                defaultValue={details.password}
                label="Password"
                type="password"
                helperText={error.password && error.password}
              />
            </div>

            <div className={styles.login_checkbox}>
              <Checkbox
                checked={details?.rememberMe}
                label="Remember me"
                name="remember-me"
                onChange={(val) => setDetails({ ...details, rememberMe: val })}
              />

              <p>
                <Link href="/forgot-password" className={styles.login_linkk}>
                  Forgot password?
                </Link>
              </p>
            </div>

            <div className={styles.login_btn}>
              <Button
                label="Continue"
                onClick={handleSignIn}
                variant="primary"
                disabled={inValidLogin || loading}
                loading={loading}
              />
            </div>

            <p className={styles.login_signup}>
              Don&apos;t have an account yet?
              <Link href="/create-account" className={styles.login_linkk}>
                {' '}
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthBackGround>
  );
};

export default SignIn;
