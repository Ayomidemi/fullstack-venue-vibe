'use client';

import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

interface AuthBackGroundProps {
  children: React.ReactNode;
  type?: number;
  paddingTop?: number;
}

const images = (type = 1) => ({
  mobile_bg: {
    uri:
      type === 1
        ? 'https://res.cloudinary.com/easyshare-africa/image/upload/v1648481548/easyshare-assets/auth-blur-bg-mobile_hjcgdg.png'
        : 'https://res.cloudinary.com/easyshare-africa/image/upload/c_scale,h_480,q_100,w_350/v1641944904/easyshare-assets/auth2Bg_jd9mzr.png',
    width: 375,
    height: 812,
  },
  large_bg: {
    uri: 'https://res.cloudinary.com/easyshare-africa/image/upload/v1648481411/easyshare-assets/auth-blur-bg_xyasgj.png',
    width: 1440,
    height: 1024,
  },
});

const AuthBackGround = ({ children, type = 1, paddingTop = 0 }: AuthBackGroundProps) => {
  const [bg, setBg] = useState(images(type).mobile_bg);

  useEffect(() => {
    const handleResize = () => {
      setBg(window.innerWidth < 768 ? images(type).mobile_bg : images(type).large_bg);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [type]);

  return (
    <div
      className={styles.auth_background}
      style={{
        backgroundImage: `url(${bg.uri})`,
        paddingTop: paddingTop,
      }}>
      <div className={styles.overlay}>{children}</div>
    </div>
  );
};

export { AuthBackGround };
