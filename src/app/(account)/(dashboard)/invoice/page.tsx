import React from 'react';

import { PageWrapper } from '@/components/page-wrapper';
import Invoice from '@/features/dashboard/invoice';
import AuthGuard from '@/providers/auth-guard';

const InvoicePage = () => {
  return (
    <AuthGuard>
      <PageWrapper>
        <Invoice />
      </PageWrapper>
    </AuthGuard>
  );
};

export default InvoicePage;
