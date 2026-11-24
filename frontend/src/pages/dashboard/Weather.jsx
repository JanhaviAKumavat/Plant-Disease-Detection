
// import { useCallback, useEffect, useRef, useState } from 'react'
// import {
//   CloudSun,
//   Sun,
//   Cloud,
//   CloudRain,
//   CloudDrizzle,
//   MapPin,
//   RefreshCw,
//   Thermometer,
//   Droplets,
//   Wind,
//   Umbrella,
//   Sprout,
//   ShieldCheck,
//   AlertTriangle,
//   Clock,
//   CalendarDays,
//   Sunrise,
//   Navigation,
//   Leaf,
// } from 'lucide-react'
// import api from '../../services/api'

// function getWeatherIcon(code, size = 24) {
//   if ([0, 1].includes(code)) return <Sun size={size} />
//   if ([2, 3, 45, 48].includes(code)) return <CloudSun size={size} />
//   if ([51, 53, 55, 56, 57].includes(code)) return <CloudDrizzle size={size} />
//   if ([61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) {
//     return <CloudRain size={size} />
//   }
//   if ([71, 73, 75, 77, 85, 86].includes(code)) return <Cloud size={size} />
//   return <CloudSun size={size} />
// }

// function formatHour(value) {
//   if (!value) return '--'
//   return value.slice(11, 16)
// }

// function formatDate(value) {
//   if (!value) return '--'

//   const date = new Date(`${value}T12:00:00`)

//   return date.toLocaleDateString('en-IN', {
//     weekday: 'short',
//     day: 'numeric',
//     month: 'short',
//   })
// }

// function getPermissionError(error) {
//   if (error.code === 1) {
//     return 'Location permission was denied. Please allow location access in your browser settings and try again.'
//   }

//   if (error.code === 2) {
//     return 'Your location could not be detected. Please check your device location settings and try again.'
//   }

//   if (error.code === 3) {
//     return 'Location request timed out. Please try again.'
//   }

//   return 'Unable to access your location. Please try again.'
// }

// function WeatherMetric({ icon: Icon, label, value, unit }) {
//   return (
//     <div className="rounded-2xl border border-emerald-100 bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/5">
//       <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
//         <Icon size={20} />
//       </div>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className="mt-1 text-xl font-extrabold text-slate-900">
//         {value ?? '--'}
//         <span className="ml-1 text-sm font-semibold text-slate-500">{unit}</span>
//       </p>
//     </div>
//   )
// }

// function Weather() {
//   const [weather, setWeather] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [coordinates, setCoordinates] = useState(null)

//   const requestStarted = useRef(false)

//   const loadWeather = useCallback(async (latitude, longitude) => {
//     try {
//       setError('')
//       setLoading(true)

//       const response = await api.get('/api/weather', {
//         params: {
//           latitude,
//           longitude,
//         },
//       })

//       setWeather(response.data)
//     } catch (requestError) {
//       console.error('Weather API error:', requestError)

//       setWeather(null)

