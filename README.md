# 🎭 DeepGuard AI — Deepfake Detection System

> **Multimodal AI-Powered Deepfake Detector for Images, Videos & Audio**

[![Python 3.10](https://img.shields.io/badge/python-3.10-blue.svg)](https://www.python.org/downloads/)
[![TensorFlow 2.12](https://img.shields.io/badge/TensorFlow-2.12-orange.svg)](https://www.tensorflow.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Unified-green.svg)](https://fastapi.tiangolo.com/)
[![Gradio](https://img.shields.io/badge/Gradio-Backend-red.svg)](https://gradio.app/)

---

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🎨 UI/UX — DeepGuard Frontend](#-uiux--deepguard-frontend)
- [📁 Project Structure](#-project-structure)
- [💻 System Requirements](#-system-requirements)
- [🚀 Installation Guide](#-installation-guide)
- [🎮 Unified Usage](#-unified-usage)
- [🧠 Model Information](#-model-information)
- [🔧 Technical Details](#-technical-details)
- [🐛 Troubleshooting](#-troubleshooting)

---

## 🎯 Project Overview

**DeepGuard AI** is an advanced multimodal deepfake detection system that uses state-of-the-art deep learning architectures to identify AI-manipulated media. The system combines:

- 🧠 **EfficientNet-B0** for visual (image & video) detection.
- 🎙️ **RawNet2** for audio/voice cloning detection.
- 🌐 **Unified High-Speed Server** powered by FastAPI and Gradio.

### Use Cases
- 🔒 **Media Verification** - Authenticate digital visual content.
- 📰 **Journalism** - Cross-verify sources and media before publishing.
- 🛡️ **Forensics** - Detect manipulations in security or legal footage.
- 🎓 **Research** - Study modern AI detection and multimodal architectures.

---

## ✨ Features

- **🖼️ Image Detection** - Instant analysis of uploads for deepfake artifacts.
- **🎬 Video Detection** - Comprehensive frame-by-frame analysis with temporal aggregation.
- **🎙️ Audio Detection** - Detect AI-synthesized voices using raw waveform analysis.
- **📊 Interpretable Results** - Bold verdicts with interactive real-time confidence bars.
- **🚀 Premium UI** - A customized, animated black & orange web interface.
- **⚡ Unified Backend** - Single-process server hosting both the web UI and AI models.

---

## 🎨 UI/UX — DeepGuard Frontend

DeepGuard features a high-impact **Black & Orange** design system:
- **Matrix Rain Splash**: An animated intro sequence simulating system initialization.
- **Scanning HUD**: Visual "iris" scans and typewriter effects during analysis.
- **Live Detector**: Tabbed interface for seamless switching between media types.

---

## 📁 Project Structure

| File/Folder | Purpose | Required |
|-------------|---------|----------|
| `app.py` | **Unified Server**: Hosts both the Web UI and AI API. | ✅ Yes |
| `pipeline.py` | Core detection logic, preprocessing, and inference. | ✅ Yes |
| `rawnet.py` | Audio detection model architecture class. | ⚠️ Optional |
| `index.html` | Premium Web Interface structure. | ✅ Yes |
| `app.js` | Frontend logic and API bridge to Gradio. | ✅ Yes |
| `style.css` | Complete design system and animations. | ✅ Yes |
| `requirements.txt` | Python package dependencies. | ✅ Yes |
| `efficientnet-b0/` | Image/Video detection model directory (~87 MB). | ✅ Yes |
| `RawNet2.pth` | Audio detection model weights (~67 MB). | ⚠️ Optional |

---

## 💻 System Requirements

### Recommended Environment
- **OS**: Windows 10/11 (64-bit)
- **RAM**: Minimum 8 GB (16 GB Recommended)
- **CPU**: i5 and above (Intel 10th Gen+ Recommended)
- **GPU**: Optional (CPU inference is supported for all models)

### Python Compatibility
| Version | Status | Notes |
|---------|--------|-------|
| **3.10.11** | **✅ Verified** | **Highly Recommended** for TensorFlow 2.12 stability. |
| 3.10.x | ✅ Supported | Full compatibility across all modalities. |
| 3.11+ | ⚠️ Error | Likely to cause TensorFlow/Cuda version conflicts. |
| 3.8/3.9 | ✅ Supported | Compatible but may require older package versions. |

---

## 🚀 Installation Guide

### Step 1: Clone or Extract Project
Navigate to the project root directory:
```powershell
cd path/to/Deepfakedetector
```

### Step 2: Set Up Virtual Environment (venv)
```powershell
# Create environment with Python 3.10.11
py -3.10 -m venv deepfake_env_310

# Activate the environment
.\deepfake_env_310\Scripts\activate
```

### Step 3: Install Dependencies
```powershell
# Upgrade pip
python -m pip install --upgrade pip

# Install required packages
pip install -r requirements.txt
```

---

## 🎮 Unified Usage

DeepGuard now runs as a single, unified full-stack application.

### Running the Application
```powershell
# Ensure environment is active
python app.py
```

### Accessing the System
Once the server starts, open your browser:
👉 **Premium UI**: [http://127.0.0.1:7860/](http://127.0.0.1:7860/)
👉 **Gradio API**: [http://127.0.0.1:7860/gradio/](http://127.0.0.1:7860/gradio/)

---

## 🧠 Model Information

### EfficientNet-B0 (Visual)
- **Architecture**: MBConv with Squeeze-and-Excitation.
- **Task**: Binary Classification (Real vs Fake).
- **Input**: 224x224 RGB.
- **Framework**: TensorFlow 2.12.

### RawNet2 (Audio)
- **Architecture**: Sinc-filters + Residual blocks.
- **Task**: Synthetic voice detection (Voice Cloning).
- **Framework**: PyTorch.

---

## 🔧 Technical Details

### The API Bridge
The custom frontend (`app.js`) communicates with the backend via the **Gradio Internal API**. When the server is mounted via FastAPI, the JS calls:
`http://127.0.0.1:7860/gradio/api/predict`
This ensures a seamless, single-origin experience without CORS issues.

### Video Analysis Workflow
1. Video is loaded into memory.
2. Keyframes are extracted and preprocessed.
3. Inference is run on each frame using EfficientNet-B0.
4. Confidence scores are aggregated to give a final verdict.

---

## 🐛 Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `ModuleNotFoundError` | Env not active. | Run `.\deepfake_env_310\Scripts\activate`. |
| `TensorFlow Error` | Python version > 3.10. | Reinstall using Python 3.10.11. |
| `IndentationError` | Corrupted `app.py`. | Use the updated version provided in the handoff. |
| `Port 7860 in use` | Another server running. | Close existing terminal or use a different port. |

---

## 📄 License
This project is for educational and research purposes. Please use responsibly.

**Made with ❤️ for a safer digital world.**
