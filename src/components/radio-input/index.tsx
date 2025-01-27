import classNames from 'classnames';
import styles from './index.module.scss';
import { FaCircleCheck } from 'react-icons/fa6';
import { FaRegCircle } from 'react-icons/fa';

interface Props {
  title: string;
  description?: string;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  disabled?: boolean;
}

const RadioInput = ({ title, description, selected, onSelect, disabled }: Props) => {
  return (
    <div
      className={classNames(
        styles.wrapper,
        selected && styles.selected,
        disabled && styles.disabled,
      )}
      onClick={() => {
        if (!disabled) {
          onSelect?.(selected || false);
        }
      }}>
      <div className={styles.textSection}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className={styles.radio}>
        {selected ? (
          <FaCircleCheck size={20} color="#33d5ba" />
        ) : (
          <FaRegCircle size={20} color="#B8B8B8" />
        )}
      </div>
    </div>
  );
};

export default RadioInput;
