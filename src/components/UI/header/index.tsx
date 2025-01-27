import React from 'react';
import styles from './index.module.scss';

interface HeaderProps {
  label?: string;
  labelStyles?: React.CSSProperties;
  useLabelStyles?: boolean;
  children?: React.ReactNode;
  containerStyles?: React.CSSProperties;
}

const Header: React.FC<HeaderProps> = ({
  label = 'Header',
  useLabelStyles = false,
  labelStyles = {},
  children,
  containerStyles = {},
}) => {
  return (
    <div className={styles.header_container} style={containerStyles}>
      {label && (
        <h2 className={styles.header_label} style={useLabelStyles ? labelStyles : undefined}>
          {label}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Header;
