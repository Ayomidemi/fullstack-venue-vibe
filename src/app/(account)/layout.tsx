import React from 'react';

// import AuthGuard from '@/providers/auth-guard';
import { PageWrapper } from '@/components/page-wrapper';
import AccountSideBar from '@/components/account-sidebar-layout';

const AccountLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PageWrapper>
        <AccountSideBar>{children}</AccountSideBar>
      </PageWrapper>
    </div>
  );
};

export default AccountLayout;
