"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // error page ya handsa msh h3ml clean code
    <html>
      <body>
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-red-50 p-6">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="mt-4 text-xl font-semibold text-red-600">
            Something went wrong
          </h2>
          <p className="mt-2 text-gray-600 text-sm">{error.message}</p>
          <button
            onClick={() => reset()}
            className="mt-6 px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
