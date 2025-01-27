'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useLocaleRouter = () => {
  const router = useRouter();

  const push = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  const replace = useCallback(
    (path: string) => {
      router.replace(path);
    },
    [router],
  );

  return {
    ...router,
    push,
    replace,
  };
};
