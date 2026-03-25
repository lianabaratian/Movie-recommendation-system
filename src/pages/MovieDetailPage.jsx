import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getMovieById, getComments, submitReview } from "../services/api"
import { useAuth } from "../context/AuthContext"

// ── Star picker (interactive) ────────────────────────────────────────────────
function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl cursor-pointer transition-transform hover:scale-110"
        >
          <span className={(hovered || value) >= s ? "text-yellow-400" : "text-white/20"}>★</span>
        </button>
      ))}
    </div>
  )
}

// ── Static star display ──────────────────────────────────────────────────────
function Stars({ rating, size = "sm" }) {
  const full = Math.round(rating)
  const cls  = size === "lg" ? "text-2xl" : "text-sm"
  return (
    <span className={`text-yellow-400 ${cls}`}>
      {"★".repeat(full)}{"☆".repeat(5 - full)}
    </span>
  )
}

// ── Avatar circle ────────────────────────────────────────────────────────────
function Avatar({ letter }) {
  const colors = ["bg-red-700", "bg-blue-700", "bg-green-700", "bg-purple-700", "bg-orange-600"]
  const idx = letter.charCodeAt(0) % colors.length
  return (
    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${colors[idx]}`}>
      {letter}
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function MovieDetailPage() {
  const { id }         = useParams()
  const navigate       = useNavigate()
  const { user }       = useAuth()

  const [movie,    setMovie]    = useState(null)
  const [comments, setComments] = useState([])
  const [loading,  setLoading]  = useState(true)

  // comment form state
  const [myComment, setMyComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)

  useEffect(() => {
    setLoading(true)
    Promise.all([getMovieById(id), getComments(id)]).then(([m, c]) => {
      setMovie(m)
      setComments(c)
      setLoading(false)
    })
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!myComment.trim()) return
    setSubmitting(true)
    await submitReview(id, myComment)
    // add optimistically to local list
    setComments((prev) => [
      {
        id: Date.now(),
        user: user?.username || "you",
        avatar: (user?.username?.[0] || "U").toUpperCase(),
        text: myComment,
        date: "just now",
      },
      ...prev,
    ])
    setMyComment("")
    setSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0f13] flex items-center justify-center text-white/50">
        Loading...
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#0e0f13] flex items-center justify-center text-white/50">
        Movie not found.
      </div>
    )
  }

  // Overall score — will be replaced by AI sentiment score from backend
  const overallScore = comments.length ? 7.4 : null  // placeholder

  return (
    <div className="min-h-screen bg-[#0e0f13] text-white">

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 bg-[#0e0f13]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-10 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white/60 hover:text-white text-sm flex items-center gap-1.5 transition cursor-pointer"
        >
          ← Back
        </button>
        <span className="text-white/30">|</span>
        <span className="text-white/70 text-sm truncate">{movie.title}</span>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10">

        {/* ── Movie header ── */}
        <div className="flex flex-col sm:flex-row gap-8 mb-10">

          {/* poster */}
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-40 sm:w-48 h-60 sm:h-72 object-cover rounded-2xl shadow-xl self-center sm:self-start flex-shrink-0 border border-white/10"
          />

          {/* info */}
          <div className="flex flex-col justify-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-2 text-sm text-white/50">
              <span>{movie.year}</span>
              <span>·</span>
              <span>{movie.duration}</span>
              <span>·</span>
              <span>{movie.genre}</span>
            </div>


            <div className="text-white/50 text-sm space-y-1 mt-1">
              <p><span className="text-white/80 font-medium">Director:</span> {movie.director}</p>
              <p><span className="text-white/80 font-medium">Cast:</span> {movie.actors}</p>
            </div>
          </div>
        </div>

        {/* ── Overall rating ── */}
        {overallScore && (
          <div className="mb-10 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 flex items-center gap-6">
            <div className="text-center">
              <p className="text-5xl font-bold text-white">{overallScore}</p>
              <p className="text-white/40 text-xs mt-1">out of 10</p>
            </div>
            <div className="w-px h-14 bg-white/10" />
            <div>
              <Stars rating={overallScore / 2} size="lg" />
              <p className="text-white/60 text-sm mt-1">
                Based on <span className="text-white font-medium">{comments.length}</span> review{comments.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        )}

        {/* ── Summary ── */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-3">Summary</h2>
          <p className="text-white/70 leading-relaxed text-sm sm:text-base">{movie.plot}</p>
        </div>

        <div className="border-t border-white/10 mb-10" />

        {/* ── Leave a review ── */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-1">Leave a Review</h2>
          <p className="text-white/40 text-xs mb-5">Just share your thoughts — we'll understand the rest ✨</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              value={myComment}
              onChange={(e) => setMyComment(e.target.value)}
              placeholder="Write your thoughts about this movie..."
              rows={3}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 resize-none focus:outline-none focus:border-[#890202]/60"
            />
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={!myComment.trim() || submitting}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                style={{ background: "#890202" }}
              >
                {submitting ? "Posting..." : "Post Review"}
              </button>
              {submitted && (
                <span className="text-green-400 text-sm">✓ Review posted!</span>
              )}
            </div>
          </form>
        </div>

        <div className="border-t border-white/10 mb-8" />

        {/* ── Comments ── */}
        <div>
          <h2 className="text-lg font-semibold mb-6">
            Reviews
            <span className="ml-2 text-white/30 font-normal text-sm">({comments.length})</span>
          </h2>

          {comments.length === 0 ? (
            <p className="text-white/40 text-sm text-center py-8">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-4">
                  <Avatar letter={c.avatar} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-white font-medium text-sm">{c.user}</span>
                      <span className="text-white/30 text-xs">{c.date}</span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-16" />
      </div>
    </div>
  )
}
