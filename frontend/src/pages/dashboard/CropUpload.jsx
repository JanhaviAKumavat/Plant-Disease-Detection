
// import { useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import {
//   Upload,
//   ImagePlus,
//   X,
//   Leaf,
//   ScanSearch,
//   ShieldCheck,
//   FileImage,
//   AlertCircle,
//   Camera,
//   CameraOff,
//   RefreshCw,
//   Activity,
//   CheckCircle2,
// } from 'lucide-react'
// import api from '../../services/api'

// const MAX_FILE_SIZE = 5 * 1024 * 1024
// const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
// const LIVE_ANALYSIS_INTERVAL = 2000
// const LIVE_FRAME_MAX_WIDTH = 640

// function CropUpload() {
//   const fileInputRef = useRef(null)
//   const videoRef = useRef(null)
//   const streamRef = useRef(null)
//   const liveRequestRef = useRef(false)

//   const navigate = useNavigate()

//   const [file, setFile] = useState(null)
//   const [preview, setPreview] = useState('')
//   const [error, setError] = useState('')
//   const [dragging, setDragging] = useState(false)
//   const [submitting, setSubmitting] = useState(false)
//   const [cameraOpen, setCameraOpen] = useState(false)
//   const [startingCamera, setStartingCamera] = useState(false)

//   const [liveResult, setLiveResult] = useState(null)
//   const [liveInformation, setLiveInformation] = useState(null)
//   const [liveError, setLiveError] = useState('')
//   const [liveAnalyzing, setLiveAnalyzing] = useState(false)

//   // Clean up the camera when the component unmounts.
//   useEffect(() => {
//     return () => {
//       streamRef.current?.getTracks().forEach((track) => track.stop())
//     }
//   }, [])

//   // Clean up previously selected image previews.
//   useEffect(() => {
//     return () => {
//       if (preview) URL.revokeObjectURL(preview)
//     }
//   }, [preview])

//   // Start automatic analysis whenever the camera is opened.
//   useEffect(() => {
//     if (!cameraOpen || !videoRef.current || !streamRef.current) {
//       return undefined
//     }

//     let intervalId = null
//     let cancelled = false

//     const video = videoRef.current
//     video.srcObject = streamRef.current

//     const analyzeLiveFrame = async () => {
//       if (
//         cancelled ||
//         liveRequestRef.current ||
//         video.readyState < 2 ||
//         !video.videoWidth ||
//         !video.videoHeight
//       ) {
//         return
//       }

//       liveRequestRef.current = true

//       if (!cancelled) {
//         setLiveAnalyzing(true)
//         setLiveError('')
//       }

//       try {
//         // Reduce frame dimensions to keep CPU and network usage low.
//         const scale = Math.min(
//           1,
//           LIVE_FRAME_MAX_WIDTH / video.videoWidth
//         )

//         const canvas = document.createElement('canvas')
//         canvas.width = Math.round(video.videoWidth * scale)
//         canvas.height = Math.round(video.videoHeight * scale)

//         const context = canvas.getContext('2d')

//         if (!context) {
//           throw new Error('Unable to process camera frame.')
//         }

//         context.drawImage(
//           video,
//           0,
//           0,
//           canvas.width,
//           canvas.height
//         )

//         const blob = await new Promise((resolve) => {
//           canvas.toBlob(resolve, 'image/jpeg', 0.75)
//         })

//         if (!blob) {
//           throw new Error('Unable to capture camera frame.')
//         }

//         const frameFile = new File(
//           [blob],
//           `plantcare-live-${Date.now()}.jpg`,
//           { type: 'image/jpeg' }
//         )

//         const formData = new FormData()
//         formData.append('file', frameFile)

//         // Same trained MobileNetV3 model as image upload.
//         const response = await api.post(
//           '/api/predictions/live-predict',
//           formData
//         )

//         if (!cancelled && response.data.success) {
//           setLiveResult(response.data.data)
//           setLiveInformation(response.data.disease_information)
//           setLiveError('')
//         }
//       } catch (err) {
//         if (!cancelled) {
//           setLiveError(
//             err.response?.data?.detail ||
//             'Unable to analyze camera frame. Checking again...'
//           )
//         }
//       } finally {
//         liveRequestRef.current = false

//         if (!cancelled) {
//           setLiveAnalyzing(false)
//         }
//       }
//     }

//     const startLiveAnalysis = async () => {
//       try {
//         await video.play()

//         if (cancelled) return

//         // Analyze immediately, then every two seconds.
//         analyzeLiveFrame()

//         intervalId = window.setInterval(
//           analyzeLiveFrame,
//           LIVE_ANALYSIS_INTERVAL
//         )
//       } catch {
//         if (!cancelled) {
//           setLiveError('Unable to start camera preview.')
//         }
//       }
//     }

//     startLiveAnalysis()

//     return () => {
//       cancelled = true

//       if (intervalId) {
//         window.clearInterval(intervalId)
//       }
//     }
//   }, [cameraOpen])

//   const stopCamera = () => {
//     streamRef.current?.getTracks().forEach((track) => track.stop())
//     streamRef.current = null
//     setCameraOpen(false)
//     setLiveAnalyzing(false)
//   }

//   const selectFile = (selectedFile) => {
//     setError('')

//     if (!selectedFile) return

//     if (!ALLOWED_TYPES.includes(selectedFile.type)) {
//       setError('Please select a JPG, JPEG, PNG or WEBP image.')
//       return
//     }

//     if (selectedFile.size > MAX_FILE_SIZE) {
//       setError('Image size must not exceed 5 MB.')
//       return
//     }

//     stopCamera()
//     setLiveResult(null)
//     setLiveInformation(null)
//     setLiveError('')

//     setFile(selectedFile)

//     const imageUrl = URL.createObjectURL(selectedFile)

//     setPreview(imageUrl)
//   }

//   const startCamera = async () => {
//     setError('')
//     setLiveError('')
//     setLiveResult(null)
//     setLiveInformation(null)
//     setStartingCamera(true)

//     try {
//       if (!navigator.mediaDevices?.getUserMedia) {
//         throw new Error(
//           'Camera access is unavailable. Use HTTPS or localhost and a supported browser.'
//         )
//       }

//       stopCamera()

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           facingMode: { ideal: 'environment' },
//           width: { ideal: 1280 },
//           height: { ideal: 720 },
//         },
//         audio: false,
//       })

//       streamRef.current = stream
//       setCameraOpen(true)
//     } catch (err) {
//       setError(
//         err.name === 'NotAllowedError'
//           ? 'Camera permission denied. Please allow camera access in your browser.'
//           : err.message || 'Unable to access camera. Please check your device.'
//       )
//     } finally {
//       setStartingCamera(false)
//     }
//   }

//   const capturePhoto = () => {
//     const video = videoRef.current

//     if (!video || !video.videoWidth || !video.videoHeight) {
//       setError('Camera is not ready. Please try again.')
//       return
//     }

//     const canvas = document.createElement('canvas')
//     canvas.width = video.videoWidth
//     canvas.height = video.videoHeight

//     const context = canvas.getContext('2d')
//     context.drawImage(video, 0, 0, canvas.width, canvas.height)

//     canvas.toBlob((blob) => {
//       if (!blob) {
//         setError('Unable to capture photo. Please try again.')
//         return
//       }

//       const capturedFile = new File(
//         [blob],
//         `plantcare-capture-${Date.now()}.jpg`,
//         { type: 'image/jpeg' }
//       )

//       selectFile(capturedFile)
//     }, 'image/jpeg', 0.9)
//   }

//   const removeFile = () => {
//     stopCamera()

//     setFile(null)
//     setPreview('')
//     setError('')
//     setLiveResult(null)
//     setLiveInformation(null)
//     setLiveError('')

//     if (fileInputRef.current) {
//       fileInputRef.current.value = ''
//     }
//   }

//   const handleDrop = (event) => {
//     event.preventDefault()
//     setDragging(false)
//     selectFile(event.dataTransfer.files?.[0])
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault()

//     if (!file) {
//       setError('Please select or capture a plant leaf image first.')
//       return
//     }

//     setSubmitting(true)
//     setError('')

//     try {
//       const formData = new FormData()
//       formData.append('file', file)

//       const response = await api.post(
//         '/api/predictions/predict',
//         formData
//       )

