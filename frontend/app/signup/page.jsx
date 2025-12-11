"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";
export default function(){
    const [fullname , setFullname] = useState("")
    const [email , setEmail] = useState("")
    const [username , setUsername] = useState("")
    const [passwordhash , setpasswordhash] = useState("")
    const route = useRouter();

    const submitform = async (e) => {
        e.preventDefault();
        console.log(fullname , email, username, passwordhash)
        const response = await fetch("http://127.0.0.1:8000/autho/signup",{
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username,fullname,email,passwordhash}),
        })
        console.log(response)
        route.push("/login");
    }
    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
            <h1 className="text-center text-2xl font-bold text-gray-800 mb-2">
                Welcome to Hybrid-Analyzer
            </h1>

            <h2 className="text-center text-gray-600 mb-6">
            Please signup
            </h2>

                <form onSubmit={submitform} className="space-y-4">

                <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Username :</label>
                    <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Full name :</label>
                    <input
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    type="text"
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Email :</label>
                    <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Password :</label>
                    <input
                    value={passwordhash}
                    onChange={(e) => setpasswordhash(e.target.value)}
                    type="password"
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Create
                </button>
            </form>
        </div>
    </div>
    )
}