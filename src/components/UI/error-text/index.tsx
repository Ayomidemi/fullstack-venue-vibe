import React from 'react';
import styles from './index.module.scss';
import { WarningIcon } from '@/components/UI/icons/icons';

interface ErrorProps {
  message?: string;
  errorStyles?: React.CSSProperties;
  retry?: () => void;
  retryStyles?: React.CSSProperties;
}

export const ErrorMessage: React.FC<ErrorProps> = ({
  message = 'Error',
  errorStyles = {},
  retry,
  retryStyles = {},
}) => {
  return (
    <>
      <p className={styles.error_text} style={errorStyles}>
        {message}
      </p>
      {retry && (
        <button className={styles.retry_button} style={retryStyles} onClick={retry}>
          Retry
        </button>
      )}
    </>
  );
};

interface ErrorWithIconProps {
  message?: string;
  boxStyles?: React.CSSProperties;
  textStyles?: React.CSSProperties;
  retry?: () => void;
  retryStyles?: React.CSSProperties;
}

export const ErrorMessageWithIcon: React.FC<ErrorWithIconProps> = ({
  message = 'Error',
  boxStyles = {},
  textStyles = {},
  retry,
  retryStyles = {},
}) => {
  return (
    <div className={styles.error_box} style={boxStyles}>
      <div className={styles.icon_container}>
        <WarningIcon fill="#FF4D3D" />
      </div>
      <p className={styles.error_txt} style={textStyles}>
        {message}
      </p>
      {retry && (
        <button className={styles.retry_btn} style={retryStyles} onClick={retry}>
          Retry
        </button>
      )}
    </div>
  );
};
