'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import styles from './index.module.scss';
import { AuthBackGround } from '@/components/UI/auth-background';
import { Slogan } from '@/components/UI/slogan';
import Header from '@/components/UI/header';
import { ErrorMessage, ErrorMessageWithIcon } from '@/components/UI/error-text';
import Input from '@/components/input-field';
import Checkbox from '@/components/checkbox';
import Button from '@/components/button';
import { AUTHENTICATION_METHOD } from '@/interface';
import OTPInput from '@/components/otp-input';
import { Storage } from '@/utils/storage';
import { login, validate2FA } from '@/actions-server/auth';
import toast from 'react-hot-toast';
import { useAccountActions } from '@/actions/my-account';

interface LoginProps {
  redirectConfig?: string;
}

enum Views {
  LOGIN = 1,
  VERIFY_LOGIN = 2,
}

const SignIn = ({}: LoginProps) => {
  const { push } = useRouter();
  const emailFromUrl = useSearchParams().get('email');
  const toRoute = useSearchParams().get('toRoute');
  const redirectConfig = '/home';
  const { sendLoginOtp } = useAccountActions();

  const [loginMethod, setLoginMethod] = useState<`${AUTHENTICATION_METHOD}`>();
  const [currentView, setCurrentView] = useState<Views>(Views.LOGIN);
  const [showVerificationScreen, setShowVerificationScreen] = useState(false);
  const [error, setError] = useState({
    email: '',
    password: '',
    otp: '',
  });
  const [regInfo, setRegInfo] = useState({
    status: 'idle',
    data: null,
    error: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
  const [showResendOtp, setShowResendOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resubmitting, setResubmitting] = useState(false);
  const [userId, setUserId] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

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
    setLoading(true);

    try {
      const payload = {
        email: details?.email,
        password: details?.password,
        rememberMe: details?.rememberMe,
      };

      const response = await login(payload);

      if (response.id) {
        setUserId(response.id);
        setLoginMethod(response.preferred2faMethod || 'email');

        if (response.preferred2faMethod === 'email' || !response.preferred2faMethod) {
          const res = await sendLoginOtp(response.id);

          if (res.error) {
            throw new Error(res.error?.toString());
          }
        }
      } else {
        if (String(response)) {
          throw new Error(response);
        }

        throw new Error('Invalid login credentials');
      }

      setRegInfo({
        status: 'idle',
        data: null,
        error: null,
      });

      if (details?.email && details?.rememberMe) {
        Storage.setItem('rememberMe', JSON.stringify({ email: details?.email }));
      } else {
        Storage.removeItem('rememberMe');
      }

      setCurrentView(Views.VERIFY_LOGIN);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const err = e.message.toString() || '';

      if (/verified/gi.test(err)) {
        setShowVerificationScreen(true);

        setRegInfo({
          status: 'idle',
          data: null,
          error: null,
        });

        return;
      }

      setRegInfo({
        status: 'rejected',
        data: null,
        error: e.message.toString() || '',
      });
    }

    setLoading(false);
  };

  const handleVerifyLogIn = async () => {
    setLoading(true);

    try {
      const data = await validate2FA({
        userId,
        code: details?.otp,
        method: loginMethod || 'email',
      });

      if (data.user) {
        if (!data.user.hasPin) {
          push('/create-account-pin');
          return;
        } else if (!data.user?.preferred2faMethod) {
          push('/select-auth-method');
          return;
        }
      }

      const lastPathBeforeLogOut = await Storage.getItem('lastPathBeforeLogOut', false);

      if (toRoute) {
        push(String(toRoute));
      } else if (lastPathBeforeLogOut && lastPathBeforeLogOut !== '/login') {
        push(lastPathBeforeLogOut);
      } else {
        push(redirectConfig);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError({
        ...error,
        otp: err.message?.toString() || 'Something went wrong, please try again.',
      });
    }

    setLoading(false);
  };

  const onRequestForOtp = async () => {
    if (resubmitting) return;

    setResubmitting(true);

    const res = await sendLoginOtp(userId);

    if (res.error) {
      toast.error(res.error?.toString());
      throw new Error(res.error?.toString());
    } else {
      setLoginMethod('email');
      setShowResendOtp(false);

      const id = setTimeout(() => {
        setShowResendOtp(true);
      }, 6000);

      setTimeoutId(id);
    }

    setResubmitting(false);
  };

  const invalidOTP = !details?.otp || details?.otp?.length < 6 || !!error?.otp;
  const inValidLogin = !details?.email || !details?.password;

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

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
        {/* {!showVerificationScreen && <Slogan />} */}
        <Slogan />

        <div className={styles.login_white_container}>
          {!showVerificationScreen && (
            <>
              {currentView === Views.LOGIN && (
                <>
                  <Header label="Log Into your Account" />

                  {regInfo.status === 'rejected' ? (
                    <ErrorMessage
                      message={constructErrorMessage(regInfo.error)}
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
                </>
              )}

              {currentView === Views.VERIFY_LOGIN && (
                <>
                  <Header label={loginMethod === 'email' ? 'Verify Log In.' : 'Enter login pin'} />

                  <h6 className={styles.login_subheader}>
                    {loginMethod === 'email'
                      ? 'Enter the verification code sent to your email address to proceed.'
                      : 'Kindly input your 6-digit code'}
                  </h6>

                  {showResendOtp && loginMethod === 'email' && (
                    <Button
                      label="Resend verification code."
                      onClick={() => onRequestForOtp()}
                      variant="transparent"
                      disabled={resubmitting}
                      loading={resubmitting}
                    />
                  )}

                  {!!error?.otp ? (
                    <ErrorMessageWithIcon
                      message={error?.otp}
                      boxStyles={{
                        marginTop: 15,
                      }}
                    />
                  ) : null}

                  <form className={styles.login_form}>
                    <div className={styles.otp_container}>
                      <OTPInput
                        onChange={(val) => setDetails({ ...details, otp: val })}
                        helperText={error.otp && error.otp}
                        numInputs={6}
                        pin={details?.otp}
                      />
                    </div>

                    <div className={styles.login_btn}>
                      <Button
                        label="Verify"
                        onClick={handleVerifyLogIn}
                        variant="primary"
                        disabled={invalidOTP || loading}
                        loading={loading}
                      />

                      <Button
                        label="Go back"
                        onClick={() => {
                          setCurrentView(Views.LOGIN);
                          setDetails({ ...details, otp: '' });
                          setError({ ...error, otp: '' });
                        }}
                        variant="secondary"
                      />
                    </div>

                    {loginMethod === 'pin' && (
                      <Button
                        label="Request for OTP instead"
                        onClick={() => onRequestForOtp()}
                        variant="transparent"
                        disabled={resubmitting}
                        loading={resubmitting}
                      />
                    )}
                  </form>
                </>
              )}
            </>
          )}

          {showVerificationScreen && (
            <>
              <Header label="Verify Email Address" />

              <h6
                className={styles.login_subheader}
                style={{ fontSize: '14px', color: '#54545', marginBottom: '2em' }}>
                Kindly click on the verification link sent to to continue.
              </h6>

              {showResendOtp && loginMethod === 'email' && (
                <Button
                  label="Resend verification"
                  onClick={() => onRequestForOtp()}
                  variant="transparent"
                  disabled={resubmitting}
                  loading={resubmitting}
                />
              )}

              {!!error?.otp ? (
                <ErrorMessageWithIcon
                  message={error?.otp}
                  boxStyles={{
                    marginTop: 15,
                  }}
                />
              ) : null}

              <form className={styles.login_form}>
                <div className={styles.login_btn}>
                  <Button
                    label="Resend Link"
                    onClick={handleVerifyLogIn}
                    variant="primary"
                    disabled={loading}
                    loading={loading}
                  />

                  <Button
                    label="Go back"
                    onClick={() => {
                      setCurrentView(Views.LOGIN);
                      setDetails({ ...details, otp: '' });
                      setError({ ...error, otp: '' });
                    }}
                    variant="secondary"
                  />
                </div>

                <p className={styles.login_below_header}>
                  Kindly check spam folder or promotions if you don’t find mail in your inbox.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </AuthBackGround>
  );
};

export default SignIn;
