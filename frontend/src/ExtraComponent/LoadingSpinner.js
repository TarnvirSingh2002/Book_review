export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
}
