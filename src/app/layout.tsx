import type { Metadata } from 'next';
import './globals.css';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
