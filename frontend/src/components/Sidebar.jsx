// import { NavLink, useNavigate } from 'react-router-dom'
// import {
//   LayoutDashboard,
//   Upload,
//   ScanSearch,
//   FileText,
//   UserRound,
//   Settings,
//   Leaf,
//   LogOut,
//   X,
// } from 'lucide-react'
// import { useAuth } from '../context/useAuth'

// const navigation = [
//   { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, end: true },
//   { label: 'Upload Crop', path: '/dashboard/upload', icon: Upload },
//   { label: 'Analysis', path: '/dashboard/analysis', icon: ScanSearch },
//   { label: 'Reports', path: '/dashboard/reports', icon: FileText },
//   { label: 'My Profile', path: '/dashboard/profile', icon: UserRound },
//   { label: 'Settings', path: '/dashboard/settings', icon: Settings },
// ]

// function Sidebar({ open, onClose }) {
//   const { user, logout } = useAuth()
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     logout()
//     navigate('/login')
//   }

//   return (
//     <>
//       {open && (
//         <button
//           type="button"
//           aria-label="Close sidebar overlay"
//           onClick={onClose}
//           className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
//         />
//       )}

//       <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#103c2b] text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
//         open ? 'translate-x-0' : '-translate-x-full'
//       }`}>

//         <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
//           <div className="flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500">
//               <Leaf size={25} />
//             </div>
//             <div>
//               <h2 className="text-xl font-extrabold">
//                 Plant<span className="text-emerald-300">Care</span>
//               </h2>
//               <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-200">
//                 AI Diagnosis
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-lg p-2 text-emerald-100 hover:bg-white/10 lg:hidden"
//             aria-label="Close sidebar"
//           >
//             <X size={21} />
//           </button>
//         </div>

//         <div className="px-5 pt-8">
//           <p className="mb-4 px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300/70">
//             Workspace
//           </p>

//           <nav className="space-y-2">
//             {navigation.map((item) => {
//               const Icon = item.icon

//               return (
//                 <NavLink
//                   key={item.path}
//                   to={item.path}
//                   end={item.end}
//                   onClick={onClose}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 ${
//                       isActive
//                         ? 'bg-emerald-500 text-white shadow-lg shadow-black/10'
//                         : 'text-emerald-100/80 hover:bg-white/10 hover:text-white'
//                     }`
//                   }
//                 >
//                   <Icon size={19} />
//                   {item.label}
//                 </NavLink>
//               )
//             })}
//           </nav>
//         </div>

//         <div className="mt-auto border-t border-white/10 p-5">
//           <div className="mb-4 flex items-center gap-3 rounded-xl bg-white/10 p-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400 font-bold text-emerald-950">
//               {user?.name?.charAt(0)?.toUpperCase() || 'U'}
//             </div>
//             <div className="min-w-0">
//               <p className="truncate text-sm font-bold">
//                 {user?.name || 'PlantCare User'}
//               </p>
//               <p className="truncate text-xs text-emerald-200">
//                 {user?.email || 'Welcome'}
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={handleLogout}
//             className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-red-500/15 hover:text-red-200"
//           >
//             <LogOut size={19} />
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   )
// }

// export default Sidebar


import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Upload,
  ScanSearch,
  FileText,
  UserRound,
  Settings,
  Leaf,
  LogOut,
  X,
  CloudSun,
} from 'lucide-react'
import { useAuth } from '../context/useAuth'

const navigation = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, end: true },
  { label: 'Upload Crop', path: '/dashboard/upload', icon: Upload },
  { label: 'Analysis', path: '/dashboard/analysis', icon: ScanSearch },
  { label: 'Weather Forecasting', path: '/dashboard/weather', icon: CloudSun },
  { label: 'Reports', path: '/dashboard/reports', icon: FileText },
  { label: 'My Profile', path: '/dashboard/profile', icon: UserRound },
  { label: 'Settings', path: '/dashboard/settings', icon: Settings },
]

function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#103c2b] text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500">
              <Leaf size={25} />
            </div>

            <div>
              <h2 className="text-xl font-extrabold">
                Plant<span className="text-emerald-300">Care</span>
              </h2>
              <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-200">
                AI Diagnosis
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-emerald-100 hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>
        </div>

        <div className="px-5 pt-8">
          <p className="mb-4 px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300/70">
            Workspace
          </p>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                      isActive
                        ? 'bg-emerald-500 text-white shadow-lg shadow-black/10'
                        : 'text-emerald-100/80 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon size={19} />
                  {item.label}
                </NavLink>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 p-5">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-white/10 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400 font-bold text-emerald-950">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold">
                {user?.name || 'PlantCare User'}
              </p>
              <p className="truncate text-xs text-emerald-200">
                {user?.email || 'Welcome'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-red-500/15 hover:text-red-200"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

