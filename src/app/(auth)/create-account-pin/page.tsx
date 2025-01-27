import React from 'react';

import { PageWrapper } from '@/components/page-wrapper';
import VerifyEmail from '@/features/auth/verify-email';
import CreateAccountPin from '@/features/auth/create-account-pin';

const CreateAccuntPinPage = () => {
  return (
    <PageWrapper>
      <CreateAccountPin />
    </PageWrapper>
  );
};

export default CreateAccuntPinPage;
