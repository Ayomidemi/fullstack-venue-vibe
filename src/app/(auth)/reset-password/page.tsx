import React from 'react';

import GuestGuard from '@/providers/guest-guard/guest-guard';
import { PageWrapper } from '@/components/page-wrapper';
import ForgotPassword from '@/features/auth/reset-password';

const ForgotPasswordPage = () => {
  return (
    <GuestGuard>
      <PageWrapper>
        <ForgotPassword />
      </PageWrapper>
    </GuestGuard>
  );
};

export default ForgotPasswordPage;
