import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[60vh] sm:h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4TrRyLcIHhcItjnk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Gradient overlay for readability; don't block interaction with the 3D scene */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/80" />
      <div className="relative z-10 flex h-full items-end justify-center pb-10 text-center">
        <div className="max-w-3xl px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow">Memento Mori</h1>
          <p className="mt-4 text-slate-200/90 text-lg sm:text-xl">A playful predictor that estimates your date of demise and shows a live countdown. Press 'E' to interact with the hourglass.</p>
        </div>
      </div>
    </section>
  )
}
