import Image from 'next/image';

const getOrDisplayError = (value: string | undefined) => {
  if (!value) {
    return <div>Error: Missing environment variable</div>;
  }
  return value;
};

export default function Home() {
  const clientId = getOrDisplayError(
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID
  );
  const userPoolId = getOrDisplayError(
    process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID
  );
  const userPoolClientId = getOrDisplayError(
    process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID
  );
  const userPoolName = getOrDisplayError(
    process.env.NEXT_PUBLIC_COGNITO_USER_POOL_NAME
  );

  return (
    <div className="flex flex-col items-center">
      <nav className="w-full flex items-center justify-between py-4 px-8 bg-[#242E41]">
        <Image src="/logo.png" alt="Logo" width={60} height={60} />
        <div id="title" className="flex items-center mx-auto">
          <Image
            src="/cognito-logo.png"
            alt="Cognito Logo"
            width={60}
            height={60}
            className="mx-2 rounded-full shadow-md"
          />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Amazon Cognito</h1>
            <p className="text-sm font-semibold text-gray-300">
              Federated Auth on{' '}
              <span className="text-[#FF9900] font-bold">AWS</span>
              {' '}via Cognito
            </p>
          </div>
        </div>
        <a
          href={`https://eu-west-1.console.aws.amazon.com/cognito/v2/idp/user-pools/${userPoolId}/overview?region=eu-west-1`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#4B6AED] text-white px-4 py-2 rounded-md shadow-md flex items-center"
        >
          <Image
            src="/bookmark.svg"
            alt="Bookmark"
            width={20}
            height={20}
            className="mr-2"
          />
          Open Cognito Console
        </a>
      </nav>
      <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-5xl mx-auto p-8 space-y-4">
        <p className="text-lg font-medium text-gray-800 w-full text-center">Client ID: <span className="font-mono">{clientId}</span></p>
        <p className="text-lg font-medium text-gray-800 w-full text-center">User Pool ID: <span className="font-mono">{userPoolId}</span></p>
        <p className="text-lg font-medium text-gray-800 w-full text-center">User Pool Client ID: <span className="font-mono">{userPoolClientId}</span></p>
        <p className="text-lg font-medium text-gray-800 w-full text-center">User Pool Name: <span className="font-mono">{userPoolName}</span></p>
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
              <Image
                src="/envelope.png"
                alt="Newsletter"
                width={48}
                height={48}
                className="mr-2"
              />
              9,300+ AWS Builders Are Already Leveling Up – Are You Next?
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
