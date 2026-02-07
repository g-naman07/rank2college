import pandas as pd
import psycopg2
import psycopg2.extras
import os
import re  # <--- New import for Regex
from dotenv import load_dotenv

load_dotenv()

CSV_FILE = "josaa_data_2024_round_5.csv"
DATABASE_URL = os.getenv("DATABASE_URL")


def clean_text(text):
    if not isinstance(text, str):
        return str(text)
    # 1. Replace non-breaking spaces (\xa0) with normal spaces
    text = text.replace('\xa0', ' ')
    # 2. Replace multiple spaces with a single space
    text = re.sub(r'\s+', ' ', text)
    # 3. Trim leading/trailing whitespace
    return text.strip()


def seed_postgres():
    conn = None
    try:
        print("🔌 Connecting to Neon Database...")
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        print("✅ Connected!")

        print(f"📖 Reading {CSV_FILE}...")
        df = pd.read_csv(CSV_FILE)

        print("🧹 NUKE CLEANING: Removing hidden characters...")

        # Apply the nuclear cleaner to all text columns
        text_cols = ['Institute', 'Program', 'Quota', 'Category', 'Gender']
        for col in text_cols:
            df[col] = df[col].apply(clean_text)

        # Handle Ranks
        df['Opening Rank'] = pd.to_numeric(df['Opening Rank'], errors='coerce').fillna(0).astype(int)
        df['Closing Rank'] = pd.to_numeric(df['Closing Rank'], errors='coerce').fillna(0).astype(int)

        # Remove invalid rows
        df = df[df['Closing Rank'] > 0]

        # Prepare Data
        records_to_insert = []
        for index, row in df.iterrows():
            record = (
                row['Institute'],
                row['Program'],
                row['Quota'],
                row['Category'],
                row['Gender'],
                int(row['Opening Rank']),
                int(row['Closing Rank']),
                2024,
                5
            )
            records_to_insert.append(record)

        if records_to_insert:
            print(f"🚀 Inserting {len(records_to_insert)} hyper-clean rows...")
            cur.execute('TRUNCATE TABLE "College" RESTART IDENTITY;')

            insert_query = """
            INSERT INTO "College" (institute, program, quota, category, gender, "openingRank", "closingRank", year, round, "createdAt")
            VALUES %s
            """

            psycopg2.extras.execute_values(
                cur, insert_query, records_to_insert,
                template="(%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())",
                page_size=1000
            )
            conn.commit()
            print("✨ Success! Database is now 100% clean.")

    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        if conn: conn.close()


if __name__ == "__main__":
    seed_postgres()