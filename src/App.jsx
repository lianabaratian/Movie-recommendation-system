import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import MoviesPage from "./pages/MoviesPage"
import MovieDetailPage from "./pages/MovieDetailPage"
import RecommendationsPage from "./pages/RecommendationsPage"
import OnboardingPage from "./pages/OnboardingPage"

// Blocks access to a route if user is not logged in
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Onboarding (protected, runs once after register) */}
          <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />

          {/* Protected routes */}
          <Route path="/movies" element={<ProtectedRoute><MoviesPage /></ProtectedRoute>} />
          <Route path="/movies/:id" element={<ProtectedRoute><MovieDetailPage /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute><RecommendationsPage /></ProtectedRoute>} />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
