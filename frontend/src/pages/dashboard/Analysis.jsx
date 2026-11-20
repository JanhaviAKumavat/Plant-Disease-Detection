// import { useEffect, useState } from 'react'
// import { useLocation, Link } from 'react-router-dom'
// import {
//   BrainCircuit,
//   Leaf,
//   ScanSearch,
//   Activity,
//   Image as ImageIcon,
//   Sparkles,
//   AlertCircle,
//   ArrowLeft,
//   LoaderCircle,
//   Info,
//   ShieldCheck,
//   Stethoscope,
//   Bug,
//   Lightbulb,
//   CheckCircle2,
//   HeartPulse,
// } from 'lucide-react'
// import api from '../../services/api'

// const API_BASE = (
//   import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
// ).replace(/\/+$/, '')

// function GuidanceCard({ title, description, items, icon: Icon, color }) {
//   return (
//     <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
//       <div className="mb-5 flex items-center gap-3">
//         <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
//           <Icon size={23} />
//         </div>
//         <div>
//           <h3 className="font-extrabold text-slate-900">{title}</h3>
//           <p className="mt-1 text-xs text-slate-500">{description}</p>
//         </div>
//       </div>

//       <ul className="space-y-3">
//         {items.map((item, index) => (
//           <li key={`${index}-${item}`} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
//             <CheckCircle2 size={17} className="mt-1 shrink-0 text-emerald-600" />
//             <span>{item}</span>
//           </li>
//         ))}
//       </ul>
//     </section>
//   )
// }

// function Analysis() {
//   const location = useLocation()

//   const [prediction, setPrediction] = useState(
//     location.state?.prediction || null
//   )
//   const [diseaseInformation, setDiseaseInformation] = useState(
//     location.state?.diseaseInformation || null
//   )
//   const [file] = useState(location.state?.file || null)

// const [imagePreview] = useState(() =>
//   file ? URL.createObjectURL(file) : ''
// )

// useEffect(() => {
//   return () => {
//     if (imagePreview) {
//       URL.revokeObjectURL(imagePreview)
//     }
//   }
// }, [imagePreview])

//   const [explanation, setExplanation] = useState(null)
//   const [loadingExplanation, setLoadingExplanation] = useState(false)
//   const [error, setError] = useState('')

//   const generateExplanation = async () => {
//     if (!file) {
//       setError(
//         'Original image is unavailable. Please upload the image again to generate an explanation.'
//       )
//       return
//     }

//     setLoadingExplanation(true)
//     setError('')

//     try {
//       const formData = new FormData()
//       formData.append('file', file)

//       const response = await api.post(
//         '/api/predictions/explain',
//         formData
//       )

//       const result = response.data

//       if (result.data) {
//         setPrediction(result.data)
//       }

//       if (result.disease_information) {
//         setDiseaseInformation(result.disease_information)
//       }

//       setExplanation(result.explanation)
//     } catch (err) {
//       setError(
//         err.response?.data?.detail ||
//         err.response?.data?.message ||
//         'Unable to generate the explanation. Please try again.'
//       )
//     } finally {
//       setLoadingExplanation(false)
//     }
//   }

//   if (!prediction) {
//     return (
//       <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-emerald-100 bg-white p-8 text-center">
//         <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
//           <ScanSearch size={32} />
//         </div>

//         <h2 className="mt-5 text-xl font-black text-slate-900">
//           No Analysis Available
//         </h2>

//         <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
//           Upload a plant leaf image to view its disease prediction and AI analysis results.
//         </p>

//         <Link
//           to="/dashboard/upload"
//           className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
//         >
//           <ImageIcon size={18} />
//           Upload Image
//         </Link>
//       </div>
//     )
//   }

//   const topPredictions = prediction.top_predictions || []
//   const confidence = Number(prediction.confidence) || 0
//   const isDiseaseClass = diseaseInformation?.diagnosis_type === 'disease_class'

//   const heatmapUrl = explanation?.heatmap_url
//     ? `${API_BASE}/${explanation.heatmap_url.replace(/^\/+/, '')}`
//     : ''

//   return (
//     <div className="space-y-8">

//       {/* Page heading */}
//       <section>
//         <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
//           AI Diagnosis
//         </span>

//         <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
//           Plant Analysis Report
//         </h2>

//         <p className="mt-3 text-sm leading-7 text-slate-500">
//           Explore the model prediction, disease information, management guidance and visual explanation.
//         </p>
//       </section>

//       {/* Main prediction */}
//       <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
//         <div className="bg-gradient-to-r from-emerald-900 via-emerald-700 to-green-600 p-6 text-white sm:p-8">
//           <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
//                 <Leaf size={27} />
//               </div>

//               <div>
//                 <p className="text-sm font-medium text-emerald-100">
//                   Predicted Class
//                 </p>
//                 <h3 className="mt-1 text-2xl font-black">
//                   {prediction.predicted_disease}
//                 </h3>
//               </div>
//             </div>

