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

  new aws.cognito.UserPoolDomain('auth-domain', {
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

  // TODO: from the Cognito console: let's create this via IaC
  const idpPoolDomain = getEnvOrThrow('COGNITO_USER_POOL_DOMAIN');

  const userPoolClient = new aws.cognito.UserPoolClient('user-pool-client', {
    userPoolId: userPool.id,
    generateSecret: false,
    callbackUrls: [
      'http://localhost:3000/auth',
      `https://${idpPoolDomain}.auth.eu-west-1.amazoncognito.com/oauth2/idpresponse%20flowName=GeneralOAuthFlow`,
    ],
    allowedOauthFlows: ['code'],
    allowedOauthFlowsUserPoolClient: true,
    allowedOauthScopes: ['email', 'openid', 'profile'],
    supportedIdentityProviders: [idpGoogle.providerName],
  });

  const idpConfig = {
    authority: $interpolate`https://cognito-idp.eu-west-1.amazonaws.com/${userPool.id}`,
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
