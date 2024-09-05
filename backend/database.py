import sqlite3, logging, time
from datetime import datetime

db_file = 'database/linkedin_plugin.db'

def current_datetime():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')

def get_db_connection():
    conn = sqlite3.connect(db_file)
    conn.row_factory = sqlite3.Row
    return conn

def save_post(post_details):
    logging.info("save_post function called")
    try:
        # Log the incoming post details for debugging
        temp_post_details = post_details
        logging.info(f"save_post Received post --> {temp_post_details['postContent'][:30]}...")
        
        conn = get_db_connection()
        c = conn.cursor()

        # Check if the post already exists
        c.execute('SELECT id, response FROM posts WHERE postContent = ?', (post_details['postContent'],))
        existing_post = c.fetchone()

        if existing_post:
            logging.info(f"save_post Updating existing post --> {post_details['postContent'][:30]}...")
            # Update the post, keeping the existing response
            c.execute('''UPDATE posts SET 
                            reactions = ?, 
                            comments = ?, 
                            reposts = ?, 
                            totalEngagement = ?, 
                            profileURL = ?, 
                            datetime = ?, 
                            response = ? 
                         WHERE id = ?''',
                      (post_details.get('reactions', 0),
                       post_details.get('comments', 0),
                       post_details.get('reposts', 0),
                       post_details.get('totalEngagement', 0),
                       post_details.get('profileURL', None),
                       current_datetime(),
                       post_details.get('response', None),  # Keep the existing response
                       existing_post['id']))
        else:
            logging.info(f"save_post Inserting new post --> {post_details['postContent'][:30]}...")
            # Insert new post with no response initially
            c.execute('''INSERT INTO posts 
                                (postContent, reactions, comments, reposts, totalEngagement, profileURL, response, datetime) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
                      (post_details['postContent'],
                       post_details.get('reactions', 0),
                       post_details.get('comments', 0),
                       post_details.get('reposts', 0),
                       post_details.get('totalEngagement', 0),
                       post_details.get('profileURL', None),
                       None,  # response is initially None
                       current_datetime()))

        conn.commit()
        conn.close()
        

        return True
    except Exception as e:
        # Log the detailed exception message with full traceback
        logging.error(f"Error in save_post: {str(e)}", exc_info=True)
        return False



