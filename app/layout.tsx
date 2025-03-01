import type { Metadata } from 'next';
import { AuthProviderWrapper } from './components/AuthProviderWrapper';
import './globals.css';
import { AuthConfig } from './lib/types';

export const metadata: Metadata = {
  title: 'Amazon Cognito Federated Authentication',
  description: 'A tutorial application demonstrating how to implement federated authentication with Amazon Cognito and Google OAuth',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cognitoAuthConfig: AuthConfig = {
    authority: process.env.NEXT_PUBLIC_AUTHORITY!,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
    response_type: process.env.NEXT_PUBLIC_RESPONSE_TYPE!,
    scope: process.env.NEXT_PUBLIC_SCOPE!,
  };

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AuthProviderWrapper config={cognitoAuthConfig}>{children}</AuthProviderWrapper>
      </body>
    </html>
  );
}
