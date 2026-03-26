import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getTrending, getRecentlyAdded, getRecommendations } from "../services/api"
import { useAuth } from "../context/AuthContext"

// ── Watchlist stored in localStorage ────────────────────────────────────────
function useWatchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("watchlist") || "[]") }
    catch { return [] }
  })

  const toggle = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.find((m) => m.id === movie.id)
      const updated = exists ? prev.filter((m) => m.id !== movie.id) : [...prev, movie]
      localStorage.setItem("watchlist", JSON.stringify(updated))
      return updated
    })
  }

  const isInList = (id) => watchlist.some((m) => m.id === id)
  return { watchlist, toggle, isInList }
}

// ── Movie card ───────────────────────────────────────────────────────────────
function MovieCard({ movie, onWatchlist, inWatchlist }) {
  return (
    <div className="flex-shrink-0 w-36 sm:w-40 group flex flex-col">

      {/* poster */}
      <Link to={`/movies/${movie.id}`} className="block relative rounded-xl overflow-hidden border border-white/10 group-hover:border-[#890202]/70 transition-all duration-200 shadow-md">
        <img src={movie.poster} alt={movie.title} className="w-full h-48 sm:h-56 object-cover group-hover:scale-[1.03] transition-transform duration-200" />
        <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs font-bold px-1.5 py-0.5 rounded-md">
          ★ {movie.rating}
        </div>
      </Link>

      {/* title + genre */}
      <div className="mt-2 px-0.5 mb-2 flex-1">
        <p className="text-white text-xs sm:text-sm font-medium truncate">{movie.title}</p>
        <p className="text-white/40 text-[11px] truncate">{movie.year} · {movie.genre}</p>
      </div>

      {/* watchlist button */}
      <button
        onClick={() => onWatchlist(movie)}
        className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer border
          ${inWatchlist
            ? "bg-[#890202]/20 border-[#890202]/60 text-[#890202] hover:bg-[#890202]/30"
            : "bg-white/5 border-white/15 text-white/70 hover:bg-white/10 hover:border-white/30"
          }`}
      >
        {inWatchlist ? "✓ In Watchlist" : "+ Watchlist"}
      </button>
    </div>
  )
}

// ── Horizontal scroll section ────────────────────────────────────────────────
function Section({ title, badge, movies, watchlistProps }) {
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
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onWatchlist={watchlistProps.toggle}
            inWatchlist={watchlistProps.isInList(m.id)}
          />
        ))}
      </div>
    </div>
  )
}

// ── Watchlist section ────────────────────────────────────────────────────────
function WatchlistSection({ watchlist, watchlistProps }) {
  if (watchlist.length === 0) return null
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4 px-4 sm:px-10">
        <h2 className="text-white font-semibold text-base sm:text-lg">From Your Watchlist</h2>
        <span className="bg-white/10 text-white/60 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {watchlist.length} saved
        </span>
      </div>
      <div className="flex gap-4 overflow-x-auto px-4 sm:px-10 pb-2 [&::-webkit-scrollbar]:hidden">
        {watchlist.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onWatchlist={watchlistProps.toggle}
            inWatchlist={true}
          />
        ))}
      </div>
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function MoviesPage() {
  const { user, logoutUser }              = useAuth()
  const [trending, setTrending]           = useState([])
  const [recentlyAdded, setRecentlyAdded] = useState([])
  const [recommended, setRecommended]     = useState([])
  const watchlistProps                    = useWatchlist()

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

      {/* Watchlist first if has items */}
      <WatchlistSection watchlist={watchlistProps.watchlist} watchlistProps={watchlistProps} />

      {recommended.length > 0 && (
        <Section title="Recommended for You" badge="For You" movies={recommended} watchlistProps={watchlistProps} />
      )}
      <Section title="Trending Now" badge="🔥 Hot" movies={trending} watchlistProps={watchlistProps} />
      <Section title="Recently Added" movies={recentlyAdded} watchlistProps={watchlistProps} />

      <div className="h-16" />
    </div>
  )
}
