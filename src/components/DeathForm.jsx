import React, { useMemo, useState } from 'react'

const countries = [
  'United States','United Kingdom','Canada','Australia','Germany','India','Japan','France','Other'
]

export default function DeathForm({ onResult }) {
  const [form, setForm] = useState({
    dob: '',
    sex: 'male',
    country: 'United States',
    bmi: 24,
    smoking_status: 'none',
    alcohol_use: 'moderate',
    exercise_level: 'moderate',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || ''

  const canSubmit = useMemo(() => {
    return form.dob && form.sex && form.country && form.bmi && form.smoking_status && form.alcohol_use && form.exercise_level
  }, [form])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: name === 'bmi' ? Number(value) : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to get prediction')
      const data = await res.json()
      onResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-200 mb-1">Date of Birth</label>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label className="block text-sm text-slate-200 mb-1">Sex</label>
          <select name="sex" value={form.sex} onChange={handleChange} className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-200 mb-1">Country</label>
          <select name="country" value={form.country} onChange={handleChange} className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-200 mb-1">BMI</label>
          <input type="number" step="0.1" name="bmi" value={form.bmi} onChange={handleChange} className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-slate-200 mb-1">Smoking Status</label>
          <select name="smoking_status" value={form.smoking_status} onChange={handleChange} className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="none">None</option>
            <option value="former">Former</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-200 mb-1">Alcohol Use</label>
          <select name="alcohol_use" value={form.alcohol_use} onChange={handleChange} className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="none">None</option>
            <option value="moderate">Moderate</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-200 mb-1">Exercise Level</label>
          <select name="exercise_level" value={form.exercise_level} onChange={handleChange} className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <button disabled={!canSubmit || loading} className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-3 text-white font-semibold transition">
        {loading ? 'Calculating...' : 'Predict My Fate'}
      </button>

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  )
}
