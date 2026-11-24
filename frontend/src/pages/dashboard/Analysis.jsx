// // import { useEffect, useState } from 'react'
// // import { useLocation, Link } from 'react-router-dom'
// // import {
// //   BrainCircuit,
// //   Leaf,
// //   ScanSearch,
// //   Activity,
// //   Image as ImageIcon,
// //   Sparkles,
// //   AlertCircle,
// //   ArrowLeft,
// //   LoaderCircle,
// //   Info,
// //   ShieldCheck,
// //   Stethoscope,
// //   Bug,
// //   Lightbulb,
// //   CheckCircle2,
// //   HeartPulse,
// //   Maximize2,
// //   X,
// // } from 'lucide-react'
// // import api from '../../services/api'

// // const API_BASE = (
// //   import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
// // ).replace(/\/+$/, '')

// // function GuidanceCard({ title, description, items = [], icon: Icon, color }) {
// //   return (
// //     <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
// //       <div className="mb-5 flex items-center gap-3">
// //         <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
// //           <Icon size={23} />
// //         </div>

// //         <div>
// //           <h3 className="font-extrabold text-slate-900">{title}</h3>
// //           <p className="mt-1 text-xs text-slate-500">{description}</p>
// //         </div>
// //       </div>

// //       {items.length > 0 ? (
// //         <ul className="space-y-3">
// //           {items.map((item, index) => (
// //             <li
// //               key={`${index}-${typeof item === 'string' ? item : item.symptom}`}
// //               className="flex items-start gap-3 text-sm leading-6 text-slate-600"
// //             >
// //               <CheckCircle2 size={17} className="mt-1 shrink-0 text-emerald-600" />
// //               <span>{typeof item === 'string' ? item : item.description}</span>
// //             </li>
// //           ))}
// //         </ul>
// //       ) : (
// //         <p className="text-sm leading-6 text-slate-500">
// //           No additional information is available for this section.
// //         </p>
// //       )}
// //     </section>
// //   )
// // }

// // function Analysis() {
// //   const location = useLocation()

// //   const [prediction, setPrediction] = useState(
// //     location.state?.prediction || null
// //   )

// //   const [diseaseInformation, setDiseaseInformation] = useState(
// //     location.state?.diseaseInformation || null
// //   )

// //   const [file] = useState(location.state?.file || null)

// //   const [imagePreview] = useState(() =>
// //     file ? URL.createObjectURL(file) : ''
// //   )

// //   const [explanation, setExplanation] = useState(null)
// //   const [loadingExplanation, setLoadingExplanation] = useState(false)
// //   const [error, setError] = useState('')

// //   const [isHeatmapPreviewOpen, setIsHeatmapPreviewOpen] = useState(false)

// //   useEffect(() => {
// //     return () => {
// //       if (imagePreview) {
// //         URL.revokeObjectURL(imagePreview)
// //       }
// //     }
// //   }, [imagePreview])

// //   // Close preview with Escape and prevent background scrolling.
// //   useEffect(() => {
// //     if (!isHeatmapPreviewOpen) return

// //     const handleKeyDown = (event) => {
// //       if (event.key === 'Escape') {
// //         setIsHeatmapPreviewOpen(false)
// //       }
// //     }

// //     const previousOverflow = document.body.style.overflow
// //     document.body.style.overflow = 'hidden'

// //     window.addEventListener('keydown', handleKeyDown)

// //     return () => {
// //       document.body.style.overflow = previousOverflow
// //       window.removeEventListener('keydown', handleKeyDown)
// //     }
// //   }, [isHeatmapPreviewOpen])

// //   const generateExplanation = async () => {
// //     if (!file) {
// //       setError(
// //         'Original image is unavailable. Please upload the image again to generate an explanation.'
// //       )
// //       return
// //     }

// //     setLoadingExplanation(true)
// //     setError('')

// //     try {
// //       const formData = new FormData()
// //       formData.append('file', file)

// //       const response = await api.post(
// //         '/api/predictions/explain',
// //         formData
// //       )

// //       const result = response.data

// //       if (result.data) {
// //         setPrediction(result.data)
// //       }

// //       if (result.disease_information) {
// //         setDiseaseInformation(result.disease_information)
// //       }

// //       setExplanation(result.explanation)
// //     } catch (err) {
// //       setError(
// //         err.response?.data?.detail ||
// //         err.response?.data?.message ||
// //         'Unable to generate the explanation. Please try again.'
// //       )
// //     } finally {
// //       setLoadingExplanation(false)
// //     }
// //   }

// //   if (!prediction) {
// //     return (
// //       <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-emerald-100 bg-white p-8 text-center">
// //         <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
// //           <ScanSearch size={32} />
// //         </div>

// //         <h2 className="mt-5 text-xl font-black text-slate-900">
// //           No Analysis Available
// //         </h2>

// //         <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
// //           Upload a plant leaf image to view its disease prediction and AI analysis results.
// //         </p>

// //         <Link
// //           to="/dashboard/upload"
// //           className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
// //         >
// //           <ImageIcon size={18} />
// //           Upload Image
// //         </Link>
// //       </div>
// //     )
// //   }

// //   const topPredictions = prediction.top_predictions || []
// //   const confidence = Number(prediction.confidence) || 0
// //   const isDiseaseClass = diseaseInformation?.diagnosis_type === 'disease_class'

// //   const heatmapUrl = explanation?.heatmap_url
// //     ? `${API_BASE}/${explanation.heatmap_url.replace(/^\/+/, '')}`
// //     : ''

// //   return (
// //     <div className="space-y-8">

// //       {/* Page heading */}
// //       <section>
// //         <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
// //           AI Diagnosis
// //         </span>

// //         <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
// //           Plant Analysis Report
// //         </h2>

// //         <p className="mt-3 text-sm leading-7 text-slate-500">
// //           Explore the model prediction, detailed crop and disease information,
// //           management guidance and visual explanation.
// //         </p>
// //       </section>

// //       {/* Main prediction */}
// //       <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
// //         <div className="bg-gradient-to-r from-emerald-900 via-emerald-700 to-green-600 p-6 text-white sm:p-8">
// //           <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
// //             <div className="flex items-center gap-3">
// //               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
// //                 <Leaf size={27} />
// //               </div>

// //               <div>
// //                 <p className="text-sm font-medium text-emerald-100">
// //                   Predicted Class
// //                 </p>
// //                 <h3 className="mt-1 text-2xl font-black">
// //                   {prediction.predicted_disease}
// //                 </h3>
// //               </div>
// //             </div>

// //             <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur">
// //               <p className="text-xs font-semibold text-emerald-100">
// //                 Model Confidence
// //               </p>
// //               <p className="mt-1 text-3xl font-black">
// //                 {confidence.toFixed(2)}%
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="grid gap-4 p-6 sm:grid-cols-2">
// //           <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4">
// //             <BrainCircuit className="text-emerald-700" size={25} />
// //             <div>
// //               <p className="text-xs text-slate-500">AI Model</p>
// //               <p className="font-bold text-slate-800">
// //                 {prediction.model || 'Plant Disease Classification Model'}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4">
// //             <ShieldCheck className="text-blue-700" size={25} />
// //             <div>
// //               <p className="text-xs text-slate-500">Analysis Status</p>
// //               <p className="font-bold text-slate-800">
// //                 Prediction Completed
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Diagnosis information */}
// //       {diseaseInformation && (
// //         <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">

// //           {/* Diagnosis header */}
// //           <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-6 sm:p-8">
// //             <div className="flex items-center gap-3">
// //               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
// //                 <Stethoscope size={25} />
// //               </div>

// //               <div>
// //                 <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
// //                   Diagnosis Information
// //                 </p>
// //                 <h3 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
// //                   {diseaseInformation.disease_name || prediction.predicted_disease}
// //                 </h3>
// //               </div>
// //             </div>

// //             <div className="mt-5 flex flex-wrap gap-2">
// //               {diseaseInformation.crop && (
// //                 <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-800">
// //                   Crop: {diseaseInformation.crop}
// //                 </span>
// //               )}

// //               {diseaseInformation.category && (
// //                 <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-bold text-blue-800">
// //                   {diseaseInformation.category}
// //                 </span>
// //               )}
// //             </div>

// //             {diseaseInformation.overview && (
// //               <p className="mt-5 text-sm leading-7 text-slate-600">
// //                 {diseaseInformation.overview}
// //               </p>
// //             )}

// //             {/* Crop description */}
// //             {diseaseInformation.crop_description && (
// //               <div className="mt-4 rounded-2xl border border-emerald-100 bg-white p-5">
// //                 <h4 className="font-extrabold text-emerald-800">
// //                   About This Crop
// //                 </h4>
// //                 <p className="mt-2 text-sm leading-7 text-slate-600">
// //                   {diseaseInformation.crop_description}
// //                 </p>
// //               </div>
// //             )}

// //             {/* Detailed disease explanation */}
// //             {diseaseInformation.detailed_description && (
// //               <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
// //                 <h4 className="font-extrabold text-slate-900">
// //                   Detailed Disease Explanation
// //                 </h4>
// //                 <p className="mt-2 text-sm leading-7 text-slate-600">
// //                   {diseaseInformation.detailed_description}
// //                 </p>
// //               </div>
// //             )}
// //           </div>

// //           {/* Non-disease classification */}
// //           {!isDiseaseClass && (
// //             <div className="m-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:m-8">
// //               <Info size={22} className="mt-0.5 shrink-0 text-amber-700" />
// //               <div>
// //                 <h4 className="font-extrabold text-amber-900">
// //                   No specific disease identified
// //                 </h4>
// //                 <p className="mt-1 text-sm leading-6 text-amber-800">
// //                   The model predicted a general leaf category, not a specific
// //                   disease. This does not prove that the plant is healthy.
// //                   Inspect the plant for symptoms and seek expert confirmation
// //                   if you notice unusual changes.
// //                 </p>
// //               </div>
// //             </div>
// //           )}

// //           {/* Common symptoms */}
// //           {isDiseaseClass && diseaseInformation.symptoms?.length > 0 && (
// //             <div className="p-6 sm:p-8">
// //               <div className="mb-5 flex items-center gap-3">
// //                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
// //                   <Activity size={21} />
// //                 </div>
// //                 <div>
// //                   <h4 className="font-extrabold text-slate-900">
// //                     Common Symptoms
// //                   </h4>
// //                   <p className="text-xs text-slate-500">
// //                     Symptoms commonly associated with this disease
// //                   </p>
// //                 </div>
// //               </div>

// //               <ul className="grid gap-3 sm:grid-cols-2">
// //                 {diseaseInformation.symptoms.map((symptom, index) => (
// //                   <li
// //                     key={`${index}-${symptom}`}
// //                     className="flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-slate-700"
// //                   >
// //                     <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-xs font-black text-amber-800">
// //                       {index + 1}
// //                     </span>
// //                     {symptom}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           )}

// //           {/* Detailed symptom explanations */}
// //           {isDiseaseClass && diseaseInformation.symptom_details?.length > 0 && (
// //             <div className="border-t border-slate-100 p-6 sm:p-8">
// //               <h4 className="mb-5 font-extrabold text-slate-900">
// //                 Understanding the Symptoms
// //               </h4>

// //               <div className="grid gap-4 sm:grid-cols-2">
// //                 {diseaseInformation.symptom_details.map((item, index) => (
// //                   <div
// //                     key={`${index}-${item.symptom}`}
// //                     className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5"
// //                   >
// //                     <h5 className="font-bold text-slate-800">
// //                       {item.symptom}
// //                     </h5>
// //                     <p className="mt-2 text-sm leading-6 text-slate-600">
// //                       {item.description}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* Possible causes */}
// //           <div className="border-t border-slate-100 p-6 sm:p-8">
// //             <div className="flex items-center gap-3">
// //               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
// //                 <Bug size={21} />
// //               </div>
// //               <h4 className="font-extrabold text-slate-900">
// //                 Possible Causes
// //               </h4>
// //             </div>