//             <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur">
//               <p className="text-xs font-semibold text-emerald-100">
//                 Model Confidence
//               </p>
//               <p className="mt-1 text-3xl font-black">
//                 {confidence.toFixed(2)}%
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="grid gap-4 p-6 sm:grid-cols-2">
//           <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4">
//             <BrainCircuit className="text-emerald-700" size={25} />
//             <div>
//               <p className="text-xs text-slate-500">AI Model</p>
//               <p className="font-bold text-slate-800">
//                 {prediction.model || 'Plant Disease Classification Model'}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4">
//             <ShieldCheck className="text-blue-700" size={25} />
//             <div>
//               <p className="text-xs text-slate-500">Analysis Status</p>
//               <p className="font-bold text-slate-800">
//                 Prediction Completed
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Diagnosis information */}
//       {diseaseInformation && (
//         <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
//           <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-6 sm:p-8">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
//                 <Stethoscope size={25} />
//               </div>

//               <div>
//                 <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
//                   Diagnosis Information
//                 </p>
//                 <h3 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
//                   {diseaseInformation.disease_name}
//                 </h3>
//               </div>
//             </div>

//             <div className="mt-5 flex flex-wrap gap-2">
//               <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-800">
//                 Crop: {diseaseInformation.crop}
//               </span>
//               <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-bold text-blue-800">
//                 {diseaseInformation.category}
//               </span>
//             </div>

//             <p className="mt-5 text-sm leading-7 text-slate-600">
//               {diseaseInformation.overview}
//             </p>
//           </div>

//           {!isDiseaseClass && (
//             <div className="m-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:m-8">
//               <Info size={22} className="mt-0.5 shrink-0 text-amber-700" />
//               <div>
//                 <h4 className="font-extrabold text-amber-900">
//                   No specific disease identified
//                 </h4>
//                 <p className="mt-1 text-sm leading-6 text-amber-800">
//                   The model predicted a general leaf category, not a specific disease. This does not prove that the plant is healthy. Inspect the plant for symptoms and seek expert confirmation if you notice unusual changes.
//                 </p>
//               </div>
//             </div>
//           )}

//           {isDiseaseClass && diseaseInformation.symptoms?.length > 0 && (
//             <div className="p-6 sm:p-8">
//               <div className="mb-5 flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
//                   <Activity size={21} />
//                 </div>
//                 <div>
//                   <h4 className="font-extrabold text-slate-900">
//                     Common Symptoms
//                   </h4>
//                   <p className="text-xs text-slate-500">
//                     Symptoms commonly associated with this disease
//                   </p>
//                 </div>
//               </div>

//               <ul className="grid gap-3 sm:grid-cols-2">
//                 {diseaseInformation.symptoms.map((symptom, index) => (
//                   <li
//                     key={`${index}-${symptom}`}
//                     className="flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-slate-700"
//                   >
//                     <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-xs font-black text-amber-800">
//                       {index + 1}
//                     </span>
//                     {symptom}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           <div className="border-t border-slate-100 p-6 sm:p-8">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
//                 <Bug size={21} />
//               </div>
//               <h4 className="font-extrabold text-slate-900">
//                 Possible Causes
//               </h4>
//             </div>

//             <p className="mt-4 rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
//               {diseaseInformation.causes}
//             </p>
//           </div>
//         </section>
//       )}

//       {/* Treatment and prevention */}
//       {diseaseInformation && (
//         <section>
//           <div className="mb-5">
//             <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
//               Plant Care Recommendations
//             </span>
//             <h3 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">
//               Treatment & Prevention Guide
//             </h3>
//             <p className="mt-2 text-sm leading-6 text-slate-500">
//               General management guidance associated with the predicted class.
//             </p>
//           </div>

//           <div className="grid gap-5 lg:grid-cols-2">
//             <GuidanceCard
//               title="Treatment & Management"
//               description="Suggested steps to manage the identified condition"
//               items={diseaseInformation.treatment || []}
//               icon={HeartPulse}
//               color="bg-rose-100 text-rose-700"
//             />

//             <GuidanceCard
//               title="Prevention"
//               description="Practices that may help reduce disease risk"
//               items={diseaseInformation.prevention || []}
//               icon={ShieldCheck}
//               color="bg-emerald-100 text-emerald-700"
//             />
//           </div>

//           <div className="mt-5 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5">
//             <Lightbulb size={22} className="mt-0.5 shrink-0 text-blue-700" />
//             <div>
//               <h4 className="font-bold text-blue-900">
//                 Agricultural guidance
//               </h4>
//               <p className="mt-1 text-sm leading-6 text-blue-800">
//                 These recommendations are general educational information, not a confirmed diagnosis or a prescription. Confirm the disease locally before applying pesticides, fungicides or other chemical treatments. Always follow local agricultural advice and product labels.
//               </p>
//             </div>
//           </div>
//         </section>
//       )}

//       {!diseaseInformation && (
//         <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-800">
//           Disease information was not included in this response. Please upload the image again after confirming the backend is updated.
//         </div>
//       )}

//       {/* Top predictions */}
//       <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
//         <div className="mb-7 flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
//             <Activity size={24} />
//           </div>

