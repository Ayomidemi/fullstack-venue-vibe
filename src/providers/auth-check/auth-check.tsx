'use client';

import { sessionAtom } from '@/state';
import { useRecoilState } from 'recoil';
import { useLocaleRouter } from '@/hooks';

interface AuthCheckProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}
export function AuthCheck({ children, href, className }: AuthCheckProps) {
  const [session] = useRecoilState(sessionAtom);
  const router = useLocaleRouter();

  const checkAuth = async () => {
    if (!session?.token) {
      router.push('/login');
    } else {
      router.push(href);
    }
  };
  return (
    <div className={className} onClick={checkAuth}>
      {children}
    </div>
  );
}
