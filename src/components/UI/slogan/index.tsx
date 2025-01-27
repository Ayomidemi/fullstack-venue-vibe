import React from 'react';

import styles from './index.module.scss';
import Image from 'next/image';

interface SloganProps {
  sloganStyles?: React.CSSProperties;
  ignoreMotto?: boolean;
}

const Slogan = ({ sloganStyles = {}, ignoreMotto = false }: SloganProps) => {
  return (
    <div className={styles.slogan_container} style={sloganStyles}>
      <Image
        src="https://res.cloudinary.com/easyshare-africa/image/upload/v1667409547/easyshare-assets/Frame_8689_sfkohq.svg"
        alt="EasyShare Slogan"
        className={styles.slogan_image}
        width={100}
        height={100}
      />

      {!ignoreMotto && (
        <p className={styles.slogan_text}>Enjoy the freedom of sharing using crypto</p>
      )}
    </div>
  );
};

export { Slogan };
