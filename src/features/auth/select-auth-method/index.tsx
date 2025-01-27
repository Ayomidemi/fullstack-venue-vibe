'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from '../verify-email/index.module.scss';
import { AuthBackGround } from '@/components/UI/auth-background';
import { Slogan } from '@/components/UI/slogan';
import Header from '@/components/UI/header';

import Button from '@/components/button';
import { useAccountActions } from '@/actions/my-account';
import { ErrorMessageWithIcon } from '@/components/UI/error-text';
import toast from 'react-hot-toast';
import RadioInput from '@/components/radio-input';
import { useRecoilValue } from 'recoil';
import { profileAtom } from '@/state';

const SelectAuthMethod = () => {
  const { push } = useRouter();
  const user = useRecoilValue(profileAtom);

  const { editProfileInformation } = useAccountActions();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState('');

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    const res = await editProfileInformation({
      preferred2faMethod: authMethod,
    });

    if (res) {
      toast.success('Your authentication method was successfully updated.');
      push('/home');
    } else {
      setError(res);
    }
  };

  useEffect(() => {
    setAuthMethod(user?.preferred2faMethod);
  }, [user]);

  return (
    <AuthBackGround>
      <div className={styles.login_container}>
        <Slogan />

        <div className={styles.login_white_container}>
          <Header label="Set preferred login method" />

          <h6
            className={styles.login_subheader}
            style={{
              fontSize: '14px',
              color: '#54545',
              marginBottom: '3em',
              lineHeight: '22px',
            }}>
            Your preferred login method would determine how we prompt you to log in.
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
            <div className={styles.login_select_container}>
              <RadioInput
                title="Always ask for OTP"
                description="We would send a one time password to your registered mail for every time you login"
                selected={authMethod === 'email'}
                onSelect={() => setAuthMethod('email')}
              />
            </div>

            <div className={styles.login_select_container}>
              <RadioInput
                title="Use transaction pin"
                description="We would ask for your transaction pin every time you login."
                selected={authMethod === 'pin'}
                onSelect={() => setAuthMethod('pin')}
              />
            </div>

            <div className={styles.login_btn}>
              <Button
                label="Continue"
                onClick={handleSubmit}
                variant="primary"
                disabled={!authMethod}
                loading={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </AuthBackGround>
  );
};

export default SelectAuthMethod;
