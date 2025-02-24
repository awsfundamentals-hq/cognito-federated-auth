import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Amazon Cognito Federated Authentication',
  description:
    'A tutorial application demonstrating how to implement federated authentication with Amazon Cognito and Google OAuth',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
