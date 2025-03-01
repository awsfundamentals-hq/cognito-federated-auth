'use client';

import { WebStorageStateStore } from 'oidc-client-ts';
import { AuthProvider } from 'react-oidc-context';
import { AuthConfig } from '../lib/types';

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
