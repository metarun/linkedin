import openai
import cohere
from anthropic import Anthropic
import logging
import os
from prompt import system_prompt

# Load environment variables from .env file
cohere_api_key = os.getenv("COHERE_API_KEY")
openai_api_key = os.getenv("OPENAI_API_KEY")
anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")

# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def call_cohere_llm(system_prompt, linkedin_post):
    logging.info("Calling Cohere LLM...")
    co = cohere.Client(cohere_api_key)
    message = system_prompt.format(linkedin_post=linkedin_post)
    response = co.chat(message=message)
    response = response.text
    logging.info(f"Response from Cohere is : {response}")
    return response

def call_openai_llm(system_prompt, linkedin_post):
    logging.info("Calling OpenAI LLM...")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": linkedin_post}
        ]
    )
    response_text = response['choices'][0]['message']['content']
    logging.info(f"Response from OpenAI is : {response}")
    return response_text

def call_anthropic_llm(system_prompt, linkedin_post):
    logging.info("Calling Anthropic LLM...")
    client = Anthropic(api_key=anthropic_api_key)
    input = system_prompt.format(linkedin_post=linkedin_post)
    message = client.messages.create(
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": input,
            }
        ],
        model="claude-3-5-sonnet-20240620",
    )
    response = message.content
    logging.info(f"Response from Anthropic is : {response}")
    return response[0].text if response else ""

def process_with_llm(model, system_prompt, linkedin_post):
    logging.info(f"Processing with LLM model: {model}")
    if model == "openai":
        return call_openai_llm(system_prompt, linkedin_post)
    elif model == "anthropic":
        return call_anthropic_llm(system_prompt, linkedin_post)
    else:
        return call_cohere_llm(system_prompt, linkedin_post)
