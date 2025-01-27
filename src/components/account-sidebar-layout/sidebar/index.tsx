'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { Icon } from './Icons';
import { showWebHamburgerAtom } from '@/state';
import styles from './index.module.scss';
import { logout } from '@/actions-server/auth';
import { Storage } from '@/utils/storage';
import logo from '@/assets/group-logo.png';

const hasToggler = (path: string) =>
  ['referrals', '/transactions', '/wallet', '/home'].some((segment) =>
    path.toLowerCase().endsWith(segment),
  );

const hasShadow = () => true;

const SideNav = ({ navbarColor }: { navbarColor?: boolean }) => {
  const showWebHamburger = useRecoilValue(showWebHamburgerAtom);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  const toggle = () => {
    setIsNavOpen((prev) => !prev);
  };

  const onLogout = async () => {
    await Storage.setItem('lastPathBeforeLogOut', pathname);
    logout();
  };

  useEffect(() => {
    const resize = () => setIsNavOpen(false);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <>
      <div
        onClick={toggle}
        className={classNames(styles.overlay, {
          [styles.open]: isNavOpen,
        })}
      />

      <aside
        className={classNames(styles.sidebar, {
          [styles.open]: isNavOpen,
          [styles.hasShadow]: hasShadow(),
        })}>
        <nav className={styles.content}>
          <Link href="/home" className={styles.logo}>
            <Image src={logo} width={175} height={50} alt="Logo" />
          </Link>

          <ul className={styles.links}>
            <li>
              <Link
                href="/home"
                className={classNames(styles.item, {
                  [styles.active]: pathname === '/home',
                })}>
                <div className={styles.iconWrapper}>
                  <Icon color={pathname === '/home' ? '#0476EE' : '#686C73'} type="dashboard" />
                </div>
                <p>Events</p>
              </Link>
            </li>

            <li>
              <Link
                href="/my-centers"
                className={classNames(styles.item, {
                  [styles.active]: pathname.toLowerCase().includes('/my-centers'),
                })}>
                <div className={styles.iconWrapper}>
                  <Icon
                    type="my-centers"
                    color={pathname.toLowerCase().includes('/my-centers') ? '#0476EE' : '#686C73'}
                  />
                </div>
                <p>My Centers</p>
              </Link>
            </li>

            <li>
              <Link
                href="/history"
                className={classNames(styles.item, {
                  [styles.active]: pathname.toLowerCase().includes('/history'),
                })}>
                <div className={styles.iconWrapper}>
                  <Icon
                    type="card"
                    color={pathname.toLowerCase().includes('/history') ? '#0476EE' : '#686C73'}
                  />
                </div>
                <p>History</p>
              </Link>
            </li>

            <li>
              <Link
                href="/referral"
                className={classNames(styles.item, {
                  [styles.active]: pathname.toLowerCase().includes('/referral'),
                })}>
                <div className={styles.iconWrapper}>
                  <Icon
                    type="group"
                    color={pathname.toLowerCase().includes('/referral') ? '#0476EE' : '#686C73'}
                  />
                </div>
                <p>Referral</p>
              </Link>
            </li>

            <li>
              <Link
                href="/settings"
                className={classNames(styles.item, {
                  [styles.active]: pathname.toLowerCase().includes('/settings'),
                })}>
                <div className={styles.iconWrapper}>
                  <Icon
                    type="settings"
                    color={pathname.toLowerCase().includes('/settings') ? '#0476EE' : '#686C73'}
                  />
                </div>
                <p>Settings</p>
              </Link>
            </li>

            <li>
              <a onClick={onLogout} className={classNames(styles.item, styles.logout)}>
                <div className={styles.iconWrapper}>
                  <Icon type="logout" color="#FF4D3D" />
                </div>
                <p style={{ color: '#FF4D3D' }}>Sign out</p>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {(hasToggler(pathname) || showWebHamburger) && (
        <span
          className={classNames(styles.toggler, navbarColor ? styles.white : undefined)}
          onClick={toggle}>
          &#9776;
        </span>
      )}
    </>
  );
};

export default SideNav;
