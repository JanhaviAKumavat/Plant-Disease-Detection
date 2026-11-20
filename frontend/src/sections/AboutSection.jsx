// // import { Link } from 'react-router-dom'
// // import {
// //   ArrowRight,
// //   BrainCircuit,
// //   Check,
// //   Droplets,
// //   Leaf,
// //   ShieldCheck,
// //   Sprout,
// // } from 'lucide-react'

// // const benefits = [
// //   'AI-based plant leaf image analysis',
// //   'Disease predictions with confidence scores',
// //   'Visual explanations using heatmaps',
// //   'Useful treatment and prevention information',
// // ]

// // function AboutSection() {
// //   return (
// //     <section
// //       id="about"
// //       className="relative flex min-h-svh snap-start items-center overflow-hidden bg-white px-5 pb-[3vh] pt-[clamp(4.75rem,12vh,7rem)] sm:px-8"
// //     >
// //       <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-lime-100 blur-3xl" />

// //       <div className="relative mx-auto grid w-full max-w-7xl items-center gap-[4vh] md:grid-cols-2 md:gap-12">
// //         {/* LEFT VISUAL */}
// //         <div className="relative h-[clamp(14rem,58vh,30rem)] overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-100 via-lime-100 to-green-200 shadow-xl shadow-emerald-900/10">
// //           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2),transparent_65%)]" />

// //           <div className="relative flex h-full items-center justify-center">
// //             <div className="flex h-[clamp(7rem,26vh,10rem)] w-[clamp(7rem,26vh,10rem)] items-center justify-center rounded-full border border-emerald-300/60 bg-white/70 shadow-2xl shadow-emerald-900/10">
// //               <Sprout strokeWidth={1.2} className="h-[65%] w-[65%] text-emerald-700" />
// //             </div>

// //             <div className="absolute left-5 top-[12%] rounded-2xl border border-white bg-white/90 p-3.5 shadow-lg">
// //               <Leaf className="text-emerald-600" size={26} />
// //             </div>
// //             <div className="absolute right-5 top-[20%] rounded-2xl border border-white bg-white/90 p-3.5 shadow-lg">
// //               <Droplets className="text-sky-600" size={26} />
// //             </div>
// //             <div className="absolute bottom-[10%] left-8 rounded-2xl border border-white bg-white/90 p-3.5 shadow-lg">
// //               <ShieldCheck className="text-emerald-600" size={26} />
// //             </div>
// //             <div className="absolute bottom-[10%] right-8 rounded-2xl border border-white bg-white/90 p-3.5 shadow-lg">
// //               <BrainCircuit className="text-emerald-600" size={26} />
// //             </div>
// //           </div>
// //         </div>

// //         {/* RIGHT CONTENT */}
// //         <div>
// //           <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
// //             About PlantCare
// //           </span>

// //           <h2 className="mt-[2.2vh] text-[clamp(1.7rem,min(3.6vw,6.5vh),3.25rem)] font-black leading-[1.1] text-slate-900">
// //             Helping plants stay
// //             <span className="block text-emerald-600">healthy and strong.</span>
// //           </h2>

// //           <p className="mt-[2.2vh] text-[clamp(0.85rem,2vh,1rem)] leading-relaxed text-slate-600">
// //             PlantCare is an AI-powered plant disease detection platform
// //             designed to make plant health analysis easier and more
// //             understandable.
// //           </p>

// //           {/* hidden on short screens so everything fits */}
// //           <p className="mt-[1.5vh] text-[clamp(0.85rem,2vh,1rem)] leading-relaxed text-slate-600 [@media(max-height:680px)]:hidden">
// //             By analyzing leaf images with a lightweight deep learning model,
// //             the system identifies possible disease categories and provides
// //             useful information to help users understand their plant&apos;s
// //             condition.
// //           </p>

// //           <div className="mt-[2.6vh] space-y-[1.3vh]">
// //             {benefits.map((item) => (
// //               <div key={item} className="flex items-center gap-3">
// //                 <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
// //                   <Check size={15} />
// //                 </span>
// //                 <p className="text-[clamp(0.8rem,1.9vh,0.9rem)] font-semibold text-slate-700">
// //                   {item}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>

