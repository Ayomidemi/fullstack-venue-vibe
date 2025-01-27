import React from 'react';

import { PageWrapper } from '@/components/page-wrapper';
import Dashboard from '@/features/dashboard/home';
import AuthGuard from '@/providers/auth-guard';
import Settings from '@/features/dashboard/settings';

const SettingsPage = () => {
  return (
    <AuthGuard>
      <PageWrapper>
        <Settings />
      </PageWrapper>
    </AuthGuard>
  );
};

export default SettingsPage;
