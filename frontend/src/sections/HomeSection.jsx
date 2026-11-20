// import { Link } from 'react-router-dom'
// import {
//   Activity,
//   ArrowRight,
//   BrainCircuit,
//   Check,
//   CirclePlay,
//   Leaf,
//   MousePointer2,
//   ScanLine,
//   ShieldCheck,
//   Sprout,
//   Zap,
// } from 'lucide-react'

// const highlights = [
//   { icon: Zap, title: 'Instant', subtitle: 'Diagnosis' },
//   { icon: BrainCircuit, title: 'AI Powered', subtitle: 'Analysis' },
//   { icon: ShieldCheck, title: 'Healthy', subtitle: 'Plants' },
//   { icon: Sprout, title: 'Greener', subtitle: 'Tomorrow' },
// ]

// /* One scanning-bracket corner */
// function Corner({ className }) {
//   return (
//     <span
//       className={`absolute h-14 w-14 border-[#7dffb4] drop-shadow-[0_0_8px_rgba(74,255,150,0.95)] ${className}`}
//     />
//   )
// }

// function HomeSection() {
//   return (
//     <section
//       id="home"
//       className="relative isolate flex min-h-svh snap-start items-center overflow-hidden bg-[#f4ffee]"
//     >
//       {/* ───────── FULL BACKGROUND PHOTO + SCAN RING ───────── */}
//       <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
//         {/* "stage" keeps the photo and the ring locked together at any screen size */}
//         <div className="absolute left-1/2 top-0 aspect-[3/2] h-full -translate-x-[64.5%] lg:left-auto lg:right-0 lg:translate-x-0">
//           <img
//             src="/images/plant-disease-hero.png"
//             alt="Plant leaf showing disease symptoms"
//             className="h-full w-full select-none object-cover saturate-[1.12]"
//             style={{
//               WebkitMaskImage:
//                 'linear-gradient(to right, transparent 0%, #000 24%)',
//               maskImage: 'linear-gradient(to right, transparent 0%, #000 24%)',
//             }}
//             draggable="false"
//           />

//           {/* AI scanning ring (desktop only) */}
//           <div className="absolute left-[64.5%] top-1/2 hidden aspect-square w-[56%] -translate-x-1/2 -translate-y-1/2 lg:block">
//             {/* outer rings */}
//             <div className="absolute inset-0 rounded-full border border-emerald-200/70 bg-emerald-200/5 shadow-[0_0_60px_rgba(110,255,170,0.35),inset_0_0_60px_rgba(110,255,170,0.25)]" />
//             <div className="absolute inset-[3.5%] rounded-full border border-emerald-100/70" />

//             {/* ticks ring */}
//             <div className="absolute inset-[6%] animate-[spin_60s_linear_infinite] rounded-full border-[3px] border-dotted border-emerald-100/40" />

//             {/* faint scan grid */}
//             <div
//               className="absolute inset-[9%] rounded-full opacity-40"
//               style={{
//                 backgroundImage:
//                   'linear-gradient(rgba(190,255,215,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(190,255,215,0.35) 1px, transparent 1px)',
//                 backgroundSize: '34px 34px',
//                 WebkitMaskImage:
//                   'radial-gradient(circle, #000 55%, transparent 72%)',
//                 maskImage: 'radial-gradient(circle, #000 55%, transparent 72%)',
//               }}
//             />

//             {/* scanning brackets */}
//             <div className="absolute inset-x-[8%] bottom-[16%] top-[13%]">
//               <Corner className="left-0 top-0 rounded-tl-2xl border-l-[5px] border-t-[5px]" />
//               <Corner className="right-0 top-0 rounded-tr-2xl border-r-[5px] border-t-[5px]" />
//               <Corner className="bottom-0 left-0 rounded-bl-2xl border-b-[5px] border-l-[5px]" />
//               <Corner className="bottom-0 right-0 rounded-br-2xl border-b-[5px] border-r-[5px]" />
//             </div>

//             {/* cursor */}
//             <MousePointer2
//               size={40}
//               strokeWidth={1.5}
//               className="absolute left-[89%] top-[27%] -rotate-12 fill-white text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
//             />
//             <span className="absolute left-[96%] top-[29%] h-3 w-3 rounded-full bg-white shadow-[0_0_14px_4px_rgba(255,255,255,0.9)]" />