// //             <p className="mt-4 rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
// //               {diseaseInformation.causes || 'Cause information is not available.'}
// //             </p>
// //           </div>

// //           {/* Disease spread and affected parts */}
// //           {isDiseaseClass && (
// //             <div className="grid gap-5 border-t border-slate-100 p-6 sm:grid-cols-2 sm:p-8">
// //               <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5">
// //                 <h4 className="font-extrabold text-slate-900">
// //                   How Disease Can Spread
// //                 </h4>
// //                 <p className="mt-3 text-sm leading-7 text-slate-600">
// //                   {diseaseInformation.spread_details ||
// //                     'Detailed spread information is not available.'}
// //                 </p>
// //               </div>

// //               <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
// //                 <h4 className="font-extrabold text-slate-900">
// //                   Affected Plant Parts
// //                 </h4>

// //                 {diseaseInformation.affected_parts?.length > 0 ? (
// //                   <ul className="mt-3 space-y-3">
// //                     {diseaseInformation.affected_parts.map((part, index) => (
// //                       <li
// //                         key={index}
// //                         className="text-sm leading-6 text-slate-600"
// //                       >
// //                         <span className="mr-2 text-emerald-600">●</span>
// //                         {part}
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 ) : (
// //                   <p className="mt-3 text-sm leading-6 text-slate-600">
// //                     Inspect the leaves, stems and other visible plant parts
// //                     for additional symptoms.
// //                   </p>
// //                 )}
// //               </div>
// //             </div>
// //           )}
// //         </section>
// //       )}

// //       {/* Treatment and prevention */}
// //       {diseaseInformation && (
// //         <section>
// //           <div className="mb-5">
// //             <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
// //               Plant Care Recommendations
// //             </span>
// //             <h3 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">
// //               Treatment & Prevention Guide
// //             </h3>
// //             <p className="mt-2 text-sm leading-6 text-slate-500">
// //               General management guidance associated with the predicted class.
// //             </p>
// //           </div>

// //           <div className="grid gap-5 lg:grid-cols-2">
// //             <GuidanceCard
// //               title="Treatment & Management"
// //               description="Suggested steps to manage the identified condition"
// //               items={
// //                 diseaseInformation.management_steps ||
// //                 diseaseInformation.treatment ||
// //                 []
// //               }
// //               icon={HeartPulse}
// //               color="bg-rose-100 text-rose-700"
// //             />

// //             <GuidanceCard
// //               title="Prevention"
// //               description="Practices that may help reduce disease risk"
// //               items={diseaseInformation.prevention || []}
// //               icon={ShieldCheck}
// //               color="bg-emerald-100 text-emerald-700"
// //             />
// //           </div>

// //           {/* Agricultural guidance */}
// //           <div className="mt-5 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5">
// //             <Lightbulb size={22} className="mt-0.5 shrink-0 text-blue-700" />
// //             <div>
// //               <h4 className="font-bold text-blue-900">
// //                 Agricultural Guidance
// //               </h4>
// //               <p className="mt-1 text-sm leading-6 text-blue-800">
// //                 These recommendations are general educational information,
// //                 not a confirmed diagnosis or a prescription. Confirm the
// //                 disease locally before applying pesticides, fungicides or
// //                 other chemical treatments. Always follow local agricultural
// //                 advice and product labels.
// //               </p>
// //             </div>
// //           </div>

// //           {/* Recovery monitoring and expert advice */}
// //           {isDiseaseClass && (
// //             <div className="mt-5 grid gap-5 lg:grid-cols-2">
// //               <GuidanceCard
// //                 title="Recovery Monitoring"
// //                 description="What to observe after applying management practices"
// //                 items={diseaseInformation.recovery_monitoring || []}
// //                 icon={Activity}
// //                 color="bg-blue-100 text-blue-700"
// //               />

// //               <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-7">
// //                 <div className="flex items-center gap-3">
// //                   <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
// //                     <Stethoscope size={23} />
// //                   </div>
// //                   <h3 className="font-extrabold text-slate-900">
// //                     When to Seek Expert Help
// //                   </h3>
// //                 </div>

// //                 <p className="mt-4 text-sm leading-7 text-slate-700">
// //                   {diseaseInformation.when_to_seek_help ||
// //                     'Consult a local agricultural expert if symptoms continue to spread or the plant shows significant damage.'}
// //                 </p>
// //               </section>
// //             </div>
// //           )}
// //         </section>
// //       )}

// //       {!diseaseInformation && (
// //         <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-800">
// //           Disease information was not included in this response. Please upload
// //           the image again after confirming the backend is updated.
// //         </div>
// //       )}

// //       {/* Top predictions */}
// //       <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
// //         <div className="mb-7 flex items-center gap-3">
// //           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
// //             <Activity size={24} />
// //           </div>

// //           <div>
// //             <h3 className="text-lg font-extrabold text-slate-900">
// //               Top Model Predictions
// //             </h3>
// //             <p className="text-sm text-slate-500">
// //               Confidence scores for the top predicted classes
// //             </p>
// //           </div>
// //         </div>

// //         <div className="space-y-6">
// //           {topPredictions.map((item, index) => (
// //             <div key={`${item.disease}-${index}`}>
// //               <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
// //                 <div className="flex items-center gap-2">
// //                   <span
// //                     className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black ${
// //                       index === 0
// //                         ? 'bg-emerald-600 text-white'
// //                         : 'bg-slate-100 text-slate-600'
// //                     }`}
// //                   >
// //                     {index + 1}
// //                   </span>

// //                   <span className="text-sm font-bold text-slate-800">
// //                     {item.disease}
// //                   </span>
// //                 </div>

// //                 <span className="text-sm font-extrabold text-emerald-700">
// //                   {Number(item.confidence).toFixed(2)}%
// //                 </span>
// //               </div>

// //               <div className="h-3 overflow-hidden rounded-full bg-slate-100">
// //                 <div
// //                   className={`h-full rounded-full transition-all duration-1000 ${
// //                     index === 0
// //                       ? 'bg-gradient-to-r from-emerald-500 to-green-400'
// //                       : 'bg-gradient-to-r from-slate-400 to-slate-300'
// //                   }`}
// //                   style={{
// //                     width: `${Math.min(100, Math.max(0, Number(item.confidence) || 0))}%`,
// //                   }}
// //                 />
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {topPredictions.length === 0 && (
// //           <p className="text-sm text-slate-500">
// //             No additional prediction scores are available.
// //           </p>
// //         )}

// //         <div className="mt-6 flex items-start gap-2 rounded-xl bg-amber-50 p-4 text-xs leading-6 text-amber-800">
// //           <Info size={18} className="mt-0.5 shrink-0" />
// //           Confidence is the model's estimated probability for a class. It is
// //           not a measure of guaranteed diagnostic accuracy.
// //         </div>

// //         {confidence < 60 && (
// //           <div className="mt-3 flex items-start gap-2 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm leading-6 text-orange-800">
// //             <AlertCircle size={19} className="mt-0.5 shrink-0" />
// //             This prediction has relatively low confidence. Do not rely on it
// //             alone to decide treatment. Consider taking another clear image
// //             and consulting an agricultural expert.
// //           </div>
// //         )}
// //       </section>

// //       {/* Explainable AI */}
// //       <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-8">
// //         <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-100/50 blur-3xl" />

// //         <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
// //           <div className="flex items-center gap-4">
// //             <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-200">
// //               <Sparkles size={27} />
// //             </div>

// //             <div>
// //               <div className="mb-1 flex flex-wrap items-center gap-2">
// //                 <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
// //                   Explainable AI Studio
// //                 </h3>
// //                 <span className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-700">
// //                   AI Insights
// //                 </span>
// //               </div>
// //               <p className="max-w-xl text-sm leading-6 text-slate-500">
// //                 Understand which visual regions influenced your plant disease prediction.
// //               </p>
// //             </div>
// //           </div>

// //           <button
// //             type="button"
// //             onClick={generateExplanation}
// //             disabled={loadingExplanation || !file}
// //             className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
// //           >
// //             {loadingExplanation ? (
// //               <LoaderCircle size={19} className="animate-spin" />
// //             ) : (
// //               <Sparkles size={19} />
// //             )}

// //             {loadingExplanation
// //               ? 'Generating AI Explanation...'
// //               : explanation
// //                 ? 'Regenerate Explanation'
// //                 : 'Generate AI Explanation'}
// //           </button>
// //         </div>

// //         {!file && !explanation && (
// //           <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
// //             <AlertCircle size={20} className="mt-0.5 shrink-0" />
// //             <p>
// //               The original uploaded image is unavailable. Please upload the image again to generate an AI explanation.
// //             </p>
// //           </div>
// //         )}

// //         {error && (
// //           <div
// //             role="alert"
// //             className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-600"
// //           >
// //             <AlertCircle size={20} className="mt-0.5 shrink-0" />
// //             <p>{error}</p>
// //           </div>
// //         )}

// //         {loadingExplanation && (
// //           <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-purple-100 bg-purple-50/50 px-5 py-10 text-center">
// //             <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-600">
// //               <LoaderCircle size={28} className="animate-spin" />
// //             </div>
// //             <p className="font-bold text-slate-800">
// //               Analyzing important image regions
// //             </p>
// //             <p className="mt-1 text-sm text-slate-500">
// //               Integrated Gradients is calculating the model's visual attributions.
// //             </p>
// //           </div>
// //         )}

// //         {explanation && heatmapUrl && (
// //           <div className="relative mt-8 space-y-6">
// //             <div className="flex flex-wrap items-center justify-between gap-3">
// //               <div>
// //                 <h4 className="text-base font-extrabold text-slate-900">
// //                   Visual Attention Comparison
// //                 </h4>
// //                 <p className="mt-1 text-xs leading-5 text-slate-500">
// //                   Compare the uploaded leaf with the AI-generated attention overlay.
// //                 </p>
// //               </div>

// //               <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
// //                 <span className="h-2 w-2 rounded-full bg-emerald-500" />
// //                 Explanation Generated
// //               </span>
// //             </div>

// //             <div className={`grid gap-5 ${imagePreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
// //               {imagePreview && (
// //                 <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
// //                   <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
// //                     <div className="flex items-center gap-2">
// //                       <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
// //                         <Leaf size={15} />
// //                       </span>
// //                       <span className="text-sm font-bold text-slate-800">
// //                         Original Leaf
// //                       </span>
// //                     </div>
// //                     <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
// //                       Input Image
// //                     </span>
// //                   </div>

// //                   <div className="flex min-h-64 items-center justify-center bg-slate-100 p-3 sm:min-h-80">
// //                     <img
// //                       src={imagePreview}
// //                       alt="Original uploaded plant leaf"
// //                       className="max-h-96 w-full rounded-xl object-contain"
// //                     />
// //                   </div>

// //                   <p className="border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
// //                     Original image provided to the prediction model.
// //                   </p>
// //                 </div>
// //               )}

// //               {/* AI Heatmap */}
// //               <div className="overflow-hidden rounded-2xl border border-purple-200 bg-purple-50/40">
// //                 <div className="flex items-center justify-between border-b border-purple-100 bg-white px-4 py-3">
// //                   <div className="flex items-center gap-2">
// //                     <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
// //                       <Sparkles size={15} />
// //                     </span>
// //                     <span className="text-sm font-bold text-slate-800">
// //                       AI Attention Overlay
// //                     </span>
// //                   </div>
// //                   <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
// //                     Integrated Gradients
// //                   </span>
// //                 </div>

// //                 <div className="group relative flex min-h-64 items-center justify-center bg-slate-100 p-3 sm:min-h-80">
// //                   <img
// //                     src={heatmapUrl}
// //                     alt="Integrated Gradients attention overlay showing image regions that influenced the AI prediction"
// //                     className="max-h-96 w-full rounded-xl object-contain"
// //                   />

// //                   <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-slate-950/0 transition-all duration-300 group-hover:bg-slate-950/30">
// //                     <button
// //                       type="button"
// //                       onClick={() => setIsHeatmapPreviewOpen(true)}
// //                       aria-label="Preview heatmap in full screen"
// //                       className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-purple-700 opacity-0 shadow-xl transition-all duration-300 hover:scale-105 group-hover:opacity-100 focus:opacity-100"
// //                     >
// //                       <Maximize2 size={18} />
// //                       Preview
// //                     </button>
// //                   </div>
// //                 </div>

// //                 <p className="border-t border-purple-100 bg-white px-4 py-3 text-xs text-slate-500">
// //                   Colored regions indicate the model's visual attribution.
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Understanding AI Attention */}
// //             <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
// //               <div className="flex items-center gap-2">
// //                 <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
// //                   <Activity size={19} />
// //                 </div>
// //                 <div>
// //                   <h4 className="font-extrabold text-slate-900">
// //                     Understanding AI Attention
// //                   </h4>
// //                   <p className="text-xs text-slate-500">
// //                     How to interpret the visualization
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="mt-5 grid gap-4 sm:grid-cols-3">
// //                 <div className="rounded-xl bg-red-50 p-4">
// //                   <div className="mb-2 h-2 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-red-600" />
// //                   <p className="text-sm font-bold text-slate-800">
// //                     Stronger Attention
// //                   </p>
// //                   <p className="mt-1 text-xs leading-5 text-slate-500">
// //                     Brighter regions indicate stronger positive attribution in this visualization.
// //                   </p>
// //                 </div>

// //                 <div className="rounded-xl bg-orange-50 p-4">
// //                   <div className="mb-2 h-2 w-10 rounded-full bg-gradient-to-r from-orange-300 to-orange-500" />
// //                   <p className="text-sm font-bold text-slate-800">
// //                     Moderate Attention
// //                   </p>
// //                   <p className="mt-1 text-xs leading-5 text-slate-500">
// //                     Intermediate colors represent comparatively moderate attribution values.
// //                   </p>
// //                 </div>

// //                 <div className="rounded-xl bg-slate-50 p-4">
// //                   <div className="mb-2 h-2 w-10 rounded-full bg-slate-300" />
// //                   <p className="text-sm font-bold text-slate-800">
// //                     Lower Attention
// //                   </p>
// //                   <p className="mt-1 text-xs leading-5 text-slate-500">
// //                     Less highlighted regions have weaker displayed attribution.
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Explanation Details */}
// //             <div className="overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50 p-5 sm:p-6">
// //               <div className="flex items-center gap-2 font-extrabold text-purple-900">
// //                 <Sparkles size={19} />
// //                 Explanation Details
// //               </div>

// //               <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
// //                 <div className="rounded-xl border border-white bg-white/80 p-4">
// //                   <p className="text-xs font-medium text-slate-500">
// //                     Explanation Method
// //                   </p>
// //                   <p className="mt-2 break-words text-sm font-extrabold text-slate-900">
// //                     {explanation.method || 'Integrated Gradients'}
// //                   </p>
// //                 </div>

// //                 <div className="rounded-xl border border-white bg-white/80 p-4">
// //                   <p className="text-xs font-medium text-slate-500">
// //                     Integration Steps
// //                   </p>
// //                   <p className="mt-2 text-xl font-extrabold text-purple-700">
// //                     {explanation.n_steps ?? '—'}
// //                   </p>
// //                 </div>

// //                 <div className="rounded-xl border border-white bg-white/80 p-4">
// //                   <p className="text-xs font-medium text-slate-500">
// //                     Image Width
// //                   </p>
// //                   <p className="mt-2 text-xl font-extrabold text-slate-900">
// //                     {explanation.image_width ?? '—'} px
// //                   </p>
// //                 </div>

// //                 <div className="rounded-xl border border-white bg-white/80 p-4">
// //                   <p className="text-xs font-medium text-slate-500">
// //                     Image Height
// //                   </p>
// //                   <p className="mt-2 text-xl font-extrabold text-slate-900">
// //                     {explanation.image_height ?? '—'} px
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="mt-4 rounded-xl border border-purple-100 bg-white/70 p-4">
// //                 <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
// //                   Explained Prediction Class
// //                 </p>
// //                 <p className="mt-1 break-words text-sm font-extrabold text-slate-900">
// //                   {explanation.predicted_disease || prediction?.predicted_disease || 'Plant disease prediction'}
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
// //               <AlertCircle size={18} className="mt-0.5 shrink-0 text-blue-600" />
// //               <p className="text-xs leading-6 text-blue-800">
// //                 <strong>Research note:</strong> This visualization explains
// //                 which image regions influenced the model's prediction.
// //                 Highlighted regions are model attributions, not confirmed
// //                 disease lesions or a medical-style segmentation mask. The
// //                 explanation should be interpreted alongside the prediction
// //                 and visible leaf symptoms.
// //               </p>
// //             </div>
// //           </div>
// //         )}
// //       </section>

// //       {/* Full Screen Heatmap Preview */}
// //       {isHeatmapPreviewOpen && heatmapUrl && (
// //         <div
// //           className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-md animate-in fade-in duration-200 sm:p-8"
// //           onClick={() => setIsHeatmapPreviewOpen(false)}
// //           role="dialog"
// //           aria-modal="true"
// //           aria-label="Full screen heatmap preview"
// //         >
// //           <button
// //             type="button"
// //             onClick={() => setIsHeatmapPreviewOpen(false)}
// //             aria-label="Close heatmap preview"
// //             className="absolute right-5 top-5 z-[102] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:rotate-90 hover:bg-white/20"
// //           >
// //             <X size={25} />
// //           </button>

// //           <div
// //             className="relative flex h-full w-full items-center justify-center"
// //             onClick={(event) => event.stopPropagation()}
// //           >
// //             <img
// //               src={heatmapUrl}
// //               alt="Full screen AI-generated plant disease attention heatmap"
// //               className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
// //             />

// //             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/60 px-5 py-2 text-center text-xs font-medium text-white backdrop-blur-md">
// //               Click outside the image or press ESC to close
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Footer actions */}
// //       <div className="flex flex-wrap gap-3">
// //         <Link
// //           to="/dashboard/upload"
// //           className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 px-5 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
// //         >
// //           <ArrowLeft size={18} />
// //           Analyze Another Image
// //         </Link>
// //       </div>