//       setError(
//         requestError.response?.data?.detail ||
//         'Unable to load weather information. Please check that the backend is running.'
//       )
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   const requestLocation = useCallback(() => {
//     if (!navigator.geolocation) {
//       setLoading(false)
//       setError('Your browser does not support location access. Please use a modern browser.')
//       return
//     }

//     setLoading(true)
//     setError('')
//     setWeather(null)

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const latitude = position.coords.latitude
//         const longitude = position.coords.longitude

//         setCoordinates({ latitude, longitude })

//         await loadWeather(latitude, longitude)
//       },
//       (locationError) => {
//         setLoading(false)
//         setWeather(null)
//         setError(getPermissionError(locationError))
//       },
//       {
//         enableHighAccuracy: false,
//         timeout: 15000,
//         maximumAge: 300000,
//       }
//     )
//   }, [loadWeather])

//   useEffect(() => {
//     // Prevent duplicate location requests during React development StrictMode.
//     if (requestStarted.current) return

//     requestStarted.current = true
//     requestLocation()
//   }, [requestLocation])

//   const retryLocation = () => {
//     requestLocation()
//   }

//   const current = weather?.current
//   const advisory = weather?.advisory

//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
//         <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
//           <MapPin size={38} className="animate-bounce" />
//         </div>

//         <h2 className="text-xl font-extrabold text-slate-900">
//           Detecting Your Location
//         </h2>

//         <p className="mt-2 max-w-sm text-sm text-slate-500">
//           Please allow location access in your browser. We're preparing your local weather report.
//         </p>

//         <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-emerald-100">
//           <div className="h-full w-1/2 animate-pulse rounded-full bg-emerald-500" />
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center">
//         <div className="w-full rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl shadow-emerald-950/5">
//           <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
//             <MapPin size={30} />
//           </div>

//           <h2 className="text-xl font-extrabold text-slate-900">
//             Location Access Required
//           </h2>

//           <p className="mt-3 text-sm leading-6 text-slate-500">
//             {error}
//           </p>

//           <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-left">
//             <p className="text-sm font-bold text-emerald-900">
//               How to enable location
//             </p>
//             <p className="mt-2 text-xs leading-5 text-emerald-800">
//               Click the location or site-settings icon near your browser address bar, allow location access for PlantCare, and then try again.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={retryLocation}
//             className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
//           >
//             <RefreshCw size={17} />
//             Try Again
//           </button>
//         </div>
//       </div>
//     )
//   }

//   if (!weather || !current) return null

//   return (
//     <div className="space-y-8">
//       {/* Page introduction */}
//       <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#103c2b] via-[#126447] to-emerald-600 p-6 text-white shadow-xl shadow-emerald-950/10 sm:p-8">
//         <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
//         <div className="pointer-events-none absolute -bottom-24 right-1/4 h-56 w-56 rounded-full bg-emerald-300/10 blur-2xl" />

//         <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
//           <div>
//             <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-50">
//               <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
//               Live Weather Information
//             </div>

//             <h2 className="text-2xl font-extrabold sm:text-3xl">
//               Weather & Plant Care
//             </h2>

//             <p className="mt-2 max-w-lg text-sm leading-6 text-emerald-50/80">
//               Understand local weather conditions and make smarter decisions for your crops.
//             </p>

//             <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-emerald-50">
//               <MapPin size={17} />
//               <span>Current detected location</span>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={retryLocation}
//             className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20"
//           >
//             <RefreshCw size={17} />
//             Refresh Location
//           </button>
//         </div>
//       </section>

//       {/* Current weather */}
//       <section>
//         <div className="mb-4 flex items-center gap-2">
//           <Sunrise className="text-emerald-700" size={22} />
//           <h3 className="text-lg font-extrabold text-slate-900">
//             Current Weather
//           </h3>
//         </div>

//         <div className="grid gap-5 lg:grid-cols-3">
//           <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg shadow-emerald-950/5 ring-1 ring-emerald-100 lg:col-span-1">
//             <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-emerald-50" />

//             <div className="relative">
//               <p className="text-sm font-semibold text-slate-500">
//                 Today's Conditions
//               </p>

//               <div className="mt-5 flex items-center justify-between">
//                 <div>
//                   <h4 className="text-5xl font-black tracking-tight text-slate-900">
//                     {current.temperature ?? '--'}°
//                   </h4>
//                   <p className="mt-2 text-sm font-semibold text-slate-600">
//                     {current.condition}
//                   </p>
//                 </div>

//                 <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 text-amber-500">
//                   {getWeatherIcon(current.weather_code, 44)}
//                 </div>
//               </div>

//               <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
//                 <Clock size={14} />
//                 Updated at {formatHour(current.time)}
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3 lg:col-span-2 lg:grid-cols-4">
//             <WeatherMetric
//               icon={Thermometer}
//               label="Feels Like"
//               value={current.feels_like}
//               unit="°C"
//             />

//             <WeatherMetric
//               icon={Droplets}
//               label="Humidity"
//               value={current.humidity}
//               unit="%"
//             />

//             <WeatherMetric
//               icon={CloudRain}
//               label="Rainfall"
//               value={current.rainfall}
//               unit="mm"
//             />

//             <WeatherMetric
//               icon={Wind}
//               label="Wind Speed"
//               value={current.wind_speed}
//               unit="km/h"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Hourly forecast */}
//       <section>
//         <div className="mb-4 flex items-center gap-2">
//           <Clock className="text-emerald-700" size={22} />
//           <div>
//             <h3 className="text-lg font-extrabold text-slate-900">
//               Hourly Forecast
//             </h3>
//             <p className="text-xs text-slate-500">
//               Weather for the next 24 hours
//             </p>
//           </div>
//         </div>

//         <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-5">
//           <div className="flex gap-3 overflow-x-auto pb-3">
//             {weather.hourly?.map((hour, index) => (
//               <div
//                 key={`${hour.time}-${index}`}
//                 className="min-w-[105px] rounded-2xl bg-[#f5faf6] p-4 text-center transition hover:bg-emerald-50"
//               >
//                 <p className="text-xs font-bold text-slate-500">
//                   {index === 0 ? 'Now' : formatHour(hour.time)}
//                 </p>

//                 <div className="my-4 flex justify-center text-emerald-600">
//                   {getWeatherIcon(hour.weather_code, 25)}
//                 </div>

//                 <p className="text-lg font-extrabold text-slate-900">
//                   {hour.temperature}°
//                 </p>

//                 <div className="mt-3 flex items-center justify-center gap-1 text-xs text-blue-600">
//                   <Droplets size={13} />
//                   {hour.humidity}%
//                 </div>

//                 <p className="mt-2 text-xs text-slate-500">
//                   Rain {hour.rain_probability ?? 0}%
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Daily forecast */}
//       <section>
//         <div className="mb-4 flex items-center gap-2">
//           <CalendarDays className="text-emerald-700" size={22} />
//           <div>
//             <h3 className="text-lg font-extrabold text-slate-900">
//               7-Day Forecast
//             </h3>
//             <p className="text-xs text-slate-500">
//               Plan ahead for your crops
//             </p>
//           </div>
//         </div>

//         <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
//           {weather.daily?.map((day, index) => (
//             <div
//               key={day.date}
//               className="grid grid-cols-2 items-center gap-3 border-b border-slate-100 px-4 py-4 last:border-0 sm:grid-cols-5 sm:px-6"
//             >
//               <div className="flex items-center gap-2">
//                 <CalendarDays size={16} className="text-emerald-600" />
//                 <span className="text-sm font-bold text-slate-800">
//                   {index === 0 ? 'Today' : formatDate(day.date)}
//                 </span>
//               </div>

//               <div className="flex items-center gap-2 text-sm text-slate-600">
//                 <span className="text-emerald-600">
//                   {getWeatherIcon(day.weather_code, 20)}
//                 </span>
//                 <span>{day.condition}</span>
//               </div>

//               <p className="text-sm font-bold text-slate-800">
//                 {day.min_temperature}° / {day.max_temperature}°
//               </p>

//               <div className="flex items-center gap-1 text-xs text-blue-600">
//                 <Umbrella size={15} />
//                 {day.rain_probability ?? 0}% rain
//               </div>

//               <p className="col-span-2 text-xs text-slate-500 sm:col-span-1 sm:text-right">
//                 Rainfall: {day.rainfall ?? 0} mm
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Plant care and irrigation */}
//       <section>
//         <div className="mb-4 flex items-center gap-2">
//           <Sprout className="text-emerald-700" size={22} />
//           <div>
//             <h3 className="text-lg font-extrabold text-slate-900">
//               Smart Plant Care
//             </h3>
//             <p className="text-xs text-slate-500">
//               Recommendations based on current weather
//             </p>
//           </div>
//         </div>

