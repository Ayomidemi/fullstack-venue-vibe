'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import styles from './index.module.scss';
import { AuthBackGround } from '@/components/UI/auth-background';
import { Slogan } from '@/components/UI/slogan';
import Header from '@/components/UI/header';
import { ErrorMessage, ErrorMessageWithIcon } from '@/components/UI/error-text';
import Input from '@/components/input-field';
import Button from '@/components/button';
// import Dropdown from '@/components/select-field';
import { useAccountActions } from '@/actions/my-account';
import PhoneInput from '@/components/phone-input-filed';
import toast from 'react-hot-toast';

const SignUp = () => {
  const referralCode = useSearchParams().get('referralCode');

  const { resendVerificationMail, signUp } = useAccountActions();

  const [showVerificationScreen, setShowVerificationScreen] = useState(false);
  const [error, setError] = useState({
    username: '',
    email: '',
    password: '',
    country: '',
    phoneNumber: '',
    otp: '',
  });
  const [regInfo, setRegInfo] = useState({
    status: 'idle',
    data: null,
    error: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    referredBy: '',
    acceptedTermsAndConditions: true,
    country: '',
    defaultCurrency: '',
    phoneNumber: '',
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

    setError({
      ...error,
      [name]: '',
    });
  };

  const handleSignUp = async () => {
    const newError = {
      username: details.username ? '' : 'This field is required',
      email: details.email ? '' : 'This field is required',
      password: details.password ? '' : 'This field is required',
      country: details.country ? '' : 'This field is required',
      phoneNumber: details.phoneNumber ? '' : 'This field is required',
      otp: '',
    };

    setError(newError);
    const formHasError = Object.values(newError).some((error) => error);

    if (formHasError) {
      return;
    }
    setLoading(true);

    try {
      const { ...rest } = details;
      const payload = {
        ...rest,
        username: details.username.toLowerCase(),
        confirmPassword: details.password,
      };

      const response = await signUp(payload);

      if (response.id) {
        setShowVerificationScreen(true);
      }

      setRegInfo({
        status: 'idle',
        data: null,
        error: null,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setRegInfo({
        status: 'rejected',
        data: null,
        error: e.message.toString() || '',
      });
    }

    setLoading(false);
  };

  const handleResendLink = async () => {
    setLoading(true);

    try {
      const data = await resendVerificationMail(details?.email);

      if (data) {
        toast.success('Verification link resent successfully!');
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

  useEffect(() => {
    if (referralCode) {
      setDetails({ ...details, referredBy: String(referralCode) });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referralCode]);

  return (
    <AuthBackGround>
      <div className={styles.login_container}>
        {!showVerificationScreen && <Slogan />}

        <div className={styles.login_white_container}>
          {!showVerificationScreen && (
            <>
              <Header label="Create Account" />

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
                    name="username"
                    defaultValue={details.username}
                    label="Username"
                    helperText={error.username && error.username}
                  />
                </div>

                <div className={styles.input_container}>
                  <PhoneInput
                    onChange={handleInputChange}
                    name="phoneNumber"
                    defaultValue={details.phoneNumber}
                    label="Phone Number"
                    helperText={error.phoneNumber && error.phoneNumber}
                    code={'NGN'}
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

                  <h6 className={styles.input_pasw_inst}>
                    Password must contain uppercase, lowercase, special character and number!
                  </h6>
                </div>

                <div className={styles.input_container}>
                  <Input
                    onChange={handleInputChange}
                    name="referredBy"
                    defaultValue={details.referredBy}
                    label="Referral Code"
                  />
                </div>

                <div className={styles.login_btn}>
                  <Button
                    label="Create Account"
                    onClick={handleSignUp}
                    variant="primary"
                    disabled={loading}
                    loading={loading}
                  />
                </div>

                <p className={styles.login_signup}>
                  Already have an account?
                  <Link href="/login" className={styles.login_linkk}>
                    {' '}
                    Log in
                  </Link>
                </p>
              </form>
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
                    onClick={handleResendLink}
                    variant="primary"
                    disabled={loading}
                    loading={loading}
                  />

                  <Button
                    label="Go back"
                    onClick={() => {
                      setShowVerificationScreen(false);
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

export default SignUp;
