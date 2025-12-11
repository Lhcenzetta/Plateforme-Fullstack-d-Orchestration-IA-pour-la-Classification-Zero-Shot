"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HybrideAnalyse() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  const submit_text = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    try {
      const response = await fetch("http://127.0.0.1:8000/autho/geminia", {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, text }),
      });

      if (!response.ok) throw new Error(`Erreur API: ${response.status}`);

      const data = await response.json();
      setResult(data);
      setText("");

    } catch (err) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-10 flex flex-col items-center">

      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Analyse Hybride
        </h1>

        <button
          onClick={() => {
            localStorage.clear();
            router.push("/login");
          }}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      <p className="text-gray-600 text-center max-w-lg mb-6">
        Classification Zero-Shot + Résumé contextuel automatisé via Gemini.
      </p>

      {/* Form */}
      <form
        onSubmit={submit_text}
        className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 w-full max-w-lg space-y-4"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Entrez le texte à analyser..."
          disabled={loading}
          className="w-full h-44 p-3 border border-gray-300 rounded-lg text-gray-800
                     focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button
          disabled={loading || !text}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200
            ${
              loading || !text
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }
          `}
        >
          {loading ? "Analyse en cours..." : "Envoyer"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-6 bg-red-100 border border-red-200 text-red-800 p-4 rounded-lg w-full max-w-lg shadow">
          <h3 className="font-semibold">Erreur :</h3>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-8 bg-white border border-gray-200 shadow-lg p-6 rounded-xl w-full max-w-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Résultats</h2>

          <p>
            <strong className="text-gray-800">Catégorie : </strong>
            <span className="text-blue-700 font-medium">{result.categorie}</span>
          </p>

          <p className="mt-1">
            <strong className="text-gray-800">Confiance : </strong>
            <span className="text-gray-700">{result.confidence}</span>
          </p>

          <p className="mt-1">
            <strong className="text-gray-800">Ton : </strong>
            <span className="text-gray-700">{result.tone}</span>
          </p>

          <div className="mt-4">
            <strong className="text-gray-800">Résumé :</strong>
            <p className="mt-2 bg-gray-50 p-3 border border-gray-200 rounded-lg text-gray-700 whitespace-pre-wrap leading-relaxed">
              {result.resume}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
