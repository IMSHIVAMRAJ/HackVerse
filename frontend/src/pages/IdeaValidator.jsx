// frontend/src/IdeaValidator.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import NavbarH from "../components/NavbarH";

export default function IdeaValidator() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!idea.trim()) return setError("Idea required");
    setLoading(true);

    try {
      const r = await fetch("http://localhost:5000/api/idea/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Server error");
      if (data.warning) {
        // model returned non-parseable output
        setResult({ raw: data.raw, warning: data.warning });
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#e8ecfc] relative">
      <NavbarH />
      <div className="flex flex-col items-center justify-center py-12 px-2">
        {/* Animated Stickers */}
        <motion.div
          className="hidden lg:block absolute top-8 left-8 z-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 80 80"
            fill="none"
            className="w-16 h-16 text-purple-400"
          >
            <circle
              cx="40"
              cy="40"
              r="32"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <circle
              cx="40"
              cy="40"
              r="24"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.4"
            />
            <circle
              cx="40"
              cy="40"
              r="16"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            />
            <circle cx="40" cy="40" r="4" fill="currentColor" opacity="0.8" />
          </svg>
        </motion.div>
        <motion.div
          className="hidden lg:block absolute bottom-12 right-8 z-0"
          animate={{ rotate: -360, scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 80 80"
            fill="none"
            className="w-16 h-16 text-blue-400"
          >
            <rect
              x="32"
              y="35"
              width="16"
              height="18"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.7"
            />
            <circle cx="40" cy="50" r="1.5" fill="currentColor" opacity="0.6" />
          </svg>
        </motion.div>
        {/* Main Card */}
        <motion.div
          className="w-full max-w-2xl bg-white/80 rounded-2xl shadow-xl p-8 z-10 backdrop-blur-md border border-purple-100/40"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-purple-700 mb-4 drop-shadow animate-grow">
            AI Idea Validator
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              rows={6}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Apna idea yahan likho..."
              className="w-full p-4 rounded-lg border-2 border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 bg-white/70 text-gray-700 shadow transition-all duration-200"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow hover:scale-105 transition-all disabled:opacity-60"
              >
                {loading ? "Checking..." : "Validate Idea"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIdea("");
                  setResult(null);
                  setError("");
                }}
                className="px-6 py-2 rounded-lg border border-purple-300 text-purple-600 bg-white/70 hover:bg-purple-50 font-semibold transition-all"
              >
                Clear
              </button>
            </div>
          </form>
          {error && (
            <div className="text-red-500 mt-3 font-medium animate-bounce">
              {error}
            </div>
          )}
          {result && (
            <motion.div
              className="mt-6 border border-purple-100 bg-white/90 rounded-xl p-6 shadow-lg animate-fade-in"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {result.raw && (
                <div className="mb-2 text-sm text-yellow-600">
                  <strong>Raw response (couldn't parse JSON):</strong>
                  <pre className="bg-yellow-50 p-2 rounded-lg overflow-x-auto">
                    {result.raw}
                  </pre>
                </div>
              )}
              {result.score != null && (
                <>
                  <div className="flex gap-6 items-center">
                    <div className="w-28 h-28 rounded-full flex justify-center items-center text-4xl font-bold bg-purple-100 text-purple-700 shadow-inner animate-grow">
                      {result.score}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700">
                        Overall score (0-10)
                      </h3>
                      <p className="mt-1 text-gray-600">{result.summary}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-purple-600">
                      Tech Stack
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 mt-1">
                      {(result.techStack || []).map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3">
                    <h4 className="font-semibold text-purple-600">Breakdown</h4>
                    <div className="flex gap-6 flex-wrap">
                      {result.breakdown &&
                        Object.entries(result.breakdown).map(([k, v]) => (
                          <div key={k} className="text-center">
                            <div className="text-xl font-bold text-purple-700">
                              {v}
                            </div>
                            <div className="capitalize text-gray-500 text-sm">
                              {k}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-purple-600">
                      Suggestions
                    </h4>
                    <ol className="list-decimal list-inside text-gray-700 mt-1">
                      {(result.suggestions || []).map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ol>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </motion.div>
        {/* Subtle Animated Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-10 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000" />
      </div>
    </div>
  );
}
