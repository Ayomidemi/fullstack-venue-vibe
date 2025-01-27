'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { CaretDownIcon } from '../UI/icons/icons';
import Input from '../input-field';

type Props = {
  options?: never[] | any;
  onSelect?: any | unknown;
  label?: string;
  defaultValue?: never[] | any;
  name?: string;
  haveCheckbox?: boolean;
  loading?: boolean;
  size?: string;
  error?: string;
  searchableAction?: any | undefined;
  helperText?: string;
  required?: boolean;
  hideSearch?: boolean;
  fontSize?: boolean;
};

const Dropdown = ({
  options,
  onSelect,
  label,
  defaultValue,
  name,
  haveCheckbox,
  loading,
  size = 'lg',
  error,
  helperText,
  required,
  hideSearch,
  fontSize = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<React.MutableRefObject<null> | any>(null);
  const [selected, setSelected] = useState<unknown | any>(null);
  const [checked, setChecked] = useState<unknown | any>([]);
  const [filterableOption, setFilterableOption] = useState(options);

  useEffect(() => {
    setFilterableOption(options);
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        // setFilterableOption(filterableOption);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleOptionClick = (option: React.SetStateAction<null>) => {
    setSelected(option);
    if (name) {
      onSelect(option, name);
    } else {
      onSelect(option);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (!haveCheckbox) {
      setSelected(defaultValue || null);
    }
    if (haveCheckbox) {
      setChecked(defaultValue || []);
    }
  }, [defaultValue]);

  const handleSearch = async (val: string) => {
    const filteredOptions = options.filter((option: string) =>
      option.toLowerCase().includes(val.toLowerCase()),
    );
    setFilterableOption(filteredOptions);
  };

  const handleSelect = (option: unknown | any) => {
    if (haveCheckbox) {
      if (checked.includes(option)) {
        setChecked(checked.filter((c: string) => c !== option));
        onSelect(checked.filter((c: string) => c !== option));
      } else {
        setChecked([...checked, option]);
        onSelect([...checked, option]);
      }
      setFilterableOption(options);
      return;
    }
    handleOptionClick(option);
  };

  return (
    <>
      <div ref={dropdownRef} className={`${styles.input_wrap}`}>
        <p className={styles.top_label} style={{ color: '#00000099' }}>
          {label}
          {required && <span style={{ color: 'red', marginLeft: '2px' }}>*</span>}
        </p>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`${styles.button_wrap} ${error && styles.error}`}>
          {selected && (
            <p
              className={styles.label}
              style={{
                color: '#00000099',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                right: '10px',
              }}>
              <span>{selected}</span>
            </p>
          )}
          {haveCheckbox && checked?.length > 0 && (
            <p className={styles.label} style={{ color: '#00000099' }}>
              {haveCheckbox && `${checked?.length} selected`}
            </p>
          )}
          <p className={styles.caret}>
            <CaretDownIcon color="#000000" />
          </p>
        </button>

        {isOpen && (
          <div
            style={{ width: '100%', background: '#FFFFFF', zIndex: '100' }}
            className={styles.drpdwn_wrap}>
            <div className={styles.sticky}>
              {haveCheckbox && (
                <div className={styles.selectAllWrap}>
                  <button
                    onClick={() => {
                      setChecked(options);
                      onSelect(options);
                    }}>
                    Select all
                  </button>
                  <button
                    onClick={() => {
                      setChecked([]);
                      onSelect([]);
                    }}>
                    Clear
                  </button>
                </div>
              )}

              <div className={styles.drpdwn_inpt}>
                {!hideSearch && (
                  <Input
                    name="name"
                    placeholder="Search"
                    onChange={(val) => handleSearch(val.value)}
                    size={size}
                  />
                )}
              </div>
            </div>
            <div className={styles.optionsWrap} style={{ opacity: loading ? '0.3' : '1' }}>
              {filterableOption &&
                filterableOption.map(
                  (
                    option:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined,
                    index: React.Key | null | undefined,
                  ) => (
                    <button key={index} className={styles.btn} onClick={() => handleSelect(option)}>
                      {haveCheckbox && (
                        <input
                          className={styles.checkbox}
                          type="checkbox"
                          name=""
                          id=""
                          checked={checked.includes(option)}
                        />
                      )}
                      <span>{option}</span>
                    </button>
                  ),
                )}
              {filterableOption && filterableOption?.length < 1 && (
                <span style={{ textAlign: 'center', fontSize: '14px' }}>No data</span>
              )}
            </div>
          </div>
        )}
      </div>

      {helperText && (
        <p
          style={{
            paddingLeft: '17px',
            marginTop: '5px',
            fontSize: '12px',
            color: '#d32f2f',
            marginBottom: '0px',
          }}>
          {helperText}
        </p>
      )}
    </>
  );
};

export default Dropdown;
