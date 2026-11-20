import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Activity,
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Leaf,
  LoaderCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  TrendingUp,
} from 'lucide-react'
import api from '../../services/api'

function formatDisease(value = '') {
  return value
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

async function fetchHistoryRecords() {
  const response = await api.get('/api/predictions/history')
  return response.data.data || []
}
function Reports() {
  const [records, setRecords] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  const loadHistory = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await fetchHistoryRecords()
      setRecords(data)
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Unable to load prediction history. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true

    const fetchInitialHistory = async () => {
      try {
        const data = await fetchHistoryRecords()

        if (active) {
          setRecords(data)
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.detail ||
            'Unable to load prediction history. Please try again.'
          )
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchInitialHistory()

    return () => {
      active = false
    }
  }, [])

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const prediction = record.prediction || {}
      const disease = prediction.predicted_disease || ''
      const model = prediction.model || ''

      const matchesSearch = `${disease} ${model}`
        .toLowerCase()
        .includes(search.trim().toLowerCase())

      const confidence = Number(prediction.confidence || 0)

      const matchesFilter =
        filter === 'all' ||
        (filter === 'high' && confidence >= 70) ||
        (filter === 'low' && confidence < 70)

      return matchesSearch && matchesFilter
    })
  }, [records, search, filter])

  const averageConfidence = records.length
    ? records.reduce(
        (total, item) => total + Number(item.prediction?.confidence || 0),
        0
      ) / records.length
    : 0

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this prediction record?')) {
      return
    }

    setDeletingId(id)
    setError('')

    try {
      await api.delete(`/api/predictions/history/${id}`)
      setRecords((previous) => previous.filter((record) => record.id !== id))
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Unable to delete this prediction. Please try again.'
      )
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-7 pb-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-green-700 to-teal-700 p-6 text-white shadow-xl shadow-emerald-900/10 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-52 w-52 rounded-full bg-emerald-300/20 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-emerald-100">
              <Activity size={17} />
              Analysis archive
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Prediction Reports
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50/90">
              Review your plant disease detection results and track your
              previous image analyses in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={loadHistory}
            disabled={loading}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/20 disabled:opacity-60"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh reports
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
              <Leaf size={21} />
            </div>
            <TrendingUp size={18} className="text-emerald-600" />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500">
            Total analyses
          </p>
          <p className="mt-1 text-3xl font-bold text-slate-800">
            {records.length}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Saved prediction records
          </p>
        </div>

        <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="rounded-xl bg-teal-50 p-3 text-teal-700 w-fit">
            <Activity size={21} />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500">
            Average confidence
          </p>
          <p className="mt-1 text-3xl font-bold text-slate-800">
            {averageConfidence.toFixed(1)}%
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Across saved predictions
          </p>
        </div>

        <div className="rounded-2xl border border-lime-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:col-span-2 xl:col-span-1">
          <div className="rounded-xl bg-lime-50 p-3 text-lime-700 w-fit">
            <ShieldCheck size={21} />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500">
            High-confidence results
          </p>
          <p className="mt-1 text-3xl font-bold text-slate-800">
            {records.filter((item) => Number(item.prediction?.confidence || 0) >= 70).length}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Predictions with 70% or higher confidence
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Your prediction history
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Search and review your saved analysis results.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search disease or model..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 sm:w-64"
              />
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400"
            >
              <option value="all">All confidence levels</option>
              <option value="high">High confidence (70%+)</option>
              <option value="low">Below 70%</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center text-emerald-700">
            <LoaderCircle size={34} className="animate-spin" />
            <p className="mt-3 text-sm font-medium text-slate-500">
              Loading your prediction reports...
            </p>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-4 text-center">
            <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-700">
              <Leaf size={30} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-800">
              {records.length === 0
                ? 'No prediction reports yet'
                : 'No matching reports found'}
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              {records.length === 0
                ? 'Upload a plant image and run your first disease analysis. Your saved results will appear here.'
                : 'Try changing your search text or confidence filter.'}
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Showing {filteredRecords.length} of {records.length} reports</span>
              <span>Newest first</span>
            </div>

            {filteredRecords.map((record) => {
              const prediction = record.prediction || {}
              const confidence = Number(prediction.confidence || 0)
              const highConfidence = confidence >= 70

              return (
                <article
                  key={record.id}
                  className="rounded-2xl border border-slate-100 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/20 sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 gap-3">
                      <div className="shrink-0 rounded-xl bg-emerald-50 p-3 text-emerald-700">
                        <Leaf size={22} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="break-words font-semibold text-slate-800">
                          {formatDisease(prediction.predicted_disease || 'Unknown disease')}
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays size={14} />
                            {formatDate(record.created_at)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Activity size={14} />
                            {prediction.model || 'Model unavailable'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(record.id)}
                      disabled={deletingId === record.id}
                      aria-label="Delete prediction report"
                      className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === record.id ? (
                        <LoaderCircle size={15} className="animate-spin" />
                      ) : (
                        <Trash2 size={15} />
                      )}
                      Delete
                    </button>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">
                        Prediction confidence
                      </span>
                      <span className={`text-sm font-bold ${highConfidence ? 'text-emerald-700' : 'text-amber-600'}`}>
                        {confidence.toFixed(2)}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${highConfidence ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-amber-400 to-orange-400'}`}
                        style={{ width: `${Math.min(100, Math.max(0, confidence))}%` }}
                      />
                    </div>
                  </div>

                  {Array.isArray(prediction.top_predictions) &&
                    prediction.top_predictions.length > 0 && (
                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Top predictions
                        </p>
                        <div className="grid gap-2 sm:grid-cols-3">
                          {prediction.top_predictions.map((item, index) => (
                            <div
                              key={`${record.id}-${index}`}
                              className="rounded-xl bg-slate-50 p-3"
                            >
                              <p className="line-clamp-2 text-xs font-medium text-slate-600">
                                {formatDisease(item.disease || 'Unknown')}
                              </p>
                              <p className="mt-1 text-sm font-bold text-emerald-700">
                                {Number(item.confidence || 0).toFixed(2)}%
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
                    {highConfidence ? (
                      <CheckCircle2 size={14} className="text-emerald-600" />
                    ) : (
                      <Clock3 size={14} className="text-amber-500" />
                    )}
                    <span>
                      {highConfidence
                        ? 'Model confidence is 70% or higher'
                        : 'Lower-confidence result — consider reviewing the image'}
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      <p className="text-xs leading-5 text-slate-400">
        Confidence represents the model's prediction score, not a verified
        medical or agricultural diagnosis. Confirm important findings with
        reliable agricultural guidance.
      </p>
    </div>
  )
}

export default Reports