// //     </div>
// //   )
// // }

// // export default Analysis





// import { useCallback, useEffect, useRef, useState } from 'react'
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
//   Maximize2,
//   X,
//   CloudSun,
//   CloudRain,
//   MapPin,
//   RefreshCw,
//   Thermometer,
//   Droplets,
//   Wind,
//   Navigation,
// } from 'lucide-react'
// import api from '../../services/api'

// const API_BASE = (
//   import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
// ).replace(/\/+$/, '')

// const cardClass = 'rounded-2xl border border-emerald-100 bg-white shadow-sm'
// const sectionPadding = 'p-4 sm:p-5'
// const headingClass = 'text-base font-extrabold text-slate-900'
// const bodyClass = 'text-xs leading-5 text-slate-600'

// function SectionHeading({ icon: Icon, title, subtitle, color = 'bg-emerald-100 text-emerald-700' }) {
//   return (
//     <div className="mb-3 flex items-center gap-2.5">
//       <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}>
//         <Icon size={19} />
//       </div>
//       <div className="min-w-0">
//         <h3 className={headingClass}>{title}</h3>
//         {subtitle && <p className="text-[11px] text-slate-500">{subtitle}</p>}
//       </div>
//     </div>
//   )
// }

// function GuidanceCard({ title, description, items = [], icon: Icon, color }) {
//   return (
//     <section className={`${cardClass} ${sectionPadding}`}>
//       <div className="mb-3 flex items-center gap-2.5">
//         <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
//           <Icon size={19} />
//         </div>
//         <div>
//           <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
//           <p className="text-[11px] text-slate-500">{description}</p>
//         </div>
//       </div>

//       {items.length > 0 ? (
//         <ul className="space-y-2">
//           {items.map((item, index) => (
//             <li
//               key={`${index}-${typeof item === 'string' ? item : item.symptom}`}
//               className="flex items-start gap-2 text-xs leading-5 text-slate-600"
//             >
//               <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600" />
//               <span>{typeof item === 'string' ? item : item.description}</span>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-xs text-slate-500">No additional information is available.</p>
//       )}
//     </section>
//   )
// }

// function getLocationError(error) {
//   if (error.code === 1) {
//     return 'Location permission was denied. Allow location access in your browser settings to view local weather.'
//   }
//   if (error.code === 2) {
//     return 'Your location could not be detected. Check your device location settings and try again.'
//   }
//   if (error.code === 3) return 'The location request timed out. Please try again.'
//   return 'Unable to access your location. Please try again.'
// }

// function WeatherMetric({ icon: Icon, label, value, unit }) {
//   return (
//     <div className="rounded-xl border border-emerald-100 bg-white p-3">
//       <div className="mb-2 flex items-center gap-2">
//         <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
//           <Icon size={16} />
//         </div>
//         <p className="text-[11px] font-semibold text-slate-500">{label}</p>
//       </div>
//       <p className="text-xl font-black text-slate-900">
//         {value ?? '--'}
//         <span className="ml-1 text-xs font-semibold text-slate-500">{unit}</span>
//       </p>
//     </div>
//   )
// }

// function getRecommendedActions(disease, current, advisory) {
//   const actions = []
//   const diseaseName = String(disease || '').toLowerCase()
//   const humidity = Number(current.humidity) || 0
//   const rainProbability = Number(
//     advisory.irrigation_guidance?.upcoming_rain_probability ??
//     advisory.irrigation_guidance?.rain_probability
//   ) || 0
//   const temperature = Number(current.temperature) || 0

//   if (humidity >= 75) {
//     actions.push('Avoid unnecessary overhead watering because wet leaves can increase fungal disease pressure.')
//     actions.push('Maintain adequate spacing between plants to improve airflow.')
//   } else if (humidity <= 35) {
//     actions.push('Check soil moisture regularly and water according to the crop’s needs.')
//   } else {
//     actions.push('Monitor soil moisture and water according to actual plant requirements.')
//   }

//   if (rainProbability >= 60) {
//     actions.push('Rain is likely. Avoid unnecessary irrigation and ensure proper drainage.')
//   } else {
//     actions.push('Check the soil before watering instead of following a fixed schedule.')
//   }

//   if (temperature >= 35) {
//     actions.push('Protect plants from excessive afternoon heat and monitor for wilting.')
//   } else if (temperature <= 10) {
//     actions.push('Monitor for cold stress and protect sensitive crops from low temperatures.')
//   }

//   if (
//     diseaseName.includes('early blight') ||
//     diseaseName.includes('late blight') ||
//     diseaseName.includes('leaf spot') ||
//     diseaseName.includes('mildew') ||
//     diseaseName.includes('rust')
//   ) {
//     actions.push('Inspect older and lower leaves for spots, yellowing or spreading lesions.')
//   } else if (diseaseName.includes('healthy')) {
//     actions.push('Continue regular leaf inspections and maintain good crop hygiene.')
//   } else {
//     actions.push('Inspect affected leaves regularly and compare new symptoms with the AI prediction.')
//   }

//   const backendTips = (advisory.prevention_tips || []).filter(
//     (tip) => typeof tip === 'string' && tip.trim()
//   )

//   if (backendTips.length) actions.push(backendTips[0])

//   return [...new Set(actions)].slice(0, 3)
// }

// function getWeatherAdvisory(current, advisory) {
//   const humidity = Number(current.humidity) || 0
//   const rainProbability = Number(
//     advisory.irrigation_guidance?.upcoming_rain_probability ??
//     advisory.irrigation_guidance?.rain_probability
//   ) || 0
//   const temperature = Number(current.temperature) || 0
//   const alerts = advisory.disease_alerts || []

//   if (alerts.length) {
//     return alerts.slice(0, 1).map((alert) => alert.message).join(' ')
//   }

