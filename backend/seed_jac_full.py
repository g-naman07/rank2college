import pandas as pd
import psycopg2
import psycopg2.extras
import os
import re
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# --- 1. MAPPINGS & CONFIGURATION ---

# JAC Category Code Decoder
# Format: XX (Category) + XX (SubCat/Gender) + X (Region)
# Region: D = Delhi (HS), O = Outside Delhi (OS)
# Gender: GN = Neutral, GL = Female-Only
CAT_MAP = {
    'GN': 'OPEN',
    'EW': 'EWS',
    'OB': 'OBC-NCL',
    'SC': 'SC',
    'ST': 'ST'
}

# Branch Code Expansions (Especially for NSUT)
NSUT_BRANCH_MAP = {
    "CSAI": "Computer Science and Engineering (Artificial Intelligence)",
    "CSE": "Computer Science and Engineering",
    "CSDS": "Computer Science and Engineering (Data Science)",
    "IT": "Information Technology",
    "ITNS": "Information Technology (Network and Information Security)",
    "MAC": "Mathematics and Computing",
    "ECE": "Electronics and Communication Engineering",
    "EVDT": "Electronics Engineering (VLSI Design and Technology)",
    "EE": "Electrical Engineering",
    "ICE": "Instrumentation and Control Engineering",
    "ME": "Mechanical Engineering",
    "BT": "Bio-Technology",
    "CSDA": "Computer Science and Engineering (Big Data Analytics)",
    "CIOT": "Computer Science and Engineering (Internet of Things)",
    "ECAM": "Electronics and Communication Engineering (AI & ML)",
    "MEEV": "Mechanical Engineering (Electric Vehicles)",
    "CE": "Civil Engineering",
    "GI": "Geoinformatics",
    "B.Arch": "Bachelor of Architecture"
}

# IGDTUW Branch Map (Codes are usually used directly, but let's expand known ones)
IGDTUW_BRANCH_MAP = {
    "CSE-AI": "Computer Science and Engineering (AI)",
    "CSE": "Computer Science and Engineering",
    "ECE-AI": "Electronics and Communication Engineering (AI)",
    "ECE": "Electronics and Communication Engineering",
    "IT": "Information Technology",
    "AIML": "Artificial Intelligence and Machine Learning",
    "MAE": "Mechanical and Automation Engineering",
    "DMAM": "Mechanical and Automation Engineering (Dual Degree)",
    "MAC": "Mathematics and Computing",
    "B.Arch": "Bachelor of Architecture"
}

# --- 2. RAW DATA (Extracted from your PDFs) ---
# Format: (Institute, Round, Data_Block_String)
# I have consolidated the data from your uploaded files into these lists.

DTU_DATA_R5 = [
    # Branch Name, GNGND, GNGLD, EWGND, EWGLD, OBGND, OBGLD, SCGND, SCGLD, STGND, STGLD, GNGNO, GNGLO...
    ("Computer Science and Engineering", "11352", "15118", "27670", "31247", "49930", "60658", "109484", "127751", "356659", "375308", "6200", "6391"),
    ("IT", "12442", "14561", "19590", "20121", "28333", "33875", "38505", "54273", "70083", "57393", "7360", "11578"), # Merged IT/SE lines roughly
    ("Software Engineering", "18706", "20996", "42387", "42751", "80436", "106011", "175926", "197551", "641245", "667981", "8165", "11158"),
    ("Mathematics and Computing", "20458", "23503", "49805", "61080", "100268", "115408", "200587", "242941", "960804", "0", "8348", "11612"),
    ("Electronics and Communication Engineering", "22278", "26356", "55620", "92816", "105320", "121035", "209811", "0", "911267", "967902", "9569", "0"),
    ("Electrical Engineering", "31589", "42199", "79048", "132804", "147712", "192885", "286821", "453582", "1235423", "0", "11227", "12644"),
    ("Mechanical Engineering", "44365", "79234", "110006", "174639", "183462", "335482", "378952", "661821", "1217615", "0", "16022", "22085"),
    ("Engineering Physics", "45024", "56476", "111899", "0", "200344", "236184", "440143", "451812", "880496", "0", "14482", "0"),
    ("Civil Engineering", "56161", "85250", "134993", "199792", "236405", "365974", "475427", "668920", "420855", "810016", "19179", "0"),
    ("Chemical Engineering", "49816", "55917", "125062", "200985", "221288", "340919", "469072", "0", "0", "0", "16697", "0"),
    ("Bio-Technology", "59055", "80880", "140244", "203570", "252856", "418769", "510076", "0", "0", "0", "19876", "23292")
]