//           <div>
//             <h3 className="text-lg font-extrabold text-slate-900">
//               Top Model Predictions
//             </h3>
//             <p className="text-sm text-slate-500">
//               Confidence scores for the top predicted classes
//             </p>
//           </div>
//         </div>

//         <div className="space-y-6">
//           {topPredictions.map((item, index) => (
//             <div key={`${item.disease}-${index}`}>
//               <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
//                 <div className="flex items-center gap-2">
//                   <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black ${
//                     index === 0
//                       ? 'bg-emerald-600 text-white'
//                       : 'bg-slate-100 text-slate-600'
//                   }`}>
//                     {index + 1}
//                   </span>

//                   <span className="text-sm font-bold text-slate-800">
//                     {item.disease}
//                   </span>
//                 </div>

//                 <span className="text-sm font-extrabold text-emerald-700">
//                   {Number(item.confidence).toFixed(2)}%
//                 </span>
//               </div>

//               <div className="h-3 overflow-hidden rounded-full bg-slate-100">
//                 <div
//                   className={`h-full rounded-full transition-all duration-1000 ${
//                     index === 0
//                       ? 'bg-gradient-to-r from-emerald-500 to-green-400'
//                       : 'bg-gradient-to-r from-slate-400 to-slate-300'
//                   }`}
//                   style={{
//                     width: `${Math.min(100, Math.max(0, Number(item.confidence) || 0))}%`,
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {topPredictions.length === 0 && (
//           <p className="text-sm text-slate-500">
//             No additional prediction scores are available.
//           </p>
//         )}

//         <div className="mt-6 flex items-start gap-2 rounded-xl bg-amber-50 p-4 text-xs leading-6 text-amber-800">
//           <Info size={18} className="mt-0.5 shrink-0" />
//           Confidence is the model's estimated probability for a class. It is not a measure of guaranteed diagnostic accuracy.
//         </div>

//         {confidence < 60 && (
//           <div className="mt-3 flex items-start gap-2 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm leading-6 text-orange-800">
//             <AlertCircle size={19} className="mt-0.5 shrink-0" />
//             This prediction has relatively low confidence. Do not rely on it alone to decide treatment. Consider taking another clear image and consulting an agricultural expert.
//           </div>
//         )}
//       </section>

//       {/* Explainable AI */}
//       <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-8">
//         <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-100/50 blur-3xl" />

//         <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
//           <div className="flex items-center gap-4">
//             <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-200">
//               <Sparkles size={27} />
//             </div>

//             <div>
//               <div className="mb-1 flex flex-wrap items-center gap-2">
//                 <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
//                   Explainable AI Studio
//                 </h3>
//                 <span className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-700">
//                   AI Insights
//                 </span>
//               </div>
//               <p className="max-w-xl text-sm leading-6 text-slate-500">
//                 Understand which visual regions influenced your plant disease prediction.
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={generateExplanation}
//             disabled={loadingExplanation || !file}
//             className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
//           >
//             {loadingExplanation ? (
//               <LoaderCircle size={19} className="animate-spin" />
//             ) : (
//               <Sparkles size={19} />
//             )}

//             {loadingExplanation
//               ? 'Generating AI Explanation...'
//               : explanation
//                 ? 'Regenerate Explanation'
//                 : 'Generate AI Explanation'}
//           </button>
//         </div>

//         {!file && !explanation && (
//           <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
//             <AlertCircle size={20} className="mt-0.5 shrink-0" />
//             <p>
//               The original uploaded image is unavailable. Please upload the image again to generate an AI explanation.
//             </p>
//           </div>
//         )}

//         {error && (
//           <div role="alert" className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-600">
//             <AlertCircle size={20} className="mt-0.5 shrink-0" />
//             <p>{error}</p>
//           </div>
//         )}

//         {loadingExplanation && (
//           <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-purple-100 bg-purple-50/50 px-5 py-10 text-center">
//             <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-600">
//               <LoaderCircle size={28} className="animate-spin" />
//             </div>
//             <p className="font-bold text-slate-800">Analyzing important image regions</p>
//             <p className="mt-1 text-sm text-slate-500">
//               Integrated Gradients is calculating the model's visual attributions.
//             </p>
//           </div>
//         )}

//         {explanation && heatmapUrl && (
//           <div className="relative mt-8 space-y-6">
//             <div className="flex flex-wrap items-center justify-between gap-3">
//               <div>
//                 <h4 className="text-base font-extrabold text-slate-900">
//                   Visual Attention Comparison
//                 </h4>
//                 <p className="mt-1 text-xs leading-5 text-slate-500">
//                   Compare the uploaded leaf with the AI-generated attention overlay.
//                 </p>
//               </div>

//               <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
//                 <span className="h-2 w-2 rounded-full bg-emerald-500" />
//                 Explanation Generated
//               </span>
//             </div>

//             <div className={`grid gap-5 ${imagePreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
//               {imagePreview && (
//                 <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
//                   <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
//                     <div className="flex items-center gap-2">
//                       <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
//                         <Leaf size={15} />
//                       </span>
//                       <span className="text-sm font-bold text-slate-800">
//                         Original Leaf
//                       </span>
//                     </div>
//                     <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                       Input Image
//                     </span>
//                   </div>

//                   <div className="flex min-h-64 items-center justify-center bg-slate-100 p-3 sm:min-h-80">
//                     <img
//                       src={imagePreview}
//                       alt="Original uploaded plant leaf"
//                       className="max-h-96 w-full rounded-xl object-contain"
//                     />
//                   </div>

//                   <p className="border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
//                     Original image provided to the prediction model.
//                   </p>
//                 </div>
//               )}

//               <div className="overflow-hidden rounded-2xl border border-purple-200 bg-purple-50/40">
//                 <div className="flex items-center justify-between border-b border-purple-100 bg-white px-4 py-3">
//                   <div className="flex items-center gap-2">
//                     <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
//                       <Sparkles size={15} />
//                     </span>
//                     <span className="text-sm font-bold text-slate-800">
//                       AI Attention Overlay
//                     </span>
//                   </div>
//                   <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
//                     Integrated Gradients
//                   </span>
//                 </div>

//                 <div className="flex min-h-64 items-center justify-center bg-slate-100 p-3 sm:min-h-80">
//                   <img
//                     src={heatmapUrl}
//                     alt="Integrated Gradients attention overlay showing image regions that influenced the AI prediction"
//                     className="max-h-96 w-full rounded-xl object-contain"
//                   />
//                 </div>

//                 <p className="border-t border-purple-100 bg-white px-4 py-3 text-xs text-slate-500">
//                   Colored regions indicate the model's visual attribution.
//                 </p>
//               </div>
//             </div>

//             <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
//               <div className="flex items-center gap-2">
//                 <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
//                   <Activity size={19} />
//                 </div>
//                 <div>
//                   <h4 className="font-extrabold text-slate-900">
//                     Understanding AI Attention
//                   </h4>
//                   <p className="text-xs text-slate-500">
//                     How to interpret the visualization
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-5 grid gap-4 sm:grid-cols-3">
//                 <div className="rounded-xl bg-red-50 p-4">
//                   <div className="mb-2 h-2 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-red-600" />
//                   <p className="text-sm font-bold text-slate-800">Stronger Attention</p>
//                   <p className="mt-1 text-xs leading-5 text-slate-500">
//                     Brighter regions indicate stronger positive attribution in this visualization.
//                   </p>
//                 </div>

//                 <div className="rounded-xl bg-orange-50 p-4">
//                   <div className="mb-2 h-2 w-10 rounded-full bg-gradient-to-r from-orange-300 to-orange-500" />
//                   <p className="text-sm font-bold text-slate-800">Moderate Attention</p>
//                   <p className="mt-1 text-xs leading-5 text-slate-500">
//                     Intermediate colors represent comparatively moderate attribution values.
//                   </p>
//                 </div>

//                 <div className="rounded-xl bg-slate-50 p-4">
//                   <div className="mb-2 h-2 w-10 rounded-full bg-slate-300" />
//                   <p className="text-sm font-bold text-slate-800">Lower Attention</p>
//                   <p className="mt-1 text-xs leading-5 text-slate-500">
//                     Less highlighted regions have weaker displayed attribution.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50 p-5 sm:p-6">
//               <div className="flex items-center gap-2 font-extrabold text-purple-900">
//                 <Sparkles size={19} />
//                 Explanation Details
//               </div>

//               <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//                 <div className="rounded-xl border border-white bg-white/80 p-4">
//                   <p className="text-xs font-medium text-slate-500">Explanation Method</p>
//                   <p className="mt-2 break-words text-sm font-extrabold text-slate-900">
//                     {explanation.method || 'Integrated Gradients'}
//                   </p>
//                 </div>

//                 <div className="rounded-xl border border-white bg-white/80 p-4">
//                   <p className="text-xs font-medium text-slate-500">Integration Steps</p>
//                   <p className="mt-2 text-xl font-extrabold text-purple-700">
//                     {explanation.n_steps ?? '—'}
//                   </p>
//                 </div>

//                 <div className="rounded-xl border border-white bg-white/80 p-4">
//                   <p className="text-xs font-medium text-slate-500">Image Width</p>
//                   <p className="mt-2 text-xl font-extrabold text-slate-900">
//                     {explanation.image_width ?? '—'} px
//                   </p>
//                 </div>

//                 <div className="rounded-xl border border-white bg-white/80 p-4">
//                   <p className="text-xs font-medium text-slate-500">Image Height</p>
//                   <p className="mt-2 text-xl font-extrabold text-slate-900">
//                     {explanation.image_height ?? '—'} px
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-4 rounded-xl border border-purple-100 bg-white/70 p-4">
//                 <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
//                   Explained Prediction Class
//                 </p>
//                 <p className="mt-1 break-words text-sm font-extrabold text-slate-900">
//                   {explanation.predicted_disease || prediction?.predicted_disease || 'Plant disease prediction'}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
//               <AlertCircle size={18} className="mt-0.5 shrink-0 text-blue-600" />
//               <p className="text-xs leading-6 text-blue-800">
//                 <strong>Research note:</strong> This visualization explains which image regions influenced the model's prediction. Highlighted regions are model attributions, not confirmed disease lesions or a medical-style segmentation mask. The explanation should be interpreted alongside the prediction and visible leaf symptoms.
//               </p>
//             </div>
//           </div>
//         )}
//       </section>
//       {/* Footer actions */}
//       <div className="flex flex-wrap gap-3">
//         <Link
//           to="/dashboard/upload"
//           className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 px-5 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
//         >
//           <ArrowLeft size={18} />
//           Analyze Another Image
//         </Link>
//       </div>

//     </div>
//   )
// }

// export default Analysis





import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {
  BrainCircuit,
  Leaf,
  ScanSearch,
  Activity,
  Image as ImageIcon,
  Sparkles,
  AlertCircle,
  ArrowLeft,
  LoaderCircle,
  Info,
  ShieldCheck,
  Stethoscope,
  Bug,
  Lightbulb,
  CheckCircle2,
  HeartPulse,
  Maximize2,
  X,
} from 'lucide-react'
import api from '../../services/api'

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
).replace(/\/+$/, '')

function GuidanceCard({ title, description, items = [], icon: Icon, color }) {
  return (
    <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
          <Icon size={23} />
        </div>

        <div>
          <h3 className="font-extrabold text-slate-900">{title}</h3>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>
      </div>

      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={`${index}-${typeof item === 'string' ? item : item.symptom}`}
              className="flex items-start gap-3 text-sm leading-6 text-slate-600"
            >
              <CheckCircle2 size={17} className="mt-1 shrink-0 text-emerald-600" />
              <span>{typeof item === 'string' ? item : item.description}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-6 text-slate-500">
          No additional information is available for this section.
        </p>
      )}
    </section>
  )
}

