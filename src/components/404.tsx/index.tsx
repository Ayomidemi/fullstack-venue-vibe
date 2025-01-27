'use client';

import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

const FourZeroFour = () => {
  const router = useRouter();

  const goBack = () => {
    router.push('/home');
  };

  return (
    <div className={styles.fof_wrapper}>
      <img src="https://media.istockphoto.com/id/1481759725/photo/404-error-isolated-on-white-background-page-not-found.jpg?b=1&s=612x612&w=0&k=20&c=ZIGCrMopTruE2iVrx75VqXxb_PJMMcHDPTEwUIlnvQ8=" />

      <h1>Well, this is awkward…</h1>
      <p>
        The page you were searching for must have moved. How about we head{' '}
        <span onClick={goBack}>home</span> instead?
      </p>
    </div>
  );
};

export default FourZeroFour;
