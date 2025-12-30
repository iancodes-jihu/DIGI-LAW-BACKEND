from flask import request, jsonify, Flask
from data.steaming import Steaming
from data.rules import rules

app = Flask(__name__)

@app.route('/status', methods=['GET', 'POST'])
def status():
    return jsonify({"status": "ok"})

@app.route('/normalize', methods=['POST'])
def predict():

    data = request.get_json()
    text = data.get('text', '')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    result = Steaming().normalizeText(text)
    return jsonify(result)

@app.route('/rule', methods=['POST'])
def detect():
    data = request.get_json()
    text = data.get('text', '')

    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    result = rules().getJsonResponse(text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)