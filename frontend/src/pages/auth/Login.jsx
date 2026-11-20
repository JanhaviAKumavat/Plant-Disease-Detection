// // import { useState } from 'react'
// // import { Link, Navigate, useLocation } from 'react-router-dom'
// // import {
// //   Leaf,
// //   Mail,
// //   LockKeyhole,
// //   Eye,
// //   EyeOff,
// //   ArrowRight,
// //   Sprout,
// //   ShieldCheck,
// // } from 'lucide-react'
// // import { useAuth } from '../../context/useAuth'

// // function Login() {
// //   const { login, isAuthenticated, loading } = useAuth()
// //   const location = useLocation()

// //   const [email, setEmail] = useState('')
// //   const [password, setPassword] = useState('')
// //   const [showPassword, setShowPassword] = useState(false)
// //   const [error, setError] = useState('')
// //   const [submitting, setSubmitting] = useState(false)
// //   const registrationSuccess = new URLSearchParams(location.search).get('registered') === 'true'

// //   const redirectTo = location.state?.from?.pathname || '/dashboard'

// //   if (loading) {
// //     return (
// //       <div className="flex min-h-screen items-center justify-center bg-emerald-50">
// //         <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
// //       </div>
// //     )
// //   }

// //   if (isAuthenticated) {
// //     return <Navigate to="/dashboard" replace />
// //   }

// //   const handleSubmit = async (event) => {
// //     event.preventDefault()
// //     setError('')
// //     setSubmitting(true)

// //     try {
// //       await login(email.trim(), password)
// //       window.location.assign(redirectTo)
// //     } catch (err) {
// //       setError(
// //         err.response?.data?.detail ||
// //         err.response?.data?.message ||
// //         'Unable to login. Please check your email and password.'
// //       )
// //     } finally {
// //       setSubmitting(false)
// //     }
// //   }

// //   return (
// //     <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#eaffdf] via-white to-[#d5f7d2] px-5 py-12">

// //       <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-lime-300/30 blur-3xl" />
// //       <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />

// //       <Link
// //         to="/"
// //         className="absolute left-6 top-6 flex items-center gap-2 text-xl font-extrabold text-slate-900 sm:left-10 sm:top-8"
// //       >
// //         <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
// //           <Leaf size={25} />
// //         </span>
// //         Plant<span className="text-emerald-600">Care</span>
// //       </Link>

// //       <section className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-2xl shadow-emerald-900/10 backdrop-blur-xl md:grid-cols-2">

// //         <div className="hidden flex-col justify-between bg-gradient-to-br from-[#10462f] via-emerald-800 to-green-600 p-12 text-white md:flex">
// //           <div>
// //             <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
// //               <Sprout size={32} />
// //             </div>

// //             <h1 className="mt-12 text-4xl font-black leading-tight">
// //               Welcome back to
// //               <span className="block text-emerald-300">PlantCare.</span>
// //             </h1>

// //             <p className="mt-5 leading-8 text-emerald-50/80">
// //               Continue exploring intelligent plant disease detection and
// //               AI-powered insights for healthier plants.
// //             </p>
// //           </div>

// //           <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
// //             <div className="flex items-center gap-3">
// //               <ShieldCheck size={25} className="text-emerald-300" />
// //               <p className="font-semibold">Your plant insights, all in one place.</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="p-7 sm:p-10 lg:p-12">
// //           <div className="mb-8 md:hidden">
// //             <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
// //               AI Plant Diagnosis
// //             </p>
// //           </div>

// //           <div className="mb-8">
// //             <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
// //               Welcome Back
// //             </span>

// //             <h2 className="mt-3 text-3xl font-black text-slate-900">
// //               Sign in to your account
// //             </h2>

// //             <p className="mt-3 text-sm leading-6 text-slate-500">
// //               Enter your account details to continue.
// //             </p>
// //           </div>

// //           {registrationSuccess && (
// //             <div
// //               role="status"
// //               className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
// //             >
// //               <ShieldCheck size={20} className="mt-0.5 shrink-0 text-emerald-600" />
// //               <div>
// //                 <p className="font-bold">Account created successfully!</p>
// //                 <p className="mt-1 text-emerald-700">
// //                   Please sign in using your registered email and password.
// //                 </p>
// //               </div>
// //             </div>
// //           )}

// //           <form onSubmit={handleSubmit} className="space-y-5">

// //             <div>
// //               <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">
// //                 Email Address
// //               </label>

