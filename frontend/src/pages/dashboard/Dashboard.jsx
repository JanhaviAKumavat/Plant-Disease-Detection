// import { useCallback, useEffect, useMemo, useState } from 'react'
// import { Link } from 'react-router-dom'
// import {
//   Leaf,
//   Upload,
//   ScanSearch,
//   Activity,
//   ArrowUpRight,
//   Clock,
//   Image as ImageIcon,
//   BrainCircuit,
//   Sprout,
//   RefreshCw,
//   LoaderCircle,
//   AlertCircle,
//   CheckCircle2,
//   TrendingUp,
// } from 'lucide-react'
// import { useAuth } from '../../context/useAuth'
// import api from '../../services/api'

// function formatDisease(value = '') {
//   return String(value)
//     .replace(/___/g, ' - ')
//     .replace(/_/g, ' ')
//     .replace(/\b\w/g, (letter) => letter.toUpperCase())
// }

// function formatDate(value) {
//   if (!value) return 'Date unavailable'

//   const date = new Date(value)

//   if (Number.isNaN(date.getTime())) return 'Date unavailable'

//   return date.toLocaleString(undefined, {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//   })
// }

// function Dashboard() {
//   const { user } = useAuth()

//   const [records, setRecords] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [refreshing, setRefreshing] = useState(false)
//   const [error, setError] = useState('')

//   const loadHistory = useCallback(async (isRefresh = false) => {
//     if (isRefresh) {
//       setRefreshing(true)
//     } else {
//       setLoading(true)
//     }

//     setError('')

//     try {
//       const response = await api.get('/api/predictions/history')
//       const history = response.data?.data

//       setRecords(Array.isArray(history) ? history : [])
//     } catch (err) {
//       setError(
//         err.response?.data?.detail ||
//         'Unable to load your prediction statistics. Please try again.'
//       )
//     } finally {
//       setLoading(false)
//       setRefreshing(false)
//     }
//   }, [])

//   useEffect(() => {
//     loadHistory()
//   }, [loadHistory])

//   const recentActivity = useMemo(() => {
//     const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000

//     return records.filter((record) => {
//       const date = new Date(record.created_at).getTime()
//       return Number.isFinite(date) && date >= sevenDaysAgo
//     }).length
//   }, [records])

//   const stats = [
//     {
//       title: 'Total Predictions',
//       value: records.length,
//       subtitle: 'Saved plant analyses',
//       icon: ScanSearch,
//       iconStyle: 'bg-emerald-100 text-emerald-700',
//       accent: 'from-emerald-500 to-green-400',
//     },
//     {
//       title: 'Images Analyzed',
//       value: records.length,
//       subtitle: 'Images with saved results',
//       icon: ImageIcon,
//       iconStyle: 'bg-blue-100 text-blue-700',
//       accent: 'from-blue-500 to-cyan-400',
//     },
//     {
//       title: 'Recent Activity',
//       value: recentActivity,
//       subtitle: 'Predictions in the last 7 days',
//       icon: Activity,
//       iconStyle: 'bg-amber-100 text-amber-700',
//       accent: 'from-amber-500 to-orange-400',
//     },
//   ]

//   const latestRecords = records.slice(0, 3)

//   return (
//     <div className="space-y-7 pb-8">

//       {/* Welcome banner */}
//       <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#083d2b] via-emerald-800 to-emerald-600 p-5 text-white shadow-xl shadow-emerald-950/10 sm:p-6 lg:p-7">
//         <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-emerald-300/15 blur-3xl" />
//         <div className="pointer-events-none absolute -bottom-28 right-1/3 h-64 w-64 rounded-full bg-lime-300/10 blur-3xl" />

//         <div className="relative flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
//           <div className="max-w-2xl">
//             <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-50 backdrop-blur">
//               <Sprout size={15} />
//               Your PlantCare Workspace
//             </div>

//             <h1 className="mt-3 text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl">
//               Welcome back,{' '}
//               <span className="text-lime-300">
//                 {user?.name?.split(' ')[0] || 'Gardener'}!
//               </span>
//             </h1>

//             <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50/85 sm:text-sm">
//               Keep your plants healthy with intelligent disease detection.
//               Upload a leaf image and explore AI-powered insights and
//               explanations.
//             </p>

//             <div className="mt-4 flex flex-wrap gap-3">
//               <Link
//                 to="/dashboard/upload"
//                 className="inline-flex items-center justify-center gap-2 rounded-xl bg-white !text-emerald-950 px-5 py-3 text-sm font-extrabold shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-lime-50 hover:shadow-xl"
//               >
//                 <Upload size={18} className="text-emerald-950" />
//                 Analyze a Plant
//                 <ArrowUpRight size={17} className="text-emerald-950" />
//               </Link>

//               {/* <Link
//                 to="/dashboard/reports"
//                 className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
//               >
//                 <Activity size={18} />
//                 View Reports
//               </Link> */}
//             </div>
//           </div>

