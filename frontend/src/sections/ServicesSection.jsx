// import { Link } from 'react-router-dom'
// import {
//   Activity,
//   ArrowRight,
//   BrainCircuit,
//   Camera,
//   HeartPulse,
//   Microscope,
//   ScanLine,
//   Sparkles,
// } from 'lucide-react'

// const services = [
//   {
//     icon: ScanLine,
//     number: '01',
//     title: 'Leaf Image Analysis',
//     description:
//       'Upload a plant leaf image and let our lightweight AI model examine its visual characteristics.',
//   },
//   {
//     icon: BrainCircuit,
//     number: '02',
//     title: 'Disease Prediction',
//     description:
//       'Discover possible plant diseases with prediction scores and useful diagnostic information.',
//   },
//   {
//     icon: Activity,
//     number: '03',
//     title: 'Visual Explanation',
//     description:
//       'Explore heatmap visualizations that highlight image regions influencing the AI prediction.',
//   },
//   {
//     icon: Microscope,
//     number: '04',
//     title: 'Disease Information',
//     description:
//       'Understand common symptoms, possible causes and available treatment recommendations.',
//   },
//   {
//     icon: Camera,
//     number: '05',
//     title: 'Camera Scanning',
//     description:
//       'Capture a leaf image using your device camera and submit it for disease analysis.',
//   },
//   {
//     icon: HeartPulse,
//     number: '06',
//     title: 'Plant Health Guidance',
//     description:
//       'Explore prevention tips and practical guidance to help maintain healthier plants.',
//   },
// ]

// function ServicesSection() {
//   return (
//     <section
//       id="services"
//       className="flex min-h-svh snap-start items-center bg-gradient-to-b from-[#f4fff1] to-white px-5 pb-[3vh] pt-[clamp(4.75rem,12vh,7rem)] sm:px-8"
//     >
//       <div className="mx-auto w-full max-w-7xl">
//         {/* SECTION HEADING */}
//         <div className="mx-auto max-w-3xl text-center">
//           <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
//             Our Features
//           </span>

//           <h2 className="mt-[1.8vh] text-[clamp(1.6rem,min(3.4vw,6vh),3rem)] font-black leading-[1.1] text-slate-900">
//             Smart tools for{' '}
//             <span className="text-emerald-600">healthier plants</span>
//           </h2>

//           {/* hidden on short screens so everything fits */}
//           <p className="mt-[1.5vh] text-[clamp(0.85rem,2vh,1rem)] leading-relaxed text-slate-600 [@media(max-height:700px)]:hidden">
//             Discover a simple AI-powered workflow to analyze plant leaves,
//             explore possible diseases and understand your plant&apos;s health.
//           </p>
//         </div>

//         {/* SERVICE CARDS */}
//         <div className="mt-[3vh] grid gap-[clamp(0.6rem,2vh,1.25rem)] sm:grid-cols-2 lg:grid-cols-3">
//           {services.map((service) => {
//             const Icon = service.icon

//             return (
//               <div
//                 key={service.number}
//                 className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-[clamp(0.9rem,2.4vh,1.75rem)] shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10"
//               >
//                 <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-50 transition group-hover:scale-150" />

//                 <div className="relative flex items-center justify-between">
//                   <div className="flex h-[clamp(2.25rem,6vh,3.25rem)] w-[clamp(2.25rem,6vh,3.25rem)] items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
//                     <Icon className="h-[50%] w-[50%]" />
//                   </div>
//                   <span className="text-sm font-black tracking-widest text-emerald-200">
//                     {service.number}
//                   </span>
//                 </div>

//                 <h3 className="relative mt-[1.6vh] text-[clamp(1rem,2.4vh,1.25rem)] font-extrabold text-slate-900">
//                   {service.title}
//                 </h3>

//                 <p className="relative mt-[0.8vh] text-[clamp(0.78rem,1.8vh,0.95rem)] leading-[1.45] text-slate-600">
//                   {service.description}
//                 </p>

//                 <div className="relative mt-[1.6vh] flex items-center gap-2 text-sm font-bold text-emerald-700 [@media(max-height:760px)]:hidden">
//                   Explore feature
//                   <ArrowRight size={17} className="transition group-hover:translate-x-1" />
//                 </div>
//               </div>
//             )
//           })}
//         </div>

//         {/* COMPACT CTA STRIP */}
//         <div className="mt-[3vh] flex flex-col items-center justify-between gap-4 rounded-[1.5rem] bg-gradient-to-r from-[#103c2b] via-emerald-800 to-emerald-600 px-6 py-[clamp(0.75rem,2.2vh,1.5rem)] text-white shadow-xl shadow-emerald-900/15 sm:flex-row sm:px-8">
//           <div className="flex items-center gap-4 text-center sm:text-left">
//             <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 sm:flex">
//               <Sparkles size={24} />
//             </div>
//             <div>
//               <h3 className="text-[clamp(1rem,2.6vh,1.35rem)] font-black">
//                 A simple way to understand plant health
//               </h3>
//               <p className="text-sm text-emerald-50/90 [@media(max-height:700px)]:hidden">
//                 Capture or upload a leaf image and get an AI-based prediction in a few steps.
//               </p>
//             </div>
//           </div>

