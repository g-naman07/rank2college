import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# --- HIGH RESOLUTION TRENDS (5-Mark Intervals + Realistic 2025 Data) ---
TRENDS_2025 = [
    # 🏆 TOP TIER (99%ile+)
    (280, 99.995, 2025),
    (260, 99.98, 2025),
    (240, 99.95, 2025),
    (220, 99.90, 2025),
    (200, 99.60, 2025),
    (190, 99.40, 2025),
    (180, 99.00, 2025),  # 180 is the magic number for 99%ile

    # 🔥 THE COMPETITIVE ZONE (96-98%ile)
    (175, 98.80, 2025),
    (170, 98.50, 2025),
    (165, 98.20, 2025),
    (160, 98.00, 2025),
    (155, 97.70, 2025),
    (150, 97.50, 2025),  # 150 = ~35k Rank
    (145, 97.20, 2025),
    (140, 96.80, 2025),
    (135, 96.50, 2025),  # 135 = ~49k Rank
    (130, 96.00, 2025),  # 130 = ~56k Rank (Much better than 70k!)

    # 🌊 THE MID RANGE
    (125, 95.50, 2025),
    (120, 95.00, 2025),  # 120 marks is usually the cutoff for 95%ile
    (115, 94.50, 2025),
    (110, 94.00, 2025),
    (105, 93.00, 2025),
    (100, 92.00, 2025),
    (90, 90.00, 2025),
    (80, 88.00, 2025),

    # 📉 THE LOWER RANGE
    (70, 85.00, 2025),
    (60, 80.00, 2025),
    (50, 75.00, 2025),
    (40, 60.00, 2025),
    (0, 40.00, 2025)
]


def seed_trends():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        print("🔌 Connected to Database...")

        # Clear old data
        cur.execute('TRUNCATE TABLE "MarksVsRank" RESTART IDENTITY;')

        # INSERT NEW HIGH-RES DATA
        query = 'INSERT INTO "MarksVsRank" ("minMarks", percentile, year) VALUES (%s, %s, %s)'

        count = 0
        for t in TRENDS_2025:
            cur.execute(query, t)
            count += 1

        conn.commit()
        print(f"✅ Success! Updated {count} High-Resolution Trend Points.")

    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        if 'conn' in locals() and conn:
            conn.close()


if __name__ == "__main__":
    seed_trends()