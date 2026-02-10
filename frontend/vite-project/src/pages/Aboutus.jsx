import React from "react"
import { Link } from "react-router-dom"

export default function JeeMainCollegePredictor() {
    return (
        <main className="container-fluid px-4 py-4">

            {/* TITLE */}
            <h1 className="text-center mb-4">
                JEE Main College Predictor
            </h1>

            {/* BREADCRUMB */}
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/college-counseling">College Predictor & Counseling Guide</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        JEE Main College Predictor
                    </li>
                </ol>
            </nav>

            {/* INTRO */}
            <section>
                <p>
                    Predict your engineering college admission chances based on your
                    JEE Main rank or percentile using our comprehensive college predictor.
                </p>
            </section>

            {/* HOW TO USE */}
            <section>
                <h4>🎯 How to Use the Predictor</h4>
                <ol>
                    <li><strong>Enter Your Rank:</strong> Input your JEE Main rank</li>
                    <li><strong>Select Category:</strong> General / OBC / SC / ST / EWS</li>
                    <li><strong>Choose Home State:</strong> For quota benefits</li>
                    <li><strong>Get Predictions:</strong> Colleges & branches you can get</li>
                </ol>
            </section>

            {/* RANK RANGE */}
            <section>
                <h4>📊 College Predictions by Rank Range</h4>

                <h5>Top 10,000 Rank</h5>
                <p><strong>Colleges Available:</strong></p>
                <ul>
                    <li>NIT Trichy – CSE, ECE</li>
                    <li>NIT Surathkal – CSE, ECE</li>
                    <li>NIT Warangal – CSE, ECE</li>
                    <li>NIT Rourkela – CSE, ECE</li>
                    <li>NIT Calicut – CSE, ECE</li>
                    <li>IIIT Hyderabad – CSE</li>
                    <li>IIIT Delhi – CSE, ECE</li>
                    <li>IIIT Bangalore – CSE</li>
                </ul>
                <p><strong>Branch Options:</strong> CSE, ECE, Mechanical</p>

                <h5>10,000 – 25,000 Rank</h5>
                <ul>
                    <li>NIT Trichy – Civil, Chemical</li>
                    <li>NIT Surathkal – Mechanical, Civil</li>
                    <li>NIT Warangal – Mechanical, Civil</li>
                    <li>NIT Rourkela – All except CSE</li>
                    <li>IIIT Allahabad – IT, ECE</li>
                    <li>NIT Kurukshetra – CSE, ECE</li>
                </ul>

                <h5>25,000 – 50,000 Rank</h5>
                <ul>
                    <li>NIT Bhopal – CSE, ECE</li>
                    <li>NIT Jaipur – CSE, ECE</li>
                    <li>NIT Patna – CSE, ECE</li>
                    <li>NIT Silchar – All branches</li>
                    <li>NIT Goa – CSE, ECE</li>
                </ul>

                <h5>50,000 – 1,00,000 Rank</h5>
                <ul>
                    <li>NIT Agartala – All branches</li>
                    <li>NIT Srinagar – All branches</li>
                    <li>NIT Sikkim – All branches</li>
                    <li>Various IIITs & GFTIs</li>
                </ul>
            </section>

            {/* CATEGORY WISE */}
            <section>
                <h4>📈 Category-wise Predictions</h4>

                <h5>General Category</h5>
                <ul>
                    <li>Top NITs: Rank &lt; 25,000</li>
                    <li>Mid-tier NITs: 25,000 – 75,000</li>
                    <li>New NITs: 75,000 – 1,50,000</li>
                </ul>

                <h5>OBC Category</h5>
                <ul>
                    <li>Top NITs: Rank &lt; 75,000</li>
                    <li>Mid-tier NITs: 75,000 – 2,00,000</li>
                    <li>New NITs: 2,00,000 – 3,50,000</li>
                </ul>

                <h5>SC Category</h5>
                <ul>
                    <li>Top NITs: Rank &lt; 1,50,000</li>
                    <li>Mid-tier NITs: 1,50,000 – 4,00,000</li>
                    <li>New NITs: 4,00,000 – 6,00,000</li>
                </ul>

                <h5>ST Category</h5>
                <ul>
                    <li>Most NITs available</li>
                    <li>Wide branch options</li>
                    <li>Highest admission probability</li>
                </ul>
            </section>

            {/* HOME STATE */}
            <section>
                <h4>🏠 Home State Quota Benefits</h4>

                <p><strong>Uttar Pradesh:</strong></p>
                <ul>
                    <li>MNNIT Allahabad – CSE &lt; 60,000</li>
                    <li>NIT Allahabad – CSE &lt; 80,000</li>
                </ul>

                <p><strong>Madhya Pradesh:</strong></p>
                <ul>
                    <li>MANIT Bhopal – CSE &lt; 50,000</li>
                    <li>IIITDM Jabalpur – CSE &lt; 90,000</li>
                </ul>
            </section>

            {/* PERCENTILE */}
            <section>
                <h4>📊 Percentile to Rank Conversion</h4>
                <ul>
                    <li>99.5+ percentile → Top 5,000 rank</li>
                    <li>99.0 percentile → 20,000 rank</li>
                    <li>98.0 percentile → 50,000 rank</li>
                    <li>97.0 percentile → 80,000 rank</li>
                    <li>96.0 percentile → 1,20,000 rank</li>
                </ul>
            </section>

            {/* TIPS */}
            <section>
                <h4>💡 Prediction Tips</h4>
                <ol>
                    <li>Use home-state quota</li>
                    <li>Be flexible with branches</li>
                    <li>Consider newer NITs</li>
                    <li>Understand category benefits</li>
                </ol>
            </section>

            <hr />

            <p>
                🎯 <strong>
                    Use our interactive JEE Main College Predictor for personalized,
                    rank-based college predictions.
                </strong>
            </p>

        </main>
    )
}
