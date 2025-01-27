import React from 'react';

import { PageWrapper } from '@/components/page-wrapper';
import AuthGuard from '@/providers/auth-guard';
import Referral from '@/features/dashboard/referral';

const ReferralPage = () => {
  return (
    <AuthGuard>
      <PageWrapper>
        <Referral />
      </PageWrapper>
    </AuthGuard>
  );
};

export default ReferralPage;
