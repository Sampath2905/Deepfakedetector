import urllib.request
import urllib.error

urls = [
    "http://127.0.0.1:7860/gradio/api/predict/",
    "http://127.0.0.1:7860/gradio/run/predict/",
    "http://127.0.0.1:7860/api/predict/"
]

for url in urls:
    req = urllib.request.Request(url, method="POST", data=b"{}", headers={'Content-Type': 'application/json'})
    try:
        response = urllib.request.urlopen(req)
        print(f"SUCCESS {url}: {response.status}")
    except urllib.error.HTTPError as e:
        print(f"FAILED {url}: {e.code}")
    except Exception as e:
        print(f"ERROR {url}: {e}")
