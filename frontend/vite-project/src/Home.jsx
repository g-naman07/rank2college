import { Link } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Header from './Header.jsx'

function Home() {
  const [marks, setMarks] = useState(178)

  const getMetrics = (m) => {
    let p = 0
    if (m >= 280) p = 99.99 + (m - 280) * 0.0005
    else if (m >= 250) p = 99.95 + (m - 250) * (0.04 / 30)
    else if (m >= 220) p = 99.80 + (m - 220) * (0.15 / 30)
    else if (m >= 200) p = 99.50 + (m - 200) * (0.30 / 20)
    else if (m >= 175) p = 99.00 + (m - 175) * (0.50 / 25)
    else if (m >= 155) p = 98.00 + (m - 155) * (1.00 / 20)
    else if (m >= 140) p = 96.50 + (m - 140) * (1.50 / 15)
    else if (m >= 125) p = 95.00 + (m - 125) * (1.50 / 15)
    else if (m >= 110) p = 92.50 + (m - 110) * (2.50 / 15)
    else if (m >= 100) p = 90.00 + (m - 100) * (2.50 / 10)
    else if (m >= 80) p = 80.00 + (m - 80) * (10.00 / 20)
    else p = m * (80.00 / 80)
    if (p > 100) p = 100
    const r = Math.floor(((100 - p) * 1400000) / 100)
    return { percentile: p.toFixed(2), rank: r < 1 ? 1 : r }
  }

  const { percentile, rank } = getMetrics(marks)

  return (
    <div className="app">
      <Header />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
      <header className="hero hero--home" style={{ flex: '1 1 400px', padding: '3rem 2rem' }}>
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__content">
          <span className="badge">Free • Accurate • Instant Results</span>
          <h1>
            Predict Your
            <br />
            JEE Main Rank & Percentile
            <br />
            Instantly
            <span className="accent">.</span>
          </h1>
          <p>
            Use our free JEE Main rank predictor for 2026 to estimate your All
            India Rank (AIR) and percentile. Our college predictor matches you
            with 300+ engineering colleges—IITs, NITs, IIITs. No signup required.
          </p>
          <div className="hero__actions">
            <Link className="primary" to="/college-predictor">
              Predict Your Rank
            </Link>
            <Link className="ghost" to="/college-predictor">
              Find Your College
            </Link>
            <button className="ghost" type="button">
              Live Rank Check
            </button>
          </div>
          <div className="hero__stats">
            <div className="stat">
              <span className="stat__label">High Accuracy</span>
              <span className="stat__value">Past Data</span>
            </div>
            <div className="stat">
              <span className="stat__label">No Signup</span>
              <span className="stat__value">Privacy First</span>
            </div>
            <div className="stat">
              <span className="stat__label">Instant Results</span>
              <span className="stat__value">&lt; 1s</span>
            </div>
          </div>
        </div>
        <div className="hero__orb" aria-hidden="true" />
      </header>

      <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
        <div className="rank-estimator-card">
          <div className="text-center">
            <h3>Estimate Your Rank</h3>
            <p>Based on JEE 2026 Trends</p>
          </div>

          <div className="relative">
            <div className="grid">
              <div className="p-3">
                <div className="text-sm-label">Percentile</div>
                <div className="percentile-text">{percentile}</div>
              </div>
              <div className="p-3">
                <div className="text-sm-label">Rank</div>
                <div className="rank-text">{rank}</div>
              </div>
            </div>
            
            <div className="cta-container">
              <Link className="cta-link" to="/college-predictor">
                <div className="cta-button">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                  <span>Check Detailed Prediction</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="slider-container">
            <div className="marks-label">
              <span>Marks (Out of 300)</span>
              <span>{marks}</span>
            </div>
            <input 
              min="0" 
              max="300" 
              step="1" 
              type="range" 
              value={marks}
              onChange={(e) => setMarks(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>0</span>
              <span>150</span>
              <span>300</span>
            </div>
          </div>
        </div>
      </div>
      </div>

      <section className="section">
        <div className="section__head">
          <h2>Why Trust Our JEE Main Rank Predictor?</h2>
          <p className="muted">India&apos;s reliable JEE rank and college prediction platform</p>
        </div>
        <div className="grid grid--4">
          <div className="tile">
            <span className="tile__icon">🎯</span>
            <h3>High Accuracy</h3>
            <p>Based on past data</p>
          </div>
          <div className="tile">
            <span className="tile__icon">🏛️</span>
            <h3>300+ Engineering Colleges</h3>
            <p>IITs, NITs, IIITs</p>
          </div>
          <div className="tile">
            <span className="tile__icon">👥</span>
            <h3>1K+ Happy Students</h3>
            <p>Trusted predictions</p>
          </div>
          <div className="tile">
            <span className="tile__icon">⚡</span>
            <h3>&lt;1s Instant Results</h3>
            <p>Lightning fast</p>
          </div>
        </div>
      </section>

      <section className="section panel">
        <div className="section__head">
          <h2>How Our Marks vs Percentile Predictor Works</h2>
          <p className="muted">
            Get your JEE percentile prediction in three simple steps. Predictions
            are based on historical trends and normalization patterns. Final
            ranks depend on official NTA results.
          </p>
        </div>
        <div className="steps">
          <div className="step">
            <span className="step__index">01</span>
            <h3>📝 Enter Your JEE Marks</h3>
            <p>Input your total marks from JEE Main (out of 300). No personal data required.</p>
          </div>
          <div className="step">
            <span className="step__index">02</span>
            <h3>📊 Get Percentile & Rank</h3>
            <p>Our algorithm instantly calculates your expected percentile and All India Rank (AIR).</p>
          </div>
          <div className="step">
            <span className="step__index">03</span>
            <h3>🎓 Discover Your Colleges</h3>
            <p>Use our college predictor to browse 300+ engineering colleges that match your rank.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Key Features of JEE Predictor</h2>
          <p className="muted">Everything engineering aspirants need for rank prediction and college selection</p>
        </div>
        <div className="grid grid--3">
          <div className="tile">
            <span className="tile__icon">📈</span>
            <h3>Accurate AIR Prediction</h3>
            <p>Advanced algorithms predict your All India Rank with high accuracy using historical JEE Main data.</p>
          </div>
          <div className="tile">
            <span className="tile__icon">🎯</span>
            <h3>Percentile Calculator</h3>
            <p>Instant percentile calculation based on your marks and NTA normalization patterns.</p>
          </div>
          <div className="tile">
            <span className="tile__icon">🏢</span>
            <h3>300+ College Database</h3>
            <p>Comprehensive coverage of IITs, NITs, IIITs, GFTIs, and top private engineering colleges.</p>
          </div>
          <div className="tile">
            <span className="tile__icon">⚡</span>
            <h3>Lightning Speed</h3>
            <p>Get results in under 1 second. Instant predictions whenever you need them.</p>
          </div>
          <div className="tile">
            <span className="tile__icon">🔒</span>
            <h3>Privacy First</h3>
            <p>Zero data collection. No signup required. Your privacy is completely protected.</p>
          </div>
          <div className="tile">
            <span className="tile__icon">💰</span>
            <h3>100% Free</h3>
            <p>Completely free to use forever. No hidden charges or premium features.</p>
          </div>
          <div className="tile">
            <span className="tile__icon">📱</span>
            <h3>Mobile Friendly</h3>
            <p>Works perfectly on all devices. Calculate your rank on the go.</p>
          </div>
          <div className="tile">
            <span className="tile__icon">🔄</span>
            <h3>Real-time Updates</h3>
            <p>Database updated with latest cutoffs and college information.</p>
          </div>
        </div>
      </section>

      <section className="section panel">
        <div className="section__head">
          <h2>Why Choose JEE Predictor?</h2>
          <p className="muted">The most trusted JEE rank and college prediction tool in India</p>
        </div>
        <div className="checklist">
          <div className="checklist__item">
            <span>✓</span>
            <p>
              Accurate Marks vs Percentile Calculations using advanced statistical
              algorithms that account for NTA normalization and historical trends.
            </p>
          </div>
          <div className="checklist__item">
            <span>✓</span>
            <p>
              Comprehensive College Database for IITs, NITs, IIITs, and GFTIs with
              detailed cutoffs and branch availability.
            </p>
          </div>
          <div className="checklist__item">
            <span>✓</span>
            <p>
              Free All India Rank (AIR) Predictor that uses your marks, percentile,
              and category for accurate estimation.
            </p>
          </div>
          <div className="checklist__item">
            <span>✓</span>
            <p>
              JOSAA & College Prediction insights to understand admission
              possibilities based on previous year closing ranks.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Percentile vs Rank Table (2026 Updated)</h2>
          <p className="muted">
            Estimated Rank for corresponding percentiles based on recent trends.
          </p>
        </div>
        <div className="table-shell">
          <table className="results-table">
            <thead>
              <tr>
                <th>Marks</th>
                <th>JEE Main Percentile</th>
                <th>Projected Rank (AIR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>285+</td>
                <td>99.99+</td>
                <td>1 - 100</td>
              </tr>
              <tr>
                <td>250 - 260</td>
                <td>99.95</td>
                <td>750</td>
              </tr>
              <tr>
                <td>220 - 230</td>
                <td>99.80</td>
                <td>3,100</td>
              </tr>
              <tr>
                <td>200 - 210</td>
                <td>99.50</td>
                <td>7,750</td>
              </tr>
              <tr>
                <td>175 - 180</td>
                <td>99.00</td>
                <td>15,500</td>
              </tr>
              <tr>
                <td>155 - 160</td>
                <td>98.00</td>
                <td>31,000</td>
              </tr>
              <tr>
                <td>140 - 145</td>
                <td>96.50</td>
                <td>54,250</td>
              </tr>
              <tr>
                <td>125 - 130</td>
                <td>95.00</td>
                <td>77,500</td>
              </tr>
              <tr>
                <td>110 - 115</td>
                <td>92.50</td>
                <td>1.16 Lakh</td>
              </tr>
              <tr>
                <td>100 - 105</td>
                <td>90.00</td>
                <td>1.55 Lakh</td>
              </tr>
              <tr>
                <td>80 - 85</td>
                <td>80.00</td>
                <td>3.10 Lakh</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section panel">
        <div className="section__head">
          <h2>JEE Main Marks vs Percentile Table</h2>
          <p className="muted">Score analysis for qualifying ranges and lower percentile brackets.</p>
        </div>
        <div className="table-shell">
          <table className="results-table">
            <thead>
              <tr>
                <th>Marks</th>
                <th>Expected Percentile</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>90</td>
                <td>87.50 %ile</td>
              </tr>
              <tr>
                <td>80</td>
                <td>80.50 %ile</td>
              </tr>
              <tr>
                <td>70</td>
                <td>75.50 %ile</td>
              </tr>
              <tr>
                <td>60</td>
                <td>68.30 %ile</td>
              </tr>
              <tr>
                <td>50</td>
                <td>57.80 %ile</td>
              </tr>
              <tr>
                <td>40</td>
                <td>45.30 %ile</td>
              </tr>
              <tr>
                <td>30</td>
                <td>30.80 %ile</td>
              </tr>
              <tr>
                <td>20</td>
                <td>14.30 %ile</td>
              </tr>
              <tr>
                <td>10</td>
                <td>2.50 %ile</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Essential JEE Main Resources</h2>
          <p className="muted">
            Deep dive into our detailed analysis and prediction tools to stay ahead in your JEE preparation.
          </p>
        </div>
        <div className="grid grid--3">
          <div className="tile">
            <span className="tag">Analysis</span>
            <h3>Marks vs Percentile vs Rank 2025</h3>
            <p>Complete breakdown of score trends for the 2025 session. Check what marks you need for 99%ile.</p>
          </div>
          <div className="tile">
            <span className="tag">Prediction</span>
            <h3>Expected Cutoff 2026</h3>
            <p>Will the cutoff rise again? See our data-backed predictions for General, OBC, and EWS categories.</p>
          </div>
          <div className="tile">
            <span className="tag">Data</span>
            <h3>NIT Cutoffs (Tier-wise)</h3>
            <p>Detailed opening and closing ranks for all 31 NITs categorized by Tier 1, 2, 3 & 4.</p>
          </div>
          <div className="tile">
            <span className="tag">Data</span>
            <h3>IIT Cutoffs (Tier-wise)</h3>
            <p>Check the rank required for IIT Bombay, Delhi and others. Categorized list of all 23 IITs.</p>
          </div>
          <div className="tile">
            <span className="tag">Guide</span>
            <h3>How NTA Calculates Percentile</h3>
            <p>Understanding the normalization process and why your raw score is different from your percentile.</p>
          </div>
          <div className="tile">
            <span className="tag">Tool</span>
            <h3>JEE Main Percentile Predictor</h3>
            <p>Calculate your expected percentile and rank instantly based on your mock test scores.</p>
          </div>
          <div className="tile">
            <span className="tag">Tool</span>
            <h3>College Predictor</h3>
            <p>Find the best IITs, NITs, and IIITs for your rank. Filter by branch and category.</p>
          </div>
        </div>
      </section>

      <section className="section panel">
        <div className="section__head">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq">
          <div className="faq__item">
            <h3>How accurate are the percentile estimates and how do they relate to JEE Main and JEE Advanced rank predictions?</h3>
            <p>
              Our estimates use historical normalization data to provide a close
              projection. Final AIR and eligibility for JEE Advanced still depend
              on official NTA results.
            </p>
          </div>
          <div className="faq__item">
            <h3>Why choose this JEE predictor over other percentile and rank predictor tools?</h3>
            <p>
              We combine verified past-year cutoffs with a large college database
              to provide high-confidence estimates in under a second.
            </p>
          </div>
          <div className="faq__item">
            <h3>How do you pick colleges in the College Predictor and should I rely on them for counseling?</h3>
            <p>
              We match your rank against previous year closing ranks to show
              possible options. Always verify with official counseling portals.
            </p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div>
          <h2>GET YOUR JEE PREDICTIONS NOW</h2>
          <p>
            Start Predicting Your JEE Main Rank Today. Don&apos;t leave your future to guesswork. Join thousands of students
            using our data-driven prediction tool to plan their engineering journey.
          </p>
        </div>
        <div className="cta__actions">
          <Link className="primary" to="/college-predictor">
            Predict My Rank
          </Link>
          <Link className="ghost" to="/college-predictor">
            Browse Colleges
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__grid">
          <div>
            <h3>Quick Links</h3>
            <p>Percentile Predictor</p>
            <p>College Predictor</p>
            <p>How Percentiles Work</p>
            <p>Contact Us</p>
            <p>Disclaimer</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
          <div>
            <h3>Resources</h3>
            <p>Marks vs Rank 2025</p>
            <p>Cutoff Trends 2026</p>
            <p>NIT Cutoff 2025</p>
            <p>IIT Cutoff 2025</p>
            <p>JEE Main Official</p>
            <p>JoSAA Portal</p>
            <p>JEE Advanced</p>
          </div>
          <div>
            <h3>Contact</h3>
            <p>jeepredictor.in@gmail.com</p>
            <p>Response time: Within 24 hours</p>
          </div>
        </div>
        <div className="footer__note">
          © 2026 jeepredictor.in • Not affiliated with NTA, JEE Main, or JEE Advanced. For official information, visit NTA JEE.
        </div>
      </footer>
    </div>
  )
}

export default Home
