import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className="h-screen w-full bg-gray-300 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold text-gray-800">
        Hello, this is the main page — updates coming soon!
      </h1>
      <p className=" mt-4 animate-pulse">
        Loading...
      </p>
    </div>
  );
}