// //               <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
// //                 <Mail size={19} className="text-slate-400" />
// //                 <input
// //                   id="email"
// //                   type="email"
// //                   value={email}
// //                   onChange={(event) => setEmail(event.target.value)}
// //                   placeholder="you@example.com"
// //                   required
// //                   autoComplete="email"
// //                   className="w-full bg-transparent px-3 py-4 text-sm text-slate-800 outline-none"
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <label htmlFor="password" className="mb-2 block text-sm font-bold text-slate-700">
// //                 Password
// //               </label>

// //               <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
// //                 <LockKeyhole size={19} className="text-slate-400" />
// //                 <input
// //                   id="password"
// //                   type={showPassword ? 'text' : 'password'}
// //                   value={password}
// //                   onChange={(event) => setPassword(event.target.value)}
// //                   placeholder="Enter your password"
// //                   required
// //                   minLength={8}
// //                   autoComplete="current-password"
// //                   className="w-full bg-transparent px-3 py-4 text-sm text-slate-800 outline-none"
// //                 />

// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="text-slate-400 transition hover:text-emerald-600"
// //                   aria-label={showPassword ? 'Hide password' : 'Show password'}
// //                 >
// //                   {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
// //                 </button>
// //               </div>
// //             </div>

// //             {error && (
// //               <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
// //                 {error}
// //               </div>
// //             )}

// //             <button
// //               type="submit"
// //               disabled={submitting}
// //               className="group flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
// //             >
// //               {submitting ? 'Signing in...' : 'Sign In'}
// //               {!submitting && <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />}
// //             </button>
// //           </form>

// //           <p className="mt-8 text-center text-sm text-slate-500">
// //             Don't have an account?{' '}
// //             <Link to="/register" className="font-bold text-emerald-700 hover:text-emerald-800">
// //               Create Account
// //             </Link>
// //           </p>

// //           <Link
// //             to="/"
// //             className="mt-6 block text-center text-xs font-semibold text-slate-400 transition hover:text-emerald-600"
// //           >
// //             Back to Home
// //           </Link>
// //         </div>
// //       </section>
// //     </main>
// //   )
// // }

// // export default Login






// import { useState } from 'react'
// import { Link, Navigate, useLocation } from 'react-router-dom'
// import {
//   Leaf,
//   Mail,
//   LockKeyhole,
//   Eye,
//   EyeOff,
//   ArrowRight,
//   Sprout,
//   ShieldCheck,
// } from 'lucide-react'
// import { useAuth } from '../../context/useAuth'

// function Login() {
//   const { login, isAuthenticated, loading } = useAuth()
//   const location = useLocation()

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState('')
//   const [submitting, setSubmitting] = useState(false)
//   const registrationSuccess = new URLSearchParams(location.search).get('registered') === 'true'

//   const redirectTo = location.state?.from?.pathname || '/dashboard'

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-emerald-50">
//         <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
//       </div>
//     )
//   }

//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" replace />
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault()
//     setError('')
//     setSubmitting(true)

//     try {
//       await login(email.trim(), password)
//       window.location.assign(redirectTo)
//     } catch (err) {
//       setError(
//         err.response?.data?.detail ||
//         err.response?.data?.message ||
//         'Unable to login. Please check your email and password.'
//       )
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <main className="relative flex h-svh items-center justify-center overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#eaffdf] via-white to-[#d5f7d2] px-5 pb-[2vh] pt-[clamp(3.5rem,10vh,6rem)]">

//       {/* BACKGROUND IMAGE */}
//       {/* two mirrored halves = image looks smaller (less zoomed) with no visible seam */}
//       <div className="absolute inset-0" aria-hidden="true">
//         <div
//           className="absolute inset-y-0 left-0 w-[calc(50%+2px)] -scale-x-100 bg-cover bg-center"
//           style={{ backgroundImage: "url('/images/auth-bg.png')" }}
//         />
//         <div
//           className="absolute inset-y-0 right-0 w-[calc(50%+2px)] bg-cover bg-center"
//           style={{ backgroundImage: "url('/images/auth-bg.png')" }}
//         />
//       </div>
//       <div className="absolute inset-0 bg-white/10" aria-hidden="true" />

//       <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-lime-300/30 blur-3xl" />
//       <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />

//       <Link
//         to="/"
//         className="absolute left-6 top-6 flex items-center gap-2 text-xl font-extrabold text-slate-900 sm:left-10 sm:top-8"
//       >
//         <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
//           <Leaf size={25} />
//         </span>
//         Plant<span className="text-emerald-600">Care</span>
//       </Link>

//       <section className="relative z-10 grid w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-2xl shadow-emerald-900/10 backdrop-blur-xl md:grid-cols-2">

