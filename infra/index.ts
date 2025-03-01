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

  const userPoolClient = new aws.cognito.UserPoolClient('user-pool-client', {
    userPoolId: userPool.id,
    generateSecret: false,
    callbackUrls: ['http://localhost:3000/auth'],
    logoutUrls: ['http://localhost:3000/logout'],
    allowedOauthFlows: ['code'],
    allowedOauthFlowsUserPoolClient: true,
    allowedOauthScopes: ['email', 'openid', 'profile'],
    supportedIdentityProviders: [idpGoogle.providerName],

    // Enable the hosted UI
    enableTokenRevocation: true,
    explicitAuthFlows: ['ALLOW_USER_SRP_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH', 'ALLOW_USER_PASSWORD_AUTH'],
    preventUserExistenceErrors: 'ENABLED',
  });

  const idpConfig = {
    authority: $interpolate`https://cognito-idp.${getEnvOrThrow('AWS_REGION')}.amazonaws.com/${userPool.id}`,
    client_id: userPoolClient.id,
    redirect_uri: 'http://localhost:3000/auth',
    response_type: 'code',
    scope: 'email openid profile',
  };

  new sst.aws.Nextjs('frontend', {
    environment: {
      NEXT_PUBLIC_AUTHORITY: idpConfig.authority,
      NEXT_PUBLIC_CLIENT_ID: idpConfig.client_id,
      NEXT_PUBLIC_REDIRECT_URI: idpConfig.redirect_uri,
      NEXT_PUBLIC_RESPONSE_TYPE: idpConfig.response_type,
      NEXT_PUBLIC_SCOPE: idpConfig.scope,
      NEXT_PUBLIC_COGNITO_USER_POOL_ID: userPool.id,
    },
  });
}