//   if (humidity >= 80 && rainProbability >= 60) {
//     return 'High humidity and expected rainfall may favor fungal disease development. Monitor leaves closely and maintain good airflow.'
//   }
//   if (humidity >= 80) {
//     return 'High humidity may increase fungal disease pressure. Monitor leaves and maintain good airflow.'
//   }
//   if (rainProbability >= 60) {
//     return 'Rain is expected. Monitor prolonged leaf wetness and ensure excess water drains properly.'
//   }
//   if (temperature >= 35) {
//     return 'High temperatures may cause heat stress. Monitor for wilting and protect plants from excessive afternoon heat.'
//   }
//   if (humidity <= 35) {
//     return 'Low humidity may increase moisture stress. Check soil moisture and water according to crop requirements.'
//   }

//   return 'No strong general weather warning is currently indicated. Continue monitoring the plant and maintain good crop care.'
// }

// function AnalysisWeatherSection({
//   weather,
//   loading,
//   error,
//   coordinates,
//   onRetry,
//   predictedDisease,
// }) {
//   if (loading) {
//     return (
//       <section className={`${cardClass} ${sectionPadding}`}>
//         <div className="flex items-center gap-3">
//           <LoaderCircle size={20} className="animate-spin text-emerald-600" />
//           <div>
//             <h3 className={headingClass}>Loading Local Weather</h3>
//             <p className="text-xs text-slate-500">Detecting your location and retrieving weather conditions.</p>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   if (error || !weather?.current) {
//     return (
//       <section className={`${cardClass} ${sectionPadding}`}>
//         <div className="flex items-start gap-3">
//           <CloudSun size={22} className="shrink-0 text-amber-600" />
//           <div className="min-w-0 flex-1">
//             <h3 className={headingClass}>Local Weather Unavailable</h3>
//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               {error || 'Weather information could not be loaded.'}
//             </p>
//             <button
//               type="button"
//               onClick={onRetry}
//               className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-700"
//             >
//               <RefreshCw size={14} />
//               Try Again
//             </button>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   const current = weather.current
//   const advisory = weather.advisory || {}
//   const actions = getRecommendedActions(predictedDisease, current, advisory)
//   const weatherMessage = getWeatherAdvisory(current, advisory)
//   const rainProbability = weather.hourly?.[0]?.rain_probability ??
//     advisory.irrigation_guidance?.upcoming_rain_probability

//   return (
//     <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
//       <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-white px-4 py-3 sm:px-5">
//         <div>
//           <div className="flex items-center gap-2">
//             <BrainCircuit size={18} className="text-emerald-700" />
//             <h3 className="text-base font-black text-slate-900">Plant Disease Analysis</h3>
//           </div>
//           <p className="mt-0.5 text-[11px] text-slate-500">AI prediction combined with local weather</p>
//         </div>
//         <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-800">
//           AI + Live Weather
//         </span>
//       </div>

//       <div className="space-y-4 p-4 sm:p-5">
//         <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-emerald-50 p-3">
//           <div className="min-w-0">
//             <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">AI Result</p>
//             <h4 className="mt-1 break-words text-lg font-black text-slate-900">
//               {predictedDisease || 'Plant Disease Prediction'}
//             </h4>
//             <p className="mt-1 text-[10px] text-slate-500">
//               Model prediction, not a confirmed diagnosis.
//             </p>
//           </div>
//           <Leaf size={27} className="shrink-0 text-emerald-600" />
//         </div>

//         <div>
//           <div className="mb-2 flex items-center justify-between gap-2">
//             <h4 className="text-sm font-extrabold text-slate-900">Local Weather Conditions</h4>
//             <span className="text-[10px] text-slate-500">{current.condition || 'Current conditions'}</span>
//           </div>

//           <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
//             <WeatherMetric icon={Thermometer} label="Temperature" value={current.temperature} unit="°C" />
//             <WeatherMetric icon={Droplets} label="Humidity" value={current.humidity} unit="%" />
//             <WeatherMetric icon={CloudRain} label="Rain Probability" value={rainProbability} unit="%" />
//             <WeatherMetric icon={Wind} label="Wind Speed" value={current.wind_speed} unit="km/h" />
//           </div>
//         </div>

//         <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
//           <div className="mb-1.5 flex items-center gap-2">
//             <CloudSun size={17} className="text-amber-700" />
//             <h4 className="text-xs font-extrabold text-amber-900">Weather Advisory</h4>
//           </div>
//           <p className="text-xs leading-5 text-slate-700">{weatherMessage}</p>
//         </div>

//         <div>
//           <div className="mb-2 flex items-center gap-2">
//             <Leaf size={17} className="text-emerald-700" />
//             <h4 className="text-xs font-extrabold text-slate-900">Recommended Actions</h4>
//           </div>
//           <div className="grid gap-2 sm:grid-cols-2">
//             {actions.map((action, index) => (
//               <div key={`${index}-${action}`} className="flex items-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50/50 p-2.5">
//                 <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600" />
//                 <p className="text-[11px] leading-5 text-slate-700">{action}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
//           <p className="flex items-center gap-1.5 text-[10px] text-slate-500">
//             <Navigation size={12} className="text-emerald-600" />
//             {coordinates
//               ? `${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}`
//               : 'Detected device location'}
//           </p>
//           <p className="text-[10px] text-slate-400">Live data: Open-Meteo</p>
//         </div>

//         <p className="flex items-start gap-2 rounded-lg bg-blue-50 p-2.5 text-[10px] leading-4 text-blue-800">
//           <Info size={14} className="mt-0.5 shrink-0" />
//           Weather is general environmental guidance, not a validated disease-risk prediction. Check actual plant symptoms before taking action.
//         </p>
//       </div>
//     </section>
//   )
// }

// function Analysis() {
//   const location = useLocation()

//   const [prediction, setPrediction] = useState(location.state?.prediction || null)
//   const [diseaseInformation, setDiseaseInformation] = useState(
//     location.state?.diseaseInformation || null
//   )
//   const [file] = useState(location.state?.file || null)
//   const [imagePreview] = useState(() => file ? URL.createObjectURL(file) : '')

//   const [explanation, setExplanation] = useState(null)
//   const [loadingExplanation, setLoadingExplanation] = useState(false)
//   const [error, setError] = useState('')
//   const [isHeatmapPreviewOpen, setIsHeatmapPreviewOpen] = useState(false)

//   const [weather, setWeather] = useState(null)
//   const [weatherLoading, setWeatherLoading] = useState(true)
//   const [weatherError, setWeatherError] = useState('')
//   const [weatherCoordinates, setWeatherCoordinates] = useState(null)

//   const weatherRequestStarted = useRef(false)

//   const requestLocalWeather = useCallback(() => {
//     if (!navigator.geolocation) {
//       setWeatherLoading(false)
//       setWeatherError('Your browser does not support location access.')
//       return
//     }

//     setWeatherLoading(true)
//     setWeatherError('')
//     setWeather(null)

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const latitude = position.coords.latitude
//         const longitude = position.coords.longitude

//         setWeatherCoordinates({ latitude, longitude })

//         try {
//           const response = await api.get('/api/weather', {
//             params: { latitude, longitude },
//           })

//           if (!response.data?.current) {
//             throw new Error('The weather service returned an unexpected response.')
//           }

//           setWeather(response.data)
//         } catch (requestError) {
//           console.error('Analysis weather API error:', requestError)
//           setWeatherError(
//             requestError.response?.data?.detail ||
//             requestError.message ||
//             'Unable to load local weather information.'
//           )
//         } finally {
//           setWeatherLoading(false)
//         }
//       },
//       (locationError) => {
//         setWeatherLoading(false)
//         setWeatherError(getLocationError(locationError))
//       },
//       {
//         enableHighAccuracy: false,
//         timeout: 15000,
//         maximumAge: 300000,
//       }
//     )
//   }, [])

//   useEffect(() => {
//     if (!prediction || weatherRequestStarted.current) return
//     weatherRequestStarted.current = true
//     requestLocalWeather()
//   }, [prediction, requestLocalWeather])

//   useEffect(() => {
//     return () => {
//       if (imagePreview) URL.revokeObjectURL(imagePreview)
//     }
//   }, [imagePreview])

//   useEffect(() => {
//     if (!isHeatmapPreviewOpen) return

//     const handleKeyDown = (event) => {
//       if (event.key === 'Escape') setIsHeatmapPreviewOpen(false)
//     }

//     const previousOverflow = document.body.style.overflow
//     document.body.style.overflow = 'hidden'
//     window.addEventListener('keydown', handleKeyDown)

//     return () => {
//       document.body.style.overflow = previousOverflow
//       window.removeEventListener('keydown', handleKeyDown)
//     }
//   }, [isHeatmapPreviewOpen])

//   const generateExplanation = async () => {
//     if (!file) {
//       setError('Original image is unavailable. Please upload the image again.')
//       return
//     }

//     setLoadingExplanation(true)
//     setError('')

//     try {
//       const formData = new FormData()
//       formData.append('file', file)

//       const response = await api.post('/api/predictions/explain', formData)
//       const result = response.data

//       if (result.data) setPrediction(result.data)
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
//       <div className={`${cardClass} flex min-h-[45vh] flex-col items-center justify-center p-6 text-center`}>
//         <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
//           <ScanSearch size={28} />
//         </div>
//         <h2 className="mt-3 text-lg font-black text-slate-900">No Analysis Available</h2>
//         <p className="mt-1 max-w-md text-xs leading-5 text-slate-500">
//           Upload a plant leaf image to view its disease prediction and AI analysis results.
//         </p>
//         <Link to="/dashboard/upload" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700">
//           <ImageIcon size={16} />
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
//     <div className="space-y-5">
//       {/* Page heading */}
//       <section className="space-y-1">
//         <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">
//           AI Diagnosis
//         </span>
//         <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
//           Plant Analysis Report
//         </h2>
//         <p className="text-xs leading-5 text-slate-500">
//           AI prediction, disease information, plant-care recommendations, local weather and visual explanation.
//         </p>
//       </section>

//       {/* Main prediction */}
//       <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
//         <div className="bg-gradient-to-r from-emerald-900 via-emerald-700 to-green-600 p-4 text-white sm:p-5">
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <div className="flex min-w-0 items-center gap-3">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
//                 <Leaf size={22} />
//               </div>
//               <div className="min-w-0">
//                 <p className="text-[11px] text-emerald-100">Predicted Class</p>
//                 <h3 className="break-words text-lg font-black">{prediction.predicted_disease}</h3>
//               </div>
//             </div>
//             <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-2">
//               <p className="text-[10px] font-semibold text-emerald-100">Model Confidence</p>
//               <p className="text-2xl font-black">{confidence.toFixed(2)}%</p>
//             </div>
//           </div>
//         </div>

//         <div className="grid gap-2 p-3 sm:grid-cols-2">
//           <div className="flex items-center gap-2.5 rounded-lg bg-emerald-50 p-3">
//             <BrainCircuit size={20} className="shrink-0 text-emerald-700" />
//             <div>
//               <p className="text-[10px] text-slate-500">AI Model</p>
//               <p className="text-xs font-bold text-slate-800">
//                 {prediction.model || 'Plant Disease Classification Model'}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2.5 rounded-lg bg-blue-50 p-3">
//             <ShieldCheck size={20} className="shrink-0 text-blue-700" />
//             <div>
//               <p className="text-[10px] text-slate-500">Analysis Status</p>
//               <p className="text-xs font-bold text-slate-800">Prediction Completed</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Diagnosis information */}
//       {diseaseInformation && (
//         <section className={`${cardClass} overflow-hidden`}>
//           <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-4 sm:p-5">
//             <SectionHeading
//               icon={Stethoscope}
//               title="Diagnosis Information"
//               subtitle={diseaseInformation.disease_name || prediction.predicted_disease}
//             />

//             <div className="mb-3 flex flex-wrap gap-1.5">
//               {diseaseInformation.crop && (
//                 <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-800">
//                   Crop: {diseaseInformation.crop}
//                 </span>
//               )}
//               {diseaseInformation.category && (
//                 <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold text-blue-800">
//                   {diseaseInformation.category}
//                 </span>
//               )}
//             </div>

