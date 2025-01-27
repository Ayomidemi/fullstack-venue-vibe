import React from 'react';

import { PageWrapper } from '@/components/page-wrapper';
import Dashboard from '@/features/dashboard/home';
import AuthGuard from '@/providers/auth-guard';

const DashboardPage = () => {
  return (
    <AuthGuard>
      <PageWrapper>
        <Dashboard />
      </PageWrapper>
    </AuthGuard>
  );
};

export default DashboardPage;
