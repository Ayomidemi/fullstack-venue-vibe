'use client';

import React from 'react';
import { FaBell } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';
import { useRecoilValue } from 'recoil';
import { sessionAtom } from '@/state';

const NavBar = () => {
  const size = 5;
  const router = useRouter();

  const session = useRecoilValue(sessionAtom);
  const profile = session?.user;

  return (
    <div className={styles.navbar_wrapper}>
      <div className={styles.notifi_bell}>
        <FaBell color="#858585" size={20} />
        <p className={styles.badge}>{size}</p>
      </div>

      <div onClick={() => router.push('/settings')} className={styles.router_wrapper}>
        <div className={styles.profile_avatar}>
          <p>{profile?.username[0] || 'U'}</p>
        </div>

        <p>{profile?.profile?.firstName || 'User'}</p>
      </div>
    </div>
  );
};

export default NavBar;
