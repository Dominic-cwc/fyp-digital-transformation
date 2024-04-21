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
    async for partial in fp.get_bot_response(messages=messages, bot_name="GPT-4", api_key=api_key):
        yield partial.text

def sync_wrapper(async_gen_func, *args, **kwargs):
    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        gen = async_gen_func(*args, **kwargs)
        while True:
            try:
                yield loop.run_until_complete(gen.__anext__())
            except StopAsyncIteration:
                break
    finally:
        # Cancel all remaining tasks
        for task in asyncio.all_tasks(loop):
            task.cancel()
        # Run the loop again to let the tasks finish cancellation
        loop.run_until_complete(loop.shutdown_asyncgens())
        loop.close()

@app.before_request
def before_request():
    if f.request.method == 'OPTIONS':
        origin = f.request.headers.get('Origin')
        if not origin or origin=="" or "localhost" in origin:
            response = f.make_response()
            response.headers['Access-Control-Allow-Origin'] = origin
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            response.headers['Access-Control-Allow-Methods'] = 'POST'
            response.headers['Access-Control-Allow-Credentials'] = 'true'
            return response
        else:
            return f.abort(403)


@app.route('/api/getSuggestions', methods=['POST'])
def getSuggestions():
    origin = f.request.headers.get('Origin')
    response = f.make_response()
    if not origin or origin=="" or "localhost" in origin:
        response.headers['Access-Control-Allow-Origin'] = origin
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
    else:
        return f.abort(403)

    data = eval(f.request.data.decode('utf-8'))
    rules = ""
    question = ""

    if data["分析模式"] == "一般模式":
        rules = "Please answer in Traditional Chinese, and provide brief answers. If the data provided is empty or unreasonable, please answer 'No sufficient data provided or the data provided is unreasonable.' in Traditional Chinese."
        question = "Based on the activity data provided, provide safety suggestions for participants."
   
    elif data["分析模式"] == "深度模式":
        rules = "Please answer in Traditional Chinese, and provide detailed answers. If the activity data provided is empty or unreasonable, please answer 'No sufficient data provided or the data provided is unreasonable.' in Traditional Chinese."
        question = "Based on the activity data provided, provide safety suggestions for participants."
   
    detail= data
    del detail["分析模式"]
    detail = json.dumps(detail, ensure_ascii=False)
    print("Rules: "+rules+"\nQuestion: "+question+"\nData:"+detail)

    messagetoAI = fp.ProtocolMessage(role="user", content="Rules: "+rules+"\nQuestion: "+question+"\nData:"+detail)
    responsegen = sync_wrapper(get_responses, [messagetoAI])
    return f.Response(f.stream_with_context(responsegen), mimetype='text/plain', headers={"Access-Control-Allow-Origin": origin, "Access-Control-Allow-Credentials": "true"})

if __name__ == '__main__':
    app.run(debug=True)