//         <div className="grid gap-4 lg:grid-cols-2">
//           <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
//             <div className="mb-5 flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
//                 <Leaf size={22} />
//               </div>
//               <div>
//                 <h4 className="font-extrabold text-slate-900">
//                   Plant Care Tips
//                 </h4>
//                 <p className="text-xs text-slate-500">
//                   Weather-based suggestions
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-3">
//               {advisory?.plant_care_tips?.map((tip, index) => (
//                 <div
//                   key={`${tip.category}-${index}`}
//                   className="rounded-2xl bg-[#f5faf6] p-4"
//                 >
//                   <div className="flex items-center justify-between gap-3">
//                     <p className="text-sm font-bold text-slate-800">
//                       {tip.category}
//                     </p>

//                     <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
//                       tip.level === 'high'
//                         ? 'bg-red-100 text-red-700'
//                         : tip.level === 'moderate'
//                           ? 'bg-amber-100 text-amber-700'
//                           : 'bg-emerald-100 text-emerald-700'
//                     }`}>
//                       {tip.level}
//                     </span>
//                   </div>

//                   <p className="mt-2 text-sm leading-6 text-slate-600">
//                     {tip.message}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
//             <div className="mb-5 flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                 <Droplets size={22} />
//               </div>
//               <div>
//                 <h4 className="font-extrabold text-slate-900">
//                   Irrigation Guidance
//                 </h4>
//                 <p className="text-xs text-slate-500">
//                   Rainfall and water planning
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               <div className="rounded-2xl bg-blue-50 p-4">
//                 <p className="text-xs font-medium text-blue-700">
//                   Recent Rainfall
//                 </p>
//                 <p className="mt-2 text-2xl font-black text-blue-950">
//                   {advisory?.irrigation_guidance?.rainfall_mm ?? 0}
//                   <span className="ml-1 text-sm">mm</span>
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-blue-50 p-4">
//                 <p className="text-xs font-medium text-blue-700">
//                   Upcoming Rain Chance
//                 </p>
//                 <p className="mt-2 text-2xl font-black text-blue-950">
//                   {advisory?.irrigation_guidance?.upcoming_rain_probability ?? 0}
//                   <span className="ml-1 text-sm">%</span>
//                 </p>
//               </div>
//             </div>

