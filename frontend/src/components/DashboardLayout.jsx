// import { useEffect, useRef, useState } from 'react'
// import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
// import {
//   Menu,
//   Leaf,
//   UserRound,
//   LogOut,
//   ChevronDown,
// } from 'lucide-react'
// import Sidebar from './Sidebar'
// import { useAuth } from '../context/useAuth'

// const pageTitles = {
//   '/dashboard': 'Dashboard',
//   '/dashboard/upload': 'Upload Crop Image',
//   '/dashboard/analysis': 'Disease Analysis',
//   '/dashboard/reports': 'Prediction Reports',
//   '/dashboard/profile': 'My Profile',
//   '/dashboard/settings': 'Settings',
// }

// function DashboardLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [profileOpen, setProfileOpen] = useState(false)

//   const profileRef = useRef(null)
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { user, logout } = useAuth()

//   const pageTitle = pageTitles[location.pathname] || 'PlantCare'
//   const firstLetter = user?.name?.charAt(0)?.toUpperCase() || 'U'

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileOpen(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   const handleLogout = () => {
//     setProfileOpen(false)
//     logout()
//     navigate('/login')
//   }

//   return (
//     <div className="min-h-screen bg-[#f5faf6]">
//       <Sidebar
//         open={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//       />

//       <div className="min-h-screen lg:pl-72">
//         <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-emerald-100 bg-white/90 px-5 backdrop-blur-xl sm:px-8">

//           <div className="flex items-center gap-4">
//             <button
//               type="button"
//               onClick={() => setSidebarOpen(true)}
//               className="rounded-xl p-2 text-slate-700 transition hover:bg-emerald-50 lg:hidden"
//               aria-label="Open navigation"
//             >
//               <Menu size={24} />
//             </button>

//             <div>
//               <p className="text-xs font-medium text-slate-400">
//                 PlantCare Workspace
//               </p>
//               <h1 className="text-lg font-extrabold text-slate-900 sm:text-xl">
//                 {pageTitle}
//               </h1>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 sm:flex">
//               <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
//               AI System Ready
//             </div>

//             {/* Profile dropdown */}
//             <div className="relative" ref={profileRef}>
//               <button
//                 type="button"
//                 onClick={() => setProfileOpen((previous) => !previous)}
//                 aria-label="Open profile menu"
//                 aria-expanded={profileOpen}
//                 className={`flex items-center gap-2 rounded-xl border p-2 transition ${
//                   profileOpen
//                     ? 'border-emerald-200 bg-emerald-50'
//                     : 'border-slate-100 bg-white hover:border-emerald-200 hover:bg-emerald-50'
//                 }`}
//               >
//                 <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700">
//                   {firstLetter}
//                 </span>
//                 <ChevronDown
//                   size={16}
//                   className={`text-slate-500 transition-transform ${
//                     profileOpen ? 'rotate-180' : ''
//                   }`}
//                 />
//               </button>

//               {profileOpen && (
//                 <div className="absolute right-0 top-full z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-emerald-100 bg-white py-2 shadow-xl shadow-slate-900/10">
//                   <div className="border-b border-slate-100 px-4 py-3">
//                     <p className="truncate text-sm font-bold text-slate-800">
//                       {user?.name || 'PlantCare User'}
//                     </p>
//                     <p className="truncate text-xs text-slate-500">
//                       {user?.email || 'Welcome'}
//                     </p>
//                   </div>

//                   <Link
//                     to="/dashboard/profile"
//                     onClick={() => setProfileOpen(false)}
//                     className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
//                   >
//                     <UserRound size={18} />
//                     My Profile
//                   </Link>

//                   <button
//                     type="button"
//                     onClick={handleLogout}
//                     className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
//                   >
//                     <LogOut size={18} />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>

            
//           </div>
//         </header>

//         <main className="mx-auto max-w-[1600px] p-5 sm:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   )
// }

// export default DashboardLayout






import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  UserRound,
  LogOut,
  ChevronDown,
} from 'lucide-react'
import Sidebar from './Sidebar'
import { useAuth } from '../context/useAuth'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/dashboard/upload': 'Upload Crop Image',
  '/dashboard/analysis': 'Disease Analysis',
  '/dashboard/reports': 'Prediction Reports',
  '/dashboard/profile': 'My Profile',
  '/dashboard/settings': 'Settings',
}

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const profileRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const pageTitle = pageTitles[location.pathname] || 'PlantCare'
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || 'U'

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    setProfileOpen(false)
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#f5faf6]">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-emerald-100 bg-white/90 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl p-2 text-slate-700 transition hover:bg-emerald-50 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu size={24} />
            </button>

            <div>
              <p className="text-xs font-medium text-slate-400">
                PlantCare Workspace
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                {pageTitle}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              AI System Ready
            </div>

            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((previous) => !previous)}
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
                className={`flex items-center gap-2 rounded-xl border p-2 transition ${
                  profileOpen
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-slate-100 bg-white hover:border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700">
                  {firstLetter}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-slate-500 transition-transform ${
                    profileOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-emerald-100 bg-white py-2 shadow-xl shadow-slate-900/10">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {user?.name || 'PlantCare User'}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {user?.email || 'Welcome'}
                    </p>
                  </div>

                  <Link
                    to="/dashboard/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <UserRound size={18} />
                    My Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout