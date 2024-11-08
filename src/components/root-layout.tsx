import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';

import { Toaster } from '@/components/ui/sonner';

import { cn } from '@/utils/cn';

import '@/styles/globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(geistSans.variable, geistMono.variable, ' antialiased')}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Toaster position="top-right" theme="light" richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
