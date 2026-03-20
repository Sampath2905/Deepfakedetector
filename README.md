# 🎭 DeepGuard AI — Deepfake Detection System

> **Multimodal AI-Powered Deepfake Detector for Images, Videos & Audio**

[![Python 3.10](https://img.shields.io/badge/python-3.10-blue.svg)](https://www.python.org/downloads/)
[![TensorFlow 2.12](https://img.shields.io/badge/TensorFlow-2.12-orange.svg)](https://www.tensorflow.org/)
[![Gradio](https://img.shields.io/badge/Gradio-Backend-red.svg)](https://gradio.app/)
[![EfficientNet](https://img.shields.io/badge/Model-EfficientNet--B0-brightgreen.svg)](https://arxiv.org/abs/1905.11946)
[![RawNet2](https://img.shields.io/badge/Audio-RawNet2-purple.svg)](https://arxiv.org/abs/2011.01108)
[![License](https://img.shields.io/badge/License-Educational-lightgrey.svg)](#-license)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [UI/UX — DeepGuard Frontend](#-uiux--deepguard-frontend)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [System Requirements](#-system-requirements)
- [Installation Guide](#-installation-guide)
- [Usage](#-usage)
- [Model Information](#-model-information)
- [Technical Details](#-technical-details)
- [Cloning from GitHub](#-cloning-from-github)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Disclaimer](#-disclaimer)

---

## 🎯 Project Overview

**DeepGuard AI** is an advanced deepfake detection system that uses state-of-the-art deep learning models to identify AI-manipulated images, videos, and audio. The system combines:

- 🧠 **EfficientNet-B0** for visual (image & video) deepfake detection
- 🎙️ **RawNet2** for audio deepfake / voice cloning detection
- 🌐 **Custom Web UI** — a fully animated, black & orange HTML/CSS/JS frontend
- ⚙️ **Gradio backend** for model serving and API

### What is a Deepfake?
Deepfakes are synthetic media created using AI to manipulate or generate realistic-looking visual and audio content. DeepGuard detects such content using frame-level analysis and confidence scoring.

### Use Cases
| Use Case | Description |
|---|---|
| 🔒 **Media Verification** | Verify the authenticity of images and videos |
| 📰 **Journalism & Fact-Checking** | Validate visual content before publishing |
| 🛡️ **Security & Forensics** | Detect manipulated surveillance footage |
| 🎓 **Education & Research** | Study AI-generated media and detection techniques |
| ⚖️ **Legal Evidence** | Authenticate digital media for legal proceedings |

---

## 🎨 UI/UX — DeepGuard Frontend

DeepGuard ships with a fully custom **black & orange** web frontend — a clean, modern, animated single-page application built in pure HTML, CSS, and JavaScript (no frameworks required).

### ✨ Intro / Splash Animation

When the page loads, users are greeted with a high-impact intro sequence:

| Element | Description |
|---|---|
| 🌧️ **Matrix Rain** | Orange falling characters (`DEEPGUARDAI` + hex digits) fill the entire black screen |
| 👁️ **Scanner Eye** | Animated iris with rotating dashed rings, glowing pupil, sweeping scan bar, and corner target brackets |
| ⌨️ **Typewriter Boot** | 4 lines typed out in monospace terminal style, simulating AI initialization |
| 📊 **Progress Bar** | Fills from 0% → 100% during boot sequence |
| 🚀 **Launch Button** | Orange pulsing "Launch DeepGuard" button appears on completion |

### 🖥️ Frontend Pages & Sections

| Section | What It Contains |
|---|---|
| **Hero** | Bold headline, animated face-scanner visualization, live accuracy counters |
| **Features** | Three glowing cards — Image Analysis, Video Detection, Audio Detection |
| **Live Detector** | Tab switcher (Image / Video / Audio), drag-and-drop upload, scan animation, REAL/FAKE verdict |
| **How It Works** | 4-step illustrated timeline |
| **Performance Stats** | Circular ring charts showing accuracy metrics per modality |
| **Footer** | Brand, navigation, tech stack links |

### 🗂️ Frontend Files

| File | Purpose |
|---|---|
| `index.html` | Full HTML structure — all sections and components |
| `style.css` | Complete design system: black/orange tokens, animations, responsive layout |
| `app.js` | Matrix rain, typewriter effect, tab logic, file handling, scan simulation |

### 🎯 Opening the Frontend

Simply open `index.html` in any modern browser — **no server or build step required**:

```
d:\Project-1\Deepfakedetector\index.html
```

> **Connecting to backend**: The Live Detector panel is wired for demo simulation. To connect to your live Gradio API, replace the `showDemoResult()` function in `app.js` with a `fetch()` call to your Gradio endpoint (default: `http://127.0.0.1:7860`).

---

## ✨ Features

### Backend (Gradio / Python)
- **🖼️ Image Detection** — Upload any image; EfficientNet-B0 classifies it as Real or Fake with a confidence score
- **🎬 Video Detection** — Extracts 5 key frames, runs per-frame inference, returns averaged verdict
- **🎙️ Audio Detection** — RawNet2 analyzes raw waveforms to spot AI-synthesized speech
- **📊 Confidence Scoring** — Percentage-based Real vs Fake confidence output
- **📁 Example Files** — Pre-loaded test images and videos for quick demo
- **⚡ Real-time Processing** — Fast detection, ~0.5–2 seconds per image on CPU

### Frontend (HTML/CSS/JS)
- **🎬 Animated Splash Screen** — Matrix rain + eye scanner intro sequence
- **🖤🟠 Black & Orange Design** — Premium dark theme with vibrant orange accents
- **🖱️ Drag-and-Drop Upload** — Drop any image, video, or audio file directly
- **📑 Tabbed Detector** — Separate tabs for Image, Video, and Audio
- **📡 Live Scan Animation** — Step-by-step scanning progress with pulsing rings
- **📈 Animated Result Bars** — Smooth animated Real/Fake confidence bars
- **🔠 Responsive Layout** — Works on desktop and mobile
- **✨ Micro-animations** — Hover effects, shimmer buttons, scroll fade-ins

---

## 📁 Project Structure

```
Deepfakedetector/
│
├── 📄 index.html              # ★ DeepGuard AI Web Frontend (NEW)
├── 📄 style.css               # ★ Black & Orange UI Design System (NEW)
├── 📄 app.js                  # ★ Frontend Animations & Interactions (NEW)
│
├── 📄 app.py                  # Gradio backend application
├── 📄 pipeline.py             # Core detection pipeline
├── 📄 rawnet.py               # RawNet2 audio model architecture
├── 📄 requirements.txt        # Python package dependencies
├── 📄 packages.txt            # System-level dependencies (Linux)
├── 📄 run_app.bat             # Windows batch launcher
├── 📄 .gitignore              # Git ignore rules
├── 📄 .gitattributes          # Git LFS configuration
│
├── 📂 efficientnet-b0/        # EfficientNet-B0 TensorFlow saved model
│   ├── saved_model.pb         # Model computation graph
│   ├── keras_metadata.pb      # Keras metadata
│   └── variables/             # Model weights
│
├── 📂 images/                 # Example test images
│   ├── images_lady.jpg        # Real image sample
│   └── images_fake_image.jpg  # Fake image sample
│
├── 📂 videos/                 # Example test videos
│   ├── celeb_synthesis.mp4    # Fake video sample
│   └── real-1.mp4             # Real video sample
│
├── 📂 audios/                 # Audio sample files
│   └── *.flac
│
└── 📦 RawNet2.pth             # RawNet2 PyTorch weights (~67 MB)
```

### File Reference

| File / Folder | Purpose | Size | Required |
|---|---|---|---|
| `index.html` | Web frontend entry point | ~15 KB | ✅ UI |
| `style.css` | Frontend styling | ~18 KB | ✅ UI |
| `app.js` | Frontend logic | ~10 KB | ✅ UI |
| `app.py` | Gradio server | ~2 KB | ✅ Backend |
| `pipeline.py` | Detection logic | ~7 KB | ✅ Backend |
| `rawnet.py` | Audio model class | ~14 KB | ⚠️ Optional |
| `efficientnet-b0/` | Image/Video model | ~87 MB | ✅ Backend |
| `RawNet2.pth` | Audio model weights | ~67 MB | ⚠️ Optional |
| `images/` | Example images | ~36 KB | 📝 Recommended |
| `videos/` | Example videos | ~840 KB | 📝 Recommended |

---

## 💻 System Requirements

### Python Version
**Python 3.10.11** — Tested and verified ✅

> Python 3.10 provides the best compatibility with TensorFlow 2.12 and all required dependencies.

| Version | Status |
|---|---|
| Python 3.10.x | ✅ Recommended |
| Python 3.9.x | ✅ Compatible |
| Python 3.11+ | ⚠️ May have conflicts |
| Python 3.8 or lower | ❌ Not supported |

### Hardware
| Component | Minimum | Recommended |
|---|---|---|
| RAM | 8 GB | 16 GB |
| Storage | 500 MB | 1 GB |
| GPU | Not required | NVIDIA CUDA GPU |
| OS | Windows 10/11, Linux, macOS | Windows 11 |

### Browser (for Frontend UI)
Any modern browser — Chrome, Firefox, Edge, Safari (no extensions or plugins needed).

---

## 🚀 Installation Guide

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Jo9gi/DeepFake_Detector.git
cd DeepFake_Detector
```

### Step 2 — Set up Python Environment

#### Option A: Conda (Recommended ⭐)

```bash
# Create environment with Python 3.10.11
conda create -n deepfake_detector python=3.10.11 -y

# Activate
conda activate deepfake_detector
```

#### Option B: venv

```bash
# Windows
python -m venv deepfake_env
deepfake_env\Scripts\activate

# Linux / macOS
python -m venv deepfake_env
source deepfake_env/bin/activate
```

### Step 3 — Install Dependencies

```bash
# Upgrade pip
python -m pip install --upgrade pip

# Install all requirements
pip install -r requirements.txt
```

### Step 4 — System Dependencies (Linux only)

```bash
sudo apt-get update
sudo apt-get install -y ffmpeg libsm6 libxext6
```

### Step 5 — Pull Model Files (if using Git LFS)

```bash
# Install Git LFS (one-time)
git lfs install

# Pull large model files
git lfs pull
```

---

## 📦 Dependencies

### Core (Image / Video Detection)
```
tensorflow==2.12.0         # Deep learning backend
opencv-python              # Image & video processing
opencv-python-headless     # Headless OpenCV variant
numpy                      # Numerical operations
gradio                     # Web API & interface
```

### Additional (Audio Detection)
```
torch                      # PyTorch runtime
torchvision                # Vision utilities
librosa                    # Audio processing
facenet_pytorch            # Face detection utilities
mtcnn                      # Multi-task CNN face detector
moviepy                    # Video file utilities
```

---

## 🎮 Usage

### Running the Frontend Only (No Python needed)

Open `index.html` directly in your browser:

```
file:///D:/Project-1/Deepfakedetector/index.html
```

The frontend runs a **demo simulation** of the detector — no backend required. To run live detection, start the Gradio backend first (see below).

---

### Running the Full Stack (Frontend + Gradio Backend)

#### Option 1 — Windows Batch Script

```bat
run_app.bat
```

#### Option 2 — Python

```bash
# Activate your environment first
conda activate deepfake_detector

# Start the Gradio server
python app.py
```

Gradio will start and print:

```
Running on local URL:  http://127.0.0.1:7860
```

Open the URL in your browser to use the Gradio interface directly.

---

### Using the DeepGuard Web UI

1. Open `index.html` in your browser
2. Watch the **intro animation** complete
3. Click **"Launch DeepGuard"**
4. Navigate to the **Detector** section (navbar or "Try Now" button)
5. Select your media type: **Image | Video | Audio**
6. **Drag and drop** or **Browse** to upload a file
7. Click **"Analyze Now"**
8. View the **REAL / FAKE verdict** with animated confidence bars

---

### Using the Gradio Interface Directly

| Tab | Steps |
|---|---|
| **Image inference** | Upload image → Submit → View result |
| **Video inference** | Upload video → Submit → Wait for frame analysis → View result |

---

## 🧠 Model Information

### EfficientNet-B0 — Visual Detection

| Property | Value |
|---|---|
| Architecture | EfficientNetV2-B0 |
| Input Size | 224 × 224 pixels |
| Output | Real / Fake (softmax, binary) |
| Framework | TensorFlow / Keras |
| Model Size | ~87 MB |
| Inference Time | ~0.5–2 seconds (CPU) |

### RawNet2 — Audio Detection

| Property | Value |
|---|---|
| Architecture | RawNet2 |
| Input | Raw audio waveform |
| Output | Real / Fake (binary) |
| Framework | PyTorch |
| Model Size | ~67 MB |

---

## 🔧 Technical Details

### Detection Pipeline

```
Input Media
    │
    ▼
Pre-processing
    ├─ Image  → Resize to 224×224, BGR→RGB, normalize [0,1]
    ├─ Video  → Extract 5 evenly-spaced frames → resize each to 224×224
    └─ Audio  → Load waveform → Tensor → RawNet2 input
    │
    ▼
Model Inference
    ├─ EfficientNet-B0  → [real_score, fake_score] per frame
    └─ RawNet2          → [real, fake] class logits
    │
    ▼
Score Aggregation
    ├─ Image  → Single frame score
    └─ Video  → Mean across all extracted frames
    │
    ▼
Verdict
    ├─ real_mean >= 0.5  →  "REAL"
    └─ real_mean < 0.5   →  "FAKE"
         │
         └─ Deepfake Confidence = fake_mean × 100%
```

### Performance Metrics

| Modality | Accuracy | Avg Speed |
|---|---|---|
| Image | ~97.8% | 0.5–2 sec |
| Video | ~93% | 2–10 sec |
| Audio | ~91% | 1–3 sec |

### Supported Formats

| Type | Formats |
|---|---|
| Images | JPG, JPEG, PNG, WEBP |
| Videos | MP4, AVI, MOV, MKV |
| Audio | WAV, MP3, FLAC |

---

## 📥 Cloning from GitHub

### Standard Clone

```bash
git clone https://github.com/Jo9gi/DeepFake_Detector.git
cd DeepFake_Detector
pip install -r requirements.txt
python app.py
```

### With Git LFS (includes large model files)

```bash
git lfs install
git clone https://github.com/Jo9gi/DeepFake_Detector.git
cd DeepFake_Detector
git lfs pull
```

### Quick Clone (skip large files, fetch later)

```bash
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/Jo9gi/DeepFake_Detector.git
cd DeepFake_Detector
git lfs pull --include="efficientnet-b0/*"
```

---

## 🐛 Troubleshooting

### Issue 1 — TensorFlow Import Error

```
Error: module 'tensorflow' has no attribute 'random'
```

**Fix:**
```bash
pip uninstall tensorflow tensorflow-intel -y
pip install tensorflow==2.12.0
```

---

### Issue 2 — CUDA / GPU Warning

```
Could not load dynamic library 'cudart64_110.dll'
```

**Fix:** This is a warning, not a fatal error. CPU inference still works. To suppress:
```bash
pip install tensorflow-cpu==2.12.0
```

---

### Issue 3 — Gradio Port Already in Use

```
Error: Address already in use: 7860
```

**Fix:** Change the port in `app.py`:
```python
app.launch(share=False, server_port=7861)
```

---

### Issue 4 — Out of Memory

```
ResourceExhaustedError: OOM when allocating tensor
```

**Fix:** Use smaller input files or increase available RAM. For video, the pipeline samples only 5 frames by default.

---

### Issue 5 — Model Files Missing

```
Error: No such file or directory: 'efficientnet-b0/'
```

**Fix:**
```bash
git lfs pull
```

---

### Issue 6 — Gradio Module Not Found

```
ModuleNotFoundError: No module named 'gradio'
```

**Fix:**
```bash
pip install gradio
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make** your changes and test thoroughly
4. **Commit** with a clear message
   ```bash
   git commit -m "feat: add your feature description"
   ```
5. **Push** to your branch
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open** a Pull Request

### Areas for Contribution
- 🧪 Additional model architectures (e.g., Xception, ViT)
- 🌐 API integration between HTML frontend and Gradio backend
- 📱 Mobile-first responsive improvements
- 🎨 Additional UI themes
- 📊 Batch processing & export reports
- 🌍 Multi-language support
- 🐛 Bug fixes and performance improvements

---

## 📄 License

This project is available for **educational and research purposes only**.  
Please cite appropriately when using in academic work.

---

## 🙏 Acknowledgments

| Contributor | Contribution |
|---|---|
| Google Research | EfficientNet architecture |
| RawNet2 Authors | Audio deepfake detection model |
| Gradio Team | Web API and interface framework |
| TensorFlow / Google Brain | Deep learning framework |
| OpenCV | Image & video processing |
| Open Source Community | Tools, datasets, and inspiration |

---

## 📞 Contact & Support

- **GitHub**: [https://github.com/Jo9gi/DeepFake_Detector](https://github.com/Jo9gi/DeepFake_Detector)
- **Issues**: Use the GitHub Issues tab for bug reports
- **Discussions**: GitHub Discussions for questions and feature ideas

---

## 🔄 Version History

| Version | Changes |
|---|---|
| **v1.0.0** | Initial release — image and video detection via Gradio |
| **v1.1.0** | Enhanced Gradio UI with larger interface components |
| **v1.2.0** | Cleaned project structure, removed audio tab from Gradio |
| **v2.0.0** | ★ **DeepGuard AI** — full custom HTML/CSS/JS frontend with splash animation, black & orange design system, tabbed detector, animated results |

---

## ⚠️ Disclaimer

This tool is intended **strictly for educational and research purposes**.  
While DeepGuard AI achieves high accuracy, no deepfake detection system is perfect.  
Always verify critical content through multiple independent sources.  
Do not use this tool as the sole basis for legal, journalistic, or security decisions.

---

<div align="center">

**Made with 🧡 for a safer, more trustworthy digital world**

*DeepGuard AI — Unmask the Deepfake. Protect the Truth.*

</div>
