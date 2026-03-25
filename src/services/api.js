import axios from "axios"
import { mockMovies, mockRecommendations, mockTrending, mockRecentlyAdded, mockUser, mockComments } from "./mockData"

const USE_MOCK = true // ← flip to false when backend is ready

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
})

// Auto-attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auto-logout on 401 (token expired or invalid)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

// --- AUTH ---

export const login = async (username, password) => {
  if (USE_MOCK) {
    if (username === "liana" && password === "1234") {
      return { token: "fake-jwt-token", user: mockUser }
    }
    throw new Error("Invalid username or password")
  }
  const res = await api.post("/api/auth/login/", { username, password })
  return res.data
}

export const register = async (username, email, password) => {
  if (USE_MOCK) {
    return { token: "fake-jwt-token", user: { ...mockUser, username, email } }
  }
  const res = await api.post("/api/auth/register/", { username, email, password })
  return res.data
}

// --- MOVIES ---

export const getMovies = async (search = "") => {
  if (USE_MOCK) {
    return mockMovies.filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase())
    )
  }
  const res = await api.get(`/api/movies/?search=${search}`)
  return res.data
}

export const getMovieById = async (id) => {
  if (USE_MOCK) {
    const movie = mockMovies.find((m) => m.id === Number(id))
    if (!movie) throw new Error("Movie not found")
    return movie
  }
  const res = await api.get(`/api/movies/${id}/`)
  return res.data
}

// --- REVIEWS / COMMENTS ---

export const getComments = async (movieId) => {
  if (USE_MOCK) return mockComments[movieId] || []
  const res = await api.get(`/api/reviews/?movie=${movieId}`)
  return res.data
}

export const submitReview = async (movieId, reviewText, rating) => {
  if (USE_MOCK) {
    return { success: true, sentiment: "positive" }
  }
  const res = await api.post("/api/reviews/", { movie: movieId, text: reviewText, rating })
  return res.data
}

// --- TRENDING & RECENTLY ADDED ---

export const getTrending = async () => {
  if (USE_MOCK) return mockTrending
  const res = await api.get("/api/movies/trending/")
  return res.data
}

export const getRecentlyAdded = async () => {
  if (USE_MOCK) return mockRecentlyAdded
  const res = await api.get("/api/movies/recent/")
  return res.data
}

// --- RECOMMENDATIONS ---

export const getRecommendations = async () => {
  if (USE_MOCK) {
    return mockRecommendations
  }
  const res = await api.get("/api/recommendations/")
  return res.data
}
