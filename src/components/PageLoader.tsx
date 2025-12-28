
export const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
    {/* Simple CSS Spinner */}
    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
    <p className="text-gray-500 font-medium animate-pulse">Loading amazing products...</p>
  </div>
);