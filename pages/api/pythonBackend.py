import flask as f
import json
import asyncio
import fastapi_poe as fp
import sys
import os

# add envparser.py to the path
sys.path.append(os.path.join(os.path.dirname(__file__)[0:-9], 'envparser'))
from envparser import POE_API_KEY
api_key = POE_API_KEY;
app = f.Flask(__name__) # create a new Flask instance

# create a new FastAPI instance
async def get_responses(messages):
    async for partial in fp.get_bot_response(messages=messages, bot_name="GPT-3.5-Turbo", api_key=api_key):
        print(partial.text, end="")


@app.route('/api/getSuggestions', methods=['POST'])
def getSuggestions():
    data = f.request.json
    print(data["name"])
    return json.dumps({'success': True}), 200, {'Content-Type': 'application/json'}


if __name__ == '__main__':
    app.run(debug=True)