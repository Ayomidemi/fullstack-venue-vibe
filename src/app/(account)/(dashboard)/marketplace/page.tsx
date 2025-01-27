import React from 'react';

import { PageWrapper } from '@/components/page-wrapper';
import AuthGuard from '@/providers/auth-guard';
import MarketPlace from '@/features/dashboard/marketplace';

const MarketPlacePage = () => {
  return (
    <AuthGuard>
      <PageWrapper>
        <MarketPlace />
      </PageWrapper>
    </AuthGuard>
  );
};

export default MarketPlacePage;
