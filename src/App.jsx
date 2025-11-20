import React, { useMemo, useState } from 'react'
import { Sparkles, Timer, Calendar, Heart } from 'lucide-react'
import Hero from './components/Hero'
import DeathForm from './components/DeathForm'
import Countdown from './components/Countdown'

function App() {
  const [result, setResult] = useState(null)

  const demiseText = useMemo(() => {
    if (!result) return ''
    const d = new Date(result.estimated_death_date)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth()+1).padStart(2,'0')
    const dd = String(d.getDate()).padStart(2,'0')
    return `${yyyy}-${mm}-${dd}`
  }, [result])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Hero />

      <main className="relative -mt-16 pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-blue-500/20 bg-slate-800/40 backdrop-blur p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-semibold">Tell us about you</h2>
                </div>
                <DeathForm onResult={setResult} />
                <p className="mt-4 text-xs text-slate-400">Disclaimer: For entertainment purposes only.</p>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="rounded-2xl border border-blue-500/20 bg-slate-800/40 backdrop-blur p-6 shadow-xl min-h-[260px] flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-semibold">Your fate forecast</h2>
                </div>

                {!result && (
                  <div className="text-slate-300/80">
                    Submit your details to see the estimate and a live countdown.
                  </div>
                )}

                {result && (
                  <>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      Your estimated date of demise is: {demiseText}
                    </div>
                    <Countdown dateString={demiseText} />

                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <Stat label="Base life expectancy" value={`${result.base_life_expectancy_years} yrs`} />
                      <Stat label="Adjusted expectancy" value={`${result.adjusted_life_expectancy_years} yrs`} />
                      <Stat label="Your current age" value={`${result.current_age_years} yrs`} />
                      <Stat label="Lifestyle impact" value={Object.values(result.modifiers_applied).reduce((a,b)=>a+(+b||0),0).toFixed(1)+ ' yrs'} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-16 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Built with a futuristic hourglass vibe • Cherish the time you have
          </div>
        </div>
      </main>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-900/40 border border-slate-700 p-4">
      <div className="text-slate-400 text-xs">{label}</div>
      <div className="text-white font-semibold text-lg">{value}</div>
    </div>
  )
}

export default App
