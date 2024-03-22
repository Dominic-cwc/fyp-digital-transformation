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
    result = ""
    async for partial in fp.get_bot_response(messages=messages, bot_name="GPT-3.5-Turbo", api_key=api_key):
        result += partial.text
    return result


@app.route('/api/getSuggestions', methods=['POST'])
def getSuggestions():
    data = f.request.data.decode('utf-8')

    content = "請以繁體中文進行簡短回答, 你現在只會回答關於活動安全的建議, 如果沒有提供資料給你或活動資料不合理, 請回答'沒有提供足夠資料, 請先填寫方案。'"
    detail= data
    print(content+detail)

    messagetoAI = fp.ProtocolMessage(role="user", content=content+detail)
    result = asyncio.run(get_responses([messagetoAI]))
    return json.dumps({'message':result}), 200, {'Content-Type': 'application/json', "charset": "UTF-8"}

if __name__ == '__main__':
    app.run(debug=True)