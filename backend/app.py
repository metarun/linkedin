# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging, sqlite3
from datetime import datetime
from database import save_post, get_db_connection
from llm import process_with_llm
from prompt import system_prompt

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def current_datetime():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')

@app.route('/save-post-details', methods=['POST'])
def save_post_details():
    data = request.json
    logging.info(f"save_post_details API Received Post content: {data.get('postContent', '')[:30]}...")
    
    if save_post(data):
        return jsonify({'status': 'success', 'message': 'Post details inserted successfully'})
    else:
        return jsonify({'status': 'error', 'message': 'Failed to insert post details'}), 500

@app.route('/post-response-fromllm', methods=['POST'])
def post_response_fromllm():
    model = 'anthropic'  # Model name, can be updated as needed
    data = request.json
    content = data.get('content', '').strip()
    
    # Log the received content (optional)
    logging.info(f"post-response-fromllm Received content: {content[:30]}...")

    # Process the content with the LLM
    response = process_with_llm(model, system_prompt, content)
    
    # Log the generated response (optional)
    logging.info(f"post-response-fromllm {model} Generated response: {response[:30]}...")
    
    # Return the generated response
    return jsonify({'processedContent': response})


@app.route('/is-post-already-responded', methods=[ 'POST' ])
def is_post_already_responded():
    logging.info("is_post_already_responded function called")
    data = request.json
    content = data.get('content', '').strip()

    # Log the received content for debugging
    logging.info(f"Received content for response check: '{content[ :30 ]}...'")

    conn = get_db_connection()
    try:
        c = conn.cursor()
        # Use parameterized query to prevent SQL injection
        c.execute('SELECT response FROM posts WHERE postContent = ?', (content,))
        post = c.fetchone()

        # Check if post is found and response is not null
        if post and post[ 'response' ]:
            logging.info(f"Post already responded -> Response: '{post[ 'response' ][ :30 ]}...'")
            return jsonify({'status': True, 'message': 'Post is already responded'})
        else:
            logging.info("Post not responded yet.")
            return jsonify({'status': False, 'message': 'Post is not responded'})

    except sqlite3.Error as e:
        logging.error(f"Database error: {e}")
        return jsonify({'status': False, 'message': 'Error checking post response'}), 500

    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({'status': False, 'message': 'Error checking post response'}), 500

    finally:
        conn.close()



if __name__ == '__main__':
    logging.info("Starting Flask server...")
    app.run(host='0.0.0.0', port=5001, debug=True)
