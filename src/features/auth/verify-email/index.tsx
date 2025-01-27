'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import styles from './index.module.scss';
import { AuthBackGround } from '@/components/UI/auth-background';
import { Slogan } from '@/components/UI/slogan';
import Header from '@/components/UI/header';

import Button from '@/components/button';
import { useHelpDeskConcealer } from '@/hooks';
import { useAccountActions } from '@/actions/my-account';

const VerifyEmail = () => {
  const { push } = useRouter();
  const token = useSearchParams().get('token');

  const { concealHelpDesk } = useHelpDeskConcealer();
  const { verifyRegister } = useAccountActions();

  useEffect(() => {
    if (token) {
      const verify = async () => {
        await verifyRegister(token);
      };

      verify();
    }
  }, [token]);

  useEffect(() => {
    concealHelpDesk();
  }, []);

  return (
    <AuthBackGround>
      <div className={styles.login_container}>
        <Slogan />

        <div className={styles.login_white_container}>
          <>
            <Header label="Account Successfully Created" />

            <h6
              className={styles.login_subheader}
              style={{ fontSize: '14px', color: '#54545', marginBottom: '3em' }}>
              You have successfully verified your email.
            </h6>

            <form className={styles.login_form}>
              <div className={styles.login_btn}>
                <Button
                  label="Continue to EasyShare.Global"
                  onClick={() => push('/login')}
                  variant="primary"
                />
              </div>
            </form>
          </>
        </div>
      </div>
    </AuthBackGround>
  );
};

export default VerifyEmail;
