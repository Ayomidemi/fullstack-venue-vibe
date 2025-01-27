'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  forceLogIn?: boolean;
}

export const LogInAuthCheck = ({ forceLogIn }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (forceLogIn) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLogIn]);

  return <></>;
};
