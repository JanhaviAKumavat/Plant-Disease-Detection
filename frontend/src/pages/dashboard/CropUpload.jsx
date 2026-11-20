
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

  // Clean up the camera when the component unmounts.
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  // Clean up previously selected image previews.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  // Start automatic analysis whenever the camera is opened.
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
        // Reduce frame dimensions to keep CPU and network usage low.
        const scale = Math.min(
          1,
          LIVE_FRAME_MAX_WIDTH / video.videoWidth
        )

        const canvas = document.createElement('canvas')
        canvas.width = Math.round(video.videoWidth * scale)
        canvas.height = Math.round(video.videoHeight * scale)

        const context = canvas.getContext('2d')

        if (!context) {
          throw new Error('Unable to process camera frame.')
        }

        context.drawImage(
          video,
          0,
          0,
          canvas.width,
          canvas.height
        )

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

        // Same trained MobileNetV3 model as image upload.
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

        // Analyze immediately, then every two seconds.
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

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setCameraOpen(false)
    setLiveAnalyzing(false)
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

    const imageUrl = URL.createObjectURL(selectedFile)

    setPreview(imageUrl)
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

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section>
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
          Plant Diagnosis
        </span>

        <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
          Upload or Capture Your Plant Image
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          Upload a plant leaf image or open your camera for automatic
          disease analysis using our trained AI model.
        </p>
      </section>

      <section className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <ImagePlus size={25} />
          </div>

          <div>
            <h3 className="font-extrabold text-slate-900">Leaf Image</h3>
            <p className="text-sm text-slate-500">
              Upload an image or analyze your leaf through the camera
            </p>
          </div>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-bold text-emerald-700 transition hover:bg-emerald-100"
          >
            <Upload size={21} />
            Browse Images
          </button>

          <button
            type="button"
            onClick={startCamera}
            disabled={startingCamera}
            className="flex items-center justify-center gap-3 rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {startingCamera ? (
              <RefreshCw size={21} className="animate-spin" />
            ) : (
              <Camera size={21} />
            )}
            {startingCamera ? 'Opening Camera...' : 'Open Camera'}
          </button>
        </div>

        {cameraOpen && (
          <div className="mb-6 overflow-hidden rounded-2xl border border-emerald-200 bg-slate-950">
            <div className="flex items-center justify-between p-4 text-white">
              <span className="flex items-center gap-2 text-sm font-bold">
                <Camera size={18} className="text-emerald-400" />
                Live Camera Preview
              </span>

              <button
                type="button"
                onClick={stopCamera}
                className="rounded-lg p-2 text-white transition hover:bg-white/10"
                aria-label="Close camera"
              >
                <CameraOff size={20} />
              </button>
            </div>

            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="max-h-[450px] w-full object-contain"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-4">
              <div className="flex items-center gap-2 text-sm text-emerald-300">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
                Automatic analysis every 2 seconds
              </div>

              <button
                type="button"
                onClick={capturePhoto}
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-white transition hover:bg-emerald-600"
              >
                <Camera size={20} />
                Capture Photo
              </button>
            </div>
          </div>
        )}

        {cameraOpen && (
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 font-extrabold text-slate-900">
                <Activity size={20} className="text-emerald-600" />
                Live AI Analysis
              </h3>

              <span className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <RefreshCw
                  size={14}
                  className={liveAnalyzing ? 'animate-spin' : ''}
                />
                {liveAnalyzing ? 'Analyzing frame...' : 'Camera active'}
              </span>
            </div>

            {liveError && (
              <div
                role="alert"
                className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700"
              >
                {liveError}
              </div>
            )}

            {liveResult ? (
              <div className="space-y-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Current prediction
                    </p>
                    <h4 className="mt-1 text-xl font-black text-slate-900">
                      {liveResult.predicted_disease}
                    </h4>
                    <p className="mt-1 text-xs text-slate-500">
                      {liveResult.model}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white px-5 py-3 text-center shadow-sm">
                    <p className="text-xs font-semibold text-slate-500">
                      Model confidence
                    </p>
                    <p className="text-2xl font-black text-emerald-700">
                      {liveResult.confidence}%
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="mb-3 text-sm font-bold text-slate-800">
                    Top predictions
                  </h5>

                  <div className="space-y-3">
                    {liveResult.top_predictions?.map((item, index) => (
                      <div key={`${item.disease}-${index}`}>
                        <div className="mb-1 flex justify-between gap-3 text-sm">
                          <span className="font-medium text-slate-700">
                            {item.disease}
                          </span>
                          <span className="font-bold text-emerald-700">
                            {item.confidence}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-emerald-100">
                          <div
                            className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {liveInformation && (
                  <div className="space-y-4 border-t border-emerald-200 pt-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                        Disease information
                      </p>
                      <h5 className="mt-1 font-extrabold text-slate-900">
                        {liveInformation.disease_name ||
                          'No specific disease identified'}
                      </h5>
                      <p className="mt-1 text-sm text-slate-600">
                        {liveInformation.overview}
                      </p>
                    </div>

                    {[
                      {
                        title: 'Symptoms',
                        items: liveInformation.symptoms,
                      },
                      {
                        title: 'Causes',
                        items: liveInformation.causes,
                      },
                      {
                        title: 'Treatment',
                        items: liveInformation.treatment,
                      },
                      {
                        title: 'Prevention',
                        items: liveInformation.prevention,
                      },
                    ].map((section) => (
                      <div key={section.title}>
                        <h6 className="mb-2 text-sm font-bold text-slate-800">
                          {section.title}
                        </h6>

                        {Array.isArray(section.items) ? (
                          <ul className="space-y-1.5 text-sm leading-6 text-slate-600">
                            {section.items.map((item, index) => (
                              <li
                                key={`${section.title}-${index}`}
                                className="flex gap-2"
                              >
                                <CheckCircle2
                                  size={16}
                                  className="mt-1 shrink-0 text-emerald-600"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm leading-6 text-slate-600">
                            {section.items || 'Information unavailable.'}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <p className="border-t border-emerald-200 pt-3 text-xs leading-5 text-slate-500">
                  AI predictions are estimates, not confirmed diagnoses.
                  Results may change with lighting, focus and leaf position.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 p-8 text-center">
                <Activity
                  size={32}
                  className="mx-auto text-emerald-600"
                />
                <p className="mt-3 font-bold text-slate-800">
                  Waiting for camera analysis
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Keep a leaf clearly visible in front of the camera.
                </p>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!preview && !cameraOpen ? (
            <div
              onDragOver={(event) => {
                event.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-12 text-center transition duration-300 ${
                dragging
                  ? 'border-emerald-600 bg-emerald-100'
                  : 'border-emerald-200 bg-emerald-50/60 hover:border-emerald-400 hover:bg-emerald-50'
              }`}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-emerald-600 shadow-md">
                <Upload size={34} />
              </div>

              <h3 className="mt-6 text-lg font-extrabold text-slate-800">
                Drag and drop your leaf image
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Or use the Browse Images or Open Camera options above.
              </p>

              <p className="mt-5 text-xs text-slate-400">
                JPG, JPEG, PNG or WEBP · Maximum 5 MB
              </p>
            </div>
          ) : preview ? (
            <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-slate-50">
              <img
                src={preview}
                alt="Selected or captured plant leaf"
                className="max-h-[420px] w-full object-contain"
              />

              <button
                type="button"
                onClick={removeFile}
                aria-label="Remove selected image"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-red-500 shadow-lg transition hover:bg-red-50"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col justify-between gap-3 border-t border-emerald-100 bg-white p-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <FileImage className="text-emerald-600" size={23} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {file?.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {((file?.size || 0) / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg border border-emerald-200 px-4 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
                >
                  Replace Image
                </button>
              </div>
            </div>
          ) : null}

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
              className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
            >
              <AlertCircle size={20} className="shrink-0" />
              {error}
            </div>
          )}

          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={18} className="text-emerald-600" />
              Secure authenticated image analysis
            </div>

            <button
              type="submit"
              disabled={!file || submitting}
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-600 px-7 py-4 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-1 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <ScanSearch size={20} />
              {submitting ? 'Analyzing Image...' : 'Analyze Plant'}
            </button>
          </div>
        </form>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-100 bg-white p-5">
          <div className="flex items-center gap-3">
            <Leaf className="text-emerald-600" size={24} />
            <h3 className="font-bold text-slate-800">Image Quality Tips</h3>
          </div>

          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-500">
            <li>• Capture the leaf in good lighting.</li>
            <li>• Keep the leaf clearly visible.</li>
            <li>• Avoid blurry or distant photographs.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-white p-5">
          <div className="flex items-center gap-3">
            <ScanSearch className="text-emerald-600" size={24} />
            <h3 className="font-bold text-slate-800">Analysis Process</h3>
          </div>

          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-500">
            <li>• Upload or capture a plant leaf photograph.</li>
            <li>• AI model analyzes the image.</li>
            <li>• Live camera updates predictions automatically.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default CropUpload
