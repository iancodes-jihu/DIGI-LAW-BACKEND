from data.model import predict as model_predict
from flask import request, jsonify, Flask

app = Flask(__name__)

@app.route('/status', methods=['GET', 'POST'])
def status():
    return jsonify({"status": "ok"})

@app.route('/predict', methods=['POST'])
def predict():

    data = request.get_json()
    text = data.get('text', '')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    result = model_predict(text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)