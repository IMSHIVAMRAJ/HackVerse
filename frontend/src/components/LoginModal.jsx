"use client"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils/auth"

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

const handleLogin = async () => {
  setLoading(true)
  try {
    const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/login`, {
      email,
      password,
    })

    // ✅ Correct way to store token
    setAuthToken(res.data.token, true)

    console.log("✅ Login Success:", res.data)
    alert("Login successful!")
    onClose()
    navigate("/dashboard")
  } catch (err) {
    console.error("❌ Login Error:", err.response?.data || err.message)
    alert("Login failed: " + (err.response?.data?.message || "Something went wrong"))
  } finally {
    setLoading(false)
  }
}


  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-[450px] mx-4">
        <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome Back!
              </h2>
              <p className="text-gray-600 mt-2">Sign in to continue your journey</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 border px-3 rounded"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 border px-3 rounded"
                  placeholder="Enter your password"
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded hover:from-purple-700 hover:to-indigo-700"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <div className="text-center text-sm">
                Don’t have an account?{" "}
                <button
                  onClick={() => {
                    onClose()
                    onSwitchToSignup()
                  }}
                  className="text-purple-600 font-semibold underline"
                >
                  Create one here
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
