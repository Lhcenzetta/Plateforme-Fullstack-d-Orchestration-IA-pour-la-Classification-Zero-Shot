"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const route = useRouter();
  const [username, setUsername] = useState("");
  const [passwordhash, setPasswordhach] = useState("");

  const submilogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/autho/singin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, passwordhash }),
    });

    const data = await response.json();
    const token = data["access_token"];
    const user_id = data["user_id"];

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user_id);
      route.push("/hybride_analyse");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm border border-gray-200">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Login
        </h1>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Access your Hybrid-Analyzer dashboard
        </p>

        <form onSubmit={submilogin} className="space-y-4">

          {/* Username */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              value={passwordhash}
              onChange={(e) => setPasswordhach(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                       py-2 rounded-lg shadow transition active:scale-95"
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <button
            onClick={() => route.push("/signup")}
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </button>
        </p>

      </div>
    </div>
  );
}
