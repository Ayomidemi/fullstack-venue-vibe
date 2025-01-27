import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
