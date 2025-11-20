import React, { useEffect, useMemo, useState } from 'react'

function diffComponents(targetDate) {
  const now = new Date()
  const diff = Math.max(0, targetDate - now)
  const seconds = Math.floor(diff / 1000)
  const years = Math.floor(seconds / (365.2425 * 24 * 3600))
  const daysRemainderSec = seconds - Math.floor(years * 365.2425 * 24 * 3600)
  const days = Math.floor(daysRemainderSec / (24 * 3600))
  const hours = Math.floor((daysRemainderSec % (24 * 3600)) / 3600)
  const minutes = Math.floor((daysRemainderSec % 3600) / 60)
  const secs = daysRemainderSec % 60
  return { years, days, hours, minutes, secs }
}

export default function Countdown({ dateString }) {
  const target = useMemo(() => new Date(dateString + 'T00:00:00'), [dateString])
  const [parts, setParts] = useState(diffComponents(target))

  useEffect(() => {
    const id = setInterval(() => setParts(diffComponents(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <div className="rounded-2xl border border-blue-500/20 bg-slate-900/50 p-6 text-center">
      <div className="text-3xl sm:text-4xl font-bold text-white">
        {parts.years} years, {parts.days} days, {parts.hours} hours
      </div>
      <div className="mt-2 text-slate-300">left on the clock</div>
    </div>
  )
}