//             {/* AI chip */}
//             <div className="absolute left-[80%] top-[72%] flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-emerald-200/60 bg-emerald-900/30 text-white shadow-[0_0_30px_rgba(74,255,150,0.55)] backdrop-blur-md">
//               <BrainCircuit size={38} strokeWidth={1.6} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ───────── LEFT WHITE FADE (makes text readable) ───────── */}
//       <div className="pointer-events-none absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#fbfff8] from-0% via-[#f8fff2]/90 via-32% to-transparent to-62% lg:block" />
//       {/* mobile / tablet overlay */}
//       <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/85 via-white/70 to-white/40 lg:hidden" />
//       {/* soft top haze under the navbar */}
//       <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-white/70 to-transparent" />
//       {/* bottom green vignette */}
//       <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-emerald-900/20 to-transparent" />

//       {/* ───────── LEFT CONTENT ───────── */}
//       <div className="relative z-10 w-full px-6 pb-8 pt-[clamp(4.75rem,12vh,8rem)] sm:px-10 lg:px-[7.5%] lg:pb-[2.5vh]">
//         <div className="max-w-[700px]">
//           <div className="mb-[2.6vh] inline-flex items-center gap-2.5 rounded-full border border-emerald-200 bg-white/80 px-5 py-[clamp(0.4rem,1.1vh,0.65rem)] text-[clamp(0.8rem,1.8vh,0.95rem)] font-semibold text-emerald-700 shadow-sm backdrop-blur-md">
//             <Leaf size={17} />
//             Intelligent Plant Disease Detection
//           </div>

//           <h1 className="text-[clamp(2.4rem,min(5.2vw,9vh),5.6rem)] font-extrabold leading-[1.03] tracking-[-0.02em] text-[#0b2e2c]">
//             Smart Plant
//             <br />
//             <span className="text-[#0a9a4a]">
//               Disease
//               <br />
//               Detection
//             </span>
//           </h1>

//           <p className="mt-[2.8vh] max-w-[640px] text-[clamp(0.95rem,min(1.3vw,2.7vh),1.25rem)] leading-[1.6] text-slate-700">
//             Upload a leaf image, discover possible diseases and understand your
//             plant&apos;s health with AI-powered insights.
//           </p>

//           {/* BUTTONS */}
//           <div className="mt-[3.6vh] flex flex-col gap-4 sm:flex-row">
//             <Link
//               to="/register"
//               className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0a9a4a] px-[clamp(1.5rem,2.4vw,2.25rem)] py-[clamp(0.65rem,2vh,1.1rem)] text-[clamp(0.95rem,2.2vh,1.125rem)] font-bold text-white! shadow-[0_14px_30px_-8px_rgba(10,154,74,0.6)] transition duration-300 hover:-translate-y-1 hover:bg-[#088541]"
//             >
//               <Leaf size={22} />
//               Get Started
//               <ArrowRight
//                 size={20}
//                 className="transition-transform group-hover:translate-x-1"
//               />
//             </Link>

//             <a
//               href="#services"
//               className="inline-flex items-center justify-center gap-3 rounded-full border border-[#0b2e2c]/80 bg-white/40 px-[clamp(1.5rem,2.4vw,2.25rem)] py-[clamp(0.65rem,2vh,1.1rem)] text-[clamp(0.95rem,2.2vh,1.125rem)] font-bold text-[#0b2e2c] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white"
//             >
//               <CirclePlay size={22} />
//               Explore Features
//             </a>
//           </div>

