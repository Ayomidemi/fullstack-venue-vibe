'use client';

import { getSession } from '@/actions-server/auth';
import { sessionAtom } from '@/state';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export function useFetchSession() {
  const [session, setSession] = useRecoilState(sessionAtom);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const fetchedSession = await getSession();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setSession((fetchedSession as any) || null);
      } catch (error) {
        return error;
      }
    };

    fetchSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return session;
}