//           <div className="relative hidden h-36 w-36 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-inner backdrop-blur-sm lg:flex">
//             <div className="absolute inset-3 rounded-full border border-white/15" />
//             <Leaf size={78} strokeWidth={1.1} className="text-emerald-50" />
//             <span className="absolute -right-2 top-7 flex h-9 w-9 items-center justify-center rounded-2xl bg-lime-300 text-emerald-950 shadow-lg">
//               <CheckCircle2 size={19} />
//             </span>
//           </div>
//         </div>
//       </section>

//       {/* Overview heading */}
//       <section>
//         <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
//           <div>
//             <div className="flex items-center gap-2">
//               <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
//                 Your Overview
//               </h2>
//               <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
//                 Live Statistics
//               </span>
//             </div>
//             <p className="mt-1 text-sm text-slate-500">
//               A quick look at your plant analysis activity.
//             </p>
//           </div>

          
//         </div>

//         {error && (
//           <div
//             role="alert"
//             className="mb-5 flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between"
//           >
//             <div className="flex items-start gap-3 text-sm text-red-700">
//               <AlertCircle size={19} className="mt-0.5 shrink-0" />
//               <p>{error}</p>
//             </div>
//             <button
//               type="button"
//               onClick={() => loadHistory(true)}
//               className="w-fit rounded-lg bg-red-100 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-200"
//             >
//               Try again
//             </button>
//           </div>
//         )}

//         <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
//           {stats.map((stat) => {
//             const Icon = stat.icon

//             return (
//               <article
//                 key={stat.title}
//                 className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5 sm:p-6"
//               >
//                 <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${stat.accent}`} />

//                 <div className="flex items-center justify-between">
//                   <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconStyle}`}>
//                     <Icon size={23} />
//                   </div>

//                   <div className="rounded-full bg-slate-50 p-2 text-slate-300 transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
//                     <ArrowUpRight size={18} />
//                   </div>
//                 </div>

//                 <p className="mt-6 text-sm font-semibold text-slate-500">
//                   {stat.title}
//                 </p>

//                 <div className="mt-1 flex items-end gap-2">
//                   <h3 className="text-4xl font-black tracking-tight text-slate-900">
//                     {loading ? (
//                       <span className="inline-block h-10 w-12 animate-pulse rounded-lg bg-slate-100" />
//                     ) : error ? (
//                       '—'
//                     ) : (
//                       stat.value
//                     )}
//                   </h3>
//                 </div>

//                 <p className="mt-2 text-xs font-medium text-slate-400">
//                   {stat.subtitle}
//                 </p>
//               </article>
//             )
//           })}
//         </div>
//       </section>

//       {/* Main dashboard content */}
//       <section className="grid gap-5 lg:grid-cols-5">

//         {/* AI information card */}
//         <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm lg:col-span-2 sm:p-7">
//           <div className="pointer-events-none absolute -bottom-16 -right-12 h-40 w-40 rounded-full bg-emerald-50 blur-2xl" />

//           <div className="relative">
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
//               <BrainCircuit size={25} />
//             </div>

//             <h3 className="mt-5 text-lg font-extrabold text-slate-900">
//               AI Plant Analysis
//             </h3>

//             <p className="mt-2 text-sm leading-7 text-slate-500">
//               Our lightweight vision model examines plant leaf images,
//               identifies possible diseases and provides useful disease
//               information with visual explanations.
//             </p>

//             <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-emerald-700">
//               <CheckCircle2 size={16} />
//               PlantCare AI workspace
//             </div>

//             <Link
//               to="/dashboard/upload"
//               className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/15 transition hover:-translate-y-0.5 hover:bg-emerald-700"
//             >
//               Start Analysis
//               <ArrowUpRight size={17} className="text-emerald-950" />
//             </Link>
//           </div>
//         </div>

//         {/* Recent predictions */}
//         <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-3 sm:p-7">
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <div>
//               <div className="flex items-center gap-2">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
//                   <Clock size={20} />
//                 </div>
//                 <h3 className="text-lg font-extrabold text-slate-900">
//                   Recent Predictions
//                 </h3>
//               </div>
//               <p className="mt-2 text-xs text-slate-500">
//                 Your latest saved plant analysis results.
//               </p>
//             </div>

//             <Link
//               to="/dashboard/reports"
//               className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 transition hover:gap-2.5"
//             >
//               View all
//               <ArrowUpRight size={15} />
//             </Link>
//           </div>