//           {/* HIGHLIGHTS */}
//           <div className="mt-[4vh] max-w-[min(660px,40vw)] border-t border-emerald-300/60 pt-[3vh] max-lg:max-w-none">
//             <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
//               {highlights.map((item) => {
//                 const Icon = item.icon
//                 return (
//                   <div
//                     key={item.title}
//                     className="group text-center transition duration-300 hover:-translate-y-1.5"
//                   >
//                     <div className="mx-auto mb-[1vh] flex h-[clamp(2.75rem,7.5vh,4rem)] w-[clamp(2.75rem,7.5vh,4rem)] items-center justify-center rounded-2xl bg-white/90 text-[#0a9a4a] shadow-[0_8px_24px_-6px_rgba(10,100,50,0.25)] transition group-hover:bg-[#0a9a4a] group-hover:text-white">
//                       <Icon strokeWidth={1.8} className="h-[46%] w-[46%]" />
//                     </div>
//                     <p className="text-[clamp(0.72rem,1.6vh,0.875rem)] font-semibold leading-tight text-slate-700">
//                       {item.title}
//                       <br />
//                       {item.subtitle}
//                     </p>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ───────── FLOATING GLASS CARDS (desktop) ───────── */}

//       {/* AI Diagnosis card */}
//       <div className="absolute right-[5.5%] top-[17.5%] z-20 hidden w-[278px] animate-[float_6s_ease-in-out_infinite] rounded-[22px] bg-white/95 p-5 shadow-[0_20px_50px_-12px_rgba(0,60,30,0.35)] backdrop-blur-xl lg:block">
//         <div className="flex items-center gap-4">
//           <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-500">
//             <Activity size={28} />
//           </div>
//           <div>
//             <p className="text-sm text-slate-500">AI Diagnosis</p>
//             <p className="text-lg font-bold leading-tight text-[#0b2e2c]">
//               Disease Analysis
//             </p>
//           </div>
//         </div>
//         <div className="mt-4 flex items-center gap-2 text-[15px] font-semibold text-[#0a9a4a]">
//           <Check size={17} strokeWidth={3} />
//           Ready for analysis
//         </div>
//       </div>

//       {/* Smart Scanning card */}
//       <div className="absolute left-[50%] top-[67%] z-20 hidden animate-[float_7s_ease-in-out_infinite] items-center gap-4 rounded-[22px] bg-white/95 px-4 py-4 pr-6 shadow-[0_20px_50px_-12px_rgba(0,60,30,0.35)] backdrop-blur-xl lg:flex">
//         <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100/80 text-[#0a9a4a]">
//           <ScanLine size={28} />
//         </div>
//         <div>
//           <p className="text-sm text-slate-500">Intelligent Technology</p>
//           <p className="text-lg font-bold leading-tight text-[#0b2e2c]">
//             Smart Scanning
//           </p>
//         </div>
//       </div>

//       {/* Bottom label */}
//       <div className="absolute left-[61.3%] top-[86%] z-20 hidden items-center gap-3 whitespace-nowrap rounded-full bg-white/95 px-7 py-3.5 text-[15px] font-semibold text-[#0a9a4a] shadow-[0_14px_36px_-10px_rgba(0,60,30,0.35)] backdrop-blur-xl lg:flex">
//         <Sprout size={19} />
//         Growing a healthier tomorrow
//       </div>
//     </section>
//   )
// }

// export default HomeSection



import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Check,
  CirclePlay,
  Leaf,
  MousePointer2,
  ScanLine,
  ShieldCheck,
  Sprout,
  Zap,
} from 'lucide-react'

const highlights = [
  { icon: Zap, title: 'Instant', subtitle: 'Diagnosis' },
  { icon: BrainCircuit, title: 'AI Powered', subtitle: 'Analysis' },
  { icon: ShieldCheck, title: 'Healthy', subtitle: 'Plants' },
  { icon: Sprout, title: 'Greener', subtitle: 'Tomorrow' },
]

/* One scanning-bracket corner */
function Corner({ className }) {
  return (
    <span
      className={`absolute h-14 w-14 border-[#7dffb4] drop-shadow-[0_0_8px_rgba(74,255,150,0.95)] ${className}`}
    />
  )
}

