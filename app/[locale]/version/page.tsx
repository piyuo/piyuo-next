// ===============================================
// Version Page: [locale]/version/page.tsx
// Description: Displays application version information
//
// Purpose:
//   - Shows current version from package.json
//   - Provides simple endpoint to check app version
//   - Works with locale-based routing
// ===============================================

import packageJson from '../../../package.json';

export default function VersionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Version Info
          </h1>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Application
              </div>
              <div className="text-xl font-semibold text-gray-800 mt-1">
                {packageJson.name}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                Version
              </div>
              <div className="text-2xl font-bold text-blue-800 mt-1">
                {packageJson.version}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Build Time
              </div>
              <div className="text-sm text-gray-700 mt-1">
                {new Date().toISOString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Optional: Add metadata for the page
export const metadata = {
  title: `Version ${packageJson.version} - ${packageJson.name}`,
  description: `Version information for ${packageJson.name}`,
};