function Analysis() {
  const location = useLocation()

  const [prediction, setPrediction] = useState(
    location.state?.prediction || null
  )

  const [diseaseInformation, setDiseaseInformation] = useState(
    location.state?.diseaseInformation || null
  )

  const [file] = useState(location.state?.file || null)

  const [imagePreview] = useState(() =>
    file ? URL.createObjectURL(file) : ''
  )

  const [explanation, setExplanation] = useState(null)
  const [loadingExplanation, setLoadingExplanation] = useState(false)
  const [error, setError] = useState('')

  const [isHeatmapPreviewOpen, setIsHeatmapPreviewOpen] = useState(false)

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  // Close preview with Escape and prevent background scrolling.
  useEffect(() => {
    if (!isHeatmapPreviewOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsHeatmapPreviewOpen(false)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isHeatmapPreviewOpen])

  const generateExplanation = async () => {
    if (!file) {
      setError(
        'Original image is unavailable. Please upload the image again to generate an explanation.'
      )
      return
    }

    setLoadingExplanation(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await api.post(
        '/api/predictions/explain',
        formData
      )

      const result = response.data

      if (result.data) {
        setPrediction(result.data)
      }

      if (result.disease_information) {
        setDiseaseInformation(result.disease_information)
      }

      setExplanation(result.explanation)
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Unable to generate the explanation. Please try again.'
      )
    } finally {
      setLoadingExplanation(false)
    }
  }

  if (!prediction) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-emerald-100 bg-white p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <ScanSearch size={32} />
        </div>

        <h2 className="mt-5 text-xl font-black text-slate-900">
          No Analysis Available
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          Upload a plant leaf image to view its disease prediction and AI analysis results.
        </p>

        <Link
          to="/dashboard/upload"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
        >
          <ImageIcon size={18} />
          Upload Image
        </Link>
      </div>
    )
  }

  const topPredictions = prediction.top_predictions || []
  const confidence = Number(prediction.confidence) || 0
  const isDiseaseClass = diseaseInformation?.diagnosis_type === 'disease_class'

  const heatmapUrl = explanation?.heatmap_url
    ? `${API_BASE}/${explanation.heatmap_url.replace(/^\/+/, '')}`
    : ''

  return (
    <div className="space-y-8">

      {/* Page heading */}
      <section>
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
          AI Diagnosis
        </span>

        <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
          Plant Analysis Report
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          Explore the model prediction, detailed crop and disease information,
          management guidance and visual explanation.
        </p>
      </section>

      {/* Main prediction */}
      <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-700 to-green-600 p-6 text-white sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <Leaf size={27} />
              </div>

              <div>
                <p className="text-sm font-medium text-emerald-100">
                  Predicted Class
                </p>
                <h3 className="mt-1 text-2xl font-black">
                  {prediction.predicted_disease}
                </h3>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur">
              <p className="text-xs font-semibold text-emerald-100">
                Model Confidence
              </p>
              <p className="mt-1 text-3xl font-black">
                {confidence.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4">
            <BrainCircuit className="text-emerald-700" size={25} />
            <div>
              <p className="text-xs text-slate-500">AI Model</p>
              <p className="font-bold text-slate-800">
                {prediction.model || 'Plant Disease Classification Model'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4">
            <ShieldCheck className="text-blue-700" size={25} />
            <div>
              <p className="text-xs text-slate-500">Analysis Status</p>
              <p className="font-bold text-slate-800">
                Prediction Completed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnosis information */}
      {diseaseInformation && (
        <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">

          {/* Diagnosis header */}
          <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Stethoscope size={25} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Diagnosis Information
                </p>
                <h3 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                  {diseaseInformation.disease_name || prediction.predicted_disease}
                </h3>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {diseaseInformation.crop && (
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-800">
                  Crop: {diseaseInformation.crop}
                </span>
              )}

              {diseaseInformation.category && (
                <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-bold text-blue-800">
                  {diseaseInformation.category}
                </span>
              )}
            </div>

            {diseaseInformation.overview && (
              <p className="mt-5 text-sm leading-7 text-slate-600">
                {diseaseInformation.overview}
              </p>
            )}

            {/* Crop description */}
            {diseaseInformation.crop_description && (
              <div className="mt-4 rounded-2xl border border-emerald-100 bg-white p-5">
                <h4 className="font-extrabold text-emerald-800">
                  About This Crop
                </h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {diseaseInformation.crop_description}
                </p>
              </div>
            )}

            {/* Detailed disease explanation */}
            {diseaseInformation.detailed_description && (
              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                <h4 className="font-extrabold text-slate-900">
                  Detailed Disease Explanation
                </h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {diseaseInformation.detailed_description}
                </p>
              </div>
            )}
          </div>

          {/* Non-disease classification */}
          {!isDiseaseClass && (
            <div className="m-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:m-8">
              <Info size={22} className="mt-0.5 shrink-0 text-amber-700" />
              <div>
                <h4 className="font-extrabold text-amber-900">
                  No specific disease identified
                </h4>
                <p className="mt-1 text-sm leading-6 text-amber-800">
                  The model predicted a general leaf category, not a specific
                  disease. This does not prove that the plant is healthy.
                  Inspect the plant for symptoms and seek expert confirmation
                  if you notice unusual changes.
                </p>
              </div>
            </div>
          )}

          {/* Common symptoms */}
          {isDiseaseClass && diseaseInformation.symptoms?.length > 0 && (
            <div className="p-6 sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <Activity size={21} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">
                    Common Symptoms
                  </h4>
                  <p className="text-xs text-slate-500">
                    Symptoms commonly associated with this disease
                  </p>
                </div>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {diseaseInformation.symptoms.map((symptom, index) => (
                  <li
                    key={`${index}-${symptom}`}
                    className="flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-slate-700"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-xs font-black text-amber-800">
                      {index + 1}
                    </span>
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed symptom explanations */}
          {isDiseaseClass && diseaseInformation.symptom_details?.length > 0 && (
            <div className="border-t border-slate-100 p-6 sm:p-8">
              <h4 className="mb-5 font-extrabold text-slate-900">
                Understanding the Symptoms
              </h4>

              <div className="grid gap-4 sm:grid-cols-2">
                {diseaseInformation.symptom_details.map((item, index) => (
                  <div
                    key={`${index}-${item.symptom}`}
                    className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5"
                  >
                    <h5 className="font-bold text-slate-800">
                      {item.symptom}
                    </h5>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Possible causes */}
          <div className="border-t border-slate-100 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                <Bug size={21} />
              </div>
              <h4 className="font-extrabold text-slate-900">
                Possible Causes
              </h4>
            </div>

            <p className="mt-4 rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              {diseaseInformation.causes || 'Cause information is not available.'}
            </p>
          </div>

          {/* Disease spread and affected parts */}
          {isDiseaseClass && (
            <div className="grid gap-5 border-t border-slate-100 p-6 sm:grid-cols-2 sm:p-8">
              <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5">
                <h4 className="font-extrabold text-slate-900">
                  How Disease Can Spread
                </h4>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {diseaseInformation.spread_details ||
                    'Detailed spread information is not available.'}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
                <h4 className="font-extrabold text-slate-900">
                  Affected Plant Parts
                </h4>

                {diseaseInformation.affected_parts?.length > 0 ? (
                  <ul className="mt-3 space-y-3">
                    {diseaseInformation.affected_parts.map((part, index) => (
                      <li
                        key={index}
                        className="text-sm leading-6 text-slate-600"
                      >
                        <span className="mr-2 text-emerald-600">●</span>
                        {part}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Inspect the leaves, stems and other visible plant parts
                    for additional symptoms.
                  </p>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Treatment and prevention */}
      {diseaseInformation && (
        <section>
          <div className="mb-5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
              Plant Care Recommendations
            </span>
            <h3 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">
              Treatment & Prevention Guide
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              General management guidance associated with the predicted class.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <GuidanceCard
              title="Treatment & Management"
              description="Suggested steps to manage the identified condition"
              items={
                diseaseInformation.management_steps ||
                diseaseInformation.treatment ||
                []
              }
              icon={HeartPulse}
              color="bg-rose-100 text-rose-700"
            />

            <GuidanceCard
              title="Prevention"
              description="Practices that may help reduce disease risk"
              items={diseaseInformation.prevention || []}
              icon={ShieldCheck}
              color="bg-emerald-100 text-emerald-700"
            />
          </div>

          {/* Agricultural guidance */}
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <Lightbulb size={22} className="mt-0.5 shrink-0 text-blue-700" />
            <div>
              <h4 className="font-bold text-blue-900">
                Agricultural Guidance
              </h4>
              <p className="mt-1 text-sm leading-6 text-blue-800">
                These recommendations are general educational information,
                not a confirmed diagnosis or a prescription. Confirm the
                disease locally before applying pesticides, fungicides or
                other chemical treatments. Always follow local agricultural
                advice and product labels.
              </p>
            </div>
          </div>

          {/* Recovery monitoring and expert advice */}
          {isDiseaseClass && (
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <GuidanceCard
                title="Recovery Monitoring"
                description="What to observe after applying management practices"
                items={diseaseInformation.recovery_monitoring || []}
                icon={Activity}
                color="bg-blue-100 text-blue-700"
              />

              <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <Stethoscope size={23} />
                  </div>
                  <h3 className="font-extrabold text-slate-900">
                    When to Seek Expert Help
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-700">
                  {diseaseInformation.when_to_seek_help ||
                    'Consult a local agricultural expert if symptoms continue to spread or the plant shows significant damage.'}
                </p>
              </section>
            </div>
          )}
        </section>
      )}

      {!diseaseInformation && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-800">
          Disease information was not included in this response. Please upload
          the image again after confirming the backend is updated.
        </div>
      )}

      {/* Top predictions */}
      <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Activity size={24} />
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Top Model Predictions
            </h3>
            <p className="text-sm text-slate-500">
              Confidence scores for the top predicted classes
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {topPredictions.map((item, index) => (
            <div key={`${item.disease}-${index}`}>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black ${
                      index === 0
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {index + 1}
                  </span>

                  <span className="text-sm font-bold text-slate-800">
                    {item.disease}
                  </span>
                </div>

                <span className="text-sm font-extrabold text-emerald-700">
                  {Number(item.confidence).toFixed(2)}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    index === 0
                      ? 'bg-gradient-to-r from-emerald-500 to-green-400'
                      : 'bg-gradient-to-r from-slate-400 to-slate-300'
                  }`}
                  style={{
                    width: `${Math.min(100, Math.max(0, Number(item.confidence) || 0))}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {topPredictions.length === 0 && (
          <p className="text-sm text-slate-500">
            No additional prediction scores are available.
          </p>
        )}

        <div className="mt-6 flex items-start gap-2 rounded-xl bg-amber-50 p-4 text-xs leading-6 text-amber-800">
          <Info size={18} className="mt-0.5 shrink-0" />
          Confidence is the model's estimated probability for a class. It is
          not a measure of guaranteed diagnostic accuracy.
        </div>

        {confidence < 60 && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm leading-6 text-orange-800">
            <AlertCircle size={19} className="mt-0.5 shrink-0" />
            This prediction has relatively low confidence. Do not rely on it
            alone to decide treatment. Consider taking another clear image
            and consulting an agricultural expert.
          </div>
        )}
      </section>

      {/* Explainable AI */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-100/50 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-200">
              <Sparkles size={27} />
            </div>

            <div>
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
                  Explainable AI Studio
                </h3>
                <span className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-700">
                  AI Insights
                </span>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-500">
                Understand which visual regions influenced your plant disease prediction.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={generateExplanation}
            disabled={loadingExplanation || !file}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loadingExplanation ? (
              <LoaderCircle size={19} className="animate-spin" />
            ) : (
              <Sparkles size={19} />
            )}

            {loadingExplanation
              ? 'Generating AI Explanation...'
              : explanation
                ? 'Regenerate Explanation'
                : 'Generate AI Explanation'}
          </button>
        </div>

        {!file && !explanation && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <p>
              The original uploaded image is unavailable. Please upload the image again to generate an AI explanation.
            </p>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-600"
          >
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {loadingExplanation && (
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-purple-100 bg-purple-50/50 px-5 py-10 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <LoaderCircle size={28} className="animate-spin" />
            </div>
            <p className="font-bold text-slate-800">
              Analyzing important image regions
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Integrated Gradients is calculating the model's visual attributions.
            </p>
          </div>
        )}

        {explanation && heatmapUrl && (
          <div className="relative mt-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-extrabold text-slate-900">
                  Visual Attention Comparison
                </h4>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Compare the uploaded leaf with the AI-generated attention overlay.
                </p>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Explanation Generated
              </span>
            </div>

            <div className={`grid gap-5 ${imagePreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
              {imagePreview && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        <Leaf size={15} />
                      </span>
                      <span className="text-sm font-bold text-slate-800">
                        Original Leaf
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Input Image
                    </span>
                  </div>

                  <div className="flex min-h-64 items-center justify-center bg-slate-100 p-3 sm:min-h-80">
                    <img
                      src={imagePreview}
                      alt="Original uploaded plant leaf"
                      className="max-h-96 w-full rounded-xl object-contain"
                    />
                  </div>

                  <p className="border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
                    Original image provided to the prediction model.
                  </p>
                </div>
              )}

              {/* AI Heatmap */}
              <div className="overflow-hidden rounded-2xl border border-purple-200 bg-purple-50/40">
                <div className="flex items-center justify-between border-b border-purple-100 bg-white px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                      <Sparkles size={15} />
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      AI Attention Overlay
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
                    Integrated Gradients
                  </span>
                </div>

                <div className="group relative flex min-h-64 items-center justify-center bg-slate-100 p-3 sm:min-h-80">
                  <img
                    src={heatmapUrl}
                    alt="Integrated Gradients attention overlay showing image regions that influenced the AI prediction"
                    className="max-h-96 w-full rounded-xl object-contain"
                  />

                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-slate-950/0 transition-all duration-300 group-hover:bg-slate-950/30">
                    <button
                      type="button"
                      onClick={() => setIsHeatmapPreviewOpen(true)}
                      aria-label="Preview heatmap in full screen"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-purple-700 opacity-0 shadow-xl transition-all duration-300 hover:scale-105 group-hover:opacity-100 focus:opacity-100"
                    >
                      <Maximize2 size={18} />
                      Preview
                    </button>
                  </div>
                </div>

                <p className="border-t border-purple-100 bg-white px-4 py-3 text-xs text-slate-500">
                  Colored regions indicate the model's visual attribution.
                </p>
              </div>
            </div>

            {/* Understanding AI Attention */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                  <Activity size={19} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">
                    Understanding AI Attention
                  </h4>
                  <p className="text-xs text-slate-500">
                    How to interpret the visualization
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-red-50 p-4">
                  <div className="mb-2 h-2 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-red-600" />
                  <p className="text-sm font-bold text-slate-800">
                    Stronger Attention
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Brighter regions indicate stronger positive attribution in this visualization.
                  </p>
                </div>

                <div className="rounded-xl bg-orange-50 p-4">
                  <div className="mb-2 h-2 w-10 rounded-full bg-gradient-to-r from-orange-300 to-orange-500" />
                  <p className="text-sm font-bold text-slate-800">
                    Moderate Attention
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Intermediate colors represent comparatively moderate attribution values.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="mb-2 h-2 w-10 rounded-full bg-slate-300" />
                  <p className="text-sm font-bold text-slate-800">
                    Lower Attention
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Less highlighted regions have weaker displayed attribution.
                  </p>
                </div>
              </div>
            </div>

            {/* Explanation Details */}
            <div className="overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50 p-5 sm:p-6">
              <div className="flex items-center gap-2 font-extrabold text-purple-900">
                <Sparkles size={19} />
                Explanation Details
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-white bg-white/80 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Explanation Method
                  </p>
                  <p className="mt-2 break-words text-sm font-extrabold text-slate-900">
                    {explanation.method || 'Integrated Gradients'}
                  </p>
                </div>

                <div className="rounded-xl border border-white bg-white/80 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Integration Steps
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-purple-700">
                    {explanation.n_steps ?? '—'}
                  </p>
                </div>

                <div className="rounded-xl border border-white bg-white/80 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Image Width
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-slate-900">
                    {explanation.image_width ?? '—'} px
                  </p>
                </div>

                <div className="rounded-xl border border-white bg-white/80 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Image Height
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-slate-900">
                    {explanation.image_height ?? '—'} px
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-purple-100 bg-white/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                  Explained Prediction Class
                </p>
                <p className="mt-1 break-words text-sm font-extrabold text-slate-900">
                  {explanation.predicted_disease || prediction?.predicted_disease || 'Plant disease prediction'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-blue-600" />
              <p className="text-xs leading-6 text-blue-800">
                <strong>Research note:</strong> This visualization explains
                which image regions influenced the model's prediction.
                Highlighted regions are model attributions, not confirmed
                disease lesions or a medical-style segmentation mask. The
                explanation should be interpreted alongside the prediction
                and visible leaf symptoms.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Full Screen Heatmap Preview */}
      {isHeatmapPreviewOpen && heatmapUrl && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-md animate-in fade-in duration-200 sm:p-8"
          onClick={() => setIsHeatmapPreviewOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Full screen heatmap preview"
        >
          <button
            type="button"
            onClick={() => setIsHeatmapPreviewOpen(false)}
            aria-label="Close heatmap preview"
            className="absolute right-5 top-5 z-[102] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:rotate-90 hover:bg-white/20"
          >
            <X size={25} />
          </button>

          <div
            className="relative flex h-full w-full items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={heatmapUrl}
              alt="Full screen AI-generated plant disease attention heatmap"
              className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/60 px-5 py-2 text-center text-xs font-medium text-white backdrop-blur-md">
              Click outside the image or press ESC to close
            </div>
          </div>
        </div>
      )}

      {/* Footer actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          to="/dashboard/upload"
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 px-5 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
        >
          <ArrowLeft size={18} />
          Analyze Another Image
        </Link>
      </div>

    </div>
  )
}

export default Analysis
