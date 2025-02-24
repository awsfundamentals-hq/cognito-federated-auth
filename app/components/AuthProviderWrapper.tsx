'use client';

import { AuthProvider } from 'react-oidc-context';
import { WebStorageStateStore } from 'oidc-client-ts';

type AuthConfig = {
  authority: string;
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
};

export function AuthProviderWrapper({ children, config }: { children: React.ReactNode; config: AuthConfig }) {
  const oidcConfig = {
    ...config,
    stateStore: new WebStorageStateStore({ store: window.localStorage }),
    onSigninCallback: () => {
      window.history.replaceState({}, document.title, window.location.pathname);
    },
  };

  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}