//             <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
//               {advisory?.irrigation_guidance?.message}
//             </p>

//             <div className="mt-4 rounded-2xl border border-emerald-100 p-4">
//               <p className="text-sm font-bold text-slate-800">
//                 ET₀ Information
//               </p>
//               <p className="mt-2 text-xs leading-5 text-slate-500">
//                 {advisory?.et0_guidance}
//               </p>
//               <p className="mt-2 text-xs font-semibold text-emerald-700">
//                 Today's ET₀: {weather.daily?.[0]?.et0 ?? '--'} mm
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Disease advisory */}
//       <section>
//         <div className="mb-4 flex items-center gap-2">
//           <ShieldCheck className="text-emerald-700" size={22} />
//           <div>
//             <h3 className="text-lg font-extrabold text-slate-900">
//               Disease Weather Advisory
//             </h3>
//             <p className="text-xs text-slate-500">
//               Weather conditions that may favor plant diseases
//             </p>
//           </div>
//         </div>

//         <div className="grid gap-4 lg:grid-cols-2">
//           <div className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm sm:p-6">
//             <div className="mb-5 flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
//                 <AlertTriangle size={22} />
//               </div>
//               <div>
//                 <h4 className="font-extrabold text-slate-900">
//                   Weather Alerts
//                 </h4>
//                 <p className="text-xs text-slate-500">
//                   General disease-favorable conditions
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-3">
//               {advisory?.disease_alerts?.map((alert, index) => (
//                 <div
//                   key={`${alert.condition}-${index}`}
//                   className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4"
//                 >
//                   <div className="flex flex-wrap items-center justify-between gap-2">
//                     <p className="text-sm font-bold text-slate-800">
//                       {alert.condition}
//                     </p>

//                     <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase text-amber-700">
//                       {alert.risk_level}
//                     </span>
//                   </div>

//                   <p className="mt-2 text-sm leading-6 text-slate-600">
//                     {alert.message}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
//             <div className="mb-5 flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
//                 <ShieldCheck size={22} />
//               </div>
//               <div>
//                 <h4 className="font-extrabold text-slate-900">
//                   Prevention Suggestions
//                 </h4>
//                 <p className="text-xs text-slate-500">
//                   Recommended monitoring practices
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-3">
//               {advisory?.prevention_tips?.map((tip, index) => (
//                 <div
//                   key={index}
//                   className="flex gap-3 rounded-2xl bg-emerald-50/70 p-4"
//                 >
//                   <ShieldCheck
//                     size={18}
//                     className="mt-0.5 shrink-0 text-emerald-700"
//                   />
//                   <p className="text-sm leading-6 text-slate-700">
//                     {tip}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
//           <p className="text-xs leading-5 text-slate-600">
//             <strong>Important:</strong> These are general weather-based advisories,
//             not confirmed disease diagnoses. Actual disease risk depends on crop
//             type, plant condition, local environment, and other factors. Use the
//             PlantCare AI disease analysis feature to inspect plant images.
//           </p>
//         </div>
//       </section>

//       {/* Location information */}
//       <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-100 bg-white px-5 py-4">
//         <div className="flex items-center gap-2 text-xs text-slate-500">
//           <Navigation size={15} className="text-emerald-600" />
//           Coordinates: {coordinates?.latitude.toFixed(4)}, {coordinates?.longitude.toFixed(4)}
//         </div>