//           <div className="flex shrink-0 gap-3">
//             <Link
//               to="/register"
//               className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-[clamp(0.5rem,1.5vh,0.8rem)] text-sm font-bold text-emerald-800! transition hover:-translate-y-0.5 hover:bg-emerald-50"
//             >
//               Get Started <ArrowRight size={17} />
//             </Link>

//             <Link
//               to="/login"
//               className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-[clamp(0.5rem,1.5vh,0.8rem)] text-sm font-bold text-white! transition hover:bg-white/10"
//             >
//               Sign In
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default ServicesSection



import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Camera,
  HeartPulse,
  Microscope,
  ScanLine,
  Sparkles,
} from 'lucide-react'

const services = [
  {
    icon: ScanLine,
    number: '01',
    title: 'Leaf Image Analysis',
    description:
      'Upload a plant leaf image and let our lightweight AI model examine its visual characteristics.',
  },
  {
    icon: BrainCircuit,
    number: '02',
    title: 'Disease Prediction',
    description:
      'Discover possible plant diseases with prediction scores and useful diagnostic information.',
  },
  {
    icon: Activity,
    number: '03',
    title: 'Visual Explanation',
    description:
      'Explore heatmap visualizations that highlight image regions influencing the AI prediction.',
  },
  {
    icon: Microscope,
    number: '04',
    title: 'Disease Information',
    description:
      'Understand common symptoms, possible causes and available treatment recommendations.',
  },
  {
    icon: Camera,
    number: '05',
    title: 'Camera Scanning',
    description:
      'Capture a leaf image using your device camera and submit it for disease analysis.',
  },
  {
    icon: HeartPulse,
    number: '06',
    title: 'Plant Health Guidance',
    description:
      'Explore prevention tips and practical guidance to help maintain healthier plants.',
  },
]

function ServicesSection() {
  return (
    <section
      id="services"
      className="flex min-h-svh snap-start items-center bg-gradient-to-b from-[#f4fff1] to-white px-5 pb-[3vh] pt-[clamp(4.75rem,12vh,7rem)] sm:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* SECTION HEADING */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
            Our Features
          </span>

          <h2 className="mt-[1.8vh] text-[clamp(1.6rem,min(3.4vw,6vh),3rem)] font-black leading-[1.1] text-slate-900">
            Smart tools for{' '}
            <span className="text-emerald-600">healthier plants</span>
          </h2>

          {/* hidden on short screens so everything fits */}
          <p className="mt-[1.5vh] text-[clamp(0.85rem,2vh,1rem)] leading-relaxed text-slate-600 [@media(max-height:700px)]:hidden">
            Discover a simple AI-powered workflow to analyze plant leaves,
            explore possible diseases and understand your plant&apos;s health.
          </p>
        </div>

        {/* SERVICE CARDS */}
        <div className="mt-[3vh] grid gap-[clamp(0.6rem,2vh,1.25rem)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <div
                key={service.number}
                className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-[clamp(0.9rem,2.4vh,1.75rem)] shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-50 transition group-hover:scale-150" />

                <div className="relative flex items-center justify-between">
                  <div className="flex h-[clamp(2.25rem,6vh,3.25rem)] w-[clamp(2.25rem,6vh,3.25rem)] items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon className="h-[50%] w-[50%]" />
                  </div>
                  <span className="text-sm font-black tracking-widest text-emerald-200">
                    {service.number}
                  </span>
                </div>

                <h3 className="relative mt-[1.6vh] text-[clamp(1rem,2.4vh,1.25rem)] font-extrabold text-slate-900">
                  {service.title}
                </h3>

                <p className="relative mt-[0.8vh] text-[clamp(0.78rem,1.8vh,0.95rem)] leading-[1.45] text-slate-600">
                  {service.description}
                </p>

                <div className="relative mt-[1.6vh] flex items-center gap-2 text-sm font-bold text-emerald-700 [@media(max-height:760px)]:hidden">
                  Explore feature
                  <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                </div>
              </div>
            )
          })}
        </div>

        {/* COMPACT CTA STRIP */}
        <div className="mt-[3vh] flex flex-col items-center justify-between gap-4 rounded-[1.5rem] bg-gradient-to-r from-[#103c2b] via-emerald-800 to-emerald-600 px-6 py-[clamp(0.75rem,2.2vh,1.5rem)] text-white shadow-xl shadow-emerald-900/15 sm:flex-row sm:px-8">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 sm:flex">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="text-[clamp(1rem,2.6vh,1.35rem)] font-black">
                A simple way to understand plant health
              </h3>
              <p className="text-sm text-emerald-50/90 [@media(max-height:700px)]:hidden">
                Capture or upload a leaf image and get an AI-based prediction in a few steps.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-3">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-[clamp(0.5rem,1.5vh,0.8rem)] text-sm font-bold text-emerald-800! transition hover:-translate-y-0.5 hover:bg-emerald-50"
            >
              Get Started <ArrowRight size={17} />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-[clamp(0.5rem,1.5vh,0.8rem)] text-sm font-bold text-white! transition hover:bg-white/10"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection