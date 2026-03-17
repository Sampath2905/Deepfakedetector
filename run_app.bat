@echo off
echo Activating environment and launching Deepfake Detector...
call deepfake_env_310\Scripts\activate.bat
python app.py
pause
