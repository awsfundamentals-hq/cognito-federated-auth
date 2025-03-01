# Amazon Cognito Federated Authentication Demo

This project demonstrates how to implement federated authentication with Amazon Cognito and Google OAuth using Next.js and SST (Serverless Stack) v3.

## Getting Started

To run this application, follow these steps:

1. Ensure you have Node.js installed on your system.
2. Clone this repository to your local machine.
3. Install the dependencies by running `pnpm i` in the project root directory.
4. Create a `.env` file in the root directory with the following variables:
   ```
   COGNITO_USER_POOL_DOMAIN=your-domain-prefix
   GOOGLE_OAUTH_CLIENT_ID=your-google-client-id
   GOOGLE_OAUTH_CLIENT_SECRET=your-google-client-secret
   ```
5. Start the development server by running:

   ```
   npx sst dev
   ```

This command will deploy the application to your AWS account and start the local development environment.

## About the Project

This application is built using SST v3, which provides a powerful framework for building serverless applications on AWS.

It showcases a simple authentication flow that uses Amazon Cognito as the identity provider with Google OAuth integration. The app allows users to:

- Sign in with their Google account
- View their authentication details
- Sign out

## Project Structure

- `sst.config.ts`: SST configuration file
- `infra/index.ts`: Infrastructure setup with AWS Cognito resources
- `app/page.tsx`: Main Next.js page for the frontend
- `app/auth/page.tsx`: Authentication callback page
- `app/components/GoogleSignInButton.tsx`: Component for Google sign-in functionality
- `app/components/AuthProviderWrapper.tsx`: OIDC authentication provider wrapper
- `app/lib/types.ts`: TypeScript type definitions
- `app/lib/utils.ts`: Utility functions

## AWS Resources

This project sets up the following AWS resources:

- Amazon Cognito User Pool: Manages user authentication and identity
- Cognito User Pool Domain: Provides a hosted UI for authentication
- Cognito Identity Provider: Configures Google as a federated identity provider
- Cognito User Pool Client: Configures the application client for authentication

## Learn More

To learn more about the technologies used in this project:

- [SST documentation](https://docs.sst.dev/)
- [Amazon Cognito documentation](https://docs.aws.amazon.com/cognito/)
- [Next.js documentation](https://nextjs.org/docs)
- [React OIDC Context](https://github.com/authts/react-oidc-context)