//             {diseaseInformation.overview && (
//               <p className={bodyClass}>{diseaseInformation.overview}</p>
//             )}

//             {diseaseInformation.crop_description && (
//               <div className="mt-3 rounded-xl border border-emerald-100 bg-white p-3">
//                 <h4 className="text-xs font-extrabold text-emerald-800">About This Crop</h4>
//                 <p className={`mt-1 ${bodyClass}`}>{diseaseInformation.crop_description}</p>
//               </div>
//             )}

//             {diseaseInformation.detailed_description && (
//               <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50/60 p-3">
//                 <h4 className="text-xs font-extrabold text-slate-900">Detailed Disease Explanation</h4>
//                 <p className={`mt-1 ${bodyClass}`}>{diseaseInformation.detailed_description}</p>
//               </div>
//             )}
//           </div>

//           {!isDiseaseClass && (
//             <div className="m-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
//               <Info size={17} className="mt-0.5 shrink-0 text-amber-700" />
//               <div>
//                 <h4 className="text-xs font-extrabold text-amber-900">No specific disease identified</h4>
//                 <p className="mt-1 text-xs leading-5 text-amber-800">
//                   The model predicted a general leaf category, not a specific disease. This does not prove that the plant is healthy. Inspect the plant and seek expert confirmation if you notice unusual changes.
//                 </p>
//               </div>
//             </div>
//           )}

//           {isDiseaseClass && diseaseInformation.symptoms?.length > 0 && (
//             <div className="border-b border-slate-100 p-4">
//               <SectionHeading icon={Activity} title="Common Symptoms" subtitle="Symptoms commonly associated with this disease" color="bg-amber-100 text-amber-700" />
//               <ul className="grid gap-2 sm:grid-cols-2">
//                 {diseaseInformation.symptoms.map((symptom, index) => (
//                   <li key={`${index}-${symptom}`} className="flex items-start gap-2 rounded-lg bg-amber-50 p-2.5 text-xs leading-5 text-slate-700">
//                     <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-100 text-[10px] font-black text-amber-800">{index + 1}</span>
//                     {symptom}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {isDiseaseClass && diseaseInformation.symptom_details?.length > 0 && (
//             <div className="border-b border-slate-100 p-4">
//               <h4 className="mb-2 text-xs font-extrabold text-slate-900">Understanding the Symptoms</h4>
//               <div className="grid gap-2 sm:grid-cols-2">
//                 {diseaseInformation.symptom_details.map((item, index) => (
//                   <div key={`${index}-${item.symptom}`} className="rounded-xl border border-amber-100 bg-amber-50/50 p-3">
//                     <h5 className="text-xs font-bold text-slate-800">{item.symptom}</h5>
//                     <p className={`mt-1 ${bodyClass}`}>{item.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="border-b border-slate-100 p-4">
//             <SectionHeading icon={Bug} title="Possible Causes" color="bg-orange-100 text-orange-700" />
//             <p className="rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600">
//               {diseaseInformation.causes || 'Cause information is not available.'}
//             </p>
//           </div>

//           {isDiseaseClass && (
//             <div className="grid gap-3 p-4 sm:grid-cols-2">
//               <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-3">
//                 <h4 className="text-xs font-extrabold text-slate-900">How Disease Can Spread</h4>
//                 <p className={`mt-2 ${bodyClass}`}>
//                   {diseaseInformation.spread_details || 'Detailed spread information is not available.'}
//                 </p>
//               </div>
//               <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
//                 <h4 className="text-xs font-extrabold text-slate-900">Affected Plant Parts</h4>
//                 {diseaseInformation.affected_parts?.length > 0 ? (
//                   <ul className="mt-2 space-y-1.5">
//                     {diseaseInformation.affected_parts.map((part, index) => (
//                       <li key={index} className="text-xs leading-5 text-slate-600">
//                         <span className="mr-1.5 text-emerald-600">●</span>{part}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className={`mt-2 ${bodyClass}`}>Inspect leaves, stems and other visible plant parts for additional symptoms.</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </section>
//       )}

//       {/* Treatment and prevention */}
//       {diseaseInformation && (
//         <section>
//           <div className="mb-3">
//             <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Plant Care Recommendations</span>
//             <h3 className="mt-1 text-lg font-black text-slate-900">Treatment & Prevention Guide</h3>
//             <p className="text-xs text-slate-500">General management guidance associated with the predicted class.</p>
//           </div>

//           <div className="grid gap-3 lg:grid-cols-2">
//             <GuidanceCard
//               title="Treatment & Management"
//               description="Suggested management steps"
//               items={diseaseInformation.management_steps || diseaseInformation.treatment || []}
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

//           <div className="mt-3 flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3">
//             <Lightbulb size={17} className="mt-0.5 shrink-0 text-blue-700" />
//             <div>
//               <h4 className="text-xs font-bold text-blue-900">Agricultural Guidance</h4>
//               <p className="mt-1 text-xs leading-5 text-blue-800">
//                 These are general educational recommendations, not a confirmed diagnosis or prescription. Confirm the disease locally before applying pesticides or fungicides. Follow local agricultural advice and product labels.
//               </p>
//             </div>
//           </div>

//           {isDiseaseClass && (
//             <div className="mt-3 grid gap-3 lg:grid-cols-2">
//               <GuidanceCard
//                 title="Recovery Monitoring"
//                 description="What to observe after management"
//                 items={diseaseInformation.recovery_monitoring || []}
//                 icon={Activity}
//                 color="bg-blue-100 text-blue-700"
//               />
//               <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
//                 <SectionHeading icon={Stethoscope} title="When to Seek Expert Help" color="bg-amber-100 text-amber-700" />
//                 <p className={bodyClass}>
//                   {diseaseInformation.when_to_seek_help ||
//                     'Consult a local agricultural expert if symptoms continue to spread or the plant shows significant damage.'}
//                 </p>
//               </section>
//             </div>
//           )}
//         </section>
//       )}

//       {!diseaseInformation && (
//         <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800">
//           Disease information was not included in this response. Please upload the image again after confirming the backend is updated.
//         </div>
//       )}

//       {/* Combined weather report */}
//       <AnalysisWeatherSection
//         weather={weather}
//         loading={weatherLoading}
//         error={weatherError}
//         coordinates={weatherCoordinates}
//         onRetry={requestLocalWeather}
//         predictedDisease={prediction.predicted_disease}
//       />

//       {/* Top predictions */}
//       <section className={`${cardClass} ${sectionPadding}`}>
//         <SectionHeading
//           icon={Activity}
//           title="Top Model Predictions"
//           subtitle="Confidence scores for the top predicted classes"
//         />

//         <div className="space-y-3">
//           {topPredictions.map((item, index) => (
//             <div key={`${item.disease}-${index}`}>
//               <div className="mb-1 flex items-center justify-between gap-2">
//                 <div className="flex min-w-0 items-center gap-2">
//                   <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-black ${index === 0 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
//                     {index + 1}
//                   </span>
//                   <span className="truncate text-xs font-bold text-slate-800">{item.disease}</span>
//                 </div>
//                 <span className="text-xs font-extrabold text-emerald-700">
//                   {Number(item.confidence).toFixed(2)}%
//                 </span>
//               </div>
//               <div className="h-2 overflow-hidden rounded-full bg-slate-100">
//                 <div
//                   className={`h-full rounded-full transition-all duration-1000 ${index === 0 ? 'bg-gradient-to-r from-emerald-500 to-green-400' : 'bg-gradient-to-r from-slate-400 to-slate-300'}`}
//                   style={{ width: `${Math.min(100, Math.max(0, Number(item.confidence) || 0))}%` }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {topPredictions.length === 0 && (
//           <p className="text-xs text-slate-500">No additional prediction scores are available.</p>
//         )}

//         <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 p-2.5 text-[10px] leading-4 text-amber-800">
//           <Info size={14} className="mt-0.5 shrink-0" />
//           Confidence is the model's estimated probability for a class, not guaranteed diagnostic accuracy.
//         </div>

//         {confidence < 60 && (
//           <div className="mt-2 flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 p-2.5 text-xs leading-5 text-orange-800">
//             <AlertCircle size={15} className="mt-0.5 shrink-0" />
//             This prediction has relatively low confidence. Do not rely on it alone to decide treatment. Consider another clear image and expert advice.
//           </div>
//         )}
//       </section>

//       {/* Explainable AI */}
//       <section className={`${cardClass} relative overflow-hidden ${sectionPadding}`}>
//         <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-100/50 blur-3xl" />

//         <div className="relative flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
//           <div className="flex min-w-0 items-center gap-3">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
//               <Sparkles size={22} />
//             </div>
//             <div className="min-w-0">
//               <div className="flex flex-wrap items-center gap-2">
//                 <h3 className="text-base font-extrabold text-slate-900">Explainable AI Studio</h3>
//                 <span className="rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-[9px] font-bold uppercase text-purple-700">AI Insights</span>
//               </div>
//               <p className="text-[11px] leading-5 text-slate-500">
//                 Understand which image regions influenced the prediction.
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={generateExplanation}
//             disabled={loadingExplanation || !file}
//             className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {loadingExplanation ? <LoaderCircle size={16} className="animate-spin" /> : <Sparkles size={16} />}
//             {loadingExplanation ? 'Generating...' : explanation ? 'Regenerate Explanation' : 'Generate AI Explanation'}
//           </button>
//         </div>

//         {!file && !explanation && (
//           <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800">
//             <AlertCircle size={16} className="mt-0.5 shrink-0" />
//             <p>The original uploaded image is unavailable. Please upload the image again to generate an AI explanation.</p>
//           </div>
//         )}

//         {error && (
//           <div role="alert" className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-600">
//             <AlertCircle size={16} className="mt-0.5 shrink-0" />
//             <p>{error}</p>
//           </div>
//         )}

//         {loadingExplanation && (
//           <div className="mt-4 flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50/50 p-4">
//             <LoaderCircle size={22} className="animate-spin text-purple-600" />
//             <div>
//               <p className="text-xs font-bold text-slate-800">Analyzing important image regions</p>
//               <p className="text-[11px] text-slate-500">Integrated Gradients is calculating visual attributions.</p>
//             </div>
//           </div>
//         )}

//         {explanation && heatmapUrl && (
//           <div className="relative mt-4 space-y-4">
//             <div className="flex flex-wrap items-center justify-between gap-2">
//               <div>
//                 <h4 className="text-sm font-extrabold text-slate-900">Visual Attention Comparison</h4>
//                 <p className="text-[11px] text-slate-500">Original leaf and AI attention overlay</p>
//               </div>
//               <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
//                 Explanation Generated
//               </span>
//             </div>

//             <div className={`grid gap-3 ${imagePreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
//               {imagePreview && (
//                 <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
//                   <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2">
//                     <span className="flex items-center gap-2 text-xs font-bold text-slate-800">
//                       <Leaf size={14} /> Original Leaf
//                     </span>
//                     <span className="text-[9px] font-bold uppercase text-slate-400">Input Image</span>
//                   </div>
//                   <div className="flex min-h-48 items-center justify-center bg-slate-100 p-2 sm:min-h-56">
//                     <img src={imagePreview} alt="Original uploaded plant leaf" className="max-h-64 w-full rounded-lg object-contain" />
//                   </div>
//                   <p className="border-t border-slate-200 bg-white px-3 py-2 text-[10px] text-slate-500">
//                     Original image provided to the prediction model.
//                   </p>
//                 </div>
//               )}

