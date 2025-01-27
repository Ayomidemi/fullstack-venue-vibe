'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { Icon } from './Icons';
import { showWebHamburgerAtom } from '@/state';
import styles from './index.module.scss';
import { logout } from '@/actions-server/auth';
import { Storage } from '@/utils/storage';

const isWallet = (path: string) => /(send|receive|swap|buy|sell|wallet)/gi.test(path);

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
            <Image
              src="https://res.cloudinary.com/easyshare-africa/image/upload/v1667409547/easyshare-assets/Frame_8689_sfkohq.svg"
              width={166.25}
              height={35}
              alt="Logo"
            />
          </Link>

          <ul className={styles.links}>
            <li>
              <Link
                href="/home"
                className={classNames(styles.item, {
                  [styles.active]: pathname === '/home',
                })}>
                <div className={styles.iconWrapper}>
                  <Icon color={pathname === '/home' ? '#33d5ba' : '#686C73'} type="dashboard" />
                </div>
                <p>Dashboard</p>
              </Link>
            </li>

            <li>
              <Link
                href="/wallet"
                className={classNames(styles.item, {
                  [styles.active]: isWallet(pathname),
                })}>
                <div className={styles.iconWrapper}>
                  <Icon type="wallet" color={isWallet(pathname) ? '#33d5ba' : '#686C73'} />
                </div>
                <p>Wallet</p>
              </Link>
            </li>

            <li>
              <Link
                href="/p2p"
                className={classNames(styles.item, {
                  [styles.active]: pathname.toLowerCase().includes('/p2p'),
                })}>
                <div className={styles.iconWrapper}>
                  <Icon
                    type="p2p"
                    color={pathname.toLowerCase().includes('/p2p') ? '#33d5ba' : '#686C73'}
                  />
                </div>
                <p>Peer-to-Peer</p>
              </Link>
            </li>

            <li>
              <Link
                href="/invoice"
                className={classNames(styles.item, {
                  [styles.active]: pathname.toLowerCase().includes('/invoice'),
                })}>
                <div className={styles.iconWrapper}>
                  <Icon
                    type="invoice"
                    color={pathname.toLowerCase().includes('/invoice') ? '#33d5ba' : '#686C73'}
                  />
                </div>
                <p>Escrow</p>
              </Link>
            </li>

            <li>
              <Link
                href="/marketplace"
                className={classNames(styles.item, {
                  [styles.active]: pathname.toLowerCase().includes('/marketplace'),
                })}>
                <div className={styles.iconWrapper}>
                  <Icon
                    type="marketplace"
                    color={pathname.toLowerCase().includes('/marketplace') ? '#33d5ba' : '#686C73'}
                  />
                </div>
                <p>Marketplace</p>
              </Link>
            </li>

            <li>
              <Link
                href="/transactions"
                className={classNames(styles.item, {
                  [styles.active]: pathname.toLowerCase().includes('/transactions'),
                })}>
                <div className={styles.iconWrapper}>
                  <Icon
                    type="card"
                    color={pathname.toLowerCase().includes('/transactions') ? '#33d5ba' : '#686C73'}
                  />
                </div>
                <p>Transactions</p>
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
                    color={pathname.toLowerCase().includes('/referral') ? '#33d5ba' : '#686C73'}
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
                    color={pathname.toLowerCase().includes('/settings') ? '#33d5ba' : '#686C73'}
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
