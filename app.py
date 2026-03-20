import gradio as gr
import pipeline
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os

# Custom CSS for larger interface
custom_css = """
.gradio-container { max-width: 1400px !important; }
.output-class { font-size: 24px !important; }
"""

# Define Gradio Interfaces (Same as before)
image_interface = gr.Interface(
    fn=pipeline.deepfakes_image_predict,
    inputs=gr.Image(label="Upload Image", height=500),
    outputs=gr.Textbox(label="Detection Result", lines=8, scale=2),
    title="Image Deepfake Detection"
)
video_interface = gr.Interface(
    fn=pipeline.deepfakes_video_predict,
    inputs=gr.Video(label="Upload Video", height=500),
    outputs=gr.Textbox(label="Detection Result", lines=8, scale=2),
    title="Video Deepfake Detection"
)
audio_interface = gr.Interface(
    fn=pipeline.deepfakes_audio_predict,
    inputs=gr.Audio(label="Upload Audio"),
    outputs=gr.Textbox(label="Detection Result", lines=4),
    title="Audio Deepfake Detection"
)

# Gradio App Block
with gr.Blocks(css=custom_css) as gradio_app:
    gr.TabbedInterface(
        interface_list=[image_interface, video_interface, audio_interface],
        tab_names=['Image inference', 'Video inference', 'Audio inference']
    )

# FastAPI Integration
app = FastAPI()

# 1. Mount specific static asset folders (Images, Videos, Audios)
for folder in ["images", "videos", "audios"]:
    if os.path.exists(folder):
        app.mount(f"/{folder}", StaticFiles(directory=folder), name=folder)

# 2. Serve index.html at root
@app.get("/")
async def read_index():
    return FileResponse('index.html')

# 3. Mount Gradio at /gradio
# IMPORTANT: Mount Gradio BEFORE the static catch-all
app = gr.mount_gradio_app(app, gradio_app, path="/gradio")

# 4. Serve individual files (style.css, app.js) explicitly to avoid interfering with Gradio
@app.get("/style.css")
async def get_css(): return FileResponse("style.css")

@app.get("/app.js")
async def get_js(): return FileResponse("app.js")

if __name__ == '__main__':
    import uvicorn
    print("\n🚀 DeepGuard AI Unified Server Running!")
    print("👉 PREMIUM UI: http://127.0.0.1:7860/")
    print("👉 GRADIO API: http://127.0.0.1:7860/gradio\n")
    uvicorn.run(app, host="127.0.0.1", port=7860)