//               <div className="overflow-hidden rounded-xl border border-purple-200 bg-purple-50/40">
//                 <div className="flex items-center justify-between border-b border-purple-100 bg-white px-3 py-2">
//                   <span className="flex items-center gap-2 text-xs font-bold text-slate-800">
//                     <Sparkles size={14} className="text-purple-700" /> AI Attention Overlay
//                   </span>
//                   <span className="text-[9px] font-bold uppercase text-purple-600">Integrated Gradients</span>
//                 </div>
//                 <div className="group relative flex min-h-48 items-center justify-center bg-slate-100 p-2 sm:min-h-56">
//                   <img src={heatmapUrl} alt="Integrated Gradients attention overlay showing image regions that influenced the AI prediction" className="max-h-64 w-full rounded-lg object-contain" />
//                   <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition group-hover:bg-slate-950/30">
//                     <button
//                       type="button"
//                       onClick={() => setIsHeatmapPreviewOpen(true)}
//                       aria-label="Preview heatmap in full screen"
//                       className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-purple-700 opacity-0 shadow-lg transition hover:scale-105 group-hover:opacity-100 focus:opacity-100"
//                     >
//                       <Maximize2 size={15} /> Preview
//                     </button>
//                   </div>
//                 </div>
//                 <p className="border-t border-purple-100 bg-white px-3 py-2 text-[10px] text-slate-500">
//                   Colored regions indicate the model's visual attribution.
//                 </p>
//               </div>
//             </div>

//             <div className="rounded-xl border border-slate-200 bg-white p-3">
//               <SectionHeading icon={Activity} title="Understanding AI Attention" subtitle="How to interpret the visualization" color="bg-purple-100 text-purple-700" />
//               <div className="grid gap-2 sm:grid-cols-3">
//                 <div className="rounded-lg bg-red-50 p-3">
//                   <div className="mb-1.5 h-1.5 w-8 rounded-full bg-gradient-to-r from-yellow-400 to-red-600" />
//                   <p className="text-xs font-bold text-slate-800">Stronger Attention</p>
//                   <p className="mt-1 text-[10px] leading-4 text-slate-500">Brighter regions indicate stronger positive attribution.</p>
//                 </div>
//                 <div className="rounded-lg bg-orange-50 p-3">
//                   <div className="mb-1.5 h-1.5 w-8 rounded-full bg-gradient-to-r from-orange-300 to-orange-500" />
//                   <p className="text-xs font-bold text-slate-800">Moderate Attention</p>
//                   <p className="mt-1 text-[10px] leading-4 text-slate-500">Intermediate colors represent moderate attribution.</p>
//                 </div>
//                 <div className="rounded-lg bg-slate-50 p-3">
//                   <div className="mb-1.5 h-1.5 w-8 rounded-full bg-slate-300" />
//                   <p className="text-xs font-bold text-slate-800">Lower Attention</p>
//                   <p className="mt-1 text-[10px] leading-4 text-slate-500">Less highlighted regions have weaker displayed attribution.</p>
//                 </div>
//               </div>
//             </div>

//             <div className="overflow-hidden rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50 p-3">
//               <div className="flex items-center gap-2 text-xs font-extrabold text-purple-900">
//                 <Sparkles size={15} /> Explanation Details
//               </div>
//               <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
//                 <div className="rounded-lg border border-white bg-white/80 p-2.5">
//                   <p className="text-[10px] text-slate-500">Explanation Method</p>
//                   <p className="mt-1 break-words text-xs font-bold text-slate-900">{explanation.method || 'Integrated Gradients'}</p>
//                 </div>
//                 <div className="rounded-lg border border-white bg-white/80 p-2.5">
//                   <p className="text-[10px] text-slate-500">Integration Steps</p>
//                   <p className="mt-1 text-lg font-extrabold text-purple-700">{explanation.n_steps ?? '—'}</p>
//                 </div>
//                 <div className="rounded-lg border border-white bg-white/80 p-2.5">
//                   <p className="text-[10px] text-slate-500">Image Width</p>
//                   <p className="mt-1 text-lg font-extrabold text-slate-900">{explanation.image_width ?? '—'} px</p>
//                 </div>
//                 <div className="rounded-lg border border-white bg-white/80 p-2.5">
//                   <p className="text-[10px] text-slate-500">Image Height</p>
//                   <p className="mt-1 text-lg font-extrabold text-slate-900">{explanation.image_height ?? '—'} px</p>
//                 </div>
//               </div>
//               <div className="mt-2 rounded-lg border border-purple-100 bg-white/70 p-2.5">
//                 <p className="text-[9px] font-semibold uppercase tracking-wider text-purple-600">Explained Prediction Class</p>
//                 <p className="mt-1 break-words text-xs font-extrabold text-slate-900">
//                   {explanation.predicted_disease || prediction?.predicted_disease || 'Plant disease prediction'}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 p-3">
//               <AlertCircle size={15} className="mt-0.5 shrink-0 text-blue-600" />
//               <p className="text-[10px] leading-5 text-blue-800">
//                 <strong>Research note:</strong> This visualization explains which image regions influenced the model's prediction. Highlighted regions are model attributions, not confirmed disease lesions or a segmentation mask. Interpret the explanation alongside the prediction and visible symptoms.
//               </p>
//             </div>
//           </div>
//         )}
//       </section>

//       {/* Fullscreen heatmap */}
//       {isHeatmapPreviewOpen && heatmapUrl && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-3 backdrop-blur-md animate-in fade-in duration-200 sm:p-6"
//           onClick={() => setIsHeatmapPreviewOpen(false)}
//           role="dialog"
//           aria-modal="true"
//           aria-label="Full screen heatmap preview"
//         >
//           <button
//             type="button"
//             onClick={() => setIsHeatmapPreviewOpen(false)}
//             aria-label="Close heatmap preview"
//             className="absolute right-4 top-4 z-[102] flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
//           >
//             <X size={22} />
//           </button>
//           <div
//             className="relative flex h-full w-full items-center justify-center"
//             onClick={(event) => event.stopPropagation()}
//           >
//             <img
//               src={heatmapUrl}
//               alt="Full screen AI-generated plant disease attention heatmap"
//               className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
//             />
//             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-center text-[10px] text-white backdrop-blur-md">
//               Click outside or press ESC to close
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <div className="flex flex-wrap gap-2">
//         <Link
//           to="/dashboard/upload"
//           className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 px-4 py-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50"
//         >
//           <ArrowLeft size={15} />
//           Analyze Another Image
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default Analysis





import { useCallback, useEffect, useRef, useState } from 'react'
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
  CloudSun,
  CloudRain,
  RefreshCw,
  Thermometer,
  Droplets,
  Wind,
  Navigation,
  Sprout,
  ChevronRight,
  Eye,
} from 'lucide-react'
import api from '../../services/api'

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
).replace(/\/+$/, '')

const cardClass =
  'rounded-2xl border border-emerald-100/80 bg-white shadow-[0_3px_18px_rgba(15,80,55,0.045)]'

const bodyClass = 'text-xs leading-5 text-slate-600'

function SectionHeading({
  icon: Icon,
  title,
  subtitle,
  color = 'bg-emerald-50 text-emerald-700',
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}>
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-extrabold tracking-tight text-slate-900">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 text-[11px] text-slate-500">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <h4 className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
      {children}
    </h4>
  )
}

