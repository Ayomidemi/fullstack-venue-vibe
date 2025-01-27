import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { AiOutlineCheck } from 'react-icons/ai';

interface CheckboxProps {
  checked?: boolean;
  label?: string;
  name: string;
  onChange?: (val: boolean, name: string) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, name, onChange, checked }) => {
  const [isCheck, setIsCheck] = useState<string[]>(['']);

  const handleCheck = () => {
    const isChecked = isCheck.indexOf('check') > -1;
    const updatedCheck = isChecked
      ? isCheck.filter((val) => val !== 'check')
      : ['check', ...isCheck];

    setIsCheck(updatedCheck);

    if (onChange) {
      onChange(!isChecked, name);
    }
  };

  useEffect(() => {
    if (checked) {
      setIsCheck(['check']);
    }
  }, [checked]);

  return (
    <div className={styles.top_filter}>
      <div className={styles.radio_element} onClick={handleCheck}>
        <div className={`${styles.radio} ${isCheck?.indexOf('check') > -1 ? styles.selected : ''}`}>
          {isCheck?.indexOf('check') > -1 && <AiOutlineCheck />}
        </div>
        <label>{label}</label>
      </div>
    </div>
  );
};

export default Checkbox;
