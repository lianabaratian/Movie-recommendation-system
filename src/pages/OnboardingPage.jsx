import { useState } from "react"
import { useNavigate } from "react-router-dom"
import bgImage from "../assets/wp10615933.png"

const CATEGORIES = [
  {
    id: "action", name: "Action",
    movies: [
      { id: "a1", title: "Die Hard",         poster: "https://placehold.co/120x180/1a1a2e/fff?text=Die+Hard" },
      { id: "a2", title: "Mad Max",           poster: "https://placehold.co/120x180/1a1a2e/fff?text=Mad+Max" },
      { id: "a3", title: "John Wick",         poster: "https://placehold.co/120x180/1a1a2e/fff?text=John+Wick" },
      { id: "a4", title: "The Dark Knight",   poster: "https://placehold.co/120x180/1a1a2e/fff?text=Dark+Knight" },
      { id: "a5", title: "Mission Impossible",poster: "https://placehold.co/120x180/1a1a2e/fff?text=Mission+I" },
    ],
  },
  {
    id: "adventure", name: "Adventure",
    movies: [
      { id: "adv1", title: "Indiana Jones",   poster: "https://placehold.co/120x180/1a1a2e/fff?text=Indiana+Jones" },
      { id: "adv2", title: "Jurassic Park",   poster: "https://placehold.co/120x180/1a1a2e/fff?text=Jurassic+Park" },
      { id: "adv3", title: "The Revenant",    poster: "https://placehold.co/120x180/1a1a2e/fff?text=The+Revenant" },
      { id: "adv4", title: "Cast Away",       poster: "https://placehold.co/120x180/1a1a2e/fff?text=Cast+Away" },
      { id: "adv5", title: "Into the Wild",   poster: "https://placehold.co/120x180/1a1a2e/fff?text=Into+Wild" },
    ],
  },
  {
    id: "animation", name: "Animation",
    movies: [
      { id: "an1", title: "Spirited Away",    poster: "https://placehold.co/120x180/1a1a2e/fff?text=Spirited+Away" },
      { id: "an2", title: "The Lion King",    poster: "https://placehold.co/120x180/1a1a2e/fff?text=Lion+King" },
      { id: "an3", title: "Up",               poster: "https://placehold.co/120x180/1a1a2e/fff?text=Up" },
      { id: "an4", title: "WALL-E",           poster: "https://placehold.co/120x180/1a1a2e/fff?text=WALL-E" },
      { id: "an5", title: "Toy Story",        poster: "https://placehold.co/120x180/1a1a2e/fff?text=Toy+Story" },
    ],
  },
  {
    id: "biography", name: "Biography",
    movies: [
      { id: "bi1", title: "Bohemian Rhapsody",poster: "https://placehold.co/120x180/1a1a2e/fff?text=Bohemian" },
      { id: "bi2", title: "The Social Network",poster:"https://placehold.co/120x180/1a1a2e/fff?text=Social+Net" },
      { id: "bi3", title: "Schindler's List", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Schindler" },
      { id: "bi4", title: "12 Years a Slave", poster: "https://placehold.co/120x180/1a1a2e/fff?text=12+Years" },
      { id: "bi5", title: "Rocketman",        poster: "https://placehold.co/120x180/1a1a2e/fff?text=Rocketman" },
    ],
  },
  {
    id: "comedy", name: "Comedy",
    movies: [
      { id: "co1", title: "The Grand Budapest",poster:"https://placehold.co/120x180/1a1a2e/fff?text=Grand+Budapest" },
      { id: "co2", title: "Superbad",         poster: "https://placehold.co/120x180/1a1a2e/fff?text=Superbad" },
      { id: "co3", title: "Bridesmaids",      poster: "https://placehold.co/120x180/1a1a2e/fff?text=Bridesmaids" },
      { id: "co4", title: "The Hangover",     poster: "https://placehold.co/120x180/1a1a2e/fff?text=Hangover" },
      { id: "co5", title: "Game Night",       poster: "https://placehold.co/120x180/1a1a2e/fff?text=Game+Night" },
    ],
  },
  {
    id: "crime", name: "Crime",
    movies: [
      { id: "cr1", title: "The Godfather",    poster: "https://placehold.co/120x180/1a1a2e/fff?text=Godfather" },
      { id: "cr2", title: "Pulp Fiction",     poster: "https://placehold.co/120x180/1a1a2e/fff?text=Pulp+Fiction" },
      { id: "cr3", title: "Goodfellas",       poster: "https://placehold.co/120x180/1a1a2e/fff?text=Goodfellas" },
      { id: "cr4", title: "Heat",             poster: "https://placehold.co/120x180/1a1a2e/fff?text=Heat" },
      { id: "cr5", title: "Se7en",            poster: "https://placehold.co/120x180/1a1a2e/fff?text=Se7en" },
    ],
  },
  {
    id: "drama", name: "Drama",
    movies: [
      { id: "dr1", title: "Shawshank Redemption",poster:"https://placehold.co/120x180/1a1a2e/fff?text=Shawshank" },
      { id: "dr2", title: "Forrest Gump",     poster: "https://placehold.co/120x180/1a1a2e/fff?text=Forrest+Gump" },
      { id: "dr3", title: "A Beautiful Mind", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Beautiful+Mind" },
      { id: "dr4", title: "The Green Mile",   poster: "https://placehold.co/120x180/1a1a2e/fff?text=Green+Mile" },
      { id: "dr5", title: "Parasite",         poster: "https://placehold.co/120x180/1a1a2e/fff?text=Parasite" },
    ],
  },
  {
    id: "fantasy", name: "Fantasy",
    movies: [
      { id: "fa1", title: "Lord of the Rings",poster: "https://placehold.co/120x180/1a1a2e/fff?text=LOTR" },
      { id: "fa2", title: "Harry Potter",     poster: "https://placehold.co/120x180/1a1a2e/fff?text=Harry+Potter" },
      { id: "fa3", title: "Pan's Labyrinth",  poster: "https://placehold.co/120x180/1a1a2e/fff?text=Pans+Labyrinth" },
      { id: "fa4", title: "The Princess Bride",poster:"https://placehold.co/120x180/1a1a2e/fff?text=Princess+Bride" },
      { id: "fa5", title: "Big Fish",         poster: "https://placehold.co/120x180/1a1a2e/fff?text=Big+Fish" },
    ],
  },
  {
    id: "history", name: "History",
    movies: [
      { id: "hi1", title: "Gladiator",        poster: "https://placehold.co/120x180/1a1a2e/fff?text=Gladiator" },
      { id: "hi2", title: "Braveheart",       poster: "https://placehold.co/120x180/1a1a2e/fff?text=Braveheart" },
      { id: "hi3", title: "Dunkirk",          poster: "https://placehold.co/120x180/1a1a2e/fff?text=Dunkirk" },
      { id: "hi4", title: "The King's Speech",poster: "https://placehold.co/120x180/1a1a2e/fff?text=Kings+Speech" },
      { id: "hi5", title: "Lincoln",          poster: "https://placehold.co/120x180/1a1a2e/fff?text=Lincoln" },
    ],
  },
  {
    id: "horror", name: "Horror",
    movies: [
      { id: "ho1", title: "Get Out",          poster: "https://placehold.co/120x180/1a1a2e/fff?text=Get+Out" },
      { id: "ho2", title: "The Shining",      poster: "https://placehold.co/120x180/1a1a2e/fff?text=The+Shining" },
      { id: "ho3", title: "Hereditary",       poster: "https://placehold.co/120x180/1a1a2e/fff?text=Hereditary" },
      { id: "ho4", title: "A Quiet Place",    poster: "https://placehold.co/120x180/1a1a2e/fff?text=Quiet+Place" },
      { id: "ho5", title: "It",               poster: "https://placehold.co/120x180/1a1a2e/fff?text=It" },
    ],
  },
  {
    id: "music", name: "Music",
    movies: [
      { id: "mu1", title: "Whiplash",         poster: "https://placehold.co/120x180/1a1a2e/fff?text=Whiplash" },
      { id: "mu2", title: "La La Land",       poster: "https://placehold.co/120x180/1a1a2e/fff?text=La+La+Land" },
      { id: "mu3", title: "Walk the Line",    poster: "https://placehold.co/120x180/1a1a2e/fff?text=Walk+Line" },
      { id: "mu4", title: "8 Mile",           poster: "https://placehold.co/120x180/1a1a2e/fff?text=8+Mile" },
      { id: "mu5", title: "Almost Famous",    poster: "https://placehold.co/120x180/1a1a2e/fff?text=Almost+Famous" },
    ],
  },
  {
    id: "mystery", name: "Mystery",
    movies: [
      { id: "my1", title: "Knives Out",       poster: "https://placehold.co/120x180/1a1a2e/fff?text=Knives+Out" },
      { id: "my2", title: "Gone Girl",        poster: "https://placehold.co/120x180/1a1a2e/fff?text=Gone+Girl" },
      { id: "my3", title: "The Prestige",     poster: "https://placehold.co/120x180/1a1a2e/fff?text=The+Prestige" },
      { id: "my4", title: "Memento",          poster: "https://placehold.co/120x180/1a1a2e/fff?text=Memento" },
      { id: "my5", title: "Shutter Island",   poster: "https://placehold.co/120x180/1a1a2e/fff?text=Shutter+Island" },
    ],
  },
  {
    id: "romance", name: "Romance",
    movies: [
      { id: "ro1", title: "Titanic",          poster: "https://placehold.co/120x180/1a1a2e/fff?text=Titanic" },
      { id: "ro2", title: "The Notebook",     poster: "https://placehold.co/120x180/1a1a2e/fff?text=The+Notebook" },
      { id: "ro3", title: "Pride & Prejudice",poster: "https://placehold.co/120x180/1a1a2e/fff?text=Pride+Prej" },
      { id: "ro4", title: "Before Sunrise",   poster: "https://placehold.co/120x180/1a1a2e/fff?text=Before+Sunrise" },
      { id: "ro5", title: "Crazy Rich Asians",poster: "https://placehold.co/120x180/1a1a2e/fff?text=Crazy+Rich" },
    ],
  },
  {
    id: "scifi", name: "Sci-Fi",
    movies: [
      { id: "sc1", title: "Inception",        poster: "https://placehold.co/120x180/1a1a2e/fff?text=Inception" },
      { id: "sc2", title: "Interstellar",     poster: "https://placehold.co/120x180/1a1a2e/fff?text=Interstellar" },
      { id: "sc3", title: "The Matrix",       poster: "https://placehold.co/120x180/1a1a2e/fff?text=The+Matrix" },
      { id: "sc4", title: "Arrival",          poster: "https://placehold.co/120x180/1a1a2e/fff?text=Arrival" },
      { id: "sc5", title: "Blade Runner 2049",poster: "https://placehold.co/120x180/1a1a2e/fff?text=Blade+Runner" },
    ],
  },
  {
    id: "sport", name: "Sport",
    movies: [
      { id: "sp1", title: "Rocky",            poster: "https://placehold.co/120x180/1a1a2e/fff?text=Rocky" },
      { id: "sp2", title: "Moneyball",        poster: "https://placehold.co/120x180/1a1a2e/fff?text=Moneyball" },
      { id: "sp3", title: "The Blind Side",   poster: "https://placehold.co/120x180/1a1a2e/fff?text=Blind+Side" },
      { id: "sp4", title: "Ford v Ferrari",   poster: "https://placehold.co/120x180/1a1a2e/fff?text=Ford+Ferrari" },
      { id: "sp5", title: "Whiplash",         poster: "https://placehold.co/120x180/1a1a2e/fff?text=Whiplash" },
    ],
  },
  {
    id: "thriller", name: "Thriller",
    movies: [
      { id: "th1", title: "Parasite",         poster: "https://placehold.co/120x180/1a1a2e/fff?text=Parasite" },
      { id: "th2", title: "Silence of Lambs", poster: "https://placehold.co/120x180/1a1a2e/fff?text=Silence" },
      { id: "th3", title: "No Country for Old Men",poster:"https://placehold.co/120x180/1a1a2e/fff?text=No+Country" },
      { id: "th4", title: "Zodiac",           poster: "https://placehold.co/120x180/1a1a2e/fff?text=Zodiac" },
      { id: "th5", title: "Prisoners",        poster: "https://placehold.co/120x180/1a1a2e/fff?text=Prisoners" },
    ],
  },
  {
    id: "war", name: "War",
    movies: [
      { id: "wa1", title: "Saving Private Ryan",poster:"https://placehold.co/120x180/1a1a2e/fff?text=Private+Ryan" },
      { id: "wa2", title: "Apocalypse Now",   poster: "https://placehold.co/120x180/1a1a2e/fff?text=Apocalypse+Now" },
      { id: "wa3", title: "Full Metal Jacket",poster: "https://placehold.co/120x180/1a1a2e/fff?text=Full+Metal" },
      { id: "wa4", title: "1917",             poster: "https://placehold.co/120x180/1a1a2e/fff?text=1917" },
      { id: "wa5", title: "Hacksaw Ridge",    poster: "https://placehold.co/120x180/1a1a2e/fff?text=Hacksaw+Ridge" },
    ],
  },
]

const MAX_PICKS = 5

export default function OnboardingPage() {
  const navigate = useNavigate()

  // Step 1: selected movie ids
  const [selectedIds, setSelectedIds] = useState([])

  // Step 2: comments & ratings keyed by movie id
  const [comments, setComments] = useState({})
  const [ratings, setRatings]   = useState({})
  const [hovered, setHovered]   = useState({})

  // Slide animation
  const [step, setStep]           = useState(1)
  const [animating, setAnimating] = useState(false)
  const [slideOut, setSlideOut]   = useState(false)

  // Flat list of all selected movie objects for step 2
  const allMovies = CATEGORIES.flatMap((c) => c.movies)
  const selectedMovies = allMovies.filter((m) => selectedIds.includes(m.id))

  // ── Toggle movie selection ────────────────────────────────────────────────
  const toggleMovie = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX_PICKS) return prev
      return [...prev, id]
    })
  }

  // ── Check step 2 valid: all 5 movies have a comment ──────────────────────
  const step2Valid = selectedMovies.every(
    (m) => (comments[m.id] || "").trim().length > 0 && ratings[m.id]
  )

  // ── Slide to step 2 ───────────────────────────────────────────────────────
  const goToStep2 = () => {
    if (selectedIds.length < MAX_PICKS || animating) return
    setAnimating(true)
    setSlideOut(true)
    setTimeout(() => {
      setStep(2)
      setSlideOut(false)
      setAnimating(false)
    }, 350)
  }

  // ── Slide back to step 1 ──────────────────────────────────────────────────
  const goBack = () => {
    if (animating) return
    setAnimating(true)
    setSlideOut(true)
    setTimeout(() => {
      setStep(1)
      setSlideOut(false)
      setAnimating(false)
    }, 350)
  }

  // ── Finish ────────────────────────────────────────────────────────────────
  const finish = () => {
    // TODO: send { movies: selectedMovies, comments } to backend
    console.log("Onboarding data:", { movies: selectedMovies, comments, ratings })
    navigate("/movies")
  }

  // ── Animation class ───────────────────────────────────────────────────────
  const panelClass = `transition-all duration-350 ease-in-out ${
    animating && slideOut ? (step === 1 ? "-translate-x-full opacity-0" : "translate-x-full opacity-0") : "translate-x-0 opacity-100"
  }`

  return (
    <div className="fixed inset-0 overflow-hidden text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="absolute inset-0 bg-[#0e0f13]/80" />

      {/* Content */}
      <div className="relative z-10 h-full overflow-y-auto">
        <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">

          {/* Progress */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? "w-10 bg-[#890202]" : "w-6 bg-white/30"}`} />
            <div className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? "w-10 bg-[#890202]" : "w-6 bg-white/30"}`} />
          </div>

          {/* ── STEP 1: Pick 5 movies ─────────────────────────────────────── */}
          {step === 1 && (
            <div className={panelClass}>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  Choose <span style={{ color: "#890202" }}>5 movies</span> you've seen
                </h1>
                <p className="text-white/50 text-sm">
                  We'll use your choices to personalise your recommendations
                </p>
                {/* Counter pill */}
                <div className={`inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  selectedIds.length === MAX_PICKS
                    ? "bg-[#890202]/30 border-[#890202] text-white"
                    : "bg-white/10 border-white/20 text-white/70"
                }`}>
                  <span>{selectedIds.length} / {MAX_PICKS} selected</span>
                  {selectedIds.length === MAX_PICKS && <span>✓</span>}
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-col gap-10">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id}>
                    {/* Category label */}
                    <h2 className="text-base sm:text-lg font-semibold text-white/80 mb-3 border-l-4 pl-3" style={{ borderColor: "#890202" }}>
                      {cat.name}
                    </h2>

                    {/* Movie row */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
                      {cat.movies.map((movie) => {
                        const isSelected = selectedIds.includes(movie.id)
                        const isDisabled = !isSelected && selectedIds.length >= MAX_PICKS
                        return (
                          <button
                            key={movie.id}
                            onClick={() => !isDisabled && toggleMovie(movie.id)}
                            disabled={isDisabled}
                            className={`relative rounded-xl overflow-hidden transition-all duration-200 cursor-pointer group
                              ${isDisabled ? "opacity-35 cursor-not-allowed" : "hover:scale-[1.04]"}
                              ${isSelected ? "ring-2 ring-[#890202] scale-[1.04]" : ""}
                            `}
                          >
                            <img
                              src={movie.poster}
                              alt={movie.title}
                              className="w-full h-28 sm:h-32 md:h-36 object-cover"
                            />
                            {/* Title bar */}
                            <div className="bg-black/70 px-1.5 py-1">
                              <p className="text-[10px] sm:text-xs text-white/80 text-center truncate">
                                {movie.title}
                              </p>
                            </div>
                            {/* Selected overlay */}
                            {isSelected && (
                              <div className="absolute inset-0 bg-[#890202]/40 flex items-start justify-end p-1.5">
                                <div className="w-5 h-5 rounded-full bg-[#890202] flex items-center justify-center text-white text-xs font-bold shadow">
                                  ✓
                                </div>
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Next button — sticky at bottom */}
              <div className="sticky bottom-0 pt-4 pb-2 bg-gradient-to-t from-[#0e0f13] to-transparent mt-8">
                <button
                  onClick={goToStep2}
                  disabled={selectedIds.length < MAX_PICKS}
                  className="w-full py-3.5 rounded-xl font-semibold text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:opacity-90"
                  style={{ background: "#890202" }}
                >
                  Next — Leave your comments →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Comments ──────────────────────────────────────────── */}
          {step === 2 && (
            <div className={panelClass}>
              {/* Header */}
              <div className="mb-8">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-white/60 hover:text-white mb-5 transition text-sm cursor-pointer"
                >
                  ← Back
                </button>
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
                  Tell us what you thought
                </h1>
                <p className="text-white/50 text-sm text-center">
                  Leave a short comment on each movie — we'll use this to understand your taste
                </p>
              </div>

              {/* Comment cards */}
              <div className="flex flex-col gap-5">
                {selectedMovies.map((movie, i) => (
                  <div
                    key={movie.id}
                    className="flex gap-4 bg-[#1c1c2e] border border-white/25 rounded-2xl p-4 sm:p-5 shadow-lg"
                  >
                    {/* Poster */}
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-16 sm:w-20 h-24 sm:h-28 object-cover rounded-lg shrink-0"
                    />

                    {/* Comment area */}
                    <div className="flex flex-col flex-1 gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-white/40">#{i + 1}</span>
                        <h3 className="text-sm sm:text-base font-semibold text-white">
                          {movie.title}
                        </h3>

                        {/* ★ Star rating 1–10 */}
                        <div className="flex items-center gap-0.5 ml-1">
                          {[1,2,3,4,5,6,7,8,9,10].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRatings((prev) => ({ ...prev, [movie.id]: star }))}
                              onMouseEnter={() => setHovered((prev) => ({ ...prev, [movie.id]: star }))}
                              onMouseLeave={() => setHovered((prev) => ({ ...prev, [movie.id]: 0 }))}
                              className="text-base leading-none cursor-pointer transition-transform hover:scale-125"
                            >
                              <span className={
                                star <= (hovered[movie.id] || ratings[movie.id] || 0)
                                  ? "text-[#890202]"
                                  : "text-white/25"
                              }>★</span>
                            </button>
                          ))}
                          {ratings[movie.id] && (
                            <span className="text-xs text-white/50 ml-1">{ratings[movie.id]}/10</span>
                          )}
                        </div>

                        {(comments[movie.id] || "").trim().length > 0 && ratings[movie.id] && (
                          <span className="ml-auto text-xs text-green-400 font-medium">✓ Done</span>
                        )}
                      </div>

                      <textarea
                        rows={4}
                        placeholder={`What did you think of "${movie.title}"? Did you like it? What stood out?`}
                        value={comments[movie.id] || ""}
                        onChange={(e) =>
                          setComments((prev) => ({ ...prev, [movie.id]: e.target.value }))
                        }
                        className="w-full bg-[#2a2a3a] border-2 border-white/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/60 resize-none focus:outline-none focus:border-[#890202] focus:bg-[#32324a] transition"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Finish button */}
              <div className="sticky bottom-0 pt-4 pb-2 big-gradient-to-t from-[#0e0f13] to-transparent mt-6">
                <button
                  onClick={finish}
                  disabled={!step2Valid}
                  className="w-full py-3.5 rounded-xl font-semibold text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:opacity-90"
                  style={{ background: "#890202" }}
                >
                  🎬 Let's go — Build my profile
                </button>
                {!step2Valid && (
                  <p className="text-center text-white/40 text-xs mt-2">
                    Leave a comment and rating on all {MAX_PICKS} movies to continue
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
