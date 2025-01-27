import FourZeroFour from '@/components/404.tsx';
import AccountSideBar from '@/components/account-sidebar-layout';
import { PageWrapper } from '@/components/page-wrapper';

async function page() {
  return (
    <PageWrapper>
      <AccountSideBar>
        <FourZeroFour />
      </AccountSideBar>
    </PageWrapper>
  );
}

export default page;
