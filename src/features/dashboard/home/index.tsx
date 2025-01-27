'use client';

import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { useRecoilValue } from 'recoil';

import { sessionAtom } from '@/state';
import { capitaliseText } from '@/utils';
import { useAccountActions } from '@/actions/my-account';

const Dashboard = () => {
  const session = useRecoilValue(sessionAtom);
  const profile = session?.user;
  const { fetchProfile } = useAccountActions();

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.dashboard_wrapper}>
      <h1 className={styles.profile_name}>Eventsssssss</h1>
    </div>
  );
};

export default Dashboard;
