from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import threading, time, requests
import os

app = Flask(__name__, static_folder='.', template_folder='.')

CORS(
    app,
    resources={
        r"/stats": {
            "origins": [
                "http://192.168.68.100",                                 # LAN Access
                "https://homelab.purpledogprints.co.uk",                 # Public Access
                "http://localhost:5000",                                 # Localhost Access
                "https://ichewradon.github.io/homelab/homelab-web-dash"  # Github Pages
            ]
        }
    }
)

latest = {
    "local": {},
    "remote": {}
}

REMOTE_PIS = {
    "node": "http://192.168.68.55:5000/stats"
}

def read_local_temps():
    try:
        with open("/sys/class/thermal/thermal_zone0/temp") as f:
            return round(int(f.read()) / 1000, 1)
    except:
        return None
    
def read_local_uptime():
    try:
        with open("/proc/uptime") as f:
            return int(float(f.read().split()[0]))
    except:
        return None
    
def poll_stats():
    while True:
        latest["local"] = {
            "temp": read_local_temps(),
            "uptime": read_local_uptime()
        }
        
        for name, url in REMOTE_PIS.items():
            try:
                r = requests.get(url, timeout=5)
                latest["remote"] = r.json()
            except:
                latest["remote"] = {"temp": None, "uptime": None}
        
        time.sleep(5)

threading.Thread(target=poll_stats, daemon=True).start()

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/stats')
def stats():
    return jsonify(latest)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
