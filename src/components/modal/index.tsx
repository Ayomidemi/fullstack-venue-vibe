'use client';

import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';

interface OverlayModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  maxWidth?: boolean;
  customStyles?: any;
}

const OverlayModal: React.FC<OverlayModalProps> = ({
  isOpen,
  onClose,
  children,
  maxWidth,
  customStyles,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const toggleBodyOverflow = (open: boolean) => {
    const body = document.body;
    if (body) {
      body.style.position = open ? 'fixed' : 'unset';
    }
  };

  const toggleFadeAnimation = (open: boolean) => {
    if (modalRef.current) {
      if (open) {
        modalRef.current.classList.add(styles.fade_in);
      } else {
        modalRef.current.classList.remove(styles.fade_in);
      }
    }
  };

  useEffect(() => {
    toggleBodyOverflow(isOpen);
    toggleFadeAnimation(isOpen);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className={`${styles.modal_overlay} `} onClick={onClose}>
          <div
            ref={modalRef}
            className={`${styles.modal_content} ${maxWidth && styles.max_modal_content}`}
            onClick={(e) => e.stopPropagation()}
            style={customStyles}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default OverlayModal;
