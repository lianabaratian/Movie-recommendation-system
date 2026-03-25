import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getTrending, getRecentlyAdded, getRecommendations } from "../services/api"
import { useAuth } from "../context/AuthContext"

function Stars({ rating }) {
  const full = Math.round(rating / 2)
  return (
    <span className="text-yellow-400 text-xs">
      {"★".repeat(full)}{"☆".repeat(5 - full)}
    </span>
  )
}

function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`} className="flex-shrink-0 w-32 sm:w-36 group">
      <div className="relative rounded-xl overflow-hidden border border-white/10 group-hover:border-[#890202]/70 group-hover:scale-[1.03] transition-all duration-200 shadow-md">
        <img src={movie.poster} alt={movie.title} className="w-full h-44 sm:h-52 object-cover" />
        <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs font-bold px-1.5 py-0.5 rounded-md">
          ★ {movie.rating}
        </div>
      </div>
      <div className="mt-2 px-0.5">
        <p className="text-white text-xs sm:text-sm font-medium truncate">{movie.title}</p>
        <p className="text-white/40 text-[11px] truncate">{movie.year} · {movie.genre}</p>
      </div>
    </Link>
  )
}

function Section({ title, badge, movies }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4 px-4 sm:px-10">
        <h2 className="text-white font-semibold text-base sm:text-lg">{title}</h2>
        {badge && (
          <span className="bg-[#890202] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            {badge}
          </span>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto px-4 sm:px-10 pb-2 [&::-webkit-scrollbar]:hidden">
        {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  )
}

export default function MoviesPage() {
  const { user, logoutUser }              = useAuth()
  const [trending, setTrending]           = useState([])
  const [recentlyAdded, setRecentlyAdded] = useState([])
  const [recommended, setRecommended]     = useState([])

  useEffect(() => {
    getTrending().then(setTrending)
    getRecentlyAdded().then(setRecentlyAdded)
    getRecommendations().then(setRecommended)
  }, [])

  return (
    <div className="min-h-screen bg-[#0e0f13] text-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#0e0f13]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-10 py-4 flex items-center justify-between">
        <span className="text-white font-bold text-lg">🎬 AAAstreamer</span>
        <div className="flex items-center gap-4">
          <span className="text-white/50 text-sm hidden sm:block">
            Hey, <span className="text-white font-medium">{user?.username}</span> 👋
          </span>
          <button
            onClick={logoutUser}
            className="text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </nav>

      {/* Greeting */}
      <div className="px-4 sm:px-10 pt-10 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {user?.username} 🎬</h1>
        <p className="text-white/50 mt-1 text-sm sm:text-base">Here's what we picked for you today</p>
      </div>

      {recommended.length > 0 && (
        <Section title="Recommended for You" badge="For You" movies={recommended} />
      )}
      <Section title="Trending Now" badge="🔥 Hot" movies={trending} />
      <Section title="Recently Added" movies={recentlyAdded} />

      <div className="h-16" />
    </div>
  )
}
