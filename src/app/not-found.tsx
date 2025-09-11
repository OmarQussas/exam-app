export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        The page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Go Home
      </a>
    </div>
  );
}
