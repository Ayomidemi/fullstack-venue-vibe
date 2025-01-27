'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import styles from '../verify-email/index.module.scss';
import { AuthBackGround } from '@/components/UI/auth-background';
import { Slogan } from '@/components/UI/slogan';
import Header from '@/components/UI/header';

import Button from '@/components/button';
import { useHelpDeskConcealer } from '@/hooks';
import { useAccountActions } from '@/actions/my-account';
import { ErrorMessageWithIcon } from '@/components/UI/error-text';
import OTPInput from '@/components/otp-input';
import toast from 'react-hot-toast';

const CreateAccountPin = () => {
  const { push } = useRouter();
  const token = useSearchParams().get('token');

  const { concealHelpDesk } = useHelpDeskConcealer();
  const { createAccountPin, fetchProfile } = useAccountActions();

  const [showPinScreen, setShowPinScreen] = useState(0);
  const [otp, setOtp] = useState('');
  const [confirmOtp, setConfirmOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const res = await createAccountPin({
      pin: otp,
      confirmPin: confirmOtp,
    });

    if (res) {
      toast.success('Your transaction pin was successfully updated.');
      fetchProfile();
      push('/select-auth-method');
    } else {
      setError(res);
    }
  };

  useEffect(() => {
    if (confirmOtp?.length === 6 && otp?.length === 6 && confirmOtp !== otp) {
      setError('Your pin does not match, check again!');
    }
  }, [confirmOtp, otp]);

  useEffect(() => {
    concealHelpDesk();
  }, []);

  return (
    <AuthBackGround>
      <div className={styles.login_container}>
        <Slogan />

        <div className={styles.login_white_container}>
          <Header
            label={showPinScreen === 2 ? 'Confirm Transaction Pin' : 'Create Transaction Pin'}
          />

          {showPinScreen === 0 && (
            <>
              <h6
                className={styles.login_subheader}
                style={{
                  fontSize: '14px',
                  color: '#54545',
                  marginBottom: '3em',
                  lineHeight: '22px',
                }}>
                Transaction pins are used to secure every transaction within the app. After creating
                the pin, keep it safe from others.
              </h6>

              <form className={styles.login_form}>
                <div className={styles.login_btn}>
                  <Button label="Next" onClick={() => setShowPinScreen(1)} variant="primary" />
                </div>
              </form>
            </>
          )}

          {showPinScreen === 1 && (
            <>
              <h6
                className={styles.login_subheader}
                style={{
                  fontSize: '14px',
                  color: '#54545',
                  marginBottom: '3em',
                  lineHeight: '22px',
                }}>
                Enter your new 6-digit transaction pin.
              </h6>

              {!!error ? (
                <ErrorMessageWithIcon
                  message={error}
                  boxStyles={{
                    marginTop: 15,
                  }}
                />
              ) : null}

              <form className={styles.login_form}>
                <div className={styles.otp_container}>
                  <OTPInput onChange={(val) => setOtp(val)} numInputs={6} pin={otp} />
                </div>

                <div className={styles.login_btn}>
                  <Button
                    label="Next"
                    onClick={() => setShowPinScreen(2)}
                    variant="primary"
                    disabled={otp?.length < 6}
                  />

                  <Button
                    label="Go back"
                    onClick={() => {
                      setShowPinScreen(0);
                      setOtp('');
                      setError('');
                    }}
                    variant="secondary"
                  />
                </div>
              </form>
            </>
          )}

          {showPinScreen === 2 && (
            <>
              <h6
                className={styles.login_subheader}
                style={{
                  fontSize: '14px',
                  color: '#54545',
                  marginBottom: '3em',
                  lineHeight: '22px',
                }}>
                Re-enter your new 6-digit transaction pin.
              </h6>

              {!!error ? (
                <ErrorMessageWithIcon
                  message={error}
                  boxStyles={{
                    marginTop: 15,
                  }}
                />
              ) : null}

              <form className={styles.login_form}>
                <div className={styles.otp_container}>
                  <OTPInput
                    onChange={(val) => {
                      setConfirmOtp(val);
                      setError('');
                    }}
                    numInputs={6}
                    pin={confirmOtp}
                  />
                </div>

                <div className={styles.login_btn}>
                  <Button
                    label="Submit"
                    onClick={handleSubmit}
                    variant="primary"
                    loading={loading}
                    disabled={confirmOtp?.length < 6 || loading || !!error}
                  />

                  <Button
                    label="Go back"
                    onClick={() => {
                      setShowPinScreen(1);
                      setConfirmOtp('');
                      setError('');
                    }}
                    variant="secondary"
                  />
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </AuthBackGround>
  );
};

export default CreateAccountPin;