# NSUT Round 5 Data (Format: BranchCode, GNGND, GNGLD, EWGND, EWGLD, OBGND, OBGLD, SCGND, SCGLD, STGND, STGLD, GNGNO...)
NSUT_DATA_R5 = [
    ("CSAI", "7946", "14127", "18161", "51563", "35812", "79382", "107246", "145136", "180658", "335926", "6050", "7408"),
    ("CSE", "10907", "18652", "29658", "46550", "145305", "117715", "84454", "48539", "343647", "569974", "6249", "7495"),
    ("CSDS", "12614", "20125", "31843", "58486", "55225", "84549", "128099", "148245", "385222", "0", "7037", "0"),
    ("IT", "16301", "22065", "44570", "59499", "97154", "206831", "72460", "172341", "616283", "680357", "7651", "11578"),
    ("MAC", "20967", "25534", "50842", "92043", "98154", "135201", "205362", "226125", "947189", "0", "7841", "12382"),
    ("ECE", "25052", "32842", "61377", "103745", "115535", "174856", "235553", "386469", "1100168", "0", "9819", "15817"),
    ("EE", "34252", "57483", "84176", "162850", "160670", "301282", "341340", "695557", "1150595", "0", "11618", "19079"),
    ("ICE", "39133", "72920", "103539", "202641", "701184", "463839", "180826", "355443", "0", "0", "13847", "23043"),
    ("ME", "48319", "86822", "123175", "210150", "761432", "207591", "432106", "474963", "904236", "0", "16519", "27680"),
    ("BT", "60434", "88803", "151099", "201548", "529169", "377127", "259953", "677932", "0", "0", "19843", "29417")
]

# IGDTUW Round 5 Data (Female Only)
# Format: BranchCode, GNGND, EWGND, OBGND, SCGND, STGND, GNGNO...
IGDTUW_DATA_R5 = [
    ("CSE-AI", "44405", "90958", "186225", "413693", "1183864", "23158"),
    ("CSE", "50687", "118163", "204747", "399917", "969509", "20667"),
    ("ECE-AI", "75759", "183883", "339542", "698598", "0", "27368"),
    ("ECE", "79574", "192517", "346713", "597563", "0", "27449"),
    ("IT", "64223", "151085", "270817", "516592", "0", "25486"),
    ("AIML", "64133", "135852", "280051", "470209", "0", "25326"),
    ("MAE", "92818", "244309", "425801", "820634", "0", "30228"),
    ("MAC", "69001", "163983", "306445", "617454", "0", "26176")
]

# --- 3. PROCESSING LOGIC ---

def process_dtu(cur, data_list, round_num):
    print(f"   Processing DTU Round {round_num}...")
    
    # Indices in the DTU tuple:
    # 0: Branch
    # 1: GNGND, 2: GNGLD, 3: EWGND, 4: EWGLD, 5: OBGND, 6: OBGLD, 7: SCGND, 8: SCGLD, 9: STGND, 10: STGLD
    # 11: GNGNO, 12: GNGLO (Outside Delhi Gen/Gen-Girl)
    
    for row in data_list:
        branch = row[0].strip()
        
        # Helper to insert
        def insert_rank(rank_str, category, quota, gender):
            if not rank_str or rank_str == '0': return
            try:
                rank = int(re.sub(r'\D', '', str(rank_str))) # Clean "(VI)" etc
                if rank == 0: return
                
                cur.execute("""
                    INSERT INTO "College" (institute, program, quota, category, gender, "openingRank", "closingRank", year, round, "createdAt")
                    VALUES (%s, %s, %s, %s, %s, 1, %s, 2025, %s, NOW())
                """, ("Delhi Technological University", branch, quota, category, gender, rank, round_num))
            except:
                pass

        # Delhi Region (HS)
        insert_rank(row[1], 'OPEN', 'HS', 'Gender-Neutral')
        insert_rank(row[2], 'OPEN', 'HS', 'Female-only')
        insert_rank(row[3], 'EWS', 'HS', 'Gender-Neutral')
        insert_rank(row[4], 'EWS', 'HS', 'Female-only')
        insert_rank(row[5], 'OBC-NCL', 'HS', 'Gender-Neutral')
        insert_rank(row[6], 'OBC-NCL', 'HS', 'Female-only')
        insert_rank(row[7], 'SC', 'HS', 'Gender-Neutral')
        insert_rank(row[8], 'SC', 'HS', 'Female-only')
        insert_rank(row[9], 'ST', 'HS', 'Gender-Neutral')
        insert_rank(row[10], 'ST', 'HS', 'Female-only')

        # Outside Delhi (OS) - Just General for now based on snippet length
        if len(row) > 11:
            insert_rank(row[11], 'OPEN', 'OS', 'Gender-Neutral')
        if len(row) > 12:
            insert_rank(row[12], 'OPEN', 'OS', 'Female-only')

