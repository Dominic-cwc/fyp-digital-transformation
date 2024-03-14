import flask as f
import json


app = f.Flask(__name__)

@app.route('/api/test', methods=['GET'])
def test():
    return json.dumps({'success': True}), 200, {'Content-Type': 'application/json'}

if __name__ == '__main__':
    app.run(debug=True)
    