//           {loading ? (
//             <div className="flex min-h-48 flex-col items-center justify-center text-emerald-700">
//               <LoaderCircle size={27} className="animate-spin" />
//               <p className="mt-3 text-xs font-medium text-slate-500">
//                 Loading recent predictions...
//               </p>
//             </div>
//           ) : error ? (
//             <div className="flex min-h-48 flex-col items-center justify-center text-center">
//               <AlertCircle size={26} className="text-amber-500" />
//               <p className="mt-3 text-sm font-semibold text-slate-700">
//                 Predictions could not be loaded.
//               </p>
//               <p className="mt-1 text-xs text-slate-400">
//                 Please refresh the dashboard.
//               </p>
//             </div>
//           ) : latestRecords.length === 0 ? (
//             <div className="flex min-h-48 flex-col items-center justify-center rounded-xl bg-emerald-50/60 px-5 text-center">
//               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
//                 <Leaf size={25} />
//               </div>
//               <h4 className="mt-3 text-sm font-bold text-slate-800">
//                 No predictions yet
//               </h4>
//               <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
//                 Analyze your first plant image. Your latest results will
//                 appear here.
//               </p>
//               <Link
//                 to="/dashboard/upload"
//                 className="mt-4 text-xs font-bold text-emerald-700 hover:underline"
//               >
//                 Upload your first image
//               </Link>
//             </div>
//           ) : (
//             <div className="mt-5 space-y-3">
//               {latestRecords.map((record) => {
//                 const prediction = record.prediction || {}
//                 const confidence = Number(prediction.confidence || 0)
//                 const highConfidence = confidence >= 70

//                 return (
//                   <article
//                     key={record.id}
//                     className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/40"
//                   >
//                     <div className="flex items-start justify-between gap-3">
//                       <div className="flex min-w-0 items-start gap-3">
//                         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
//                           <Leaf size={20} />
//                         </div>

//                         <div className="min-w-0">
//                           <h4 className="break-words text-sm font-bold text-slate-800">
//                             {formatDisease(
//                               prediction.predicted_disease || 'Unknown disease'
//                             )}
//                           </h4>
//                           <p className="mt-1 text-[11px] text-slate-400">
//                             {formatDate(record.created_at)}
//                           </p>
//                         </div>
//                       </div>

//                       <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${highConfidence ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
//                         {confidence.toFixed(1)}%
//                       </span>
//                     </div>

//                     <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
//                       <div
//                         className={`h-full rounded-full ${highConfidence ? 'bg-emerald-500' : 'bg-amber-400'}`}
//                         style={{
//                           width: `${Math.min(100, Math.max(0, confidence))}%`,
//                         }}
//                       />
//                     </div>
//                   </article>
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Bottom call to action */}
//       <section className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-white to-emerald-50/80 p-6 sm:p-8">
//         <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
//           <div className="flex items-start gap-4">
//             <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 sm:flex">
//               <TrendingUp size={24} />
//             </div>

//             <div>
//               <h3 className="text-lg font-extrabold text-slate-900">
//                 Ready to diagnose a plant?
//               </h3>
//               <p className="mt-1 text-sm leading-6 text-slate-500">
//                 Upload a clear leaf photograph and get started with your AI
//                 plant disease analysis.
//               </p>
//             </div>
//           </div>

//           <Link
//             to="/dashboard/upload"
//             className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-700"
//           >
//             <Upload size={18} className="text-emerald-950" />
//             Upload Image
//           </Link>
//         </div>
//       </section>

//     </div>
//   )
// }

// export default Dashboard



// import { useCallback, useEffect, useMemo, useState } from 'react'
// import { Link } from 'react-router-dom'
// import {
//   Leaf,
//   Upload,
//   ScanSearch,
//   Activity,
//   ArrowUpRight,
//   ChevronRight,
//   Clock,
//   Image as ImageIcon,
//   BrainCircuit,
//   Sprout,
//   LoaderCircle,
//   AlertCircle,
//   CheckCircle2,
//   TrendingUp,
// } from 'lucide-react'
// import { useAuth } from '../../context/useAuth'
// import api from '../../services/api'

// const SEVEN_DAYS_AGO = Date.now() - 7 * 24 * 60 * 60 * 1000

// function formatDisease(value = '') {
//   return String(value)
//     .replace(/___/g, ' - ')
//     .replace(/_/g, ' ')
//     .replace(/\b\w/g, (letter) => letter.toUpperCase())
// }

// function formatDate(value) {
//   if (!value) return 'Date unavailable'

//   const date = new Date(value)

//   if (Number.isNaN(date.getTime())) return 'Date unavailable'

//   return date.toLocaleString(undefined, {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//   })
// }

// async function fetchPredictionHistory() {
//   const response = await api.get('/api/predictions/history')
//   const history = response.data?.data

//   return Array.isArray(history) ? history : []
// }

// function getHistoryError(err) {
//   return (
//     err.response?.data?.detail ||
//     'Unable to load your prediction statistics. Please try again.'
//   )
// }

// function Dashboard() {
//   const { user } = useAuth()

//   const [records, setRecords] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     let isActive = true

