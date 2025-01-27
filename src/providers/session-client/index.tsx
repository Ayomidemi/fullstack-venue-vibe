'use client';

import { ISession } from '@/interface';
import { sessionAtom } from '@/state';
import React, { ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';

const SessionClient = ({ session, children }: { children: ReactNode; session: ISession }) => {
  const setSession = useSetRecoilState(sessionAtom);
  setSession(session);

  return <>{children}</>;
};

export default SessionClient;