function HomeSection() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh snap-start items-center overflow-hidden bg-[#f4ffee]"
    >
      {/* ───────── FULL BACKGROUND PHOTO + SCAN RING ───────── */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        {/* "stage" keeps the photo and the ring locked together at any screen size */}
        <div className="absolute left-1/2 top-0 aspect-[3/2] h-full -translate-x-[64.5%] lg:left-auto lg:right-0 lg:translate-x-0">
          <img
            src="/images/plant-disease-hero.png"
            alt="Plant leaf showing disease symptoms"
            className="h-full w-full select-none object-cover saturate-[1.12]"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, #000 24%)',
              maskImage: 'linear-gradient(to right, transparent 0%, #000 24%)',
            }}
            draggable="false"
          />

          {/* AI scanning ring (desktop only) */}
          <div className="absolute left-[64.5%] top-1/2 hidden aspect-square w-[56%] -translate-x-1/2 -translate-y-1/2 lg:block">
            {/* outer rings */}
            <div className="absolute inset-0 rounded-full border border-emerald-200/70 bg-emerald-200/5 shadow-[0_0_60px_rgba(110,255,170,0.35),inset_0_0_60px_rgba(110,255,170,0.25)]" />
            <div className="absolute inset-[3.5%] rounded-full border border-emerald-100/70" />

            {/* ticks ring */}
            <div className="absolute inset-[6%] animate-[spin_60s_linear_infinite] rounded-full border-[3px] border-dotted border-emerald-100/40" />

            {/* faint scan grid */}
            <div
              className="absolute inset-[9%] rounded-full opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(190,255,215,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(190,255,215,0.35) 1px, transparent 1px)',
                backgroundSize: '34px 34px',
                WebkitMaskImage:
                  'radial-gradient(circle, #000 55%, transparent 72%)',
                maskImage: 'radial-gradient(circle, #000 55%, transparent 72%)',
              }}
            />

            {/* scanning brackets */}
            <div className="absolute inset-x-[8%] bottom-[16%] top-[13%]">
              <Corner className="left-0 top-0 rounded-tl-2xl border-l-[5px] border-t-[5px]" />
              <Corner className="right-0 top-0 rounded-tr-2xl border-r-[5px] border-t-[5px]" />
              <Corner className="bottom-0 left-0 rounded-bl-2xl border-b-[5px] border-l-[5px]" />
              <Corner className="bottom-0 right-0 rounded-br-2xl border-b-[5px] border-r-[5px]" />
            </div>

            {/* cursor */}
            <MousePointer2
              size={40}
              strokeWidth={1.5}
              className="absolute left-[89%] top-[27%] -rotate-12 fill-white text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
            />
            <span className="absolute left-[96%] top-[29%] h-3 w-3 rounded-full bg-white shadow-[0_0_14px_4px_rgba(255,255,255,0.9)]" />

            {/* AI chip */}
            <div className="absolute left-[80%] top-[72%] flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-emerald-200/60 bg-emerald-900/30 text-white shadow-[0_0_30px_rgba(74,255,150,0.55)] backdrop-blur-md">
              <BrainCircuit size={38} strokeWidth={1.6} />
            </div>
          </div>
        </div>
      </div>

      {/* ───────── LEFT WHITE FADE (makes text readable) ───────── */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#fbfff8] from-0% via-[#f8fff2]/90 via-32% to-transparent to-62% lg:block" />
      {/* mobile / tablet overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/85 via-white/70 to-white/40 lg:hidden" />
      {/* soft top haze under the navbar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-white/70 to-transparent" />
      {/* bottom green vignette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-emerald-900/20 to-transparent" />

      {/* ───────── LEFT CONTENT ───────── */}
      <div className="relative z-10 w-full px-6 pb-8 pt-[clamp(4.75rem,12vh,8rem)] sm:px-10 lg:px-[7.5%] lg:pb-[2.5vh]">
        <div className="max-w-[700px]">
          <div className="mb-[2.6vh] inline-flex items-center gap-2.5 rounded-full border border-emerald-200 bg-white/80 px-5 py-[clamp(0.4rem,1.1vh,0.65rem)] text-[clamp(0.8rem,1.8vh,0.95rem)] font-semibold text-emerald-700 shadow-sm backdrop-blur-md">
            <Leaf size={17} />
            Intelligent Plant Disease Detection
          </div>

          <h1 className="text-[clamp(2.4rem,min(5.2vw,9vh),5.6rem)] font-extrabold leading-[1.03] tracking-[-0.02em] text-[#0b2e2c]">
            Smart Plant
            <br />
            <span className="text-[#0a9a4a]">
              Disease
              <br />
              Detection
            </span>
          </h1>

          <p className="mt-[2.8vh] max-w-[640px] text-[clamp(0.95rem,min(1.3vw,2.7vh),1.25rem)] leading-[1.6] text-slate-700">
            Upload a leaf image, discover possible diseases and understand your
            plant&apos;s health with AI-powered insights.
          </p>

          {/* BUTTONS */}
          <div className="mt-[3.6vh] flex flex-col gap-4 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0a9a4a] px-[clamp(1.5rem,2.4vw,2.25rem)] py-[clamp(0.65rem,2vh,1.1rem)] text-[clamp(0.95rem,2.2vh,1.125rem)] font-bold text-white! shadow-[0_14px_30px_-8px_rgba(10,154,74,0.6)] transition duration-300 hover:-translate-y-1 hover:bg-[#088541]"
            >
              <Leaf size={22} />
              Get Started
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#services"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-[#0b2e2c]/80 bg-white/40 px-[clamp(1.5rem,2.4vw,2.25rem)] py-[clamp(0.65rem,2vh,1.1rem)] text-[clamp(0.95rem,2.2vh,1.125rem)] font-bold text-[#0b2e2c] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              <CirclePlay size={22} />
              Explore Features
            </a>
          </div>

          {/* HIGHLIGHTS */}
          <div className="mt-[4vh] max-w-[min(660px,40vw)] border-t border-emerald-300/60 pt-[3vh] max-lg:max-w-none">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="group text-center transition duration-300 hover:-translate-y-1.5"
                  >
                    <div className="mx-auto mb-[1vh] flex h-[clamp(2.75rem,7.5vh,4rem)] w-[clamp(2.75rem,7.5vh,4rem)] items-center justify-center rounded-2xl bg-white/90 text-[#0a9a4a] shadow-[0_8px_24px_-6px_rgba(10,100,50,0.25)] transition group-hover:bg-[#0a9a4a] group-hover:text-white">
                      <Icon strokeWidth={1.8} className="h-[46%] w-[46%]" />
                    </div>
                    <p className="text-[clamp(0.72rem,1.6vh,0.875rem)] font-semibold leading-tight text-slate-700">
                      {item.title}
                      <br />
                      {item.subtitle}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ───────── FLOATING GLASS CARDS (desktop) ───────── */}

      {/* AI Diagnosis card */}
      <div className="absolute right-[5.5%] top-[17.5%] z-20 hidden w-[278px] animate-[float_6s_ease-in-out_infinite] rounded-[22px] bg-white/95 p-5 shadow-[0_20px_50px_-12px_rgba(0,60,30,0.35)] backdrop-blur-xl lg:block">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <Activity size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-500">AI Diagnosis</p>
            <p className="text-lg font-bold leading-tight text-[#0b2e2c]">
              Disease Analysis
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[15px] font-semibold text-[#0a9a4a]">
          <Check size={17} strokeWidth={3} />
          Ready for analysis
        </div>
      </div>

      {/* Smart Scanning card */}
      <div className="absolute left-[50%] top-[67%] z-20 hidden animate-[float_7s_ease-in-out_infinite] items-center gap-4 rounded-[22px] bg-white/95 px-4 py-4 pr-6 shadow-[0_20px_50px_-12px_rgba(0,60,30,0.35)] backdrop-blur-xl lg:flex">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100/80 text-[#0a9a4a]">
          <ScanLine size={28} />
        </div>
        <div>
          <p className="text-sm text-slate-500">Intelligent Technology</p>
          <p className="text-lg font-bold leading-tight text-[#0b2e2c]">
            Smart Scanning
          </p>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute left-[61.3%] top-[86%] z-20 hidden items-center gap-3 whitespace-nowrap rounded-full bg-white/95 px-7 py-3.5 text-[15px] font-semibold text-[#0a9a4a] shadow-[0_14px_36px_-10px_rgba(0,60,30,0.35)] backdrop-blur-xl lg:flex">
        <Sprout size={19} />
        Growing a healthier tomorrow
      </div>
    </section>
  )
}

export default HomeSection