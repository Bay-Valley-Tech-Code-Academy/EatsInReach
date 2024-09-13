// src/app/layout.js
import './globals.css';
import { AuthProvider } from '../../context/authContext'; // Ensure this path is correct

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-screen w-full">
      <body className="min-h-screen w-full">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
