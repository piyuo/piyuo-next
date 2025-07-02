// Root page - now handled by middleware
// This page should not be reached in normal operation as middleware
// redirects all root requests to the appropriate locale
export default function RootPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Redirecting...
        </h1>
        <p className="text-gray-600">
          If you see this page, please check your locale configuration.
        </p>
      </div>
    </div>
  );
}