// //           <Link
// //             to="/register"
// //             className="mt-[3.4vh] inline-flex items-center gap-3 rounded-full bg-[#0a9a4a] px-7 py-[clamp(0.6rem,1.9vh,1rem)] font-bold text-white! shadow-lg shadow-emerald-600/20 transition hover:-translate-y-1 hover:bg-[#088541]"
// //           >
// //             Discover PlantCare <ArrowRight size={19} />
// //           </Link>
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }

// // export default AboutSection




// import { Link } from 'react-router-dom'
// import {
//   ArrowRight,
//   BrainCircuit,
//   Check,
//   Droplets,
//   Leaf,
//   ShieldCheck,
//   Sprout,
// } from 'lucide-react'

// const benefits = [
//   'AI-based plant leaf image analysis',
//   'Disease predictions with confidence scores',
//   'Visual explanations using heatmaps',
//   'Useful treatment and prevention information',
// ]

// function AboutSection() {
//   return (
//     <section
//       id="about"
//       className="relative flex min-h-svh snap-start items-center overflow-hidden bg-white px-5 pb-[3vh] pt-[clamp(4.75rem,12vh,7rem)] sm:px-8"
//     >
//       <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-lime-100 blur-3xl" />

//       <div className="relative mx-auto grid w-full max-w-7xl items-center gap-[4vh] md:grid-cols-2 md:gap-12">
//         {/* LEFT VISUAL */}
//         <div className="relative h-[clamp(14rem,58vh,30rem)] overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-100 via-lime-100 to-green-200 shadow-xl shadow-emerald-900/10">
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2),transparent_65%)]" />

//           <div className="relative flex h-full items-center justify-center">
//             <div className="flex h-[clamp(7rem,26vh,10rem)] w-[clamp(7rem,26vh,10rem)] items-center justify-center rounded-full border border-emerald-300/60 bg-white/70 shadow-2xl shadow-emerald-900/10">
//               <Sprout strokeWidth={1.2} className="h-[65%] w-[65%] text-emerald-700" />
//             </div>

//             <div className="absolute left-5 top-[12%] rounded-2xl border border-white bg-white/90 p-3.5 shadow-lg">
//               <Leaf className="text-emerald-600" size={26} />
//             </div>
//             <div className="absolute right-5 top-[20%] rounded-2xl border border-white bg-white/90 p-3.5 shadow-lg">
//               <Droplets className="text-sky-600" size={26} />
//             </div>
//             <div className="absolute bottom-[10%] left-8 rounded-2xl border border-white bg-white/90 p-3.5 shadow-lg">
//               <ShieldCheck className="text-emerald-600" size={26} />
//             </div>
//             <div className="absolute bottom-[10%] right-8 rounded-2xl border border-white bg-white/90 p-3.5 shadow-lg">
//               <BrainCircuit className="text-emerald-600" size={26} />
//             </div>
//           </div>
//         </div>

//         {/* RIGHT CONTENT */}
//         <div>
//           <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
//             About PlantCare
//           </span>

//           <h2 className="mt-[2.2vh] text-[clamp(1.7rem,min(3.6vw,6.5vh),3.25rem)] font-black leading-[1.1] text-slate-900">
//             Helping plants stay
//             <span className="block text-emerald-600">healthy and strong.</span>
//           </h2>

//           <p className="mt-[2.2vh] text-[clamp(0.85rem,2vh,1rem)] leading-relaxed text-slate-600">
//             PlantCare is an AI-powered plant disease detection platform
//             designed to make plant health analysis easier and more
//             understandable.
//           </p>

//           {/* hidden on short screens so everything fits */}
//           <p className="mt-[1.5vh] text-[clamp(0.85rem,2vh,1rem)] leading-relaxed text-slate-600 [@media(max-height:680px)]:hidden">
//             By analyzing leaf images with a lightweight deep learning model,
//             the system identifies possible disease categories and provides
//             useful information to help users understand their plant&apos;s
//             condition.
//           </p>