//       navigate('/dashboard/analysis', {
//         state: {
//           prediction: response.data.data,
//           diseaseInformation: response.data.disease_information,
//           imagePreview: preview,
//           file,
//         },
//       })
//     } catch (err) {
//       setError(
//         err.response?.data?.detail ||
//         err.response?.data?.message ||
//         'Unable to analyze the image. Please try again.'
//       )
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <div className="mx-auto max-w-5xl space-y-8">
//       <section>
//         <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
//           Plant Diagnosis
//         </span>

//         <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
//           Upload or Capture Your Plant Image
//         </h2>

//         <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
//           Upload a plant leaf image or open your camera for automatic
//           disease analysis using our trained AI model.
//         </p>
//       </section>

//       <section className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-8">
//         <div className="mb-6 flex items-center gap-3">
//           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
//             <ImagePlus size={25} />
//           </div>

//           <div>
//             <h3 className="font-extrabold text-slate-900">Leaf Image</h3>
//             <p className="text-sm text-slate-500">
//               Upload an image or analyze your leaf through the camera
//             </p>
//           </div>
//         </div>

//         <div className="mb-6 grid gap-3 sm:grid-cols-2">
//           <button
//             type="button"
//             onClick={() => fileInputRef.current?.click()}
//             className="flex items-center justify-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-bold text-emerald-700 transition hover:bg-emerald-100"
//           >
//             <Upload size={21} />
//             Browse Images
//           </button>

//           <button
//             type="button"
//             onClick={startCamera}
//             disabled={startingCamera}
//             className="flex items-center justify-center gap-3 rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:opacity-60"
//           >
//             {startingCamera ? (
//               <RefreshCw size={21} className="animate-spin" />
//             ) : (
//               <Camera size={21} />
//             )}
//             {startingCamera ? 'Opening Camera...' : 'Open Camera'}
//           </button>
//         </div>

//         {cameraOpen && (
//           <div className="mb-6 overflow-hidden rounded-2xl border border-emerald-200 bg-slate-950">
//             <div className="flex items-center justify-between p-4 text-white">
//               <span className="flex items-center gap-2 text-sm font-bold">
//                 <Camera size={18} className="text-emerald-400" />
//                 Live Camera Preview
//               </span>

//               <button
//                 type="button"
//                 onClick={stopCamera}
//                 className="rounded-lg p-2 text-white transition hover:bg-white/10"
//                 aria-label="Close camera"
//               >
//                 <CameraOff size={20} />
//               </button>
//             </div>

//             <video
//               ref={videoRef}
//               autoPlay
//               muted
//               playsInline
//               className="max-h-[450px] w-full object-contain"
//             />

//             <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-4">
//               <div className="flex items-center gap-2 text-sm text-emerald-300">
//                 <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
//                 Automatic analysis every 2 seconds
//               </div>

//               <button
//                 type="button"
//                 onClick={capturePhoto}
//                 className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-white transition hover:bg-emerald-600"
//               >
//                 <Camera size={20} />
//                 Capture Photo
//               </button>
//             </div>
//           </div>
//         )}

//         {cameraOpen && (
//           <div className="mb-6 space-y-4">
//             <div className="flex items-center justify-between gap-3">
//               <h3 className="flex items-center gap-2 font-extrabold text-slate-900">
//                 <Activity size={20} className="text-emerald-600" />
//                 Live AI Analysis
//               </h3>

//               <span className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
//                 <RefreshCw
//                   size={14}
//                   className={liveAnalyzing ? 'animate-spin' : ''}
//                 />
//                 {liveAnalyzing ? 'Analyzing frame...' : 'Camera active'}
//               </span>
//             </div>

//             {liveError && (
//               <div
//                 role="alert"
//                 className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700"
//               >
//                 {liveError}
//               </div>
//             )}

//             {liveResult ? (
//               <div className="space-y-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
//                 <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
//                   <div>
//                     <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
//                       Current prediction
//                     </p>
//                     <h4 className="mt-1 text-xl font-black text-slate-900">
//                       {liveResult.predicted_disease}
//                     </h4>
//                     <p className="mt-1 text-xs text-slate-500">
//                       {liveResult.model}
//                     </p>
//                   </div>

//                   <div className="rounded-xl bg-white px-5 py-3 text-center shadow-sm">
//                     <p className="text-xs font-semibold text-slate-500">
//                       Model confidence
//                     </p>
//                     <p className="text-2xl font-black text-emerald-700">
//                       {liveResult.confidence}%
//                     </p>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="mb-3 text-sm font-bold text-slate-800">
//                     Top predictions
//                   </h5>

//                   <div className="space-y-3">
//                     {liveResult.top_predictions?.map((item, index) => (
//                       <div key={`${item.disease}-${index}`}>
//                         <div className="mb-1 flex justify-between gap-3 text-sm">
//                           <span className="font-medium text-slate-700">
//                             {item.disease}
//                           </span>
//                           <span className="font-bold text-emerald-700">
//                             {item.confidence}%
//                           </span>
//                         </div>

//                         <div className="h-2 overflow-hidden rounded-full bg-emerald-100">
//                           <div
//                             className="h-full rounded-full bg-emerald-600 transition-all duration-500"
//                             style={{ width: `${item.confidence}%` }}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {liveInformation && (
//                   <div className="space-y-4 border-t border-emerald-200 pt-4">
//                     <div>
//                       <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
//                         Disease information
//                       </p>
//                       <h5 className="mt-1 font-extrabold text-slate-900">
//                         {liveInformation.disease_name ||
//                           'No specific disease identified'}
//                       </h5>
//                       <p className="mt-1 text-sm text-slate-600">
//                         {liveInformation.overview}
//                       </p>
//                     </div>

//                     {[
//                       {
//                         title: 'Symptoms',
//                         items: liveInformation.symptoms,
//                       },
//                       {
//                         title: 'Causes',
//                         items: liveInformation.causes,
//                       },
//                       {
//                         title: 'Treatment',
//                         items: liveInformation.treatment,
//                       },
//                       {
//                         title: 'Prevention',
//                         items: liveInformation.prevention,
//                       },
//                     ].map((section) => (
//                       <div key={section.title}>
//                         <h6 className="mb-2 text-sm font-bold text-slate-800">
//                           {section.title}
//                         </h6>

