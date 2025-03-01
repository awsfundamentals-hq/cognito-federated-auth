import Image from 'next/image';
import { GoogleSignInButton } from './components/GoogleSignInButton';
import { getOrThrow } from './lib/utils';

export default function Home() {
  const userPoolId = getOrThrow('NEXT_PUBLIC_COGNITO_USER_POOL_ID');
  const authority = getOrThrow('NEXT_PUBLIC_AUTHORITY');
  const client_id = getOrThrow('NEXT_PUBLIC_CLIENT_ID');
  const redirect_uri = getOrThrow('NEXT_PUBLIC_REDIRECT_URI');
  const response_type = getOrThrow('NEXT_PUBLIC_RESPONSE_TYPE');
  const scope = getOrThrow('NEXT_PUBLIC_SCOPE');
  return (
    <div className="flex flex-col items-center">
      <nav className="w-full flex items-center justify-between py-4 px-8 bg-[#242E41]">
        <Image src="/logo.png" alt="Logo" width={60} height={60} />
        <div id="title" className="flex items-center mx-auto">
          <Image src="/cognito-logo.png" alt="Cognito Logo" width={60} height={60} className="mx-2 rounded-full shadow-md" />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Amazon Cognito</h1>
            <p className="text-sm font-semibold text-gray-300">
              Federated Auth on <span className="text-[#FF9900] font-bold">AWS</span> via Cognito
            </p>
          </div>
        </div>
        <a
          href={`https://eu-west-1.console.aws.amazon.com/cognito/v2/idp/user-pools/${userPoolId}/overview`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#4B6AED] text-white px-4 py-2 rounded-md shadow-md flex items-center"
        >
          <Image src="/bookmark.svg" alt="Bookmark" width={20} height={20} className="mr-2" />
          Open Cognito Console
        </a>
      </nav>
      <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-5xl mx-auto p-8 space-y-8">
        <GoogleSignInButton />
        <div className="bg-white p-4 rounded-lg shadow-md max-w-2xl mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">Cognito Pool Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-8">
              <span className="text-gray-600">User Pool ID:</span>
              <code className="text-gray-800">{userPoolId}</code>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-gray-600">Authority:</span>
              <code className="text-gray-800">{authority}</code>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-gray-600">Client ID:</span>
              <code className="text-gray-800">{client_id}</code>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-gray-600">Redirect URI:</span>
              <code className="text-gray-800">{redirect_uri}</code>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-gray-600">Response Type:</span>
              <code className="text-gray-800">{response_type}</code>
            </div>
          </div>
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 bg-[#242E41] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <a
              href="https://awsfundamentals.com/newsletter"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center font-semibold text-white hover:text-green-300 transition-colors"
            >
              <Image src="/envelope.png" alt="Newsletter" width={48} height={48} className="mr-2" />
              9,300+ AWS Builders Are Already Leveling Up – Are You Next?
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
