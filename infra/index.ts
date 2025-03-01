// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./../.sst/platform/config.d.ts" />

const getEnvOrThrow = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Please set the environment variable for ${key}.`);
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

  new aws.cognito.UserPoolDomain('user-pool-domain', {
    domain: getEnvOrThrow('COGNITO_USER_POOL_DOMAIN'),
    userPoolId: userPool.id,
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

  const oAuthScopes = ['email', 'openid', 'profile'];
  const oAuthFlow = 'code';
  const userPoolClient = new aws.cognito.UserPoolClient('user-pool-client', {
    userPoolId: userPool.id,
    generateSecret: false,
    callbackUrls: [getEnvOrThrow('COGNITO_CALLBACK_URL')],
    logoutUrls: [getEnvOrThrow('COGNITO_LOGOUT_URL')],
    allowedOauthFlows: [oAuthFlow],
    allowedOauthFlowsUserPoolClient: true,
    allowedOauthScopes: oAuthScopes,
    supportedIdentityProviders: [idpGoogle.providerName],
    enableTokenRevocation: true,
    explicitAuthFlows: ['ALLOW_USER_SRP_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH', 'ALLOW_USER_PASSWORD_AUTH'],
    preventUserExistenceErrors: 'ENABLED',
  });

  new sst.aws.Nextjs('frontend', {
    environment: {
      NEXT_PUBLIC_AUTHORITY: $interpolate`https://cognito-idp.${getEnvOrThrow('AWS_REGION')}.amazonaws.com/${userPool.id}`,
      NEXT_PUBLIC_CLIENT_ID: userPoolClient.id,
      NEXT_PUBLIC_REDIRECT_URI: getEnvOrThrow('COGNITO_REDIRECT_URI'),
      NEXT_PUBLIC_RESPONSE_TYPE: oAuthFlow,
      NEXT_PUBLIC_SCOPE: oAuthScopes.join(' '),
      NEXT_PUBLIC_COGNITO_USER_POOL_ID: userPool.id,
    },
  });
}
