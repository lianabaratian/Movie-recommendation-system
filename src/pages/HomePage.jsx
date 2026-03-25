import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getTrending, getRecentlyAdded } from "../services/api"
import bgImage from "../assets/wp10615933.png"

export default function HomePage() {
  const [trending, setTrending] = useState([])
  const [recentlyAdded, setRecentlyAdded] = useState([])

  useEffect(() => {
    getTrending().then(setTrending)
    getRecentlyAdded().then(setRecentlyAdded)
  }, [])

  return (
    <div className="min-h-screen bg-[#0e0f13] text-white">

      {/* ── Navbar ── */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 z-40 bg-[#0e0f13]/80 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
          🎬 <span>AAAstreamer</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-white/70 hover:text-white text-sm font-medium transition"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="text-white text-sm font-semibold px-4 py-2 rounded-lg transition hover:opacity-85"
            style={{ background: "#890202" }}
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="relative h-72 sm:h-96 flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="relative z-10 px-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3">
            Discover Your Next Favorite Movie
          </h1>
          <p className="text-white/60 text-sm sm:text-base mb-6 max-w-xl mx-auto">
            Get smart recommendations based on what you love. Sign in to unlock your personal feed.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              to="/register"
              className="text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:opacity-85 transition"
              style={{ background: "#890202" }}
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border border-white/30 text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-white/10 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* ── Sections ── */}
      <div className="px-4 sm:px-8 py-10 space-y-12 max-w-7xl mx-auto">

        {/* Trending */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">🔥</span>
            <h2 className="text-xl font-bold text-white">Trending Now</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {trending.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Recently Added */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">🆕</span>
            <h2 className="text-xl font-bold text-white">Recently Added</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recentlyAdded.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* CTA at bottom */}
        <section className="text-center py-10 border-t border-white/10">
          <h3 className="text-xl font-semibold text-white mb-2">Want personalized picks?</h3>
          <p className="text-white/50 text-sm mb-5">
            Create a free account to get recommendations tailored just for you.
          </p>
          <Link
            to="/register"
            className="inline-block text-white font-semibold px-8 py-3 rounded-lg text-sm hover:opacity-85 transition"
            style={{ background: "#890202" }}
          >
            Create Free Account
          </Link>
        </section>

      </div>
    </div>
  )
}

function MovieCard({ movie }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to="/login"
            className="text-white text-xs font-semibold border border-white/60 px-3 py-1.5 rounded-lg hover:bg-white/10 transition"
          >
            Sign in to view
          </Link>
        </div>
      </div>
      <div className="mt-2 px-1">
        <p className="text-white text-sm font-medium truncate">{movie.title}</p>
        <p className="text-white/40 text-xs">{movie.year} · {movie.genre}</p>
      </div>
    </div>
  )
}
