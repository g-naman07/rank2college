import React from 'react'

const sections = [
  {
    title: '1. Why Normalization is Required in JEE Main?',
    body: [
      'JEE Main is held in multiple shifts where question paper difficulty can vary.',
      'To ensure a level playing field, NTA uses a "Normalization procedure based on Percentile Score" so that candidates are neither benefited nor disadvantaged by the difficulty level of their specific shift[cite: 231].',
    ],
  },
  {
    title: 'How to Calculate JEE Main Percentile Score?',
    body: [
      'The Percentile Score indicates the percentage of candidates who scored EQUAL TO OR BELOW a particular candidate in that shift[cite: 237].',
    ],
    formula: 'Percentile = 100 × (No. of candidates appeared in the shift with raw score EQUAL TO OR LESS than the candidate) / (Total no. of candidates who appeared in the shift) ',
    notes: 'Scores are calculated up to 7 decimal places to reduce ties[cite: 241].'
  },
  {
    title: '3. What are the 2026 Tie-Breaking Rules (Paper 1)?',
    body: ['If two or more candidates obtain the same Total NTA Score, the tie is resolved in this specific order[cite: 84, 169]:'],
    ordered: [
      'Higher NTA score in Mathematics [cite: 84]',
      'Higher NTA score in Physics [cite: 85]',
      'Higher NTA score in Chemistry [cite: 85]',
      'Lower proportion of attempted incorrect answers to correct answers in all subjects [cite: 86]',
      'Lower proportion of incorrect answers specifically in Mathematics [cite: 87]',
      'Lower proportion of incorrect answers specifically in Physics [cite: 88]',
      'Lower proportion of incorrect answers specifically in Chemistry [cite: 88]',
    ],
  },
  {
    title: '4. Best of Two Sessions Handling',
    body: [
      'For candidates appearing in both Session 1 and Session 2, the best of the two Total NTA Scores is considered for the final merit list[cite: 168].',
      'Note: Subject-wise best scores are not used; only the best "Total" score is considered[cite: 168].',
    ],
  },
  {
    title: '5. JEE Main 2026 Important Dates',
    list: [
      'Session 1 Examination: 21 January to 30 January 2026 [cite: 339]',
      'Session 1 Result Declaration: By 12 February 2026 [cite: 340]',
      'Session 2 Examination: 02 April to 09 April 2026 [cite: 355]',
      'Session 2 Result Declaration: By 20 April 2026 [cite: 356]',
    ],
  }
]

export default function NtaPercentileLogic() {
  const pageTitle = "How NTA Calculates Percentile - JEE Main 2026 Rank Logic"
  const pageDesc = "Official JEE Main 2026 normalization procedure, percentile formula, and tie-breaking rules as per the NTA Information Bulletin."

  // Schema.org FAQ Data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": sections.map(s => ({
      "@type": "Question",
      "name": s.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": (s.body || s.list || s.ordered || []).join(' ')
      }
    }))
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-36 pb-20 px-4">
      {/* REACT 19 NATIVE METADATA (Hoisted to <head>) */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <div className="container mx-auto max-w-5xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            JEE Main 2026: NTA Percentile & Normalization
          </h1>
          <p className="text-lg text-slate-600">
            Official breakdown of the scoring process for the 2026 Examination cycle[cite: 227].
          </p>
        </header>

        <article className="space-y-6">
          {sections.map((section, idx) => (
            <section key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">{section.title}</h2>
              
              {section.body?.map((p, i) => (
                <p key={i} className="text-slate-600 mb-3 leading-relaxed">{p}</p>
              ))}

              {section.formula && (
                <div className="bg-slate-900 text-blue-400 p-4 rounded-xl font-mono text-sm my-4 overflow-x-auto">
                  {section.formula}
                </div>
              )}

              {section.notes && (
                <p className="text-sm text-slate-500 mb-3">{section.notes}</p>
              )}

              {section.ordered && (
                <ol className="list-decimal pl-6 space-y-2 text-slate-600">
                  {section.ordered.map((li, i) => <li key={i}>{li}</li>)}
                </ol>
              )}

              {section.list && (
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  {section.list.map((li, i) => <li key={i}>{li}</li>)}
                </ul>
              )}
            </section>
          ))}
        </article>

        <footer className="mt-12 text-center text-slate-400 text-sm border-t pt-8">
          Source: NTA JEE (Main) 2026 Information Bulletin [cite: 292]
        </footer>
      </div>
    </div>
  )
}
