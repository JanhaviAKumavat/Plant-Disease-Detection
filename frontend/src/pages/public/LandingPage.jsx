// import { useEffect } from 'react'
// import Navbar from '../../components/Navbar'
// import HomeSection from '../../sections/HomeSection'
// import AboutSection from '../../sections/AboutSection'
// import ServicesSection from '../../sections/ServicesSection'

// function LandingPage() {
//   // snap to each full-screen section on this page only
//   useEffect(() => {
//     const html = document.documentElement
//     html.style.scrollSnapType = 'y proximity'
//     return () => {
//       html.style.scrollSnapType = ''
//     }
//   }, [])

//   return (
//     <div className="min-h-screen overflow-x-clip bg-[#f7fff5] text-slate-900">
//       <Navbar />

//       <main>
//         <HomeSection />
//         <AboutSection />
//         <ServicesSection />
//       </main>

//       {/* FOOTER */}
//       <footer className="bg-[#103c2b] px-5 py-10 text-white sm:px-8">
//         <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
//           <div className="flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500">
//               <span className="text-2xl">🌿</span>
//             </div>

//             <div>
//               <p className="text-xl font-extrabold">
//                 Plant<span className="text-emerald-300">Care</span>
//               </p>
//               <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-200">
//                 AI Diagnosis
//               </p>
//             </div>
//           </div>

//           <p className="text-center text-sm text-emerald-100/70">
//             Making plant health analysis easier with AI.
//           </p>

//           <a
//             href="#home"
//             className="text-sm font-bold text-emerald-200 transition hover:text-white"
//           >
//             Back to top ↑
//           </a>
//         </div>
//       </footer>
//     </div>
//   )
// }

// export default LandingPage





import { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import HomeSection from '../../sections/HomeSection'
import AboutSection from '../../sections/AboutSection'
import ServicesSection from '../../sections/ServicesSection'

function LandingPage() {
  // snap to each full-screen section on this page only
  useEffect(() => {
    const html = document.documentElement
    html.style.scrollSnapType = 'y proximity'
    return () => {
      html.style.scrollSnapType = ''
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7fff5] text-slate-900">
      <Navbar />

      <main>
        <HomeSection />
        <AboutSection />
        <ServicesSection />
      </main>

      {/* FOOTER */}
      <footer className="bg-[#103c2b] px-5 py-10 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500">
              <span className="text-2xl">🌿</span>
            </div>

            <div>
              <p className="text-xl font-extrabold">
                Plant<span className="text-emerald-300">Care</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-200">
                AI Diagnosis
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-emerald-100/70">
            Making plant health analysis easier with AI.
          </p>

          <a
            href="#home"
            className="text-sm font-bold text-emerald-200 transition hover:text-white"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage