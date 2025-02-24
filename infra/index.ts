// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./../.sst/platform/config.d.ts" />

const getEnvOrThrow = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
};

export function createInfra() {
  const userPool = new aws.cognito.UserPool('identity-pool', {
    passwordPolicy: {
      minimumLength: 8,
      requireLowercase: false,
      requireNumbers: false,
      requireSymbols: false,
      requireUppercase: false,
    },
    autoVerifiedAttributes: ['email'],
    accountRecoverySetting: {
      recoveryMechanisms: [
        {
          name: 'verified_email',
          priority: 1,
        },
      ],
    },
  });

  const idpGoogle = new aws.cognito.IdentityProvider('idp-google', {
    userPoolId: userPool.id,
    providerName: 'Google',
    providerType: 'Google',
    providerDetails: {
      client_id: getEnvOrThrow('GOOGLE_OAUTH_CLIENT_ID'),
      client_secret: getEnvOrThrow('GOOGLE_OAUTH_CLIENT_SECRET'),
      authorize_scopes: 'openid profile email',
    },
    attributeMapping: {
      email: 'email',
      username: 'sub',
    },
  });

  const userPoolClient = new aws.cognito.UserPoolClient('user-pool-client', {
    userPoolId: userPool.id,
    generateSecret: false,
    callbackUrls: ['http://localhost:3000'],
    allowedOauthFlows: ['code'],
    allowedOauthFlowsUserPoolClient: true,
    allowedOauthScopes: ['email', 'openid', 'profile'],
    supportedIdentityProviders: [idpGoogle.providerName],
  });

  new sst.aws.Nextjs('frontend', {
    environment: {
      NEXT_PUBLIC_COGNITO_USER_POOL_ID: userPool.id,
      NEXT_PUBLIC_COGNITO_USER_POOL_NAME: userPool.name,
      NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID: userPoolClient.id,
      NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID: getEnvOrThrow('GOOGLE_OAUTH_CLIENT_ID'),
    },
  });
}