//         <p className="text-xs text-slate-400">
//           Weather data provided by Open-Meteo
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Weather





import { useCallback, useEffect, useRef, useState } from 'react'
import {
  CloudSun,
  Sun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  MapPin,
  RefreshCw,
  Thermometer,
  Droplets,
  Wind,
  Umbrella,
  Sprout,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CalendarDays,
  Sunrise,
  Navigation,
  Leaf,
} from 'lucide-react'
import api from '../../services/api'

function getWeatherIcon(code, size = 24) {
  if ([0, 1].includes(code)) return <Sun size={size} />
  if ([2, 3, 45, 48].includes(code)) return <CloudSun size={size} />
  if ([51, 53, 55, 56, 57].includes(code)) return <CloudDrizzle size={size} />
  if ([61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) {
    return <CloudRain size={size} />
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <Cloud size={size} />
  return <CloudSun size={size} />
}

function formatHour(value) {
  if (!value) return '--'
  return value.slice(11, 16)
}

function formatDate(value) {
  if (!value) return '--'

  const date = new Date(`${value}T12:00:00`)

  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

function getPermissionError(error) {
  if (error.code === 1) {
    return 'Location permission was denied. Please allow location access in your browser settings and try again.'
  }

  if (error.code === 2) {
    return 'Your location could not be detected. Please check your device location settings and try again.'
  }

  if (error.code === 3) {
    return 'Location request timed out. Please try again.'
  }

  return 'Unable to access your location. Please try again.'
}

function WeatherMetric({ icon: Icon, label, value, unit }) {
  return (
    <div className="rounded-xl border border-emerald-100 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-900/5">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
        <Icon size={17} />
      </div>

      <p className="text-[11px] font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-0.5 text-lg font-extrabold text-slate-900">
        {value ?? '--'}
        <span className="ml-1 text-xs font-semibold text-slate-500">
          {unit}
        </span>
      </p>
    </div>
  )
}

function Weather() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [coordinates, setCoordinates] = useState(null)

  const requestStarted = useRef(false)

  const loadWeather = useCallback(async (latitude, longitude) => {
    try {
      setError('')
      setLoading(true)

      const response = await api.get('/api/weather', {
        params: {
          latitude,
          longitude,
        },
      })

      setWeather(response.data)
    } catch (requestError) {
      console.error('Weather API error:', requestError)

      setWeather(null)

      setError(
        requestError.response?.data?.detail ||
        'Unable to load weather information. Please check that the backend is running.'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLoading(false)
      setError('Your browser does not support location access. Please use a modern browser.')
      return
    }

    setLoading(true)
    setError('')
    setWeather(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        setCoordinates({ latitude, longitude })

        await loadWeather(latitude, longitude)
      },
      (locationError) => {
        setLoading(false)
        setWeather(null)
        setError(getPermissionError(locationError))
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 300000,
      }
    )
  }, [loadWeather])

  useEffect(() => {
    // Prevent duplicate location requests during React development StrictMode.
    if (requestStarted.current) return

    requestStarted.current = true
    requestLocation()
  }, [requestLocation])

  const retryLocation = () => {
    requestLocation()
  }

  const current = weather?.current
  const advisory = weather?.advisory

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <MapPin size={30} className="animate-bounce" />
        </div>

        <h2 className="text-lg font-extrabold text-slate-900">
          Detecting Your Location
        </h2>

        <p className="mt-2 max-w-sm text-xs text-slate-500">
          Please allow location access in your browser. We're preparing your local weather report.
        </p>

        <div className="mt-5 h-1.5 w-44 overflow-hidden rounded-full bg-emerald-100">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-emerald-500" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-xl items-center justify-center">
        <div className="w-full rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-lg shadow-emerald-950/5">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <MapPin size={26} />
          </div>

          <h2 className="text-lg font-extrabold text-slate-900">
            Location Access Required
          </h2>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            {error}
          </p>

          <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-left">
            <p className="text-xs font-bold text-emerald-900">
              How to enable location
            </p>
            <p className="mt-1 text-xs leading-5 text-emerald-800">
              Click the location or site-settings icon near your browser address bar, allow location access for PlantCare, and then try again.
            </p>
          </div>

          <button
            type="button"
            onClick={retryLocation}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            <RefreshCw size={15} />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!weather || !current) return null

  return (
    <div className="space-y-6">

      {/* Compact Page Introduction */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#103c2b] via-[#126447] to-emerald-600 px-4 py-4 text-white shadow-lg shadow-emerald-950/10 sm:px-5 sm:py-5">
        <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 h-40 w-40 rounded-full bg-emerald-300/10 blur-2xl" />

        <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-50">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
              Live Weather Information
            </div>

            <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
              Weather & Plant Care
            </h2>

            <p className="mt-1 max-w-lg text-xs leading-5 text-emerald-50/80">
              Understand local weather conditions and make smarter decisions for your crops.
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-50">
              <MapPin size={14} />
              <span>Current detected location</span>
            </div>
          </div>

          <button
            type="button"
            onClick={retryLocation}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/20 sm:self-center"
          >
            <RefreshCw size={14} />
            Refresh Location
          </button>
        </div>
      </section>

      {/* Current Weather */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Sunrise className="text-emerald-700" size={19} />
          <h3 className="text-base font-extrabold text-slate-900">
            Current Weather
          </h3>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-emerald-100 lg:col-span-1">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-50" />

            <div className="relative">
              <p className="text-xs font-semibold text-slate-500">
                Today's Conditions
              </p>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <h4 className="text-4xl font-black tracking-tight text-slate-900">
                    {current.temperature ?? '--'}°
                  </h4>

                  <p className="mt-1 text-xs font-semibold text-slate-600">
                    {current.condition}
                  </p>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                  {getWeatherIcon(current.weather_code, 36)}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
                <Clock size={13} />
                Updated at {formatHour(current.time)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 lg:col-span-2 lg:grid-cols-4">
            <WeatherMetric
              icon={Thermometer}
              label="Feels Like"
              value={current.feels_like}
              unit="°C"
            />

            <WeatherMetric
              icon={Droplets}
              label="Humidity"
              value={current.humidity}
              unit="%"
            />

            <WeatherMetric
              icon={CloudRain}
              label="Rainfall"
              value={current.rainfall}
              unit="mm"
            />

            <WeatherMetric
              icon={Wind}
              label="Wind Speed"
              value={current.wind_speed}
              unit="km/h"
            />
          </div>
        </div>
      </section>

      {/* Hourly Forecast */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Clock className="text-emerald-700" size={19} />
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Hourly Forecast
            </h3>
            <p className="text-[11px] text-slate-500">
              Weather for the next 24 hours
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm">
          <div className="flex gap-2.5 overflow-x-auto pb-2">
            {weather.hourly?.map((hour, index) => (
              <div
                key={`${hour.time}-${index}`}
                className="min-w-[88px] rounded-xl bg-[#f5faf6] px-3 py-3 text-center transition hover:bg-emerald-50"
              >
                <p className="text-[11px] font-bold text-slate-500">
                  {index === 0 ? 'Now' : formatHour(hour.time)}
                </p>

                <div className="my-3 flex justify-center text-emerald-600">
                  {getWeatherIcon(hour.weather_code, 22)}
                </div>

                <p className="text-base font-extrabold text-slate-900">
                  {hour.temperature}°
                </p>

                <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-blue-600">
                  <Droplets size={11} />
                  {hour.humidity}%
                </div>

                <p className="mt-1.5 text-[10px] text-slate-500">
                  Rain {hour.rain_probability ?? 0}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Forecast */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <CalendarDays className="text-emerald-700" size={19} />
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              7-Day Forecast
            </h3>
            <p className="text-[11px] text-slate-500">
              Plan ahead for your crops
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          {weather.daily?.map((day, index) => (
            <div
              key={day.date}
              className="grid grid-cols-2 items-center gap-2 border-b border-slate-100 px-3 py-3 last:border-0 sm:grid-cols-5 sm:px-4"
            >
              <div className="flex items-center gap-2">
                <CalendarDays size={14} className="text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">
                  {index === 0 ? 'Today' : formatDate(day.date)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="text-emerald-600">
                  {getWeatherIcon(day.weather_code, 17)}
                </span>
                <span>{day.condition}</span>
              </div>

              <p className="text-xs font-bold text-slate-800">
                {day.min_temperature}° / {day.max_temperature}°
              </p>

              <div className="flex items-center gap-1 text-[11px] text-blue-600">
                <Umbrella size={13} />
                {day.rain_probability ?? 0}% rain
              </div>

              <p className="col-span-2 text-[11px] text-slate-500 sm:col-span-1 sm:text-right">
                Rainfall: {day.rainfall ?? 0} mm
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Smart Plant Care */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Sprout className="text-emerald-700" size={19} />
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Smart Plant Care
            </h3>
            <p className="text-[11px] text-slate-500">
              Recommendations based on current weather
            </p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          {/* Plant Care Tips */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <Leaf size={18} />
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Plant Care Tips
                </h4>
                <p className="text-[10px] text-slate-500">
                  Weather-based suggestions
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {advisory?.plant_care_tips?.map((tip, index) => (
                <div
                  key={`${tip.category}-${index}`}
                  className="rounded-xl bg-[#f5faf6] p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-slate-800">
                      {tip.category}
                    </p>

                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                      tip.level === 'high'
                        ? 'bg-red-100 text-red-700'
                        : tip.level === 'moderate'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {tip.level}
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs leading-5 text-slate-600">
                    {tip.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Irrigation Guidance */}
          <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Droplets size={18} />
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Irrigation Guidance
                </h4>
                <p className="text-[10px] text-slate-500">
                  Rainfall and water planning
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-blue-50 p-3">
                <p className="text-[10px] font-medium text-blue-700">
                  Recent Rainfall
                </p>
                <p className="mt-1 text-xl font-black text-blue-950">
                  {advisory?.irrigation_guidance?.rainfall_mm ?? 0}
                  <span className="ml-1 text-xs">mm</span>
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3">
                <p className="text-[10px] font-medium text-blue-700">
                  Upcoming Rain Chance
                </p>
                <p className="mt-1 text-xl font-black text-blue-950">
                  {advisory?.irrigation_guidance?.upcoming_rain_probability ?? 0}
                  <span className="ml-1 text-xs">%</span>
                </p>
              </div>
            </div>

            <p className="mt-3 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600">
              {advisory?.irrigation_guidance?.message}
            </p>

            <div className="mt-3 rounded-xl border border-emerald-100 p-3">
              <p className="text-xs font-bold text-slate-800">
                ET₀ Information
              </p>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                {advisory?.et0_guidance}
              </p>
              <p className="mt-1.5 text-[11px] font-semibold text-emerald-700">
                Today's ET₀: {weather.daily?.[0]?.et0 ?? '--'} mm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disease Weather Advisory */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck className="text-emerald-700" size={19} />
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Disease Weather Advisory
            </h3>
            <p className="text-[11px] text-slate-500">
              Weather conditions that may favor plant diseases
            </p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          {/* Weather Alerts */}
          <div className="rounded-2xl border border-amber-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <AlertTriangle size={18} />
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Weather Alerts
                </h4>
                <p className="text-[10px] text-slate-500">
                  General disease-favorable conditions
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {advisory?.disease_alerts?.map((alert, index) => (
                <div
                  key={`${alert.condition}-${index}`}
                  className="rounded-xl border border-amber-100 bg-amber-50/60 p-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-bold text-slate-800">
                      {alert.condition}
                    </p>

                    <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-bold uppercase text-amber-700">
                      {alert.risk_level}
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs leading-5 text-slate-600">
                    {alert.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Prevention Suggestions */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <ShieldCheck size={18} />
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Prevention Suggestions
                </h4>
                <p className="text-[10px] text-slate-500">
                  Recommended monitoring practices
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {advisory?.prevention_tips?.map((tip, index) => (
                <div
                  key={index}
                  className="flex gap-2.5 rounded-xl bg-emerald-50/70 p-3"
                >
                  <ShieldCheck
                    size={16}
                    className="mt-0.5 shrink-0 text-emerald-700"
                  />
                  <p className="text-xs leading-5 text-slate-700">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-[11px] leading-5 text-slate-600">
            <strong>Important:</strong> These are general weather-based advisories,
            not confirmed disease diagnoses. Actual disease risk depends on crop
            type, plant condition, local environment, and other factors. Use the
            PlantCare AI disease analysis feature to inspect plant images.
          </p>
        </div>
      </section>

      {/* Location Information */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-100 bg-white px-4 py-3">
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <Navigation size={14} className="text-emerald-600" />
          Coordinates: {coordinates?.latitude.toFixed(4)}, {coordinates?.longitude.toFixed(4)}
        </div>

        <p className="text-[10px] text-slate-400">
          Weather data provided by Open-Meteo
        </p>
      </div>
    </div>
  )
}

export default Weather
