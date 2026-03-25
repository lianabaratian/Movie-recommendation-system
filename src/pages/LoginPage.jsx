import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../services/api"
import { useAuth } from "../context/AuthContext"
import bgImage from "../assets/wp10615933.png"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const data = await login(username, password)
      loginUser(data.token, data.user)
      navigate("/movies")
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-[#16171d]/75 backdrop-blur-md border border-white/15 rounded-2xl shadow-2xl p-8 sm:p-10 text-center">

        {/* Logo */}
        <div className="text-5xl mb-3">🎬</div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-1">Welcome back</h2>
        <p className="text-white/70 text-sm sm:text-base mb-6">Sign in to your account</p>

        {/* Error */}
        {error && (
          <div className="bg-red-500/15 border border-red-500/50 text-red-400 rounded-lg px-4 py-2 text-sm mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/85">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-black/35 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/60"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/85">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-black/35 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/60"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 rounded-lg text-white font-semibold text-base cursor-pointer transition-opacity hover:opacity-85 disabled:opacity-60"
            style={{ background: "#890202" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Mock hint */}
        <div className="mt-5 text-xs text-white/60 bg-purple-500/15 border border-purple-500/40 rounded-lg px-3 py-2">
          💡 Mock login: <strong>liana</strong> / <strong>1234</strong>
        </div>

        {/* Register link */}
        <p className="mt-5 text-sm text-white/60">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium hover:opacity-80" style={{ color: "#890202" }}>
            Create one
          </Link>
        </p>

      </div>
    </div>
  )
}
