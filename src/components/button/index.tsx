'use client';
import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { Spinner } from '../spinner';

interface ButtonProps {
  label: string | React.JSX.Element;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'transparent';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled,
  loading,
  type = 'button',
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles[variant], styles.btn)}
      disabled={disabled || loading}
      style={{ opacity: loading ? 0.7 : 1 }}
      type={type}>
      <>{label}</>
      {loading && (
        <span className={styles.loader}>
          <Spinner color="#ffffff" size={15} />
        </span>
      )}
    </button>
  );
};

export default Button;
