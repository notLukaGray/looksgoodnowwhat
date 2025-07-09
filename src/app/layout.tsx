import './globals.css';
import { Lora, IBM_Plex_Mono, Inter } from 'next/font/google';
import NavMenu from '../components/NavMenu';
import { getNavItems } from '../lib/chapters';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '700'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '700', '900'],
});

export const metadata = {
  title: 'Looks Good, Now What',
  description: 'A book by Luka Gray',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = getNavItems();

  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${ibmPlexMono.variable} ${inter.variable} antialiased bg-[#dfdfdf] text-[#222]`}
      >
        <NavMenu navItems={navItems} />
        {children}
      </body>
    </html>
  );
}
