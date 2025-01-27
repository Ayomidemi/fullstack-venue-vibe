import React from 'react';
import Image from 'next/image';

import styles from './index.module.scss';
import logo from '@/assets/group-logo.png';

const Slogan = () => {
  return (
    <div className={styles.slogan_container}>
      <Image src={logo} alt="Venue Vibe" className={styles.slogan_image} width={100} height={200} />
    </div>
  );
};

export { Slogan };
