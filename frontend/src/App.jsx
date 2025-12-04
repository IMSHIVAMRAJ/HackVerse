import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'
import Home1 from './pages/Home1'
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import TeamsPage from './pages/TeamsPage'
import RequirementsPage from './pages/RequirementPage'
import ProfilePage from './pages/ProfilePage'
import ChatsList from './pages/ChatsList'
import ChatPage from './pages/ChatPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home1 />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teams"
          element={
            <ProtectedRoute>
              <TeamsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/requirements"
          element={
            <ProtectedRoute>
              <RequirementsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/chat/:conversationId" element={<ChatPage />} />
<Route path="/chats" element={<ChatsList />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
