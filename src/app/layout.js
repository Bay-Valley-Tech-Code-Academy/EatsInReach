import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-screen w-full">
      <body className="min-h-screen w-full">{children}</body>
    </html>
  );
}
