from flask import Flask, request
from datetime import datetime
import os

app = Flask(__name__)

@app.route('/')
def index():
    return open('templates/index.html').read()


@app.route('/upload', methods=['POST'])
def upload():
    if request.method == 'POST':
        audio_file = request.files['audio_file']
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        filename = f"audio_{timestamp}.wav"
        audio_file.save(os.path.join('uploads', filename))
        print(f"Received audio file: {filename}")
        return "File uploaded", 200

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)