//                         {Array.isArray(section.items) ? (
//                           <ul className="space-y-1.5 text-sm leading-6 text-slate-600">
//                             {section.items.map((item, index) => (
//                               <li
//                                 key={`${section.title}-${index}`}
//                                 className="flex gap-2"
//                               >
//                                 <CheckCircle2
//                                   size={16}
//                                   className="mt-1 shrink-0 text-emerald-600"
//                                 />
//                                 {item}
//                               </li>
//                             ))}
//                           </ul>
//                         ) : (
//                           <p className="text-sm leading-6 text-slate-600">
//                             {section.items || 'Information unavailable.'}
//                           </p>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <p className="border-t border-emerald-200 pt-3 text-xs leading-5 text-slate-500">
//                   AI predictions are estimates, not confirmed diagnoses.
//                   Results may change with lighting, focus and leaf position.
//                 </p>
//               </div>
//             ) : (
//               <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 p-8 text-center">
//                 <Activity
//                   size={32}
//                   className="mx-auto text-emerald-600"
//                 />
//                 <p className="mt-3 font-bold text-slate-800">
//                   Waiting for camera analysis
//                 </p>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Keep a leaf clearly visible in front of the camera.
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {!preview && !cameraOpen ? (
//             <div
//               onDragOver={(event) => {
//                 event.preventDefault()
//                 setDragging(true)
//               }}
//               onDragLeave={() => setDragging(false)}
//               onDrop={handleDrop}
//               className={`flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-12 text-center transition duration-300 ${
//                 dragging
//                   ? 'border-emerald-600 bg-emerald-100'
//                   : 'border-emerald-200 bg-emerald-50/60 hover:border-emerald-400 hover:bg-emerald-50'
//               }`}
//             >
//               <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-emerald-600 shadow-md">
//                 <Upload size={34} />
//               </div>

//               <h3 className="mt-6 text-lg font-extrabold text-slate-800">
//                 Drag and drop your leaf image
//               </h3>

//               <p className="mt-2 text-sm text-slate-500">
//                 Or use the Browse Images or Open Camera options above.
//               </p>

//               <p className="mt-5 text-xs text-slate-400">
//                 JPG, JPEG, PNG or WEBP · Maximum 5 MB
//               </p>
//             </div>
//           ) : preview ? (
//             <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-slate-50">
//               <img
//                 src={preview}
//                 alt="Selected or captured plant leaf"
//                 className="max-h-[420px] w-full object-contain"
//               />

//               <button
//                 type="button"
//                 onClick={removeFile}
//                 aria-label="Remove selected image"
//                 className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-red-500 shadow-lg transition hover:bg-red-50"
//               >
//                 <X size={20} />
//               </button>

//               <div className="flex flex-col justify-between gap-3 border-t border-emerald-100 bg-white p-4 sm:flex-row sm:items-center">
//                 <div className="flex items-center gap-3">
//                   <FileImage className="text-emerald-600" size={23} />
//                   <div className="min-w-0">
//                     <p className="truncate text-sm font-bold text-slate-800">
//                       {file?.name}
//                     </p>
//                     <p className="text-xs text-slate-400">
//                       {((file?.size || 0) / (1024 * 1024)).toFixed(2)} MB
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => fileInputRef.current?.click()}
//                   className="rounded-lg border border-emerald-200 px-4 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
//                 >
//                   Replace Image
//                 </button>
//               </div>
//             </div>
//           ) : null}

//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/jpeg,image/png,image/webp"
//             className="hidden"
//             onChange={(event) => {
//               selectFile(event.target.files?.[0])
//               event.target.value = ''
//             }}
//           />

//           {error && (
//             <div
//               role="alert"
//               className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
//             >
//               <AlertCircle size={20} className="shrink-0" />
//               {error}
//             </div>
//           )}

//           <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
//             <div className="flex items-center gap-2 text-xs text-slate-500">
//               <ShieldCheck size={18} className="text-emerald-600" />
//               Secure authenticated image analysis
//             </div>

//             <button
//               type="submit"
//               disabled={!file || submitting}
//               className="inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-600 px-7 py-4 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-1 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
//             >
//               <ScanSearch size={20} />
//               {submitting ? 'Analyzing Image...' : 'Analyze Plant'}
//             </button>
//           </div>
//         </form>
//       </section>

//       <section className="grid gap-5 sm:grid-cols-2">
//         <div className="rounded-2xl border border-emerald-100 bg-white p-5">
//           <div className="flex items-center gap-3">
//             <Leaf className="text-emerald-600" size={24} />
//             <h3 className="font-bold text-slate-800">Image Quality Tips</h3>
//           </div>

//           <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-500">
//             <li>• Capture the leaf in good lighting.</li>
//             <li>• Keep the leaf clearly visible.</li>
//             <li>• Avoid blurry or distant photographs.</li>
//           </ul>
//         </div>

//         <div className="rounded-2xl border border-emerald-100 bg-white p-5">
//           <div className="flex items-center gap-3">
//             <ScanSearch className="text-emerald-600" size={24} />
//             <h3 className="font-bold text-slate-800">Analysis Process</h3>
//           </div>

//           <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-500">
//             <li>• Upload or capture a plant leaf photograph.</li>
//             <li>• AI model analyzes the image.</li>
//             <li>• Live camera updates predictions automatically.</li>
//           </ul>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default CropUpload






// import { useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import {
//   Upload,
//   ImagePlus,
//   X,
//   Leaf,
//   ScanSearch,
//   ShieldCheck,
//   FileImage,
//   AlertCircle,
//   Camera,
//   CameraOff,
//   RefreshCw,
//   Activity,
//   CheckCircle2,
//   Sparkles,
//   Image as ImageIcon,
//   ArrowRight,
//   Eye,
//   CloudUpload,
// } from 'lucide-react'
// import api from '../../services/api'

// const MAX_FILE_SIZE = 5 * 1024 * 1024
// const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
// const LIVE_ANALYSIS_INTERVAL = 2000
// const LIVE_FRAME_MAX_WIDTH = 640

// function CropUpload() {
//   const fileInputRef = useRef(null)
//   const videoRef = useRef(null)
//   const streamRef = useRef(null)
//   const liveRequestRef = useRef(false)

//   const navigate = useNavigate()

//   const [file, setFile] = useState(null)
//   const [preview, setPreview] = useState('')
//   const [error, setError] = useState('')
//   const [dragging, setDragging] = useState(false)
//   const [submitting, setSubmitting] = useState(false)
//   const [cameraOpen, setCameraOpen] = useState(false)
//   const [startingCamera, setStartingCamera] = useState(false)

//   const [liveResult, setLiveResult] = useState(null)
//   const [liveInformation, setLiveInformation] = useState(null)
//   const [liveError, setLiveError] = useState('')
//   const [liveAnalyzing, setLiveAnalyzing] = useState(false)

//   useEffect(() => {
//     return () => {
//       streamRef.current?.getTracks().forEach((track) => track.stop())
//     }
//   }, [])

//   useEffect(() => {
//     return () => {
//       if (preview) URL.revokeObjectURL(preview)
//     }
//   }, [preview])

//   useEffect(() => {
//     if (!cameraOpen || !videoRef.current || !streamRef.current) {
//       return undefined
//     }

//     let intervalId = null
//     let cancelled = false

//     const video = videoRef.current
//     video.srcObject = streamRef.current

//     const analyzeLiveFrame = async () => {
//       if (
//         cancelled ||
//         liveRequestRef.current ||
//         video.readyState < 2 ||
//         !video.videoWidth ||
//         !video.videoHeight
//       ) {
//         return
//       }

//       liveRequestRef.current = true

//       if (!cancelled) {
//         setLiveAnalyzing(true)
//         setLiveError('')
//       }

//       try {
//         const scale = Math.min(1, LIVE_FRAME_MAX_WIDTH / video.videoWidth)

//         const canvas = document.createElement('canvas')
//         canvas.width = Math.round(video.videoWidth * scale)
//         canvas.height = Math.round(video.videoHeight * scale)

//         const context = canvas.getContext('2d')

//         if (!context) {
//           throw new Error('Unable to process camera frame.')
//         }

//         context.drawImage(video, 0, 0, canvas.width, canvas.height)

//         const blob = await new Promise((resolve) => {
//           canvas.toBlob(resolve, 'image/jpeg', 0.75)
//         })

//         if (!blob) {
//           throw new Error('Unable to capture camera frame.')
//         }

//         const frameFile = new File(
//           [blob],
//           `plantcare-live-${Date.now()}.jpg`,
//           { type: 'image/jpeg' }
//         )

//         const formData = new FormData()
//         formData.append('file', frameFile)

//         const response = await api.post(
//           '/api/predictions/live-predict',
//           formData
//         )

//         if (!cancelled && response.data.success) {
//           setLiveResult(response.data.data)
//           setLiveInformation(response.data.disease_information)
//           setLiveError('')
//         }
//       } catch (err) {
//         if (!cancelled) {
//           setLiveError(
//             err.response?.data?.detail ||
//             'Unable to analyze camera frame. Checking again...'
//           )
//         }
//       } finally {
//         liveRequestRef.current = false

//         if (!cancelled) {
//           setLiveAnalyzing(false)
//         }
//       }
//     }

//     const startLiveAnalysis = async () => {
//       try {
//         await video.play()

//         if (cancelled) return

//         analyzeLiveFrame()
//         intervalId = window.setInterval(
//           analyzeLiveFrame,
//           LIVE_ANALYSIS_INTERVAL
//         )
//       } catch {
//         if (!cancelled) {
//           setLiveError('Unable to start camera preview.')
//         }
//       }
//     }

//     startLiveAnalysis()

//     return () => {
//       cancelled = true

//       if (intervalId) {
//         window.clearInterval(intervalId)
//       }
//     }
//   }, [cameraOpen])

//   const stopCamera = () => {
//     streamRef.current?.getTracks().forEach((track) => track.stop())
//     streamRef.current = null
//     setCameraOpen(false)
//     setLiveAnalyzing(false)
//   }

//   const selectFile = (selectedFile) => {
//     setError('')

//     if (!selectedFile) return

//     if (!ALLOWED_TYPES.includes(selectedFile.type)) {
//       setError('Please select a JPG, JPEG, PNG or WEBP image.')
//       return
//     }

//     if (selectedFile.size > MAX_FILE_SIZE) {
//       setError('Image size must not exceed 5 MB.')
//       return
//     }

//     stopCamera()
//     setLiveResult(null)
//     setLiveInformation(null)
//     setLiveError('')

//     setFile(selectedFile)
//     setPreview(URL.createObjectURL(selectedFile))
//   }

//   const startCamera = async () => {
//     setError('')
//     setLiveError('')
//     setLiveResult(null)
//     setLiveInformation(null)
//     setStartingCamera(true)

//     try {
//       if (!navigator.mediaDevices?.getUserMedia) {
//         throw new Error(
//           'Camera access is unavailable. Use HTTPS or localhost and a supported browser.'
//         )
//       }

//       stopCamera()

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           facingMode: { ideal: 'environment' },
//           width: { ideal: 1280 },
//           height: { ideal: 720 },
//         },
//         audio: false,
//       })

//       streamRef.current = stream
//       setCameraOpen(true)
//     } catch (err) {
//       setError(
//         err.name === 'NotAllowedError'
//           ? 'Camera permission denied. Please allow camera access in your browser.'
//           : err.message || 'Unable to access camera. Please check your device.'
//       )
//     } finally {
//       setStartingCamera(false)
//     }
//   }

//   const capturePhoto = () => {
//     const video = videoRef.current

//     if (!video || !video.videoWidth || !video.videoHeight) {
//       setError('Camera is not ready. Please try again.')
//       return
//     }

//     const canvas = document.createElement('canvas')
//     canvas.width = video.videoWidth
//     canvas.height = video.videoHeight

//     const context = canvas.getContext('2d')
//     context.drawImage(video, 0, 0, canvas.width, canvas.height)

//     canvas.toBlob((blob) => {
//       if (!blob) {
//         setError('Unable to capture photo. Please try again.')
//         return
//       }

//       const capturedFile = new File(
//         [blob],
//         `plantcare-capture-${Date.now()}.jpg`,
//         { type: 'image/jpeg' }
//       )

//       selectFile(capturedFile)
//     }, 'image/jpeg', 0.9)
//   }

//   const removeFile = () => {
//     stopCamera()

//     setFile(null)
//     setPreview('')
//     setError('')
//     setLiveResult(null)
//     setLiveInformation(null)
//     setLiveError('')

//     if (fileInputRef.current) {
//       fileInputRef.current.value = ''
//     }
//   }

//   const handleDrop = (event) => {
//     event.preventDefault()
//     setDragging(false)
//     selectFile(event.dataTransfer.files?.[0])
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault()

//     if (!file) {
//       setError('Please select or capture a plant leaf image first.')
//       return
//     }

//     setSubmitting(true)
//     setError('')

//     try {
//       const formData = new FormData()
//       formData.append('file', file)

//       const response = await api.post(
//         '/api/predictions/predict',
//         formData
//       )

//       navigate('/dashboard/analysis', {
//         state: {
//           prediction: response.data.data,
//           diseaseInformation: response.data.disease_information,
//           imagePreview: preview,
//           file,
//         },
//       })
//     } catch (err) {
//       setError(
//         err.response?.data?.detail ||
//         err.response?.data?.message ||
//         'Unable to analyze the image. Please try again.'
//       )
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   const topPredictions = liveResult?.top_predictions || []

//   return (
//     <div className="mx-auto max-w-6xl space-y-4 pb-5">

//       {/* Plant Health Scanner Header */}
//       <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-green-700 px-4 py-3 text-white shadow-lg shadow-emerald-900/10 sm:px-5 sm:py-3.5">
//         <div className="pointer-events-none absolute -right-10 -top-20 h-48 w-48 rounded-full border border-white/10" />
//         <div className="pointer-events-none absolute -right-2 -top-12 h-32 w-32 rounded-full border border-white/10" />
//         <div className="pointer-events-none absolute bottom-0 right-24 h-24 w-24 rounded-full bg-emerald-400/10 blur-3xl" />

//         <div className="relative flex flex-wrap items-center justify-between gap-3">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 shadow-inner backdrop-blur sm:h-11 sm:w-11">
//               <Leaf size={23} className="text-emerald-200" />
//             </div>

//             <div>
//               <div className="mb-0.5 flex flex-wrap items-center gap-2">
//                 <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-200">
//                   PlantCare AI
//                 </span>
//                 <span className="rounded-full border border-emerald-300/30 bg-emerald-400/15 px-2 py-0.5 text-[8px] font-bold text-emerald-100">
//                   SMART DIAGNOSIS
//                 </span>
//               </div>

//               <h2 className="text-lg font-black tracking-tight sm:text-xl">
//                 Plant Health Scanner
//               </h2>

//               <p className="mt-0.5 text-[10px] text-emerald-100/80 sm:text-[11px]">
//                 Upload a leaf image or scan it live with your camera.
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1.5 backdrop-blur">
//             <span className="relative flex h-2 w-2">
//               <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
//               <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
//             </span>
//             <span className="text-[9px] font-semibold text-emerald-50">
//               AI system ready
//             </span>
//           </div>
//         </div>

//         <div className="relative mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-2.5">
//           <div className="flex items-center gap-1.5">
//             <ImageIcon size={14} className="shrink-0 text-emerald-200" />
//             <span className="text-[9px] font-medium text-emerald-50">
//               Image upload
//             </span>
//           </div>

//           <div className="flex items-center gap-1.5">
//             <Camera size={14} className="shrink-0 text-emerald-200" />
//             <span className="text-[9px] font-medium text-emerald-50">
//               Live camera
//             </span>
//           </div>

//           <div className="flex items-center gap-1.5">
//             <BrainCircuitIcon />
//             <span className="text-[9px] font-medium text-emerald-50">
//               AI prediction
//             </span>
//           </div>
//         </div>
//       </section>

//       {/* Main Upload Workspace - Full Width */}
//       <section className="space-y-4">

//         {/* Upload Workspace */}
//         <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
//           <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
//             <div className="flex items-center gap-2.5">
//               <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
//                 <ImagePlus size={19} />
//               </div>
//               <div>
//                 <h3 className="text-sm font-extrabold text-slate-900">
//                   Upload Leaf Image
//                 </h3>
//                 <p className="text-[10px] text-slate-500">
//                   Choose an image or use your camera
//                 </p>
//               </div>
//             </div>

//             <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
//               Max 5 MB
//             </span>
//           </div>

//           <div className="p-4 sm:p-5">

//             {/* Upload Actions */}
//             <div className="mb-3 grid grid-cols-2 gap-2">
//               <button
//                 type="button"
//                 onClick={() => fileInputRef.current?.click()}
//                 className="group flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-xs font-bold text-emerald-800 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-100"
//               >
//                 <Upload size={17} className="transition-transform group-hover:-translate-y-0.5" />
//                 Browse Image
//               </button>

//               <button
//                 type="button"
//                 onClick={startCamera}
//                 disabled={startingCamera}
//                 className="group flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/15 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 disabled:opacity-60"
//               >
//                 {startingCamera ? (
//                   <RefreshCw size={17} className="animate-spin" />
//                 ) : (
//                   <Camera size={17} className="transition-transform group-hover:scale-110" />
//                 )}
//                 {startingCamera ? 'Opening...' : 'Open Camera'}
//               </button>
//             </div>

//             <form onSubmit={handleSubmit}>
//               {/* Drag and Drop */}
//               {!preview && !cameraOpen && (
//                 <div
//                   onDragOver={(event) => {
//                     event.preventDefault()
//                     setDragging(true)
//                   }}
//                   onDragLeave={() => setDragging(false)}
//                   onDrop={handleDrop}
//                   onClick={() => fileInputRef.current?.click()}
//                   role="button"
//                   tabIndex={0}
//                   onKeyDown={(event) => {
//                     if (event.key === 'Enter' || event.key === ' ') {
//                       event.preventDefault()
//                       fileInputRef.current?.click()
//                     }
//                   }}
//                   className={`group relative flex min-h-[230px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed px-4 py-7 text-center transition-all duration-300 ${
//                     dragging
//                       ? 'scale-[0.99] border-emerald-600 bg-emerald-100'
//                       : 'border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-white to-green-50/70 hover:border-emerald-400 hover:shadow-inner'
//                   }`}
//                 >
//                   <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//                     <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-100/70 blur-2xl" />
//                     <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-green-100/70 blur-2xl" />
//                   </div>

//                   <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-600 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-md">
//                     {dragging ? <CloudUpload size={30} /> : <ImagePlus size={29} />}
//                   </div>

//                   <h3 className="relative mt-4 text-sm font-extrabold text-slate-800">
//                     {dragging ? 'Drop your leaf image here' : 'Drag & drop your leaf image'}
//                   </h3>

//                   <p className="relative mt-1 text-[11px] text-slate-500">
//                     Drop your image here or click to browse
//                   </p>

//                   <div className="relative mt-4 flex flex-wrap justify-center gap-1.5">
//                     {['JPG', 'JPEG', 'PNG', 'WEBP'].map((type) => (
//                       <span
//                         key={type}
//                         className="rounded-md border border-emerald-100 bg-white px-2 py-1 text-[9px] font-bold text-slate-500"
//                       >
//                         {type}
//                       </span>
//                     ))}
//                     <span className="rounded-md border border-emerald-100 bg-white px-2 py-1 text-[9px] font-bold text-slate-500">
//                       UP TO 5 MB
//                     </span>
//                   </div>
//                 </div>
//               )}

//               {/* Selected Image */}
//               {preview && (
//                 <div className="overflow-hidden rounded-xl border border-emerald-100 bg-slate-50">
//                   <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2">
//                     <span className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
//                       <Eye size={14} className="text-emerald-600" />
//                       Image preview
//                     </span>
//                     <span className="rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">
//                       IMAGE READY
//                     </span>
//                   </div>

//                   <div className="relative flex min-h-[230px] items-center justify-center bg-gradient-to-br from-slate-100 to-emerald-50 p-3">
//                     <img
//                       src={preview}
//                       alt="Selected or captured plant leaf"
//                       className="max-h-[300px] w-full rounded-lg object-contain animate-in fade-in zoom-in-95 duration-300"
//                     />

//                     <button
//                       type="button"
//                       onClick={removeFile}
//                       aria-label="Remove selected image"
//                       className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-white text-red-500 shadow-sm transition hover:scale-105 hover:bg-red-50"
//                     >
//                       <X size={17} />
//                     </button>
//                   </div>

//                   <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-white px-3 py-2.5">
//                     <div className="flex min-w-0 items-center gap-2">
//                       <FileImage size={18} className="shrink-0 text-emerald-600" />
//                       <div className="min-w-0">
//                         <p className="max-w-[220px] truncate text-[11px] font-bold text-slate-800">
//                           {file?.name}
//                         </p>
//                         <p className="text-[9px] text-slate-400">
//                           {((file?.size || 0) / (1024 * 1024)).toFixed(2)} MB
//                         </p>
//                       </div>
//                     </div>

//                     <button
//                       type="button"
//                       onClick={() => fileInputRef.current?.click()}
//                       className="rounded-lg border border-emerald-200 px-3 py-1.5 text-[10px] font-bold text-emerald-700 transition hover:bg-emerald-50"
//                     >
//                       Replace Image
//                     </button>
//                   </div>
//                 </div>
//               )}

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/jpeg,image/png,image/webp"
//                 className="hidden"
//                 onChange={(event) => {
//                   selectFile(event.target.files?.[0])
//                   event.target.value = ''
//                 }}
//               />

//               {error && (
//                 <div
//                   role="alert"
//                   className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-[11px] leading-5 text-red-700 animate-in fade-in slide-in-from-top-2 duration-200"
//                 >
//                   <AlertCircle size={16} className="mt-0.5 shrink-0" />
//                   {error}
//                 </div>
//               )}

//               {/* Submit */}
//               <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
//                 <div className="flex items-center gap-2">
//                   <ShieldCheck size={17} className="text-emerald-600" />
//                   <span className="text-[10px] font-medium text-slate-500">
//                     Secure image processing
//                   </span>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={!file || submitting}
//                   className="group inline-flex min-w-[155px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-3 text-xs font-extrabold text-white shadow-md shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-600/25 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
//                 >
//                   {submitting ? (
//                     <RefreshCw size={16} className="animate-spin" />
//                   ) : (
//                     <ScanSearch size={17} className="transition-transform group-hover:scale-110" />
//                   )}
//                   {submitting ? 'Analyzing...' : 'Analyze Plant'}
//                   {!submitting && <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Camera Workspace */}
//       {cameraOpen && (
//         <section className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-300">
//           <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
//             <div className="flex items-center gap-2.5">
//               <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-emerald-300">
//                 <Camera size={18} />
//               </div>
//               <div>
//                 <h3 className="text-sm font-extrabold text-slate-900">
//                   Live Camera Scanner
//                 </h3>
//                 <p className="text-[10px] text-slate-500">
//                   Automatic AI analysis every 2 seconds
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700">
//                 <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
//                 LIVE
//               </span>
//               <button
//                 type="button"
//                 onClick={stopCamera}
//                 className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
//                 aria-label="Close camera"
//               >
//                 <CameraOff size={16} />
//               </button>
//             </div>
//           </div>

//           <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
//             <div className="relative flex min-h-[230px] items-center justify-center bg-slate-950 p-2">
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 muted
//                 playsInline
//                 className="max-h-[340px] w-full rounded-lg object-contain"
//               />

//               <div className="pointer-events-none absolute inset-5 rounded-xl border border-emerald-400/30">
//                 <span className="absolute left-0 top-0 h-5 w-5 rounded-tl-lg border-l-2 border-t-2 border-emerald-400" />
//                 <span className="absolute right-0 top-0 h-5 w-5 rounded-tr-lg border-r-2 border-t-2 border-emerald-400" />
//                 <span className="absolute bottom-0 left-0 h-5 w-5 rounded-bl-lg border-b-2 border-l-2 border-emerald-400" />
//                 <span className="absolute bottom-0 right-0 h-5 w-5 rounded-br-lg border-b-2 border-r-2 border-emerald-400" />
//               </div>

//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[9px] font-medium text-white backdrop-blur">
//                 Position the leaf inside the frame
//               </div>
//             </div>

//             <div className="min-w-0 p-4 sm:p-5">
//               <div className="mb-3 flex items-center justify-between gap-2">
//                 <h3 className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
//                   <BrainCircuitIcon />
//                   Live AI Analysis
//                 </h3>

//                 <span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-700">
//                   <RefreshCw size={12} className={liveAnalyzing ? 'animate-spin' : ''} />
//                   {liveAnalyzing ? 'Processing' : 'Monitoring'}
//                 </span>
//               </div>

//               {liveError && (
//                 <div
//                   role="alert"
//                   className="mb-3 rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-[10px] leading-4 text-amber-800"
//                 >
//                   {liveError}
//                 </div>
//               )}

//               {liveResult ? (
//                 <div className="space-y-3 animate-in fade-in duration-300">
//                   <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
//                     <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">
//                       Current prediction
//                     </p>
//                     <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
//                       <h4 className="min-w-0 break-words text-sm font-black text-slate-900">
//                         {liveResult.predicted_disease}
//                       </h4>
//                       <span className="rounded-lg bg-white px-2.5 py-1.5 text-sm font-black text-emerald-700 shadow-sm">
//                         {liveResult.confidence}%
//                       </span>
//                     </div>
//                     <p className="mt-1 text-[9px] text-slate-500">
//                       {liveResult.model}
//                     </p>
//                   </div>

//                   <div>
//                     <h5 className="mb-2 text-[10px] font-extrabold text-slate-800">
//                       Top predictions
//                     </h5>
//                     <div className="space-y-2">
//                       {topPredictions.map((item, index) => (
//                         <div key={`${item.disease}-${index}`}>
//                           <div className="mb-1 flex items-center justify-between gap-2">
//                             <span className="truncate text-[10px] font-medium text-slate-700">
//                               {item.disease}
//                             </span>
//                             <span className="text-[10px] font-bold text-emerald-700">
//                               {item.confidence}%
//                             </span>
//                           </div>
//                           <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
//                             <div
//                               className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-lime-400 transition-all duration-700"
//                               style={{
//                                 width: `${Math.min(100, Math.max(0, Number(item.confidence) || 0))}%`,
//                               }}
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {liveInformation && (
//                     <div className="space-y-2 border-t border-slate-100 pt-3">
//                       <div>
//                         <h5 className="text-[10px] font-extrabold text-slate-800">
//                           {liveInformation.disease_name || 'Disease information'}
//                         </h5>
//                         <p className="mt-1 text-[10px] leading-4 text-slate-500">
//                           {liveInformation.overview}
//                         </p>
//                       </div>

//                       <div className="grid grid-cols-2 gap-2">
//                         {[
//                           { title: 'Symptoms', items: liveInformation.symptoms },
//                           { title: 'Causes', items: liveInformation.causes },
//                           { title: 'Treatment', items: liveInformation.treatment },
//                           { title: 'Prevention', items: liveInformation.prevention },
//                         ].map((section) => (
//                           <div key={section.title} className="rounded-lg bg-slate-50 p-2">
//                             <h6 className="mb-1 text-[9px] font-extrabold text-slate-700">
//                               {section.title}
//                             </h6>
//                             {Array.isArray(section.items) ? (
//                               <ul className="space-y-1">
//                                 {section.items.slice(0, 2).map((item, index) => (
//                                   <li
//                                     key={`${section.title}-${index}`}
//                                     className="flex items-start gap-1 text-[9px] leading-4 text-slate-500"
//                                   >
//                                     <CheckCircle2 size={10} className="mt-0.5 shrink-0 text-emerald-600" />
//                                     {item}
//                                   </li>
//                                 ))}
//                               </ul>
//                             ) : (
//                               <p className="text-[9px] leading-4 text-slate-500">
//                                 {section.items || 'Information unavailable.'}
//                               </p>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <p className="text-[9px] leading-4 text-slate-400">
//                     AI predictions are estimates and may change with lighting, focus and leaf position.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="flex min-h-[190px] flex-col items-center justify-center rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 px-4 py-6 text-center">
//                   <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
//                     <Activity size={23} className={liveAnalyzing ? 'animate-pulse' : ''} />
//                   </div>
//                   <p className="mt-3 text-xs font-extrabold text-slate-800">
//                     Waiting for camera analysis
//                   </p>
//                   <p className="mt-1 max-w-[220px] text-[10px] leading-4 text-slate-500">
//                     Keep a leaf clearly visible in front of your camera.
//                   </p>
//                   {liveAnalyzing && (
//                     <div className="mt-3 h-1 w-28 overflow-hidden rounded-full bg-emerald-100">
//                       <div className="h-full w-1/2 animate-pulse rounded-full bg-emerald-500" />
//                     </div>
//                   )}
//                 </div>
//               )}

//               <button
//                 type="button"
//                 onClick={capturePhoto}
//                 className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-emerald-700"
//               >
//                 <Camera size={15} />
//                 Capture This Leaf
//               </button>
//             </div>
//           </div>
//         </section>
//       )}

//         {/* Information Cards - Below Upload Workspace */}
//         <aside className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

//           {/* How It Works */}
//           <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
//             <div className="border-b border-slate-100 px-4 py-3">
//               <div className="flex items-center gap-2">
//                 <Sparkles size={16} className="text-emerald-600" />
//                 <h3 className="text-xs font-extrabold text-slate-900">
//                   How it works
//                 </h3>
//               </div>
//             </div>

//             <div className="space-y-3 p-4">
//               {[
//                 {
//                   number: '01',
//                   icon: ImagePlus,
//                   title: 'Upload a leaf',
//                   description: 'Choose a clear plant leaf image.',
//                 },
//                 {
//                   number: '02',
//                   icon: ScanSearch,
//                   title: 'AI scans the image',
//                   description: 'The trained model analyzes visual patterns.',
//                 },
//                 {
//                   number: '03',
//                   icon: Activity,
//                   title: 'View your results',
//                   description: 'Get a prediction and plant-care guidance.',
//                 },
//               ].map((step, index) => {
//                 const StepIcon = step.icon

//                 return (
//                   <div key={step.number} className="flex items-start gap-3">
//                     <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
//                       <StepIcon size={17} />
//                       {index !== 2 && (
//                         <span className="absolute -bottom-3.5 left-1/2 h-3 w-px -translate-x-1/2 bg-emerald-200" />
//                       )}
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <div className="flex items-center gap-2">
//                         <span className="text-[9px] font-black text-emerald-600">
//                           {step.number}
//                         </span>
//                         <h4 className="text-[11px] font-bold text-slate-800">
//                           {step.title}
//                         </h4>
//                       </div>
//                       <p className="mt-0.5 text-[10px] leading-4 text-slate-500">
//                         {step.description}
//                       </p>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>

//           {/* Better Image Tips */}
//           <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4">
//             <div className="flex items-center gap-2">
//               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
//                 <Leaf size={17} />
//               </div>
//               <h3 className="text-xs font-extrabold text-slate-900">
//                 Better image, better results
//               </h3>
//             </div>

//             <ul className="mt-3 space-y-2">
//               {[
//                 'Use natural and even lighting.',
//                 'Keep the leaf clearly visible.',
//                 'Avoid blurry photographs.',
//                 'Capture visible affected areas.',
//               ].map((tip) => (
//                 <li
//                   key={tip}
//                   className="flex items-start gap-2 text-[10px] leading-4 text-slate-600"
//                 >
//                   <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-600" />
//                   {tip}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Responsible AI */}
//           <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:col-span-2 lg:col-span-1">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
//               <ShieldCheck size={19} />
//             </div>
//             <div>
//               <p className="text-[11px] font-extrabold text-blue-900">
//                 Responsible AI
//               </p>
//               <p className="mt-1 text-[10px] leading-5 text-blue-700">
//                 Predictions are estimates, not confirmed agricultural diagnoses.
//               </p>
//             </div>
//           </div>
//         </aside>
//       </section>

      

//       {/* Footer Note */}
//       <div className="flex flex-wrap items-center justify-between gap-2 px-1">
//         <p className="flex items-center gap-1.5 text-[9px] text-slate-400">
//           <ShieldCheck size={12} className="text-emerald-600" />
//           Your image is processed securely through the PlantCare AI backend.
//         </p>
//         <p className="text-[9px] text-slate-400">
//           MobileNetV3 · AI Plant Classification
//         </p>
//       </div>
//     </div>
//   )
// }

// function BrainCircuitIcon() {
//   return <Activity size={16} className="text-emerald-600" />
// }

// export default CropUpload






import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Upload,
  ImagePlus,
  X,
  Leaf,
  ScanSearch,
  ShieldCheck,
  FileImage,
  AlertCircle,
  Camera,
  CameraOff,
  RefreshCw,
  Activity,
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
  ArrowRight,
  ArrowLeft,
  Eye,
  CloudUpload,
} from 'lucide-react'
import api from '../../services/api'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const LIVE_ANALYSIS_INTERVAL = 2000
const LIVE_FRAME_MAX_WIDTH = 640

function CropUpload() {
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const liveRequestRef = useRef(false)

  const navigate = useNavigate()

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [startingCamera, setStartingCamera] = useState(false)

  const [liveResult, setLiveResult] = useState(null)
  const [liveInformation, setLiveInformation] = useState(null)
  const [liveError, setLiveError] = useState('')
  const [liveAnalyzing, setLiveAnalyzing] = useState(false)

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  useEffect(() => {
    if (!cameraOpen || !videoRef.current || !streamRef.current) {
      return undefined
    }

    let intervalId = null
    let cancelled = false

    const video = videoRef.current
    video.srcObject = streamRef.current

    const analyzeLiveFrame = async () => {
      if (
        cancelled ||
        liveRequestRef.current ||
        video.readyState < 2 ||
        !video.videoWidth ||
        !video.videoHeight
      ) {
        return
      }

      liveRequestRef.current = true

      if (!cancelled) {
        setLiveAnalyzing(true)
        setLiveError('')
      }

      try {
        const scale = Math.min(1, LIVE_FRAME_MAX_WIDTH / video.videoWidth)

        const canvas = document.createElement('canvas')
        canvas.width = Math.round(video.videoWidth * scale)
        canvas.height = Math.round(video.videoHeight * scale)

        const context = canvas.getContext('2d')

        if (!context) {
          throw new Error('Unable to process camera frame.')
        }

        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const blob = await new Promise((resolve) => {
          canvas.toBlob(resolve, 'image/jpeg', 0.75)
        })

        if (!blob) {
          throw new Error('Unable to capture camera frame.')
        }

        const frameFile = new File(
          [blob],
          `plantcare-live-${Date.now()}.jpg`,
          { type: 'image/jpeg' }
        )

        const formData = new FormData()
        formData.append('file', frameFile)

        const response = await api.post(
          '/api/predictions/live-predict',
          formData
        )

        if (!cancelled && response.data.success) {
          setLiveResult(response.data.data)
          setLiveInformation(response.data.disease_information)
          setLiveError('')
        }
      } catch (err) {
        if (!cancelled) {
          setLiveError(
            err.response?.data?.detail ||
            'Unable to analyze camera frame. Checking again...'
          )
        }
      } finally {
        liveRequestRef.current = false

        if (!cancelled) {
          setLiveAnalyzing(false)
        }
      }
    }

    const startLiveAnalysis = async () => {
      try {
        await video.play()

        if (cancelled) return

        analyzeLiveFrame()
        intervalId = window.setInterval(
          analyzeLiveFrame,
          LIVE_ANALYSIS_INTERVAL
        )
      } catch {
        if (!cancelled) {
          setLiveError('Unable to start camera preview.')
        }
      }
    }

    startLiveAnalysis()

    return () => {
      cancelled = true

      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [cameraOpen])

  // Stop camera and its media tracks
  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setCameraOpen(false)
    setLiveAnalyzing(false)
  }

  // Cancel camera without capturing a photo
  const cancelCamera = () => {
    stopCamera()
    setLiveResult(null)
    setLiveInformation(null)
    setLiveError('')
    setError('')
  }

  const selectFile = (selectedFile) => {
    setError('')

    if (!selectedFile) return

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError('Please select a JPG, JPEG, PNG or WEBP image.')
      return
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('Image size must not exceed 5 MB.')
      return
    }

    stopCamera()
    setLiveResult(null)
    setLiveInformation(null)
    setLiveError('')

    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
  }

  const startCamera = async () => {
    setError('')
    setLiveError('')
    setLiveResult(null)
    setLiveInformation(null)
    setStartingCamera(true)

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          'Camera access is unavailable. Use HTTPS or localhost and a supported browser.'
        )
      }

      stopCamera()

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      streamRef.current = stream
      setCameraOpen(true)
    } catch (err) {
      setError(
        err.name === 'NotAllowedError'
          ? 'Camera permission denied. Please allow camera access in your browser.'
          : err.message || 'Unable to access camera. Please check your device.'
      )
    } finally {
      setStartingCamera(false)
    }
  }

  const capturePhoto = () => {
    const video = videoRef.current

    if (!video || !video.videoWidth || !video.videoHeight) {
      setError('Camera is not ready. Please try again.')
      return
    }

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    canvas.toBlob((blob) => {
      if (!blob) {
        setError('Unable to capture photo. Please try again.')
        return
      }

      const capturedFile = new File(
        [blob],
        `plantcare-capture-${Date.now()}.jpg`,
        { type: 'image/jpeg' }
      )

      selectFile(capturedFile)
    }, 'image/jpeg', 0.9)
  }

  const removeFile = () => {
    stopCamera()

    setFile(null)
    setPreview('')
    setError('')
    setLiveResult(null)
    setLiveInformation(null)
    setLiveError('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragging(false)
    selectFile(event.dataTransfer.files?.[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!file) {
      setError('Please select or capture a plant leaf image first.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await api.post(
        '/api/predictions/predict',
        formData
      )

      navigate('/dashboard/analysis', {
        state: {
          prediction: response.data.data,
          diseaseInformation: response.data.disease_information,
          imagePreview: preview,
          file,
        },
      })
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Unable to analyze the image. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const topPredictions = liveResult?.top_predictions || []

  return (
    <div className="mx-auto max-w-6xl space-y-4 pb-5">

      {/* Plant Health Scanner Header */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-green-700 px-4 py-3 text-white shadow-lg shadow-emerald-900/10 sm:px-5 sm:py-3.5">
        <div className="pointer-events-none absolute -right-10 -top-20 h-48 w-48 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-2 -top-12 h-32 w-32 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute bottom-0 right-24 h-24 w-24 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 shadow-inner backdrop-blur sm:h-11 sm:w-11">
              <Leaf size={23} className="text-emerald-200" />
            </div>

            <div>
              <div className="mb-0.5 flex flex-wrap items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-200">
                  PlantCare AI
                </span>
                <span className="rounded-full border border-emerald-300/30 bg-emerald-400/15 px-2 py-0.5 text-[8px] font-bold text-emerald-100">
                  SMART DIAGNOSIS
                </span>
              </div>

              <h2 className="text-lg font-black tracking-tight sm:text-xl">
                Plant Health Scanner
              </h2>

              <p className="mt-0.5 text-[10px] text-emerald-100/80 sm:text-[11px]">
                Upload a leaf image or scan it live with your camera.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1.5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            <span className="text-[9px] font-semibold text-emerald-50">
              AI system ready
            </span>
          </div>
        </div>

        <div className="relative mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-2.5">
          <div className="flex items-center gap-1.5">
            <ImageIcon size={14} className="shrink-0 text-emerald-200" />
            <span className="text-[9px] font-medium text-emerald-50">
              Image upload
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Camera size={14} className="shrink-0 text-emerald-200" />
            <span className="text-[9px] font-medium text-emerald-50">
              Live camera
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <BrainCircuitIcon />
            <span className="text-[9px] font-medium text-emerald-50">
              AI prediction
            </span>
          </div>
        </div>
      </section>

      {/* Main Upload Workspace */}
      <section className="space-y-4">

        {/* Upload Workspace */}
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <ImagePlus size={19} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Upload Leaf Image
                </h3>
                <p className="text-[10px] text-slate-500">
                  Choose an image or use your camera
                </p>
              </div>
            </div>

            <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
              Max 5 MB
            </span>
          </div>

          <div className="p-4 sm:p-5">

            {/* Upload Actions */}
            <div className="mb-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-xs font-bold text-emerald-800 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-100"
              >
                <Upload size={17} className="transition-transform group-hover:-translate-y-0.5" />
                Browse Image
              </button>

              <button
                type="button"
                onClick={startCamera}
                disabled={startingCamera}
                className="group flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/15 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 disabled:opacity-60"
              >
                {startingCamera ? (
                  <RefreshCw size={17} className="animate-spin" />
                ) : (
                  <Camera size={17} className="transition-transform group-hover:scale-110" />
                )}
                {startingCamera ? 'Opening...' : 'Open Camera'}
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Drag and Drop */}
              {!preview && !cameraOpen && (
                <div
                  onDragOver={(event) => {
                    event.preventDefault()
                    setDragging(true)
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      fileInputRef.current?.click()
                    }
                  }}
                  className={`group relative flex min-h-[230px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed px-4 py-7 text-center transition-all duration-300 ${
                    dragging
                      ? 'scale-[0.99] border-emerald-600 bg-emerald-100'
                      : 'border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-white to-green-50/70 hover:border-emerald-400 hover:shadow-inner'
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-100/70 blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-green-100/70 blur-2xl" />
                  </div>

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-600 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-md">
                    {dragging ? <CloudUpload size={30} /> : <ImagePlus size={29} />}
                  </div>

                  <h3 className="relative mt-4 text-sm font-extrabold text-slate-800">
                    {dragging ? 'Drop your leaf image here' : 'Drag & drop your leaf image'}
                  </h3>

                  <p className="relative mt-1 text-[11px] text-slate-500">
                    Drop your image here or click to browse
                  </p>

                  <div className="relative mt-4 flex flex-wrap justify-center gap-1.5">
                    {['JPG', 'JPEG', 'PNG', 'WEBP'].map((type) => (
                      <span
                        key={type}
                        className="rounded-md border border-emerald-100 bg-white px-2 py-1 text-[9px] font-bold text-slate-500"
                      >
                        {type}
                      </span>
                    ))}
                    <span className="rounded-md border border-emerald-100 bg-white px-2 py-1 text-[9px] font-bold text-slate-500">
                      UP TO 5 MB
                    </span>
                  </div>
                </div>
              )}

              {/* Selected Image */}
              {preview && (
                <div className="overflow-hidden rounded-xl border border-emerald-100 bg-slate-50">
                  <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2">
                    <span className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
                      <Eye size={14} className="text-emerald-600" />
                      Image preview
                    </span>
                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">
                      IMAGE READY
                    </span>
                  </div>

                  <div className="relative flex min-h-[230px] items-center justify-center bg-gradient-to-br from-slate-100 to-emerald-50 p-3">
                    <img
                      src={preview}
                      alt="Selected or captured plant leaf"
                      className="max-h-[300px] w-full rounded-lg object-contain animate-in fade-in zoom-in-95 duration-300"
                    />

                    <button
                      type="button"
                      onClick={removeFile}
                      aria-label="Remove selected image"
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-white text-red-500 shadow-sm transition hover:scale-105 hover:bg-red-50"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-white px-3 py-2.5">
                    <div className="flex min-w-0 items-center gap-2">
                      <FileImage size={18} className="shrink-0 text-emerald-600" />
                      <div className="min-w-0">
                        <p className="max-w-[220px] truncate text-[11px] font-bold text-slate-800">
                          {file?.name}
                        </p>
                        <p className="text-[9px] text-slate-400">
                          {((file?.size || 0) / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-lg border border-emerald-200 px-3 py-1.5 text-[10px] font-bold text-emerald-700 transition hover:bg-emerald-50"
                    >
                      Replace Image
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(event) => {
                  selectFile(event.target.files?.[0])
                  event.target.value = ''
                }}
              />

              {error && (
                <div
                  role="alert"
                  className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-[11px] leading-5 text-red-700 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={17} className="text-emerald-600" />
                  <span className="text-[10px] font-medium text-slate-500">
                    Secure image processing
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={!file || submitting}
                  className="group inline-flex min-w-[155px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-3 text-xs font-extrabold text-white shadow-md shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-600/25 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  {submitting ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <ScanSearch size={17} className="transition-transform group-hover:scale-110" />
                  )}
                  {submitting ? 'Analyzing...' : 'Analyze Plant'}
                  {!submitting && <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Camera Workspace */}
        {cameraOpen && (
          <section className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-emerald-300">
                  <Camera size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Live Camera Scanner
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Automatic AI analysis every 2 seconds
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  LIVE
                </span>

                {/* Back to upload button */}
                <button
                  type="button"
                  onClick={cancelCamera}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <ArrowLeft size={14} />
                  Back to Upload
                </button>
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative flex min-h-[230px] items-center justify-center bg-slate-950 p-2">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="max-h-[340px] w-full rounded-lg object-contain"
                />

                <div className="pointer-events-none absolute inset-5 rounded-xl border border-emerald-400/30">
                  <span className="absolute left-0 top-0 h-5 w-5 rounded-tl-lg border-l-2 border-t-2 border-emerald-400" />
                  <span className="absolute right-0 top-0 h-5 w-5 rounded-tr-lg border-r-2 border-t-2 border-emerald-400" />
                  <span className="absolute bottom-0 left-0 h-5 w-5 rounded-bl-lg border-b-2 border-l-2 border-emerald-400" />
                  <span className="absolute bottom-0 right-0 h-5 w-5 rounded-br-lg border-b-2 border-r-2 border-emerald-400" />
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[9px] font-medium text-white backdrop-blur">
                  Position the leaf inside the frame
                </div>
              </div>

              <div className="min-w-0 p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                    <BrainCircuitIcon />
                    Live AI Analysis
                  </h3>

                  <span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-700">
                    <RefreshCw size={12} className={liveAnalyzing ? 'animate-spin' : ''} />
                    {liveAnalyzing ? 'Processing' : 'Monitoring'}
                  </span>
                </div>

                {liveError && (
                  <div
                    role="alert"
                    className="mb-3 rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-[10px] leading-4 text-amber-800"
                  >
                    {liveError}
                  </div>
                )}

                {liveResult ? (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                        Current prediction
                      </p>
                      <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                        <h4 className="min-w-0 break-words text-sm font-black text-slate-900">
                          {liveResult.predicted_disease}
                        </h4>
                        <span className="rounded-lg bg-white px-2.5 py-1.5 text-sm font-black text-emerald-700 shadow-sm">
                          {liveResult.confidence}%
                        </span>
                      </div>
                      <p className="mt-1 text-[9px] text-slate-500">
                        {liveResult.model}
                      </p>
                    </div>

                    <div>
                      <h5 className="mb-2 text-[10px] font-extrabold text-slate-800">
                        Top predictions
                      </h5>
                      <div className="space-y-2">
                        {topPredictions.map((item, index) => (
                          <div key={`${item.disease}-${index}`}>
                            <div className="mb-1 flex items-center justify-between gap-2">
                              <span className="truncate text-[10px] font-medium text-slate-700">
                                {item.disease}
                              </span>
                              <span className="text-[10px] font-bold text-emerald-700">
                                {item.confidence}%
                              </span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-lime-400 transition-all duration-700"
                                style={{
                                  width: `${Math.min(100, Math.max(0, Number(item.confidence) || 0))}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {liveInformation && (
                      <div className="space-y-2 border-t border-slate-100 pt-3">
                        <div>
                          <h5 className="text-[10px] font-extrabold text-slate-800">
                            {liveInformation.disease_name || 'Disease information'}
                          </h5>
                          <p className="mt-1 text-[10px] leading-4 text-slate-500">
                            {liveInformation.overview}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { title: 'Symptoms', items: liveInformation.symptoms },
                            { title: 'Causes', items: liveInformation.causes },
                            { title: 'Treatment', items: liveInformation.treatment },
                            { title: 'Prevention', items: liveInformation.prevention },
                          ].map((section) => (
                            <div key={section.title} className="rounded-lg bg-slate-50 p-2">
                              <h6 className="mb-1 text-[9px] font-extrabold text-slate-700">
                                {section.title}
                              </h6>
                              {Array.isArray(section.items) ? (
                                <ul className="space-y-1">
                                  {section.items.slice(0, 2).map((item, index) => (
                                    <li
                                      key={`${section.title}-${index}`}
                                      className="flex items-start gap-1 text-[9px] leading-4 text-slate-500"
                                    >
                                      <CheckCircle2 size={10} className="mt-0.5 shrink-0 text-emerald-600" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-[9px] leading-4 text-slate-500">
                                  {section.items || 'Information unavailable.'}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-[9px] leading-4 text-slate-400">
                      AI predictions are estimates and may change with lighting, focus and leaf position.
                    </p>
                  </div>
                ) : (
                  <div className="flex min-h-[190px] flex-col items-center justify-center rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 px-4 py-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                      <Activity size={23} className={liveAnalyzing ? 'animate-pulse' : ''} />
                    </div>
                    <p className="mt-3 text-xs font-extrabold text-slate-800">
                      Waiting for camera analysis
                    </p>
                    <p className="mt-1 max-w-[220px] text-[10px] leading-4 text-slate-500">
                      Keep a leaf clearly visible in front of your camera.
                    </p>
                    {liveAnalyzing && (
                      <div className="mt-3 h-1 w-28 overflow-hidden rounded-full bg-emerald-100">
                        <div className="h-full w-1/2 animate-pulse rounded-full bg-emerald-500" />
                      </div>
                    )}
                  </div>
                )}

                {/* Capture and Cancel Actions */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={cancelCamera}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[11px] font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <X size={15} />
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2.5 text-[11px] font-bold text-white transition hover:bg-emerald-700"
                  >
                    <Camera size={15} />
                    Capture Leaf
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Information Cards */}
        <aside className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {/* How It Works */}
          <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-emerald-600" />
                <h3 className="text-xs font-extrabold text-slate-900">
                  How it works
                </h3>
              </div>
            </div>

            <div className="space-y-3 p-4">
              {[
                {
                  number: '01',
                  icon: ImagePlus,
                  title: 'Upload a leaf',
                  description: 'Choose a clear plant leaf image.',
                },
                {
                  number: '02',
                  icon: ScanSearch,
                  title: 'AI scans the image',
                  description: 'The trained model analyzes visual patterns.',
                },
                {
                  number: '03',
                  icon: Activity,
                  title: 'View your results',
                  description: 'Get a prediction and plant-care guidance.',
                },
              ].map((step, index) => {
                const StepIcon = step.icon

                return (
                  <div key={step.number} className="flex items-start gap-3">
                    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <StepIcon size={17} />
                      {index !== 2 && (
                        <span className="absolute -bottom-3.5 left-1/2 h-3 w-px -translate-x-1/2 bg-emerald-200" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-emerald-600">
                          {step.number}
                        </span>
                        <h4 className="text-[11px] font-bold text-slate-800">
                          {step.title}
                        </h4>
                      </div>
                      <p className="mt-0.5 text-[10px] leading-4 text-slate-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Better Image Tips */}
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
                <Leaf size={17} />
              </div>
              <h3 className="text-xs font-extrabold text-slate-900">
                Better image, better results
              </h3>
            </div>

            <ul className="mt-3 space-y-2">
              {[
                'Use natural and even lighting.',
                'Keep the leaf clearly visible.',
                'Avoid blurry photographs.',
                'Capture visible affected areas.',
              ].map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-[10px] leading-4 text-slate-600"
                >
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-600" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Responsible AI */}
          <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:col-span-2 lg:col-span-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
              <ShieldCheck size={19} />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-blue-900">
                Responsible AI
              </p>
              <p className="mt-1 text-[10px] leading-5 text-blue-700">
                Predictions are estimates, not confirmed agricultural diagnoses.
              </p>
            </div>
          </div>
        </aside>
      </section>

      {/* Footer Note */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <p className="flex items-center gap-1.5 text-[9px] text-slate-400">
          <ShieldCheck size={12} className="text-emerald-600" />
          Your image is processed securely through the PlantCare AI backend.
        </p>
        <p className="text-[9px] text-slate-400">
          MobileNetV3 · AI Plant Classification
        </p>
      </div>
    </div>
  )
}

function BrainCircuitIcon() {
  return <Activity size={16} className="text-emerald-600" />
}

export default CropUpload