function GuidanceCard({ title, description, items = [], icon: Icon, color }) {
  return (
    <section className={`${cardClass} p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-md`}>
      <div className="mb-4 flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
          <Icon size={19} />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
          <p className="mt-0.5 text-[11px] text-slate-500">{description}</p>
        </div>
      </div>

      {items.length > 0 ? (
        <ul className="space-y-2.5">
          {items.map((item, index) => {
            const content =
              typeof item === 'string' ? item : item.description

            return (
              <li
                key={`${index}-${content || 'item'}`}
                className="flex items-start gap-2.5 rounded-lg bg-slate-50/80 p-2.5"
              >
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />
                <span className="text-xs leading-5 text-slate-600">
                  {content}
                </span>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
          No additional information is available.
        </p>
      )}
    </section>
  )
}

function getLocationError(error) {
  if (error.code === 1) {
    return 'Location permission was denied. Allow location access in your browser settings to view local weather.'
  }
  if (error.code === 2) {
    return 'Your location could not be detected. Check your device location settings and try again.'
  }
  if (error.code === 3) {
    return 'The location request timed out. Please try again.'
  }
  return 'Unable to access your location. Please try again.'
}

function WeatherMetric({ icon: Icon, label, value, unit }) {
  return (
    <div className="rounded-xl border border-emerald-100 bg-white p-3 transition hover:border-emerald-300 hover:shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <Icon size={16} />
        </div>
        <span className="text-[10px] font-semibold text-slate-500">
          {label}
        </span>
      </div>
      <div className="mt-2">
        <span className="text-xl font-black tracking-tight text-slate-900">
          {value ?? '--'}
        </span>
        <span className="ml-1 text-xs font-semibold text-slate-500">
          {unit}
        </span>
      </div>
    </div>
  )
}

function getRecommendedActions(disease, current, advisory) {
  const actions = []
  const diseaseName = String(disease || '').toLowerCase()
  const humidity = Number(current.humidity) || 0

  const rainProbability = Number(
    advisory.irrigation_guidance?.upcoming_rain_probability ??
      advisory.irrigation_guidance?.rain_probability
  ) || 0

  const temperature = Number(current.temperature) || 0

  if (humidity >= 75) {
    actions.push(
      'Avoid unnecessary overhead watering because wet leaves can increase fungal disease pressure.'
    )
    actions.push(
      'Maintain adequate spacing between plants to improve airflow.'
    )
  } else if (humidity <= 35) {
    actions.push(
      'Check soil moisture regularly and water according to the crop’s needs.'
    )
  } else {
    actions.push(
      'Monitor soil moisture and water according to actual plant requirements.'
    )
  }

  if (rainProbability >= 60) {
    actions.push(
      'Rain is likely. Avoid unnecessary irrigation and ensure proper drainage.'
    )
  } else {
    actions.push(
      'Check the soil before watering instead of following a fixed schedule.'
    )
  }

  if (temperature >= 35) {
    actions.push(
      'Protect plants from excessive afternoon heat and monitor for wilting.'
    )
  } else if (temperature <= 10) {
    actions.push(
      'Monitor for cold stress and protect sensitive crops from low temperatures.'
    )
  }

  if (
    diseaseName.includes('early blight') ||
    diseaseName.includes('late blight') ||
    diseaseName.includes('leaf spot') ||
    diseaseName.includes('mildew') ||
    diseaseName.includes('rust')
  ) {
    actions.push(
      'Inspect older and lower leaves for spots, yellowing or spreading lesions.'
    )
  } else if (diseaseName.includes('healthy')) {
    actions.push(
      'Continue regular leaf inspections and maintain good crop hygiene.'
    )
  } else {
    actions.push(
      'Inspect affected leaves regularly and compare new symptoms with the AI prediction.'
    )
  }

  const backendTips = (advisory.prevention_tips || []).filter(
    (tip) => typeof tip === 'string' && tip.trim()
  )

  if (backendTips.length) actions.push(backendTips[0])

  return [...new Set(actions)].slice(0, 3)
}

function getWeatherAdvisory(current, advisory) {
  const humidity = Number(current.humidity) || 0

  const rainProbability = Number(
    advisory.irrigation_guidance?.upcoming_rain_probability ??
      advisory.irrigation_guidance?.rain_probability
  ) || 0

  const temperature = Number(current.temperature) || 0
  const alerts = advisory.disease_alerts || []

  if (alerts.length) {
    return alerts.slice(0, 1).map((alert) => alert.message).join(' ')
  }

  if (humidity >= 80 && rainProbability >= 60) {
    return 'High humidity and expected rainfall may favor fungal disease development. Monitor leaves closely and maintain good airflow.'
  }

  if (humidity >= 80) {
    return 'High humidity may increase fungal disease pressure. Monitor leaves and maintain good airflow.'
  }

  if (rainProbability >= 60) {
    return 'Rain is expected. Monitor prolonged leaf wetness and ensure excess water drains properly.'
  }

  if (temperature >= 35) {
    return 'High temperatures may cause heat stress. Monitor for wilting and protect plants from excessive afternoon heat.'
  }

  if (humidity <= 35) {
    return 'Low humidity may increase moisture stress. Check soil moisture and water according to crop requirements.'
  }

  return 'No strong general weather warning is currently indicated. Continue monitoring the plant and maintain good crop care.'
}

function AnalysisWeatherSection({
  weather,
  loading,
  error,
  coordinates,
  onRetry,
  predictedDisease,
}) {
  if (loading) {
    return (
      <section className={`${cardClass} p-5`}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
            <LoaderCircle
              size={20}
              className="animate-spin text-emerald-600"
            />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Loading Local Weather
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Detecting your location and retrieving weather conditions.
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !weather?.current) {
    return (
      <section className={`${cardClass} p-5`}>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <CloudSun size={21} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-extrabold text-slate-900">
              Local Weather Unavailable
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {error || 'Weather information could not be loaded.'}
            </p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-emerald-800"
            >
              <RefreshCw size={14} />
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  const current = weather.current
  const advisory = weather.advisory || {}
  const actions = getRecommendedActions(
    predictedDisease,
    current,
    advisory
  )
  const weatherMessage = getWeatherAdvisory(current, advisory)

  const rainProbability =
    weather.hourly?.[0]?.rain_probability ??
    advisory.irrigation_guidance?.upcoming_rain_probability

  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-[0_3px_18px_rgba(15,80,55,0.045)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 bg-gradient-to-r from-[#eaf8ef] via-white to-white px-4 py-4 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm">
            <CloudSun size={21} />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">
              Plant & Weather Insights
            </h3>
            <p className="mt-0.5 text-[11px] text-slate-500">
              AI prediction combined with local weather
            </p>
          </div>
        </div>

        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-800">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live Weather
        </span>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 p-3.5">
          <div className="min-w-0">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
              Current AI Prediction
            </p>
            <h4 className="mt-1 break-words text-base font-black text-slate-900">
              {predictedDisease || 'Plant Disease Prediction'}
            </h4>
            <p className="mt-1 text-[10px] text-slate-500">
              Model prediction, not a confirmed diagnosis.
            </p>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
            <Sprout size={24} />
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-2">
            <h4 className="text-xs font-extrabold text-slate-900">
              Current Weather Conditions
            </h4>
            <span className="text-[10px] text-slate-500">
              {current.condition || 'Current conditions'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <WeatherMetric
              icon={Thermometer}
              label="Temperature"
              value={current.temperature}
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
              label="Rain Probability"
              value={rainProbability}
              unit="%"
            />
            <WeatherMetric
              icon={Wind}
              label="Wind Speed"
              value={current.wind_speed}
              unit="km/h"
            />
          </div>
        </div>

        <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 p-3.5">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <CloudSun size={16} />
            </div>
            <h4 className="text-xs font-extrabold text-amber-950">
              Weather Advisory
            </h4>
          </div>
          <p className="text-xs leading-5 text-slate-700">
            {weatherMessage}
          </p>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <Leaf size={16} />
            </div>
            <h4 className="text-xs font-extrabold text-slate-900">
              Recommended Plant Care
            </h4>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {actions.map((action, index) => (
              <div
                key={`${index}-${action}`}
                className="flex items-start gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/40 p-3"
              >
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />
                <p className="text-[11px] leading-5 text-slate-700">
                  {action}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <p className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <Navigation size={12} className="text-emerald-600" />
            {coordinates
              ? `${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}`
              : 'Detected device location'}
          </p>
          <p className="text-[10px] text-slate-400">
            Weather source: Open-Meteo
          </p>
        </div>

        <p className="flex items-start gap-2 rounded-lg bg-blue-50/80 p-3 text-[10px] leading-4 text-blue-800">
          <Info size={14} className="mt-0.5 shrink-0" />
          Weather is general environmental guidance, not a validated disease-risk prediction. Check actual plant symptoms before taking action.
        </p>
      </div>
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

  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [weatherError, setWeatherError] = useState('')
  const [weatherCoordinates, setWeatherCoordinates] = useState(null)

  const weatherRequestStarted = useRef(false)

  const requestLocalWeather = useCallback(() => {
    if (!navigator.geolocation) {
      setWeatherLoading(false)
      setWeatherError('Your browser does not support location access.')
      return
    }

    setWeatherLoading(true)
    setWeatherError('')
    setWeather(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        setWeatherCoordinates({ latitude, longitude })

        try {
          const response = await api.get('/api/weather', {
            params: { latitude, longitude },
          })

          if (!response.data?.current) {
            throw new Error(
              'The weather service returned an unexpected response.'
            )
          }

          setWeather(response.data)
        } catch (requestError) {
          console.error('Analysis weather API error:', requestError)

          setWeatherError(
            requestError.response?.data?.detail ||
              requestError.message ||
              'Unable to load local weather information.'
          )
        } finally {
          setWeatherLoading(false)
        }
      },
      (locationError) => {
        setWeatherLoading(false)
        setWeatherError(getLocationError(locationError))
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 300000,
      }
    )
  }, [])

  useEffect(() => {
    if (!prediction || weatherRequestStarted.current) return

    weatherRequestStarted.current = true
    requestLocalWeather()
  }, [prediction, requestLocalWeather])

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [imagePreview])

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
        'Original image is unavailable. Please upload the image again.'
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

      if (result.data) setPrediction(result.data)

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
      <div className={`${cardClass} flex min-h-[45vh] flex-col items-center justify-center p-8 text-center`}>
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <ScanSearch size={30} />
        </div>

        <h2 className="mt-4 text-xl font-black tracking-tight text-slate-900">
          No Analysis Available
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          Upload a plant leaf image to view its disease prediction and AI analysis results.
        </p>

        <Link
          to="/dashboard/upload"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-emerald-800"
        >
          <ImageIcon size={17} />
          Upload Image
        </Link>
      </div>
    )
  }

  const topPredictions = prediction.top_predictions || []
  const confidence = Number(prediction.confidence) || 0

  const isDiseaseClass =
    diseaseInformation?.diagnosis_type === 'disease_class'

  const heatmapUrl = explanation?.heatmap_url
    ? `${API_BASE}/${explanation.heatmap_url.replace(/^\/+/, '')}`
    : ''

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-5 pb-5">
      {/* Page heading */}
      <section className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-[#effaf2] via-white to-[#f4fbf7] p-4 sm:p-5">
        <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-emerald-100/60 blur-3xl" />

        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/80 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
              <Sparkles size={12} />
              Intelligent Plant Care
            </div>

            <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              Plant Analysis Report
            </h2>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
              Your AI-powered plant diagnosis, disease insights and personalized care guidance.
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/15">
            <Sprout size={25} />
          </div>
        </div>
      </section>

      {/* Main prediction */}
      <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-[0_4px_22px_rgba(15,80,55,0.06)]">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#073f2d] via-[#086447] to-[#11946a] p-4 text-white sm:p-5">
          <div className="pointer-events-none absolute -right-10 -top-20 h-52 w-52 rounded-full border-[28px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-24 right-24 h-44 w-44 rounded-full bg-emerald-300/10 blur-2xl" />

          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                <Leaf size={25} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-100">
                  Predicted Plant Class
                </p>
                <h3 className="mt-1 break-words text-lg font-black leading-tight sm:text-xl">
                  {prediction.predicted_disease}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-100">
                  Model Confidence
                </p>
                <p className="text-2xl font-black tabular-nums">
                  {confidence.toFixed(2)}%
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-emerald-200/40 text-[10px] font-black">
                <CheckCircle2 size={19} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-2.5 p-3 sm:grid-cols-2 sm:p-4">
          <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
              <BrainCircuit size={19} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-slate-500">
                AI Model
              </p>
              <p className="mt-0.5 truncate text-xs font-bold text-slate-800">
                {prediction.model || 'Plant Disease Classification Model'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm">
              <ShieldCheck size={19} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-500">
                Analysis Status
              </p>
              <p className="mt-0.5 text-xs font-bold text-slate-800">
                Prediction Completed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnosis information */}
      {diseaseInformation && (
        <section className={`${cardClass} overflow-hidden`}>
          <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-white p-4 sm:p-5">
            <SectionHeading
              icon={Stethoscope}
              title="Diagnosis Information"
              subtitle={
                diseaseInformation.disease_name ||
                prediction.predicted_disease
              }
            />

            <div className="mb-3 flex flex-wrap gap-2">
              {diseaseInformation.crop && (
                <span className="rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-[10px] font-bold text-emerald-800">
                  <Leaf size={11} className="mr-1 inline" />
                  Crop: {diseaseInformation.crop}
                </span>
              )}

              {diseaseInformation.category && (
                <span className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-[10px] font-bold text-blue-800">
                  {diseaseInformation.category}
                </span>
              )}
            </div>

            {diseaseInformation.overview && (
              <p className={bodyClass}>{diseaseInformation.overview}</p>
            )}

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {diseaseInformation.crop_description && (
                <div className="rounded-xl border border-emerald-100 bg-white p-3">
                  <SectionLabel>About This Crop</SectionLabel>
                  <p className={bodyClass}>
                    {diseaseInformation.crop_description}
                  </p>
                </div>
              )}

              {diseaseInformation.detailed_description && (
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3">
                  <SectionLabel>Detailed Explanation</SectionLabel>
                  <p className={bodyClass}>
                    {diseaseInformation.detailed_description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {!isDiseaseClass && (
            <div className="m-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
              <Info
                size={18}
                className="mt-0.5 shrink-0 text-amber-700"
              />
              <div>
                <h4 className="text-xs font-extrabold text-amber-900">
                  No specific disease identified
                </h4>
                <p className="mt-1 text-xs leading-5 text-amber-800">
                  The model predicted a general leaf category, not a specific disease. This does not prove that the plant is healthy. Inspect the plant and seek expert confirmation if you notice unusual changes.
                </p>
              </div>
            </div>
          )}

          {isDiseaseClass && diseaseInformation.symptoms?.length > 0 && (
            <div className="border-b border-slate-100 p-4 sm:p-5">
              <SectionHeading
                icon={Activity}
                title="Common Symptoms"
                subtitle="Symptoms commonly associated with this disease"
                color="bg-amber-50 text-amber-700"
              />

              <ul className="grid gap-2 sm:grid-cols-2">
                {diseaseInformation.symptoms.map((symptom, index) => (
                  <li
                    key={`${index}-${symptom}`}
                    className="flex items-start gap-2.5 rounded-xl border border-amber-100 bg-amber-50/50 p-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-amber-800">
                      {index + 1}
                    </span>
                    <span className="text-xs leading-5 text-slate-700">
                      {symptom}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isDiseaseClass && diseaseInformation.symptom_details?.length > 0 && (
            <div className="border-b border-slate-100 p-4 sm:p-5">
              <SectionHeading
                icon={Eye}
                title="Understanding the Symptoms"
                subtitle="Detailed symptom descriptions"
                color="bg-amber-50 text-amber-700"
              />

              <div className="grid gap-2.5 sm:grid-cols-2">
                {diseaseInformation.symptom_details.map((item, index) => (
                  <div
                    key={`${index}-${item.symptom}`}
                    className="rounded-xl border border-amber-100 bg-white p-3"
                  >
                    <h5 className="text-xs font-bold text-slate-800">
                      {item.symptom}
                    </h5>
                    <p className={`mt-1.5 ${bodyClass}`}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-b border-slate-100 p-4 sm:p-5">
            <SectionHeading
              icon={Bug}
              title="Possible Causes"
              subtitle="Factors associated with the predicted disease"
              color="bg-orange-50 text-orange-700"
            />

            <p className="rounded-xl border border-orange-100 bg-orange-50/40 p-3 text-xs leading-5 text-slate-600">
              {diseaseInformation.causes ||
                'Cause information is not available.'}
            </p>
          </div>

          {isDiseaseClass && (
            <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
              <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-orange-700">
                    <Activity size={17} />
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900">
                    How Disease Can Spread
                  </h4>
                </div>
                <p className={bodyClass}>
                  {diseaseInformation.spread_details ||
                    'Detailed spread information is not available.'}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-700">
                    <Leaf size={17} />
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900">
                    Affected Plant Parts
                  </h4>
                </div>

                {diseaseInformation.affected_parts?.length > 0 ? (
                  <ul className="space-y-2">
                    {diseaseInformation.affected_parts.map((part, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-xs text-slate-600"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-emerald-600"
                        />
                        {part}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={bodyClass}>
                    Inspect leaves, stems and other visible plant parts for additional symptoms.
                  </p>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Treatment and prevention */}
      {diseaseInformation && (
        <section className="space-y-3">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                Plant Care Recommendations
              </span>
              <h3 className="mt-1 text-lg font-black tracking-tight text-slate-900">
                Treatment & Prevention Guide
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                General management guidance associated with the predicted class.
              </p>
            </div>

            <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 sm:flex">
              <HeartPulse size={21} />
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <GuidanceCard
              title="Treatment & Management"
              description="Suggested management steps"
              items={
                diseaseInformation.management_steps ||
                diseaseInformation.treatment ||
                []
              }
              icon={HeartPulse}
              color="bg-rose-50 text-rose-700"
            />

            <GuidanceCard
              title="Prevention"
              description="Practices that may help reduce disease risk"
              items={diseaseInformation.prevention || []}
              icon={ShieldCheck}
              color="bg-emerald-50 text-emerald-700"
            />
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-3.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700">
              <Lightbulb size={17} />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-blue-950">
                Agricultural Guidance
              </h4>
              <p className="mt-1 text-xs leading-5 text-blue-800">
                These are general educational recommendations, not a confirmed diagnosis or prescription. Confirm the disease locally before applying pesticides or fungicides. Follow local agricultural advice and product labels.
              </p>
            </div>
          </div>

          {isDiseaseClass && (
            <div className="grid gap-3 lg:grid-cols-2">
              <GuidanceCard
                title="Recovery Monitoring"
                description="What to observe after management"
                items={diseaseInformation.recovery_monitoring || []}
                icon={Activity}
                color="bg-blue-50 text-blue-700"
              />

              <section className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
                <SectionHeading
                  icon={Stethoscope}
                  title="When to Seek Expert Help"
                  subtitle="Know when professional advice is important"
                  color="bg-white text-amber-700"
                />

                <p className={bodyClass}>
                  {diseaseInformation.when_to_seek_help ||
                    'Consult a local agricultural expert if symptoms continue to spread or the plant shows significant damage.'}
                </p>
              </section>
            </div>
          )}
        </section>
      )}

      {!diseaseInformation && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-800">
          <Info size={17} className="mt-0.5 shrink-0" />
          <p>
            Disease information was not included in this response. Please upload the image again after confirming the backend is updated.
          </p>
        </div>
      )}

      {/* Combined weather report */}
      <section className="space-y-3">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
            Environmental Insights
          </span>
          <h3 className="mt-1 text-lg font-black tracking-tight text-slate-900">
            Local Weather & Plant Care
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Understand how current weather conditions may affect plant care.
          </p>
        </div>

        <AnalysisWeatherSection
          weather={weather}
          loading={weatherLoading}
          error={weatherError}
          coordinates={weatherCoordinates}
          onRetry={requestLocalWeather}
          predictedDisease={prediction.predicted_disease}
        />
      </section>

      {/* Top predictions */}
      <section className={`${cardClass} p-4 sm:p-5`}>
        <SectionHeading
          icon={Activity}
          title="Top Model Predictions"
          subtitle="Confidence scores for the top predicted classes"
        />

        {topPredictions.length > 0 ? (
          <div className="space-y-4">
            {topPredictions.map((item, index) => (
              <div key={`${item.disease}-${index}`}>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-black ${
                        index === 0
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {index + 1}
                    </span>

                    <span className="truncate text-xs font-bold text-slate-800">
                      {item.disease}
                    </span>
                  </div>

                  <span className="shrink-0 text-xs font-extrabold tabular-nums text-emerald-700">
                    {Number(item.confidence).toFixed(2)}%
                  </span>
                </div>

                <div className="ml-9 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      index === 0
                        ? 'bg-gradient-to-r from-emerald-700 to-emerald-400'
                        : 'bg-gradient-to-r from-slate-400 to-slate-300'
                    }`}
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(0, Number(item.confidence) || 0)
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500">
            No additional prediction scores are available.
          </p>
        )}

        <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-[10px] leading-4 text-amber-800">
          <Info size={14} className="mt-0.5 shrink-0" />
          Confidence is the model's estimated probability for a class, not guaranteed diagnostic accuracy.
        </div>

        {confidence < 60 && (
          <div className="mt-2 flex items-start gap-2 rounded-xl border border-orange-200 bg-orange-50 p-3 text-xs leading-5 text-orange-800">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            This prediction has relatively low confidence. Do not rely on it alone to decide treatment. Consider another clear image and expert advice.
          </div>
        )}
      </section>

      {/* Explainable AI */}
      <section className={`${cardClass} relative overflow-hidden p-4 sm:p-5`}>
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-100/50 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-md shadow-purple-900/15">
              <Sparkles size={22} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-extrabold tracking-tight text-slate-900">
                  Explainable AI Studio
                </h3>
                <span className="rounded-full border border-purple-200 bg-purple-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-purple-700">
                  AI Insights
                </span>
              </div>

              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                Understand which image regions influenced the prediction.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={generateExplanation}
            disabled={loadingExplanation || !file}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-900/10 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingExplanation ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Sparkles size={16} />
            )}

            {loadingExplanation
              ? 'Generating...'
              : explanation
                ? 'Regenerate Explanation'
                : 'Generate AI Explanation'}
          </button>
        </div>

        {!file && !explanation && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <p>
              The original uploaded image is unavailable. Please upload the image again to generate an AI explanation.
            </p>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-600"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {loadingExplanation && (
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50/60 p-4">
            <LoaderCircle
              size={22}
              className="animate-spin text-purple-600"
            />
            <div>
              <p className="text-xs font-bold text-slate-800">
                Analyzing important image regions
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Integrated Gradients is calculating visual attributions.
              </p>
            </div>
          </div>
        )}

        {explanation && heatmapUrl && (
          <div className="relative mt-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Visual Attention Comparison
                </h4>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  Original leaf and AI attention overlay
                </p>
              </div>

              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700">
                <CheckCircle2 size={12} className="mr-1 inline" />
                Explanation Generated
              </span>
            </div>

            <div
              className={`grid gap-3 ${
                imagePreview ? 'lg:grid-cols-2' : 'grid-cols-1'
              }`}
            >
              {imagePreview && (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2.5">
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Leaf size={14} className="text-emerald-700" />
                      Original Leaf
                    </span>

                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Input Image
                    </span>
                  </div>

                  <div className="flex min-h-48 items-center justify-center bg-slate-50 p-3 sm:min-h-56">
                    <img
                      src={imagePreview}
                      alt="Original uploaded plant leaf"
                      className="max-h-64 w-full rounded-lg object-contain"
                    />
                  </div>

                  <p className="border-t border-slate-100 px-3 py-2.5 text-[10px] text-slate-500">
                    Original image provided to the prediction model.
                  </p>
                </div>
              )}

              <div className="overflow-hidden rounded-xl border border-purple-200 bg-white">
                <div className="flex items-center justify-between border-b border-purple-100 px-3 py-2.5">
                  <span className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Sparkles size={14} className="text-purple-700" />
                    AI Attention Overlay
                  </span>

                  <span className="text-[9px] font-bold uppercase tracking-wider text-purple-600">
                    Integrated Gradients
                  </span>
                </div>

                <div className="group relative flex min-h-48 items-center justify-center bg-slate-50 p-3 sm:min-h-56">
                  <img
                    src={heatmapUrl}
                    alt="Integrated Gradients attention overlay showing image regions that influenced the AI prediction"
                    className="max-h-64 w-full rounded-lg object-contain"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition group-hover:bg-slate-950/30">
                    <button
                      type="button"
                      onClick={() => setIsHeatmapPreviewOpen(true)}
                      aria-label="Preview heatmap in full screen"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-purple-700 opacity-0 shadow-lg transition hover:scale-105 group-hover:opacity-100 focus:opacity-100"
                    >
                      <Maximize2 size={15} />
                      Fullscreen Preview
                    </button>
                  </div>
                </div>

                <p className="border-t border-purple-100 px-3 py-2.5 text-[10px] text-slate-500">
                  Colored regions indicate the model's visual attribution.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-3.5">
              <SectionHeading
                icon={Activity}
                title="Understanding AI Attention"
                subtitle="How to interpret the visualization"
                color="bg-purple-50 text-purple-700"
              />

              <div className="grid gap-2.5 sm:grid-cols-3">
                <div className="rounded-xl bg-red-50/70 p-3">
                  <div className="mb-2 h-1.5 w-9 rounded-full bg-gradient-to-r from-yellow-400 to-red-600" />
                  <p className="text-xs font-bold text-slate-800">
                    Stronger Attention
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    Brighter regions indicate stronger positive attribution.
                  </p>
                </div>

                <div className="rounded-xl bg-orange-50/70 p-3">
                  <div className="mb-2 h-1.5 w-9 rounded-full bg-gradient-to-r from-orange-300 to-orange-500" />
                  <p className="text-xs font-bold text-slate-800">
                    Moderate Attention
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    Intermediate colors represent moderate attribution.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="mb-2 h-1.5 w-9 rounded-full bg-slate-300" />
                  <p className="text-xs font-bold text-slate-800">
                    Lower Attention
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    Less highlighted regions have weaker displayed attribution.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50 p-3.5">
              <div className="flex items-center gap-2 text-xs font-extrabold text-purple-900">
                <Sparkles size={15} />
                Explanation Details
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-lg border border-white bg-white/85 p-3">
                  <p className="text-[10px] text-slate-500">
                    Explanation Method
                  </p>
                  <p className="mt-1 break-words text-xs font-bold text-slate-900">
                    {explanation.method || 'Integrated Gradients'}
                  </p>
                </div>

                <div className="rounded-lg border border-white bg-white/85 p-3">
                  <p className="text-[10px] text-slate-500">
                    Integration Steps
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-purple-700">
                    {explanation.n_steps ?? '—'}
                  </p>
                </div>

                <div className="rounded-lg border border-white bg-white/85 p-3">
                  <p className="text-[10px] text-slate-500">
                    Image Width
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-slate-900">
                    {explanation.image_width ?? '—'} px
                  </p>
                </div>

                <div className="rounded-lg border border-white bg-white/85 p-3">
                  <p className="text-[10px] text-slate-500">
                    Image Height
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-slate-900">
                    {explanation.image_height ?? '—'} px
                  </p>
                </div>
              </div>

              <div className="mt-2 rounded-lg border border-purple-100 bg-white/75 p-3">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-purple-600">
                  Explained Prediction Class
                </p>
                <p className="mt-1 break-words text-xs font-extrabold text-slate-900">
                  {explanation.predicted_disease ||
                    prediction?.predicted_disease ||
                    'Plant disease prediction'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/70 p-3">
              <Info size={15} className="mt-0.5 shrink-0 text-blue-600" />
              <p className="text-[10px] leading-5 text-blue-800">
                <strong>Research note:</strong> This visualization explains which image regions influenced the model's prediction. Highlighted regions are model attributions, not confirmed disease lesions or a segmentation mask. Interpret the explanation alongside the prediction and visible symptoms.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Fullscreen heatmap */}
      {isHeatmapPreviewOpen && heatmapUrl && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-3 backdrop-blur-md animate-in fade-in duration-200 sm:p-6"
          onClick={() => setIsHeatmapPreviewOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Full screen heatmap preview"
        >
          <button
            type="button"
            onClick={() => setIsHeatmapPreviewOpen(false)}
            aria-label="Close heatmap preview"
            className="absolute right-4 top-4 z-[102] flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={22} />
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

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-center text-[10px] text-white backdrop-blur-md">
              Click outside or press ESC to close
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-emerald-100 pt-4">
        <p className="text-[10px] text-slate-400">
          PlantCare AI · Intelligent Plant Health Insights
        </p>

        <Link
          to="/dashboard/upload"
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-xs font-bold text-emerald-800 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50"
        >
          <ArrowLeft size={15} />
          Analyze Another Image
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  )
}

export default Analysis
