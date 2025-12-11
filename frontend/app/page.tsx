"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="h-screen w-full bg-gray-300 flex flex-col items-center justify-center px-4">
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Hybrid-Analyzer
      </h1>

      <p className="text-center text-gray-700 max-w-md mb-8">
        A simple platform that combines Zero-Shot Classification (Hugging Face) 
        and Gemini AI summarization to analyze any text and extract insights instantly.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/signup")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition"
        >
          Register
        </button>

        <button
          onClick={() => router.push("/login")}
          className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-2 rounded-lg shadow border transition"
        >
          Login
        </button>
      </div>

    </div>
  );
}