//         <div className="hidden flex-col justify-between bg-gradient-to-br from-[#10462f] via-emerald-800 to-green-600 p-[clamp(1.5rem,4.5vh,3rem)] text-white md:flex">
//           <div>
//             <div className="flex h-[clamp(2.5rem,7vh,3.5rem)] w-[clamp(2.5rem,7vh,3.5rem)] items-center justify-center rounded-2xl bg-white/15">
//               <Sprout size={32} />
//             </div>

//             <h1 className="mt-[clamp(1rem,5vh,3rem)] text-[clamp(1.6rem,5vh,2.25rem)] font-black leading-tight">
//               Welcome back to
//               <span className="block text-emerald-300">PlantCare.</span>
//             </h1>

//             <p className="mt-[2vh] text-[clamp(0.8rem,2vh,1rem)] leading-relaxed text-emerald-50/80">
//               Continue exploring intelligent plant disease detection and
//               AI-powered insights for healthier plants.
//             </p>
//           </div>

//           <div className="rounded-2xl border border-white/15 bg-white/10 p-[clamp(0.75rem,2.2vh,1.25rem)] backdrop-blur">
//             <div className="flex items-center gap-3">
//               <ShieldCheck size={25} className="text-emerald-300" />
//               <p className="font-semibold">Your plant insights, all in one place.</p>
//             </div>
//           </div>
//         </div>

//         <div className="px-7 py-[clamp(1rem,3.4vh,3rem)] sm:px-10 lg:px-12">
//           <div className="mb-[1.5vh] md:hidden">
//             <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
//               AI Plant Diagnosis
//             </p>
//           </div>

//           <div className="mb-[clamp(0.75rem,2.6vh,2rem)]">
//             <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
//               Welcome Back
//             </span>

//             <h2 className="mt-[1vh] text-[clamp(1.4rem,4.2vh,1.875rem)] font-black text-slate-900">
//               Sign in to your account
//             </h2>

//             <p className="mt-[1vh] text-sm leading-6 text-slate-500 [@media(max-height:700px)]:hidden">
//               Enter your account details to continue.
//             </p>
//           </div>

//           {registrationSuccess && (
//             <div
//               role="status"
//               className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
//             >
//               <ShieldCheck size={20} className="mt-0.5 shrink-0 text-emerald-600" />
//               <div>
//                 <p className="font-bold">Account created successfully!</p>
//                 <p className="mt-1 text-emerald-700">
//                   Please sign in using your registered email and password.
//                 </p>
//               </div>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-[clamp(0.55rem,1.8vh,1.25rem)]">

//             <div>
//               <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-slate-700">
//                 Email Address
//               </label>

//               <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
//                 <Mail size={19} className="text-slate-400" />
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(event) => setEmail(event.target.value)}
//                   placeholder="you@example.com"
//                   required
//                   autoComplete="email"
//                   className="w-full bg-transparent px-3 py-[clamp(0.55rem,1.8vh,1rem)] text-sm text-slate-800 outline-none"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="mb-1.5 block text-sm font-bold text-slate-700">
//                 Password
//               </label>

//               <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
//                 <LockKeyhole size={19} className="text-slate-400" />
//                 <input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(event) => setPassword(event.target.value)}
//                   placeholder="Enter your password"
//                   required
//                   minLength={8}
//                   autoComplete="current-password"
//                   className="w-full bg-transparent px-3 py-[clamp(0.55rem,1.8vh,1rem)] text-sm text-slate-800 outline-none"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="text-slate-400 transition hover:text-emerald-600"
//                   aria-label={showPassword ? 'Hide password' : 'Show password'}
//                 >
//                   {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
//                 </button>
//               </div>
//             </div>

//             {error && (
//               <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={submitting}
//               className="group flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-[clamp(0.65rem,2vh,1rem)] font-bold text-white shadow-lg shadow-emerald-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {submitting ? 'Signing in...' : 'Sign In'}
//               {!submitting && <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />}
//             </button>
//           </form>

//           <p className="mt-[2.2vh] text-center text-sm text-slate-500">
//             Don't have an account?{' '}
//             <Link to="/register" className="font-bold text-emerald-700 hover:text-emerald-800">
//               Create Account
//             </Link>
//           </p>

//           <Link
//             to="/"
//             className="mt-[1.6vh] block text-center text-xs [@media(max-height:680px)]:hidden font-semibold text-slate-400 transition hover:text-emerald-600"
//           >
//             Back to Home
//           </Link>
//         </div>
//       </section>
//     </main>
//   )
// }

// export default Login

import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import {
  Leaf,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Sprout,
  ShieldCheck,
} from 'lucide-react'
import { useAuth } from '../../context/useAuth'

