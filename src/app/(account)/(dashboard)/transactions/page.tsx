import React from 'react';

import { PageWrapper } from '@/components/page-wrapper';
import AuthGuard from '@/providers/auth-guard';
import Transactions from '@/features/dashboard/transactions';

const TransactionsPage = () => {
  return (
    <AuthGuard>
      <PageWrapper>
        <Transactions />
      </PageWrapper>
    </AuthGuard>
  );
};

export default TransactionsPage;
