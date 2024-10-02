import './globals.css';
import { AuthProvider } from '../../context/authContext';

export const metadata = {
  title: 'Eats in Reach',
  icons: {
    icon: '/images/actual_logo.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-screen w-full">
      <head>
        <link rel="icon" href="/images/actual_logo.ico" />
        <meta name="theme-color" content="#AAD15F" />
      </head>
      <body className="min-h-screen w-full">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}