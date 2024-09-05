import os
import sqlite3
from pathlib import Path

# Create the database directory if it doesn't exist
db_dir = os.path.join(Path(__file__).parent.absolute(), 'database')
os.makedirs(db_dir, exist_ok=True)

# Set the database file path
db_file = os.path.join(db_dir, 'linkedin_plugin.db')

# Create the database connection
conn = sqlite3.connect(db_file)
c = conn.cursor()

# Create the 'posts' table
c.execute('''CREATE TABLE IF NOT EXISTS posts
             (id INTEGER PRIMARY KEY AUTOINCREMENT,
              postContent TEXT,
              reactions INTEGER,
              comments INTEGER,
              reposts INTEGER,
              totalEngagement INTEGER,
              profileURL TEXT,
              response TEXT,
              datetime TEXT)''')

conn.commit()
conn.close()