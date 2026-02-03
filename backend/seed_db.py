import pandas as pd
import psycopg2
import psycopg2.extras  # <--- The Secret Weapon
import os
from dotenv import load_dotenv

load_dotenv()

CSV_FILE = "josaa_data_2024_round_5.csv"
DATABASE_URL = os.getenv("DATABASE_URL")


def seed_postgres():
    conn = None
    try:
        print("🔌 Connecting to Neon Database...")
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        print("✅ Connected!")

        # 2. Read CSV
        print(f"📖 Reading {CSV_FILE}...")
        df = pd.read_csv(CSV_FILE)

        # 3. Prepare Data
        records_to_insert = []
        for index, row in df.iterrows():
            try:
                # helper to safely convert rank to integer
                def parse_rank(val):
                    s = str(val).strip()
                    if not s.isnumeric(): return 0
                    return int(s)

                o_rank = parse_rank(row['Opening Rank'])
                c_rank = parse_rank(row['Closing Rank'])

                if c_rank == 0: continue

                record = (
                    row['Institute'],
                    row['Program'],
                    row['Quota'],
                    row['Category'],
                    row['Gender'],
                    o_rank,
                    c_rank,
                    2024,
                    5
                )
                records_to_insert.append(record)
            except Exception as e:
                continue

        # 4. The FAST Insert
        if records_to_insert:
            print(f"🚀 Optimizing insert for {len(records_to_insert)} rows...")

            # Clear old data
            cur.execute('TRUNCATE TABLE "College" RESTART IDENTITY;')

            insert_query = """
            INSERT INTO "College" (institute, program, quota, category, gender, "openingRank", "closingRank", year, round, "createdAt")
            VALUES %s
            """

            # execute_values generates one giant SQL command:
            # INSERT INTO ... VALUES (row1), (row2), (row3)...
            psycopg2.extras.execute_values(
                cur,
                insert_query,
                records_to_insert,
                template="(%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())",
                page_size=1000  # Send 1000 rows per network packet
            )

            conn.commit()
            print("✨ Success! 11k rows inserted in seconds.")

    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        if conn: conn.close()


if __name__ == "__main__":
    seed_postgres()