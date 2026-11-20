import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  Fingerprint,
  Leaf,
  LogOut,
  Mail,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { useAuth } from '../../context/useAuth'

function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Not available'

  return (
    <div className="mx-auto max-w-5xl space-y-7 pb-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-green-700 to-teal-700 p-7 text-white shadow-xl shadow-emerald-900/10 sm:p-9">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div className="rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur">
            <UserRound size={34} />
          </div>

          <div>
            <p className="text-sm font-medium text-emerald-100">
              Account information
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              My Profile
            </h1>
            <p className="mt-2 text-sm text-emerald-50/90">
              View your Plant Disease Detection account details.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
              <UserRound size={21} />
            </div>
            <div>
              <h2 className="font-bold text-slate-800">
                Personal information
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Your registered account details
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Full name
              </p>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <UserRound size={19} className="text-emerald-700" />
                <span className="break-all text-sm font-semibold text-slate-700">
                  {user?.name || 'Name unavailable'}
                </span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Email address
              </p>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <Mail size={19} className="text-emerald-700" />
                <span className="break-all text-sm font-semibold text-slate-700">
                  {user?.email || 'Email unavailable'}
                </span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Account ID
              </p>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <Fingerprint size={19} className="text-emerald-700" />
                <span className="break-all text-sm font-medium text-slate-600">
                  {user?.id || 'Not available'}
                </span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Member since
              </p>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <CalendarDays size={19} className="text-emerald-700" />
                <span className="text-sm font-semibold text-slate-700">
                  {joinedDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
            <div className="inline-flex rounded-xl bg-white p-3 text-emerald-700 shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <h3 className="mt-4 font-bold text-slate-800">
              Account security
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your account uses authenticated access to protect your
              prediction history and analysis records.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Authenticated account
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Leaf size={21} className="text-emerald-700" />
              <h3 className="font-bold text-slate-800">
                Plant Disease AI
              </h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Lightweight and explainable plant disease detection using
              deep learning.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-white px-4 py-3 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50"
          >
            <LogOut size={17} />
            Logout from account
          </button>
        </aside>
      </section>

      <button
        type="button"
        onClick={() => navigate('/dashboard')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
      >
        <ArrowLeft size={17} />
        Back to Dashboard
      </button>
    </div>
  )
}

export default Profile

