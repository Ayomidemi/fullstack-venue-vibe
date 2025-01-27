import React from 'react';

import { PageWrapper } from '@/components/page-wrapper';
import AuthGuard from '@/providers/auth-guard';
import P2P from '@/features/dashboard/p2p';

const P2PPage = () => {
  return (
    <AuthGuard>
      <PageWrapper>
        <P2P />
      </PageWrapper>
    </AuthGuard>
  );
};

export default P2PPage;
