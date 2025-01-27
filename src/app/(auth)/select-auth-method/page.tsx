import React from 'react';

import { PageWrapper } from '@/components/page-wrapper';
import SelectAuthMethod from '@/features/auth/select-auth-method';

const SelectAuthMethodPage = () => {
  return (
    <PageWrapper>
      <SelectAuthMethod />
    </PageWrapper>
  );
};

export default SelectAuthMethodPage;
