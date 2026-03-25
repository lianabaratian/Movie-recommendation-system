import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import bgImage from "../assets/wp10615933.png"

// ── Placeholder data (swap with real API later) ──────────────────────────────
const GENRES = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Romance" },
  { id: 3, name: "Action" },
  { id: 4, name: "Sci-Fi" },
  { id: 5, name: "Comedy" },
  { id: 6, name: "Drama" },
  { id: 7, name: "Thriller" },
  { id: 8, name: "Animation" },
]

const MOVIES_BY_GENRE = {
  1: [
    { id: 101, title: "Movie A", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+A" },
    { id: 102, title: "Movie B", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+B" },
    { id: 103, title: "Movie C", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+C" },
    { id: 104, title: "Movie D", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+D" },
    { id: 105, title: "Movie E", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+E" },
    { id: 106, title: "Movie F", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+F" },
  ],
  2: [
    { id: 201, title: "Movie A", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+A" },
    { id: 202, title: "Movie B", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+B" },
    { id: 203, title: "Movie C", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+C" },
    { id: 204, title: "Movie D", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+D" },
  ],
  3: [
    { id: 301, title: "Movie A", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+A" },
    { id: 302, title: "Movie B", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+B" },
    { id: 303, title: "Movie C", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+C" },
    { id: 304, title: "Movie D", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+D" },
  ],
  4: [
    { id: 401, title: "Movie A", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+A" },
    { id: 402, title: "Movie B", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+B" },
    { id: 403, title: "Movie C", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+C" },
    { id: 404, title: "Movie D", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+D" },
  ],
  5: [
    { id: 501, title: "Movie A", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+A" },
    { id: 502, title: "Movie B", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+B" },
    { id: 503, title: "Movie C", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+C" },
    { id: 504, title: "Movie D", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+D" },
  ],
  6: [
    { id: 601, title: "Movie A", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+A" },
    { id: 602, title: "Movie B", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+B" },
    { id: 603, title: "Movie C", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+C" },
    { id: 604, title: "Movie D", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+D" },
  ],
  7: [
    { id: 701, title: "Movie A", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+A" },
    { id: 702, title: "Movie B", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+B" },
    { id: 703, title: "Movie C", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+C" },
    { id: 704, title: "Movie D", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+D" },
  ],
  8: [
    { id: 801, title: "Movie A", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+A" },
    { id: 802, title: "Movie B", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+B" },
    { id: 803, title: "Movie C", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+C" },
    { id: 804, title: "Movie D", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Movie+D" },
  ],
}
// ─────────────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const navigate = useNavigate()

  // Step 1 state
  const [selectedGenres, setSelectedGenres] = useState([])

  // Step 2 state
  const [selectedMovies, setSelectedMovies] = useState({}) // { genreId: [movieId, ...] }

  // Slide animation
  const [step, setStep] = useState(1)           // 1 or 2
  const [animating, setAnimating] = useState(false)
  const [slideOut, setSlideOut] = useState(false)

  // ── Genre toggle ────────────────────────────────────────────────────────────
  const toggleGenre = (id) => {
    setSelectedGenres((prev) => {
      if (prev.includes(id)) return prev.filter((g) => g !== id)
      if (prev.length >= 3) return prev            // max 3
      return [...prev, id]
    })
  }

  // ── Movie toggle ────────────────────────────────────────────────────────────
  const toggleMovie = (genreId, movieId) => {
    setSelectedMovies((prev) => {
      const current = prev[genreId] || []
      const updated = current.includes(movieId)
        ? current.filter((m) => m !== movieId)
        : [...current, movieId]
      return { ...prev, [genreId]: updated }
    })
  }

  // ── Check Step 2 validity: at least 1 movie per genre ─────────────────────
  const step2Valid = selectedGenres.every(
    (gId) => (selectedMovies[gId] || []).length >= 1
  )

  // ── Slide to Step 2 ────────────────────────────────────────────────────────
  const goToStep2 = () => {
    if (selectedGenres.length < 3 || animating) return
    setAnimating(true)
    setSlideOut(true)
    setTimeout(() => {
      setStep(2)
      setSlideOut(false)
      setAnimating(false)
    }, 400)
  }

  // ── Slide back to Step 1 ───────────────────────────────────────────────────
  const goBack = () => {
    if (animating) return
    setAnimating(true)
    setSlideOut(true)
    setTimeout(() => {
      setStep(1)
      setSlideOut(false)
      setAnimating(false)
    }, 400)
  }

  // ── Finish ─────────────────────────────────────────────────────────────────
  const finish = () => {
    // TODO: send selectedGenres + selectedMovies to backend
    navigate("/movies")
  }

  // ── Animation classes ──────────────────────────────────────────────────────
  const panelClass = `
    transition-all duration-400 ease-in-out
    ${animating && slideOut && step === 1 ? "-translate-x-full opacity-0" : ""}
    ${animating && slideOut && step === 2 ? "translate-x-full opacity-0" : ""}
    ${!animating ? "translate-x-0 opacity-100" : ""}
  `

  return (
    <div className="fixed inset-0 overflow-hidden text-white">

      {/* ── Background — swap bgImage with a single movie poster/backdrop later ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-[#0e0f13]/75 backdrop-blur-[1px]" />

      {/* ── Content ── */}
      <div className="relative z-10 h-full overflow-y-auto flex flex-col items-center py-10 px-4">

        {/* Progress dots */}
        <div className="flex gap-2 mb-8">
          <div className={`h-2 w-8 rounded-full transition-all duration-300 ${step === 1 ? "bg-[#890202]" : "bg-white/30"}`} />
          <div className={`h-2 w-8 rounded-full transition-all duration-300 ${step === 2 ? "bg-[#890202]" : "bg-white/30"}`} />
        </div>

        {/* ── STEP 1: Genre Selection ── */}
        {step === 1 && (
          <div className={`w-full max-w-2xl ${panelClass}`}>

            <h1 className="text-2xl sm:text-4xl font-bold text-center mb-1">
              Please select your top 3
            </h1>
            <h2 className="text-2xl sm:text-4xl font-bold text-center mb-3">
              favorite genres
            </h2>
            <p className="text-center text-white/50 text-sm mb-10">
              {selectedGenres.length} / 3 selected
            </p>

            {/* Genre grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {GENRES.map((genre) => {
                const isSelected = selectedGenres.includes(genre.id)
                const isDisabled = !isSelected && selectedGenres.length >= 3
                return (
                  <button
                    key={genre.id}
                    onClick={() => !isDisabled && toggleGenre(genre.id)}
                    className={`
                      relative h-24 sm:h-28 rounded-2xl font-semibold text-base sm:text-lg
                      transition-all duration-200 cursor-pointer overflow-hidden
                      border-2
                      ${isSelected
                        ? "border-[#890202] bg-[#890202]/40 scale-[1.03] shadow-lg shadow-[#890202]/40"
                        : isDisabled
                          ? "border-white/20 bg-black/40 opacity-40 cursor-not-allowed"
                          : "border-white/30 bg-black/50 hover:border-white/60 hover:bg-black/60 hover:scale-[1.02]"
                      }
                    `}
                  >
                    {/* genre background placeholder — swap src with a real genre image later */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-black/30" />

                    <span className="relative z-10 text-white drop-shadow">
                      {genre.name}
                    </span>

                    {/* checkmark badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-[#890202] rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-bold shadow">
                        ✓
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <button
              onClick={goToStep2}
              disabled={selectedGenres.length < 3}
              className="mt-10 w-full py-3.5 rounded-xl font-semibold text-base transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              style={{ background: "#890202" }}
            >
              Next →
            </button>
          </div>
        )}

        {/* ── STEP 2: Movie Selection ── */}
        {step === 2 && (
          <div className={`w-full max-w-lg ${panelClass}`}>

            {/* Back button */}
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition cursor-pointer"
            >
              ← Back
            </button>

            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-1">
              Now choose movies...
            </h1>
            <p className="text-center text-white/50 text-sm mb-8">
              Pick at least 1 from each genre
            </p>

            <div className="flex flex-col gap-8">
              {selectedGenres.map((gId) => {
                const genre = GENRES.find((g) => g.id === gId)
                const movies = MOVIES_BY_GENRE[gId] || []
                const picked = selectedMovies[gId] || []
                return (
                  <div key={gId}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-lg font-semibold text-white/90">
                        {genre?.name}
                      </p>
                      {picked.length >= 1 && (
                        <span className="text-xs text-green-400 font-medium">✓ Done</span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                      {movies.map((movie) => {
                        const isChosen = picked.includes(movie.id)
                        return (
                          <button
                            key={movie.id}
                            onClick={() => toggleMovie(gId, movie.id)}
                            className="relative rounded-lg overflow-hidden transition-all duration-200 hover:scale-[1.04] cursor-pointer"
                          >
                            <img
                              src={movie.poster}
                              alt={movie.title}
                              className="w-full h-24 sm:h-28 object-cover"
                            />
                            <p className="text-[10px] text-center text-white/70 py-0.5 px-1 bg-black/50 truncate">
                              {movie.title}
                            </p>
                            {isChosen && (
                              <div className="absolute inset-0 bg-[#890202]/55 flex items-center justify-center">
                                <div className="bg-[#890202] rounded-full w-6 h-6 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                  ✓
                                </div>
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={finish}
              disabled={!step2Valid}
              className="mt-8 w-full py-3.5 rounded-xl font-semibold text-base transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              style={{ background: "#890202" }}
            >
              Let's go 🎬
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
