import type { Metadata } from 'next';
import { AuthProviderWrapper } from './components/AuthProviderWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'Amazon Cognito Federated Authentication',
  description: 'A tutorial application demonstrating how to implement federated authentication with Amazon Cognito and Google OAuth',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cognitoAuthConfig = {
    authority: `https://cognito-idp.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
    client_id: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID!,
    redirect_uri: 'http://localhost:3000/auth',
    response_type: 'code',
    scope: 'email openid profile',
  };

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AuthProviderWrapper config={cognitoAuthConfig}>{children}</AuthProviderWrapper>
      </body>
    </html>
  );
}
