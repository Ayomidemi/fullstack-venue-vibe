import { PageWrapper } from '@/components/page-wrapper';
import CompleteProfile from '@/features/auth/complete-profile';
import AuthGuard from '@/providers/auth-guard';
import React from 'react';

const CompleteProfilePage = () => {
  return (
    <AuthGuard>
      <PageWrapper>
        <CompleteProfile />
      </PageWrapper>
    </AuthGuard>
  );
};

export default CompleteProfilePage;
