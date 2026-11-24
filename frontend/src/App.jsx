// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// import { AuthProvider } from './context/AuthContext.jsx'
// import ProtectedRoute from './components/ProtectedRoute'

// import LandingPage from './pages/public/LandingPage'
// import Login from './pages/auth/Login'
// import Register from './pages/auth/Register'

// import DashboardLayout from './components/DashboardLayout'
// import Dashboard from './pages/dashboard/Dashboard'
// import CropUpload from './pages/dashboard/CropUpload'
// import Analysis from './pages/dashboard/Analysis'
// import Reports from './pages/dashboard/Reports'
// import Profile from './pages/dashboard/Profile'
// import Settings from './pages/dashboard/Settings'

// function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           {/* Public routes */}
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protected dashboard routes */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/dashboard" element={<DashboardLayout />}>
//               <Route index element={<Dashboard />} />
//               <Route path="upload" element={<CropUpload />} />
//               <Route path="analysis" element={<Analysis />} />
//               <Route path="reports" element={<Reports />} />
//               <Route path="profile" element={<Profile />} />
//               <Route path="settings" element={<Settings />} />
//             </Route>
//           </Route>

//           {/* Fallback route */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   )
// }

// export default App






import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute'

import LandingPage from './pages/public/LandingPage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import DashboardLayout from './components/DashboardLayout'
import Dashboard from './pages/dashboard/Dashboard'
import CropUpload from './pages/dashboard/CropUpload'
import Analysis from './pages/dashboard/Analysis'
import Reports from './pages/dashboard/Reports'
import Profile from './pages/dashboard/Profile'
import Settings from './pages/dashboard/Settings'
import Weather from './pages/dashboard/Weather'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected dashboard routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="upload" element={<CropUpload />} />
              <Route path="analysis" element={<Analysis />} />
              <Route path="weather" element={<Weather />} />
              <Route path="reports" element={<Reports />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
