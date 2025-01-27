import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import RecoilContextProvider from '@/providers/recoil-provider/recoil-provider';
import SessionClient from '@/providers/session-client';
import { ISession } from '@/interface';
import { getSession } from '@/actions-server/auth';
import styles from '@/global-style/index.module.scss';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'Venue.Vibe';
const APP_DEFAULT_TITLE = 'Venue.Vibe';
const APP_TITLE_TEMPLATE = '%s - Venue.Vibe';
const APP_DESCRIPTION =
  'Venue.Vibe is an application designed to help event center managers streamline the process of accepting applications to use their facilities. It simplifies scheduling by automatically detecting booking conflicts and providing smart suggestions for available dates.';

export const metadata: Metadata = {
  keywords: 'Events, Ticket, Venue',
  icons: {
    icon: '/favicon.ico',
  },

  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: ISession = await getSession();

  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.app}`} style={{ margin: 0 }}>
        <RecoilContextProvider>
          <SessionClient session={session}>{children}</SessionClient>
          <Toaster />
        </RecoilContextProvider>
      </body>
    </html>
  );
}