//     fetchPredictionHistory()
//       .then((history) => {
//         if (isActive) setRecords(history)
//       })
//       .catch((err) => {
//         if (isActive) setError(getHistoryError(err))
//       })
//       .finally(() => {
//         if (isActive) setLoading(false)
//       })

//     return () => {
//       isActive = false
//     }
//   }, [])

//   const loadHistory = useCallback(async () => {
//     setLoading(true)
//     setError('')

//     try {
//       const history = await fetchPredictionHistory()
//       setRecords(history)
//     } catch (err) {
//       setError(getHistoryError(err))
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   const recentActivity = useMemo(() => {
//     return records.filter((record) => {
//       const date = new Date(record.created_at).getTime()
//       return Number.isFinite(date) && date >= SEVEN_DAYS_AGO
//     }).length
//   }, [records])

//   const stats = [
//     {
//       title: 'Total Predictions',
//       value: records.length,
//       subtitle: 'Saved plant analyses',
//       icon: ScanSearch,
//       iconStyle: 'bg-emerald-100 text-emerald-600',
//       accent: 'from-emerald-500 to-green-400',
//     },
//     {
//       title: 'Images Analyzed',
//       value: records.length,
//       subtitle: 'Images with saved results',
//       icon: ImageIcon,
//       iconStyle: 'bg-blue-100 text-blue-600',
//       accent: 'from-blue-500 to-cyan-400',
//     },
//     {
//       title: 'Recent Activity',
//       value: recentActivity,
//       subtitle: 'Predictions in the last 7 days',
//       icon: Activity,
//       iconStyle: 'bg-amber-100 text-amber-600',
//       accent: 'from-amber-500 to-orange-400',
//     },
//   ]

//   const latestRecords = records.slice(0, 3)

//   return (
//     <div className="space-y-7 pb-8">

//       {/* WELCOME BANNER: full-width seedling photo on the right */}
//       <section className="relative isolate flex min-h-[300px] items-center overflow-hidden rounded-3xl bg-[#063f27] shadow-xl shadow-emerald-950/20 sm:min-h-[320px] lg:min-h-[340px]">

//         {/* Seedling photo fills the right side of the banner */}
//         <img
//           src="/images/dashboard-banner.jpg"
//           alt=""
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-y-0 right-0 -z-20 h-full w-full object-cover object-[70%_center] sm:w-[75%] lg:w-[64%]"
//           style={{
//             WebkitMaskImage:
//               'linear-gradient(to right, transparent 0%, #000 28%)',
//             maskImage: 'linear-gradient(to right, transparent 0%, #000 28%)',
//           }}
//         />

//         {/* Dark green fade from the left so the text stays readable */}
//         <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#063f27] from-0% via-[#063f27]/95 via-40% to-transparent to-70% max-sm:from-[#063f27]/95 max-sm:via-[#063f27]/80 max-sm:to-[#063f27]/40" />

//         {/* Soft bottom shade */}
//         <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#03291e]/30 to-transparent" />

//         <div className="relative z-10 w-full px-6 py-6 sm:px-9 lg:px-9">
//           <div className="max-w-[640px]">

//             <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-300/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-md">
//               <Sprout size={17} className="text-emerald-300" />
//               Your PlantCare Workspace
//             </div>

//             <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
//               Welcome back,
//               <span className="block text-lime-300">
//                 {user?.name?.split(' ')[0] || 'Gardener'}!
//               </span>
//             </h1>

//             <p className="mt-3 max-w-lg text-sm leading-6 text-white/95 sm:text-base sm:leading-7">
//               Keep your plants healthy with intelligent disease detection.
//               Upload a leaf image and discover AI-powered insights.
//             </p>

//             <div className="mt-4">
//               <Link
//                 to="/dashboard/upload"
//                 className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-5 py-3 text-sm font-extrabold !text-emerald-950 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-lime-100 sm:px-6 sm:text-base"
//               >
//                 <Upload size={19} />
//                 Analyze a Plant
//                 <ArrowUpRight size={17} />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* OVERVIEW */}
//       <section>
//         <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
//           <div>
//             <div className="flex flex-wrap items-center gap-3">
//               <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
//                 Your Overview
//               </h2>

//               <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
//                 Live Statistics
//               </span>
//             </div>

//             <p className="mt-1 text-sm text-slate-500">
//               A quick look at your plant analysis activity.
//             </p>
//           </div>
//         </div>

//         {error && (
//           <div
//             role="alert"
//             className="mb-5 flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between"
//           >
//             <div className="flex items-start gap-3 text-sm text-red-700">
//               <AlertCircle size={19} className="mt-0.5 shrink-0" />
//               <p>{error}</p>
//             </div>

//             <button
//               type="button"
//               onClick={loadHistory}
//               disabled={loading}
//               className="w-fit rounded-lg bg-red-100 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {loading ? 'Loading...' : 'Try again'}
//             </button>
//           </div>
//         )}

//         <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
//           {stats.map((stat) => {
//             const Icon = stat.icon

//             return (
//               <article
//                 key={stat.title}
//                 className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/10"
//               >
//                 <div
//                   className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${stat.accent}`}
//                 />

//                 <div className="flex items-center justify-between">
//                   <div
//                     className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.iconStyle}`}
//                   >
//                     <Icon size={26} />
//                   </div>

//                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
//                     <ChevronRight size={19} />
//                   </div>
//                 </div>

//                 <p className="mt-3 text-base font-semibold text-slate-600">
//                   {stat.title}
//                 </p>

//                 <div className="mt-1 flex items-end gap-2">
//                   <h3 className="text-5xl font-black tracking-tight text-slate-900">
//                     {loading ? (
//                       <span className="inline-block h-12 w-14 animate-pulse rounded-lg bg-slate-100" />
//                     ) : error ? (
//                       '—'
//                     ) : (
//                       stat.value
//                     )}
//                   </h3>
//                 </div>

//                 <p className="mt-2 text-sm font-medium text-slate-400">
//                   {stat.subtitle}
//                 </p>
//               </article>
//             )
//           })}
//         </div>
//       </section>

//       {/* AI INFORMATION AND RECENT PREDICTIONS */}
//       <section className="grid gap-5 lg:grid-cols-5">

//         {/* AI INFORMATION CARD */}
//         <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm lg:col-span-2 sm:p-7">
//           <div className="pointer-events-none absolute -bottom-16 -right-12 h-40 w-40 rounded-full bg-emerald-50 blur-2xl" />

//           <div className="relative">
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
//               <BrainCircuit size={25} />
//             </div>

//             <h3 className="mt-5 text-lg font-extrabold text-slate-900">
//               AI Plant Analysis
//             </h3>

//             <p className="mt-2 text-sm leading-7 text-slate-500">
//               Our lightweight vision model examines plant leaf images,
//               identifies possible diseases and provides useful disease
//               information with visual explanations.
//             </p>

//             <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-emerald-700">
//               <CheckCircle2 size={16} />
//               PlantCare AI workspace
//             </div>

//             <Link
//               to="/dashboard/upload"
//               className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/15 transition hover:-translate-y-0.5 hover:bg-emerald-700"
//             >
//               Start Analysis
//               <ArrowUpRight size={17} />
//             </Link>
//           </div>
//         </div>

//         {/* RECENT PREDICTIONS */}
//         <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-3 sm:p-7">
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <div>
//               <div className="flex items-center gap-2">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
//                   <Clock size={20} />
//                 </div>

//                 <h3 className="text-lg font-extrabold text-slate-900">
//                   Recent Predictions
//                 </h3>
//               </div>

//               <p className="mt-2 text-xs text-slate-500">
//                 Your latest saved plant analysis results.
//               </p>
//             </div>

//             <Link
//               to="/dashboard/reports"
//               className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 transition hover:gap-2.5"
//             >
//               View all
//               <ArrowUpRight size={15} />
//             </Link>
//           </div>

//           {loading ? (
//             <div className="flex min-h-48 flex-col items-center justify-center text-emerald-700">
//               <LoaderCircle size={27} className="animate-spin" />
//               <p className="mt-3 text-xs font-medium text-slate-500">
//                 Loading recent predictions...
//               </p>
//             </div>
//           ) : error ? (
//             <div className="flex min-h-48 flex-col items-center justify-center text-center">
//               <AlertCircle size={26} className="text-amber-500" />

//               <p className="mt-3 text-sm font-semibold text-slate-700">
//                 Predictions could not be loaded.
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 Please try again.
//               </p>

//               <button
//                 type="button"
//                 onClick={loadHistory}
//                 className="mt-3 rounded-lg bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
//               >
//                 Retry
//               </button>
//             </div>
//           ) : latestRecords.length === 0 ? (
//             <div className="flex min-h-48 flex-col items-center justify-center rounded-xl bg-emerald-50/60 px-5 text-center">
//               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
//                 <Leaf size={25} />
//               </div>

//               <h4 className="mt-3 text-sm font-bold text-slate-800">
//                 No predictions yet
//               </h4>

//               <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
//                 Analyze your first plant image. Your latest results will
//                 appear here.
//               </p>

//               <Link
//                 to="/dashboard/upload"
//                 className="mt-4 text-xs font-bold text-emerald-700 hover:underline"
//               >
//                 Upload your first image
//               </Link>
//             </div>
//           ) : (
//             <div className="mt-5 space-y-3">
//               {latestRecords.map((record) => {
//                 const prediction = record.prediction || {}
//                 const confidence = Number(prediction.confidence || 0)
//                 const highConfidence = confidence >= 70

//                 return (
//                   <article
//                     key={record.id}
//                     className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/40"
//                   >
//                     <div className="flex items-start justify-between gap-3">
//                       <div className="flex min-w-0 items-start gap-3">
//                         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
//                           <Leaf size={20} />
//                         </div>

//                         <div className="min-w-0">
//                           <h4 className="break-words text-sm font-bold text-slate-800">
//                             {formatDisease(
//                               prediction.predicted_disease || 'Unknown disease'
//                             )}
//                           </h4>

//                           <p className="mt-1 text-[11px] text-slate-400">
//                             {formatDate(record.created_at)}
//                           </p>
//                         </div>
//                       </div>

//                       <span
//                         className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
//                           highConfidence
//                             ? 'bg-emerald-100 text-emerald-700'
//                             : 'bg-amber-100 text-amber-700'
//                         }`}
//                       >
//                         {confidence.toFixed(1)}%
//                       </span>
//                     </div>

//                     <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
//                       <div
//                         className={`h-full rounded-full ${
//                           highConfidence ? 'bg-emerald-500' : 'bg-amber-400'
//                         }`}
//                         style={{
//                           width: `${Math.min(100, Math.max(0, confidence))}%`,
//                         }}
//                       />
//                     </div>
//                   </article>
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* BOTTOM CALL TO ACTION */}
//       <section className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-white to-emerald-50/80 p-6 sm:p-8">
//         <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
//           <div className="flex items-start gap-4">
//             <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 sm:flex">
//               <TrendingUp size={24} />
//             </div>

//             <div>
//               <h3 className="text-lg font-extrabold text-slate-900">
//                 Ready to diagnose a plant?
//               </h3>

//               <p className="mt-1 text-sm leading-6 text-slate-500">
//                 Upload a clear leaf photograph and get started with your AI
//                 plant disease analysis.
//               </p>
//             </div>
//           </div>

//           <Link
//             to="/dashboard/upload"
//             className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-700"
//           >
//             <Upload size={18} />
//             Upload Image
//           </Link>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Dashboard

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Leaf,
  Upload,
  ScanSearch,
  Activity,
  ArrowUpRight,
  Clock,
  Image as ImageIcon,
  BrainCircuit,
  Sprout,
  LoaderCircle,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react'
import { useAuth } from '../../context/useAuth'
import api from '../../services/api'

const SEVEN_DAYS_AGO = Date.now() - 7 * 24 * 60 * 60 * 1000

/* ---------- Animations (no extra dependency / config needed) ---------- */
const animationStyles = `
@keyframes pc-fade-up {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes pc-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%      { transform: translateY(-10px) rotate(8deg); }
}
@keyframes pc-shimmer {
  0%   { transform: translateX(-120%); }
  100% { transform: translateX(220%); }
}
@keyframes pc-bar {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes pc-pulse-ring {
  0%   { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.55); }
  100% { box-shadow: 0 0 0 10px rgba(52, 211, 153, 0); }
}
@keyframes pc-gradient {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}
.pc-fade-up { animation: pc-fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
.pc-float { animation: pc-float 5s ease-in-out infinite; }
.pc-float-slow { animation: pc-float 7s ease-in-out infinite; }
.pc-pulse-ring { animation: pc-pulse-ring 1.8s ease-out infinite; }
.pc-bar-grow { transform-origin: left; animation: pc-bar 1s cubic-bezier(0.22, 1, 0.36, 1) both; }
.pc-gradient-move { background-size: 200% 200%; animation: pc-gradient 6s ease infinite; }
.pc-shine::after {
  content: '';
  position: absolute;
  inset: 0;
  width: 40%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
  transform: translateX(-120%);
  animation: pc-shimmer 3.2s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .pc-fade-up, .pc-float, .pc-float-slow, .pc-pulse-ring,
  .pc-bar-grow, .pc-gradient-move, .pc-shine::after { animation: none !important; }
}
`

function useCountUp(target, duration = 900) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let frame
    const start = performance.now()
    const end = Number(target) || 0

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(end * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return display
}

function CountUp({ value }) {
  const display = useCountUp(value)
  return <>{display}</>
}

/* ---------- Helpers ---------- */
function formatDisease(value = '') {
  return String(value)
    .replace(/___/g, ' - ')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function formatDate(value) {
  if (!value) return 'Date unavailable'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return 'Date unavailable'

  return date.toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function fetchPredictionHistory() {
  const response = await api.get('/api/predictions/history')
  const history = response.data?.data

  return Array.isArray(history) ? history : []
}

function getHistoryError(err) {
  return (
    err.response?.data?.detail ||
    'Unable to load your prediction statistics. Please try again.'
  )
}

/* ---------- Component ---------- */
function Dashboard() {
  const { user } = useAuth()

  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    fetchPredictionHistory()
      .then((history) => {
        if (isActive) setRecords(history)
      })
      .catch((err) => {
        if (isActive) setError(getHistoryError(err))
      })
      .finally(() => {
        if (isActive) setLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [])

  const loadHistory = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const history = await fetchPredictionHistory()
      setRecords(history)
    } catch (err) {
      setError(getHistoryError(err))
    } finally {
      setLoading(false)
    }
  }, [])

  const recentActivity = useMemo(() => {
    return records.filter((record) => {
      const date = new Date(record.created_at).getTime()
      return Number.isFinite(date) && date >= SEVEN_DAYS_AGO
    }).length
  }, [records])

  const stats = [
    {
      title: 'Total Predictions',
      value: records.length,
      subtitle: 'Saved plant analyses',
      icon: ScanSearch,
      iconStyle: 'bg-emerald-100 text-emerald-600',
      accent: 'from-emerald-500 to-green-400',
    },
    {
      title: 'Images Analyzed',
      value: records.length,
      subtitle: 'Images with saved results',
      icon: ImageIcon,
      iconStyle: 'bg-blue-100 text-blue-600',
      accent: 'from-blue-500 to-cyan-400',
    },
    {
      title: 'Recent Activity',
      value: recentActivity,
      subtitle: 'Predictions in the last 7 days',
      icon: Activity,
      iconStyle: 'bg-amber-100 text-amber-600',
      accent: 'from-amber-500 to-orange-400',
    },
  ]

  const latestRecords = records.slice(0, 3)

  return (
    <div className="space-y-6 pb-8">
      <style>{animationStyles}</style>

      {/* WELCOME BANNER (same size as before) */}
      <section className="pc-fade-up relative isolate flex min-h-[230px] items-center overflow-hidden rounded-3xl bg-[#063f27] shadow-xl shadow-emerald-950/20 sm:min-h-[250px]">
        {/* Photo box keeps the original shape (aspect ratio), so the full seedling shows */}
        <img
          src="/images/dashboard-banner.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 -z-20 h-full w-auto max-w-full aspect-[2.1/1] object-cover object-center"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, #000 28%)',
            maskImage: 'linear-gradient(to right, transparent 0%, #000 28%)',
          }}
        />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#063f27] from-0% via-[#063f27]/95 via-40% to-transparent to-70% max-sm:from-[#063f27]/95 max-sm:via-[#063f27]/80 max-sm:to-[#063f27]/40" />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#03291e]/30 to-transparent" />

        {/* floating leaves */}
        <Leaf
          size={26}
          className="pc-float pointer-events-none absolute right-[14%] top-6 text-lime-300/70"
        />
        <Leaf
          size={18}
          className="pc-float-slow pointer-events-none absolute bottom-6 right-[30%] text-emerald-200/60"
        />
        <Sprout
          size={22}
          className="pc-float pointer-events-none absolute bottom-10 right-[6%] text-lime-200/60"
        />

        <div className="relative z-10 w-full px-6 py-6 sm:px-9">
          <div className="max-w-[620px]">
            <div className="pc-shine relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-emerald-300/30 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm backdrop-blur-md">
              <Sprout size={16} className="text-emerald-300" />
              Your PlantCare Workspace
            </div>

            <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Welcome back,{' '}
              <span className="text-lime-300">
                {user?.name?.split(' ')[0] || 'Gardener'}!
              </span>
            </h1>

            <p className="mt-2 max-w-lg text-sm leading-6 text-white/95 sm:text-base">
              Keep your plants healthy with intelligent disease detection.
              Upload a leaf image and discover AI-powered insights.
            </p>

            <div className="mt-4">
              <Link
                to="/dashboard/upload"
                className="pc-pulse-ring inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-5 py-3 text-sm font-extrabold !text-emerald-950 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-lime-100 sm:text-base"
              >
                <Upload size={18} />
                Analyze a Plant
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section>
        <div
          className="pc-fade-up mb-4 flex flex-wrap items-center gap-3"
          style={{ animationDelay: '80ms' }}
        >
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
            Your Overview
          </h2>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        </div>

        {error && (
          <div
            role="alert"
            className="pc-fade-up mb-4 flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3 text-sm text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>

            <button
              type="button"
              onClick={loadHistory}
              disabled={loading}
              className="w-fit rounded-lg bg-red-100 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Try again'}
            </button>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon

            return (
              <article
                key={stat.title}
                className="pc-fade-up group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-md shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/10"
                style={{ animationDelay: `${150 + index * 100}ms` }}
              >
                <div
                  className={`pc-bar-grow pc-gradient-move absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${stat.accent}`}
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                />

                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition duration-300 group-hover:rotate-6 group-hover:scale-110 ${stat.iconStyle}`}
                  >
                    <Icon size={26} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-600">
                      {stat.title}
                    </p>

                    <h3 className="text-4xl font-black leading-tight tracking-tight text-slate-900">
                      {loading ? (
                        <span className="inline-block h-9 w-12 animate-pulse rounded-md bg-slate-100" />
                      ) : error ? (
                        '—'
                      ) : (
                        <CountUp value={stat.value} />
                      )}
                    </h3>
                  </div>
                </div>

                <p className="mt-3 text-xs font-medium text-slate-400">
                  {stat.subtitle}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      {/* AI INFORMATION AND RECENT PREDICTIONS */}
      <section className="grid gap-4 lg:grid-cols-5">
        {/* AI INFORMATION CARD */}
        <div
          className="pc-fade-up group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/10 lg:col-span-2"
          style={{ animationDelay: '450ms' }}
        >
          <div className="pointer-events-none absolute -bottom-14 -right-12 h-36 w-36 rounded-full bg-emerald-100/70 blur-2xl transition duration-500 group-hover:scale-125" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="pc-float flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <BrainCircuit size={24} />
              </div>

              <h3 className="text-lg font-extrabold text-slate-900">
                AI Plant Analysis
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Our lightweight vision model examines plant leaf images,
              identifies possible diseases and provides useful disease
              information with visual explanations.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <CheckCircle2 size={16} />
              PlantCare AI workspace
            </div>

            <Link
              to="/dashboard/upload"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-600/15 transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Start Analysis
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* RECENT PREDICTIONS */}
        <div
          className="pc-fade-up rounded-2xl border border-slate-100 bg-white p-5 shadow-sm lg:col-span-3"
          style={{ animationDelay: '550ms' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Clock size={21} />
              </div>

              <div>
                <h3 className="text-lg font-extrabold leading-tight text-slate-900">
                  Recent Predictions
                </h3>
                <p className="text-xs text-slate-500">
                  Your latest saved plant analysis results.
                </p>
              </div>
            </div>

            <Link
              to="/dashboard/reports"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 transition hover:gap-2.5"
            >
              View all
              <ArrowUpRight size={15} />
            </Link>
          </div>

          {loading ? (
            <div className="flex min-h-44 flex-col items-center justify-center text-emerald-700">
              <LoaderCircle size={26} className="animate-spin" />
              <p className="mt-3 text-xs font-medium text-slate-500">
                Loading recent predictions...
              </p>
            </div>
          ) : error ? (
            <div className="flex min-h-44 flex-col items-center justify-center text-center">
              <AlertCircle size={26} className="text-amber-500" />

              <p className="mt-3 text-sm font-semibold text-slate-700">
                Predictions could not be loaded.
              </p>

              <button
                type="button"
                onClick={loadHistory}
                className="mt-3 rounded-lg bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
              >
                Retry
              </button>
            </div>
          ) : latestRecords.length === 0 ? (
            <div className="mt-4 flex min-h-40 flex-col items-center justify-center rounded-xl bg-emerald-50/60 px-5 text-center">
              <div className="pc-float flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                <Leaf size={24} />
              </div>

              <h4 className="mt-3 text-sm font-bold text-slate-800">
                No predictions yet
              </h4>

              <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                Analyze your first plant image. Your latest results will
                appear here.
              </p>

              <Link
                to="/dashboard/upload"
                className="mt-3 text-xs font-bold text-emerald-700 hover:underline"
              >
                Upload your first image
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {latestRecords.map((record, index) => {
                const prediction = record.prediction || {}
                const confidence = Number(prediction.confidence || 0)
                const highConfidence = confidence >= 70

                return (
                  <article
                    key={record.id}
                    className="pc-fade-up group rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 transition duration-300 hover:translate-x-1 hover:border-emerald-200 hover:bg-emerald-50/40"
                    style={{ animationDelay: `${650 + index * 110}ms` }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm transition group-hover:rotate-12">
                          <Leaf size={19} />
                        </div>

                        <div className="min-w-0">
                          <h4 className="truncate text-sm font-bold text-slate-800">
                            {formatDisease(
                              prediction.predicted_disease || 'Unknown disease'
                            )}
                          </h4>

                          <p className="text-[11px] text-slate-400">
                            {formatDate(record.created_at)}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          highConfidence
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {confidence.toFixed(1)}%
                      </span>
                    </div>

                    <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`pc-bar-grow h-full rounded-full ${
                          highConfidence ? 'bg-emerald-500' : 'bg-amber-400'
                        }`}
                        style={{
                          width: `${Math.min(100, Math.max(0, confidence))}%`,
                          animationDelay: `${800 + index * 110}ms`,
                        }}
                      />
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION */}
      <section
        className="pc-fade-up pc-gradient-move relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-white via-emerald-50 to-white p-5"
        style={{ animationDelay: '800ms' }}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="pc-float hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 sm:flex">
              <TrendingUp size={24} />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Ready to diagnose a plant?
              </h3>

              <p className="text-sm leading-6 text-slate-500">
                Upload a clear leaf photograph and get started with your AI
                plant disease analysis.
              </p>
            </div>
          </div>

          <Link
            to="/dashboard/upload"
            className="pc-shine relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            <Upload size={17} />
            Upload Image
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Dashboard