function Login() {
  const { login, isAuthenticated, loading } = useAuth()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const registrationSuccess = new URLSearchParams(location.search).get('registered') === 'true'

  const redirectTo = location.state?.from?.pathname || '/dashboard'

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-emerald-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(email.trim(), password)
      window.location.assign(redirectTo)
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Unable to login. Please check your email and password.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative flex h-svh items-center justify-center overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#eaffdf] via-white to-[#d5f7d2] px-5 pb-[2vh] pt-[clamp(3.5rem,10vh,6rem)]">

      {/* BACKGROUND IMAGE */}
      {/* two mirrored halves = image looks smaller (less zoomed) with no visible seam */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-y-0 left-0 w-[calc(50%+2px)] -scale-x-100 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/auth-bg.png')" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-[calc(50%+2px)] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/auth-bg.png')" }}
        />
      </div>
      <div className="absolute inset-0 bg-white/10" aria-hidden="true" />

      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-lime-300/30 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />

      <Link
        to="/"
        className="absolute left-6 top-4 z-20 flex items-center gap-2 rounded-full bg-white/95 py-1.5 pl-1.5 pr-5 text-xl font-extrabold text-[#0b2e2c] shadow-lg shadow-emerald-900/15 sm:left-10 sm:top-5"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
          <Leaf size={25} />
        </span>
        <span>Plant<span className="text-emerald-700">Care</span></span>
      </Link>

      <section className="relative z-10 grid w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-2xl shadow-emerald-900/10 backdrop-blur-xl md:grid-cols-2">

        <div className="hidden flex-col justify-between bg-gradient-to-br from-[#10462f] via-emerald-800 to-green-600 p-[clamp(1.5rem,4.5vh,3rem)] text-white md:flex">
          <div>
            <div className="flex h-[clamp(2.5rem,7vh,3.5rem)] w-[clamp(2.5rem,7vh,3.5rem)] items-center justify-center rounded-2xl bg-white/15">
              <Sprout size={32} />
            </div>

            <h1 className="mt-[clamp(1rem,5vh,3rem)] text-[clamp(1.6rem,5vh,2.25rem)] font-black leading-tight">
              Welcome back to
              <span className="block text-emerald-300">PlantCare.</span>
            </h1>

            <p className="mt-[2vh] text-[clamp(0.8rem,2vh,1rem)] leading-relaxed text-emerald-50/80">
              Continue exploring intelligent plant disease detection and
              AI-powered insights for healthier plants.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-[clamp(0.75rem,2.2vh,1.25rem)] backdrop-blur">
            <div className="flex items-center gap-3">
              <ShieldCheck size={25} className="text-emerald-300" />
              <p className="font-semibold">Your plant insights, all in one place.</p>
            </div>
          </div>
        </div>

        <div className="px-7 py-[clamp(1rem,3.4vh,3rem)] sm:px-10 lg:px-12">
          <div className="mb-[1.5vh] md:hidden">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
              AI Plant Diagnosis
            </p>
          </div>

          <div className="mb-[clamp(0.75rem,2.6vh,2rem)]">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
              Welcome Back
            </span>

            <h2 className="mt-[1vh] text-[clamp(1.4rem,4.2vh,1.875rem)] font-black text-slate-900">
              Sign in to your account
            </h2>

            <p className="mt-[1vh] text-sm leading-6 text-slate-500 [@media(max-height:700px)]:hidden">
              Enter your account details to continue.
            </p>
          </div>

          {registrationSuccess && (
            <div
              role="status"
              className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-emerald-600" />
              <div>
                <p className="font-bold">Account created successfully!</p>
                <p className="mt-1 text-emerald-700">
                  Please sign in using your registered email and password.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-[clamp(0.55rem,1.8vh,1.25rem)]">

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-slate-700">
                Email Address
              </label>

              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                <Mail size={19} className="text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full bg-transparent px-3 py-[clamp(0.55rem,1.8vh,1rem)] text-sm text-slate-800 outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-bold text-slate-700">
                Password
              </label>

              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                <LockKeyhole size={19} className="text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                  minLength={8}
                  autoComplete="current-password"
                  className="w-full bg-transparent px-3 py-[clamp(0.55rem,1.8vh,1rem)] text-sm text-slate-800 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 transition hover:text-emerald-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {error && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-[clamp(0.65rem,2vh,1rem)] font-bold text-white shadow-lg shadow-emerald-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Signing in...' : 'Sign In'}
              {!submitting && <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <p className="mt-[2.2vh] text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-emerald-700 hover:text-emerald-800">
              Create Account
            </Link>
          </p>

          <Link
            to="/"
            className="mt-[1.4vh] block text-center text-xs font-semibold text-slate-500 transition hover:text-emerald-600 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Login