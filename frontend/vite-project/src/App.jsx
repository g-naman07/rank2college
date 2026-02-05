import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Header from './Header.jsx'

const CATEGORIES = ['OPEN', 'OBC-NCL', 'EWS', 'SC', 'ST']
const QUOTAS = ['AI', 'HS', 'OS']
const GENDERS = ['Gender-Neutral', 'Female-Only']
const INSTITUTE_TYPES = ['IIT', 'NIT', 'IIIT', 'GFTI']

function App() {
  const [form, setForm] = useState({
    rank: '',
    marks: '',
    category: 'OPEN',
    quota: 'AI',
    gender: 'Gender-Neutral',
    instituteType: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const apiBase = useMemo(() => {
    return import.meta.env.VITE_API_URL || 'http://localhost:5000'
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)

    const rank = form.rank.trim()
    const marks = form.marks.trim()

    if (!rank && !marks) {
      setError('Please enter either Rank or Marks.')
      return
    }

    if (!form.category || !form.quota) {
      setError('Please select Category and Quota.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${apiBase}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rank: rank ? Number(rank) : undefined,
          marks: marks ? Number(marks) : undefined,
          category: form.category,
          quota: form.quota,
          gender: form.gender || undefined,
          instituteType: form.instituteType || undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || 'Request failed. Please try again.')
      }

      if (data.data) {
        let filtered = data.data
        if (form.instituteType) {
          const type = form.instituteType
          filtered = filtered.filter((c) => {
          const name = c.institute
          if (type === 'IIT') return name.startsWith('Indian Institute of Technology')
          if (type === 'IIIT') return name.startsWith('Indian Institute of Information Technology')
          if (type === 'NIT') return name.startsWith('National Institute')
          if (type === 'GFTI') {
            return (
              !name.startsWith('Indian Institute of Technology') &&
              !name.startsWith('Indian Institute of Information Technology') &&
              !name.startsWith('National Institute')
            )
          }
          return true
        })
        }

        data.data = filtered
        data.count = filtered.length
      }

      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <Header />
      <header className="hero">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__content">
          <span className="badge">JEE Rank to College Predictor</span>
          <h1>
            Find your best-fit colleges, faster
            <span className="accent">.</span>
          </h1>
          <p>
            Drop your rank or marks, pick your category & quota, and instantly
            explore the best available institutes, branches, and closing ranks.
          </p>
          <div className="hero__stats">
            <div className="stat">
              <span className="stat__label">Powered by</span>
              <span className="stat__value">JOSAA Trends</span>
            </div>
            <div className="stat">
              <span className="stat__label">Realtime</span>
              <span className="stat__value">Rank Mapping</span>
            </div>
            <div className="stat">
              <span className="stat__label">Results</span>
              <span className="stat__value">Top 50 Matches</span>
            </div>
          </div>
        </div>
        <div className="hero__orb" aria-hidden="true" />
      </header>

      <section className="panel">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__row">
            <div className="field">
              <label htmlFor="rank">Your Rank</label>
              <input
                id="rank"
                name="rank"
                type="number"
                min="1"
                placeholder="e.g. 12450"
                value={form.rank}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="marks">Your Marks</label>
              <input
                id="marks"
                name="marks"
                type="number"
                min="0"
                placeholder="e.g. 180"
                value={form.marks}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form__row">
            <div className="field">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="quota">Quota</label>
              <select
                id="quota"
                name="quota"
                value={form.quota}
                onChange={handleChange}
              >
                {QUOTAS.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="instituteType">Institute Type</label>
              <select
                id="instituteType"
                name="instituteType"
                value={form.instituteType}
                onChange={handleChange}
              >
                <option value="">All Institutes</option>
                {INSTITUTE_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form__actions">
            <button className="primary" type="submit" disabled={loading}>
              {loading ? 'Finding Colleges...' : 'Find My Colleges'}
            </button>
            <div className="form__hint">
              Tip: Entering marks will auto-estimate your rank.
            </div>
          </div>
        </form>
      </section>

      <section className="results">
        {error && <div className="alert">{error}</div>}

        {result && (
          <div className="results__wrap">
            <div className="results__summary">
              <div>
                <h2>Results</h2>
                <p>
                  {result.count} colleges found for your inputs. Explore opening &
                  closing ranks below.
                </p>
              </div>
              <div className="results__meta">
                {result.predictedRank && (
                  <span>Predicted Rank: {result.predictedRank}</span>
                )}
                {result.predictedPercentile && (
                  <span>Percentile: {result.predictedPercentile}%</span>
                )}
              </div>
            </div>

            <div className="table-shell">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Institute</th>
                    <th>Program</th>
                    <th>Quota</th>
                    <th>Category</th>
                    <th>Gender</th>
                    <th>Opening</th>
                    <th>Closing</th>
                    <th>Year</th>
                    <th>Round</th>
                  </tr>
                </thead>
                <tbody>
                  {result.data?.map((college) => (
                    <tr key={college.id}>
                      <td className="table-strong">{college.institute}</td>
                      <td>{college.program}</td>
                      <td>
                        <span className="chip">{college.quota}</span>
                      </td>
                      <td>{college.category}</td>
                      <td>{college.gender}</td>
                      <td>{college.openingRank}</td>
                      <td className="accent">{college.closingRank}</td>
                      <td>{college.year}</td>
                      <td>{college.round}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default App
