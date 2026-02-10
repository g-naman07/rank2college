import csv
import psycopg2

# 🔴 PASTE YOUR NEON DB URL HERE
DATABASE_URL = "postgresql://neondb_owner:npg_XoKqjHywgf38@ep-broad-truth-ahtfc0zh-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

def seed_igdtuw_data():
    try:
        # 1. Connect to Database
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        print("✅ Connected to Database")

        # 2. DELETE OLD IGDTUW DATA
        print("🗑️  Deleting old IGDTUW data...")
        cur.execute("DELETE FROM \"College\" WHERE institute = 'Indira Gandhi Delhi Technical University for Women'")
        
        # 3. INSERT NEW DATA
        print("📂 Reading CSV file...")
        with open('jac_data.csv', 'r') as f:
            reader = csv.DictReader(f)
            count = 0
            
            for row in reader:
                rank_str = row['ClosingRank'].replace(',', '').strip()
                if not rank_str: continue 
                
                closing_rank = int(rank_str)

                cur.execute("""
                    INSERT INTO "College" (
                        institute, program, quota, category, gender, 
                        "openingRank", "closingRank", year, round
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    row['Institute'],
                    row['Program'],
                    row['Quota'],
                    row['Category'],
                    row['Gender'],
                    0,              # openingRank (Dummy)
                    closing_rank,   # closingRank
                    2025,           # year (Fixed)
                    5               # round (Fixed)
                ))
                count += 1

        conn.commit()
        print(f"🚀 Successfully updated {count} rows for IGDTUW!")
        
        cur.close()
        conn.close()

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    seed_igdtuw_data()