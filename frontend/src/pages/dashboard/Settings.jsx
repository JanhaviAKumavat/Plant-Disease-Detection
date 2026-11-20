import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Bell,
  FileImage,
  Info,
  LockKeyhole,
  LogOut,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react'
import { useAuth } from '../../context/useAuth'

function Settings() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="mx-auto max-w-5xl space-y-7 pb-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-green-700 to-teal-700 p-7 text-white shadow-xl shadow-emerald-900/10 sm:p-9">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div className="rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur">
            <SlidersHorizontal size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-100">
              Preferences and security
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Settings
            </h1>
            <p className="mt-2 text-sm text-emerald-50/90">
              Review application information and your account security.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Application information
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Supported features and image requirements.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="w-fit rounded-xl bg-emerald-50 p-3 text-emerald-700">
              <FileImage size={22} />
            </div>
            <h3 className="mt-4 font-bold text-slate-800">
              Image upload requirements
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Upload plant images in JPG, JPEG, PNG, or WEBP format.
            </p>
            <div className="mt-4 inline-flex rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              Maximum file size: 5 MB
            </div>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="w-fit rounded-xl bg-teal-50 p-3 text-teal-700">
              <ShieldCheck size={22} />
            </div>
            <h3 className="mt-4 font-bold text-slate-800">
              Prediction history
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Your prediction records are associated with your authenticated
              account.
            </p>
            <button
              type="button"
              onClick={() => navigate('/dashboard/reports')}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
            >
              View reports <ArrowRight size={16} />
            </button>
          </article>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
            <LockKeyhole size={21} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">
              Account and security
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Information about your current session
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="flex items-start gap-3 py-5">
            <ShieldCheck size={19} className="mt-0.5 text-emerald-600" />
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Authenticated access
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Protected application routes require a valid login token.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 py-5">
            <Info size={19} className="mt-0.5 text-emerald-600" />
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Session duration
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Access tokens expire after 60 minutes. Log in again when
                your session expires.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 py-5">
            <Bell size={19} className="mt-0.5 text-emerald-600" />
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Account preferences
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Notification and password preferences are not currently
                configurable in this application.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-red-50 p-3 text-red-600">
              <LogOut size={21} />
            </div>
            <div>
              <h2 className="font-bold text-slate-800">
                Sign out
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                End your current session on this device.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <Trash2 size={16} />
            Logout
          </button>
        </div>
      </section>
    </div>
  )
}

export default Settings

