import React from 'react';

import { PageWrapper } from '@/components/page-wrapper';
import AuthGuard from '@/providers/auth-guard';

const P2PQuickTradeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <PageWrapper>{children}</PageWrapper>
    </AuthGuard>
  );
};

export default P2PQuickTradeLayout;
