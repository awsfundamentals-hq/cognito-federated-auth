'use client';

import { signInWithRedirect } from 'aws-amplify/auth';
import Image from 'next/image';
import { configureAmplify } from '../lib/amplify';

export const GoogleSignInButton = (props: { userPoolId: string; userPoolClientId: string; awsRegion: string; userPoolDomain: string }) => {
  configureAmplify(props);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect({
        provider: 'Google',
      });
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4]"
    >
      <Image src="/google.svg" alt="Google Logo" width={20} height={20} className="mr-3" />
      <span className="text-gray-700 font-medium">Sign in with Google</span>
    </button>
  );
};
