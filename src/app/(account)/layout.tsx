import React from 'react';

import AuthGuard from '@/providers/auth-guard';
import { PageWrapper } from '@/components/page-wrapper';
import AccountSideBar from '@/components/account-sidebar-layout';

const AccountLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <PageWrapper>
        <AccountSideBar>{children}</AccountSideBar>
      </PageWrapper>
    </AuthGuard>
  );
};

export default AccountLayout;
