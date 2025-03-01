'use client';

import Image from 'next/image';
import { useAuth } from 'react-oidc-context';

export function GoogleSignInButton() {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#4285F4]"></div>
        <span className="ml-3 text-gray-600">Loading authentication...</span>
      </div>
    );
  }

  if (auth.error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Authentication Error</h3>
            <p className="text-sm text-red-700 mt-1">{auth.error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (auth.isAuthenticated) {
    const userName = auth.user?.profile.given_name || auth.user?.profile.name || '';

    return (
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center">
            <div className="bg-[#4285F4] rounded-full p-2 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-sm font-medium text-gray-900">{userName ? `Hello, ${userName}` : 'Logged in as'}</p>
              <p className="text-sm text-gray-600 truncate">{auth.user?.profile.email}</p>
            </div>
          </div>
          <button
            onClick={() => auth.removeUser()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#4285F4] hover:bg-[#3367d6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4] transition-colors flex-shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => auth.signinRedirect()}
      className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4]"
    >
      <Image src="/google.svg" alt="Google Logo" width={20} height={20} className="mr-3" />
      <span className="text-gray-700 font-medium">Sign in with Google</span>
    </button>
  );
}
