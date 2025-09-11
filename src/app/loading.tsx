// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-3 text-blue-600 font-medium">Loading...</span>
    </div>
  );
}
