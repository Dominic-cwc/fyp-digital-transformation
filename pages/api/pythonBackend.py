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
    data = eval(f.request.data.decode('utf-8'))
    rules = ""
    question = ""

    if data["分析模式"] == "一般模式":
        rules = "Please answer in Traditional Chinese, and provide brief answers. If the activity data provided is empty or unreasonable, please answer 'No sufficient data provided or the data provided is unreasonable.'"
        question = "Based on the activity data provided, provide safety suggestions for participants."
   
    elif data["分析模式"] == "深度模式":
        rules = "Please answer in Traditional Chinese, and provide detailed answers. If the activity data provided is empty or unreasonable, please answer 'No sufficient data provided or the data provided is unreasonable.'"
        question = "Based on the activity data provided, provide safety suggestions for participants."
   
    detail= data
    del detail["分析模式"]
    detail = json.dumps(detail, ensure_ascii=False)
    print("Rules: "+rules+"\nQuestion: "+question+"\n活動資料:"+detail)

    messagetoAI = fp.ProtocolMessage(role="user", content="Rules: "+rules+"\nQuestion: "+question+"\n活動資料:"+detail)
    result = asyncio.run(get_responses([messagetoAI]))
    return json.dumps({'message':result}), 200, {'Content-Type': 'application/json', "charset": "UTF-8"}

if __name__ == '__main__':
    app.run(debug=True)