import React from 'react';

import { PageWrapper } from '@/components/page-wrapper';
import AuthGuard from '@/providers/auth-guard';
import Wallet from '@/features/dashboard/wallet';

const WalletPage = () => {
  return (
    <AuthGuard>
      <PageWrapper>
        <Wallet />
      </PageWrapper>
    </AuthGuard>
  );
};

export default WalletPage;