//           <div className="mt-[2.6vh] space-y-[1.3vh]">
//             {benefits.map((item) => (
//               <div key={item} className="flex items-center gap-3">
//                 <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
//                   <Check size={15} />
//                 </span>
//                 <p className="text-[clamp(0.8rem,1.9vh,0.9rem)] font-semibold text-slate-700">
//                   {item}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <Link
//             to="/register"
//             className="mt-[3.4vh] inline-flex items-center gap-3 rounded-full bg-[#0a9a4a] px-7 py-[clamp(0.6rem,1.9vh,1rem)] font-bold text-white! shadow-lg shadow-emerald-600/20 transition hover:-translate-y-1 hover:bg-[#088541]"
//           >
//             Discover PlantCare <ArrowRight size={19} />
//           </Link>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default AboutSection



import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Droplets,
  Leaf,
  ShieldCheck,
} from 'lucide-react'

const benefits = [
  'AI-based plant leaf image analysis',
  'Disease predictions with confidence scores',
  'Visual explanations using heatmaps',
  'Useful treatment and prevention information',
]

function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-svh snap-start items-center overflow-hidden bg-white px-5 pb-[3vh] pt-[clamp(4.75rem,12vh,7rem)] sm:px-8"
    >
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-lime-100 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-[4vh] md:grid-cols-2 md:gap-12">
        {/* LEFT VISUAL - LEAF IMAGE */}
        <div className="relative h-[clamp(14rem,58vh,30rem)] overflow-hidden rounded-[2rem] border-4 border-white bg-emerald-100 shadow-xl shadow-emerald-900/15">
          <img
            src="/images/leafAbout.png"
            alt="Plant leaves showing disease spots"
            className="h-full w-full object-cover object-[center_30%]"
          />

          {/* soft green tint so the icons stay readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/25 via-transparent to-emerald-100/10" />

          <div className="absolute left-5 top-[10%] rounded-2xl border border-white bg-white/90 p-3.5 shadow-lg backdrop-blur-sm">
            <Leaf className="text-emerald-600" size={26} />
          </div>
          <div className="absolute right-5 top-[18%] rounded-2xl border border-white bg-white/90 p-3.5 shadow-lg backdrop-blur-sm">
            <Droplets className="text-sky-600" size={26} />
          </div>
          <div className="absolute bottom-[10%] left-6 rounded-2xl border border-white bg-white/90 p-3.5 shadow-lg backdrop-blur-sm">
            <ShieldCheck className="text-emerald-600" size={26} />
          </div>
          <div className="absolute bottom-[10%] right-6 rounded-2xl border border-white bg-white/90 p-3.5 shadow-lg backdrop-blur-sm">
            <BrainCircuit className="text-emerald-600" size={26} />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
            About PlantCare
          </span>

          <h2 className="mt-[2.2vh] text-[clamp(1.7rem,min(3.6vw,6.5vh),3.25rem)] font-black leading-[1.1] text-slate-900">
            Helping plants stay
            <span className="block text-emerald-600">healthy and strong.</span>
          </h2>

          <p className="mt-[2.2vh] text-[clamp(0.85rem,2vh,1rem)] leading-relaxed text-slate-600">
            PlantCare is an AI-powered plant disease detection platform
            designed to make plant health analysis easier and more
            understandable.
          </p>

          {/* hidden on short screens so everything fits */}
          <p className="mt-[1.5vh] text-[clamp(0.85rem,2vh,1rem)] leading-relaxed text-slate-600 [@media(max-height:680px)]:hidden">
            By analyzing leaf images with a lightweight deep learning model,
            the system identifies possible disease categories and provides
            useful information to help users understand their plant&apos;s
            condition.
          </p>

          <div className="mt-[2.6vh] space-y-[1.3vh]">
            {benefits.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check size={15} />
                </span>
                <p className="text-[clamp(0.8rem,1.9vh,0.9rem)] font-semibold text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/register"
            className="mt-[3.4vh] inline-flex items-center gap-3 rounded-full bg-[#0a9a4a] px-7 py-[clamp(0.6rem,1.9vh,1rem)] font-bold text-white! shadow-lg shadow-emerald-600/20 transition hover:-translate-y-1 hover:bg-[#088541]"
          >
            Discover PlantCare <ArrowRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutSection