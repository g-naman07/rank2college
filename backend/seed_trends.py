import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# --- HIGH RESOLUTION TRENDS (10-Mark Intervals) ---
TRENDS_2025 = [
    # Top Tier (250-300)
    (280, 99.99, 2025),
    (260, 99.95, 2025),
    (250, 99.90, 2025),

    # The Competitive Zone (200-250) - PREVIOUSLY MISSING!
    (240, 99.80, 2025),  # 244 will now fall here
    (230, 99.70, 2025),
    (220, 99.50, 2025),
    (210, 99.20, 2025),
    (200, 99.00, 2025),

    # The Mid Range (150-200)
    (190, 98.80, 2025),
    (180, 98.50, 2025),  # 184 will fall here
    (170, 98.00, 2025),
    (160, 97.50, 2025),
    (150, 97.00, 2025),

    # The Lower Range (100-150)
    (140, 96.00, 2025),
    (130, 95.00, 2025),
    (120, 94.00, 2025),
    (110, 92.50, 2025),
    (100, 91.00, 2025),

    # The Floor
    (80, 85.00, 2025),
    (50, 70.00, 2025),
    (0, 40.00, 2025)
]


def seed_trends():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        print("🔌 Connected to Database...")

        # Clear old blocky data
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