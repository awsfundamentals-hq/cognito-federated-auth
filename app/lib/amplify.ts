import { Amplify } from 'aws-amplify';

export function configureAmplify(props: { userPoolId: string; userPoolClientId: string; awsRegion: string; userPoolDomain: string }) {
  const { userPoolId, userPoolClientId, awsRegion, userPoolDomain } = props;

  console.info(`Configuring Amplify [userPoolId=${userPoolId}, userPoolClientId=${userPoolClientId}, awsRegion=${awsRegion}]`);
  const domain = `${userPoolDomain}.auth.${awsRegion}.amazoncognito.com`;
  console.info(`Domain: ${domain}`);
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId,
        signUpVerificationMethod: 'code',
        loginWith: {
          oauth: {
            domain,
            scopes: ['email', 'openid', 'profile'],
            responseType: 'code',
            redirectSignIn: ['http://localhost:3000/auth'],
            redirectSignOut: ['http://localhost:3000'],
          },
        },
      },
    },
  });
}
