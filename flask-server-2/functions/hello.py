from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# 你的原有 route
@app.route('/')
def hello():
    return jsonify({"message": "Hello from Flask on Netlify!"})

@app.route('/get_embedding', methods=['POST'])
def get_embedding():
    # 你的原有 get_embedding 邏輯
    return jsonify({"embedding": [0.1, 0.2, 0.3]})

def handler(event, context):
    # Netlify 呼叫這個 handler
    # 將 Netlify event 轉成 Flask request
    flask_request = request
    # 這裡要模擬 Flask 的 request（較複雜）
    # 簡單起見，先用 WSGI 包裝
    from werkzeug.test import EnvironBuilder
    builder = EnvironBuilder(
        method=event['httpMethod'],
        path=event['path'],
        data=event['body'],
        headers=event['headers']
    )
    environ = builder.get_environ()
    response = app(environ, lambda status, headers: None)
    return {
        'statusCode': 200,
        'body': response
    }