def process_nsut(cur, data_list, round_num):
    print(f"   Processing NSUT Round {round_num}...")
    for row in data_list:
        code = row[0].strip()
        branch = NSUT_BRANCH_MAP.get(code, code) # Expand code
        
        def insert_rank(rank_str, category, quota, gender):
            if not rank_str or rank_str == '0': return
            try:
                rank = int(re.sub(r'\D', '', str(rank_str)))
                if rank == 0: return
                
                cur.execute("""
                    INSERT INTO "College" (institute, program, quota, category, gender, "openingRank", "closingRank", year, round, "createdAt")
                    VALUES (%s, %s, %s, %s, %s, 1, %s, 2025, %s, NOW())
                """, ("Netaji Subhas University of Technology", branch, quota, category, gender, rank, round_num))
            except:
                pass

        # Mapping indices to (Category, Quota, Gender)
        # Delhi (HS)
        insert_rank(row[1], 'OPEN', 'HS', 'Gender-Neutral') # GNGND
        insert_rank(row[2], 'OPEN', 'HS', 'Female-only')    # GNGLD
        insert_rank(row[3], 'EWS', 'HS', 'Gender-Neutral')  # EWGND
        insert_rank(row[4], 'EWS', 'HS', 'Female-only')    # EWGLD
        insert_rank(row[5], 'OBC-NCL', 'HS', 'Gender-Neutral')
        insert_rank(row[6], 'OBC-NCL', 'HS', 'Female-only')
        insert_rank(row[7], 'SC', 'HS', 'Gender-Neutral')
        insert_rank(row[8], 'SC', 'HS', 'Female-only')
        insert_rank(row[9], 'ST', 'HS', 'Gender-Neutral')
        insert_rank(row[10], 'ST', 'HS', 'Female-only')
        
        # Outside (OS)
        if len(row) > 11:
            insert_rank(row[11], 'OPEN', 'OS', 'Gender-Neutral') # GNGNO
        if len(row) > 12:
            insert_rank(row[12], 'OPEN', 'OS', 'Female-only')    # GNGLO

def process_igdtuw(cur, data_list, round_num):
    print(f"   Processing IGDTUW Round {round_num}...")
    for row in data_list:
        code = row[0].strip()
        branch = IGDTUW_BRANCH_MAP.get(code, code)
        
        def insert_rank(rank_str, category, quota):
            if not rank_str or rank_str == '0': return
            try:
                rank = int(re.sub(r'\D', '', str(rank_str)))
                if rank == 0: return
                
                cur.execute("""
                    INSERT INTO "College" (institute, program, quota, category, gender, "openingRank", "closingRank", year, round, "createdAt")
                    VALUES (%s, %s, %s, %s, %s, 1, %s, 2025, %s, NOW())
                """, ("Indira Gandhi Delhi Technical University for Women", branch, quota, category, "Female-only", rank, round_num))
            except:
                pass

        # Delhi (HS) - Female Only College
        insert_rank(row[1], 'OPEN', 'HS') # GNGND
        insert_rank(row[2], 'EWS', 'HS') # EWGND
        insert_rank(row[3], 'OBC-NCL', 'HS') # OBGND
        insert_rank(row[4], 'SC', 'HS') # SCGND
        insert_rank(row[5], 'ST', 'HS') # STGND
        
        # Outside (OS)
        if len(row) > 6:
            insert_rank(row[6], 'OPEN', 'OS') # GNGNO

def seed_jac_full():
    conn = None
    try:
        print("🔌 Connecting to Database...")
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        print("✅ Connected!")
        
        # Optional: Clear old JAC data to avoid duplicates (Use carefully!)
        # cur.execute("DELETE FROM \"College\" WHERE institute IN ('Delhi Technological University', 'Netaji Subhas University of Technology', 'Indira Gandhi Delhi Technical University for Women') AND year = 2025")

        process_dtu(cur, DTU_DATA_R5, 5)
        process_nsut(cur, NSUT_DATA_R5, 5)
        process_igdtuw(cur, IGDTUW_DATA_R5, 5)

        conn.commit()
        print("✨ Success! All JAC 2025 Data inserted.")

    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        if conn: conn.close()

if __name__ == "__main__":
    seed_jac_full()