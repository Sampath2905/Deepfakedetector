import os
import cv2
import torch
import zipfile
import librosa
import numpy as np
import tensorflow as tf



#Set random seed for reproducibility.
tf.random.set_seed(42)

# Extract model if not already extracted
if not os.path.exists("efficientnet-b0"):
    local_zip = "./efficientnet-b0.zip"
    if os.path.exists(local_zip):
        zip_ref = zipfile.ZipFile(local_zip, 'r')
        zip_ref.extractall()
        zip_ref.close()
        print("Model extracted successfully!")

# Load models.
# Load model without compiling to avoid optimizer dependency issues
# TFSMLayer was introduced in TF 2.13; fall back to tf.saved_model.load() for older versions
try:
    model = tf.keras.layers.TFSMLayer("efficientnet-b0/", call_endpoint='serving_default')
    _use_tfsm = True
except AttributeError:
    _saved_model = tf.saved_model.load("efficientnet-b0/")
    _infer = _saved_model.signatures['serving_default']
    _input_key = list(_infer.structured_input_signature[1].keys())[0]
    print(f"TFSMLayer not available, using tf.saved_model.load() with input key: '{_input_key}'")
    _use_tfsm = False

def _run_model(x):
    """Version-agnostic model inference wrapper."""
    if _use_tfsm:
        return model(x)
    else:
        result = _infer(**{_input_key: tf.constant(x, dtype=tf.float32)})
        return result



class DetectionPipeline:
    """Pipeline class for detecting faces in the frames of a video file."""

    def __init__(self, n_frames=None, batch_size=60, resize=None, input_modality = 'video'):
        """Constructor for DetectionPipeline class.

        Keyword Arguments:
            n_frames {int} -- Total number of frames to load. These will be evenly spaced
                throughout the video. If not specified (i.e., None), all frames will be loaded.
                (default: {None})
            batch_size {int} -- Batch size to use with MTCNN face detector. (default: {32})
            resize {float} -- Fraction by which to resize frames from original prior to face
                detection. A value less than 1 results in downsampling and a value greater than
                1 result in upsampling. (default: {None})
        """
        self.n_frames = n_frames
        self.batch_size = batch_size
        self.resize = resize
        self.input_modality = input_modality

    def __call__(self, filename):
        """Load frames from an MP4 video and detect faces.

        Arguments:
            filename {str} -- Path to video.
        """
        # Create video reader and find length
        if self.input_modality == 'video':
            print('Input modality is video.')
            v_cap = cv2.VideoCapture(filename)
            v_len = int(v_cap.get(cv2.CAP_PROP_FRAME_COUNT))

            # Pick 'n_frames' evenly spaced frames to sample
            if self.n_frames is None:
                sample = np.arange(0, v_len)
            else:
                sample = np.linspace(0, v_len - 1, self.n_frames).astype(int)

            # Loop through frames
            faces = []
            frames = []
            for j in range(v_len):
                success = v_cap.grab()
                if j in sample:
                    # Load frame
                    success, frame = v_cap.retrieve()
                    if not success:
                        continue
                    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

                    # Resize frame to desired size
                    if self.resize is not None:
                        h, w = frame.shape[:2]
                        frame = cv2.resize(frame, (int(w * self.resize), int(h * self.resize)))
                    frames.append(frame)

                    # When batch is full, detect faces and reset frame list
                    if len(frames) % self.batch_size == 0 or j == sample[-1]:
                        face2 = cv2.resize(frame, (224, 224))
                        faces.append(face2)

            v_cap.release()
            return faces

        elif self.input_modality == 'image':
            print('Input modality is image.')
            #Perform inference for image modality.
            print('Reading image')
            if isinstance(filename, str):
                image = cv2.imread(filename)
                if image is None:
                    raise ValueError(f"Could not read image file: {filename}")
                image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            else:
                image = filename
                
            image = cv2.resize(image, (224, 224))
            return image
        
        elif self.input_modality == 'audio':
            print("INput modality is audio.")

            #Load audio.
            x, sr = librosa.load(filename)
            x_pt = torch.Tensor(x)
            x_pt = torch.unsqueeze(x_pt, dim = 0)
            return x_pt
        
        else:
            raise ValueError("Invalid input modality. Must be either 'video' or image")

detection_video_pipeline = DetectionPipeline(n_frames=5, batch_size=1, input_modality='video')
detection_image_pipeline = DetectionPipeline(batch_size = 1, input_modality = 'image')

def deepfakes_video_predict(input_video):

    faces = detection_video_pipeline(input_video)

    if not faces:
        return "No frames could be extracted from the video. Please try a different file."

    real_res = []
    fake_res = []

    for face in faces:
        face2 = face / 255
        output = _run_model(np.expand_dims(face2.astype(np.float32), axis=0))
        pred = list(output.values())[0].numpy()[0]
        real_res.append(pred[0])
        fake_res.append(pred[1])

    real_mean = np.mean(real_res)
    fake_mean = np.mean(fake_res)
    print(f"Real Faces: {real_mean}")
    print(f"Fake Faces: {fake_mean}")

    if real_mean >= 0.5:
        text = "The video is REAL. \n Deepfakes Confidence: " + str(round(100 - (real_mean * 100), 3)) + "%"
    else:
        text = "The video is FAKE. \n Deepfakes Confidence: " + str(round(fake_mean * 100, 3)) + "%"

    return text


def deepfakes_image_predict(input_image):
    faces = detection_image_pipeline(input_image)
    face2 = faces/255
    output = _run_model(np.expand_dims(face2.astype(np.float32), axis=0))
    pred = list(output.values())[0].numpy()[0]
    real, fake = pred[0], pred[1]
    if real > 0.5:
        text2 = "The image is REAL. \n Deepfakes Confidence: " + str(round(100 - (real*100), 3)) + "%"
    else:
        text2 = "The image is FAKE. \n Deepfakes Confidence: " + str(round(fake*100, 3)) + "%"
    return text2

def load_audio_model():
    d_args = {
  "nb_samp": 64600,
  "first_conv": 1024,
  "in_channels": 1,
  "filts": [20, [20, 20], [20, 128], [128, 128]],
  "blocks": [2, 4],
  "nb_fc_node": 1024,
  "gru_node": 1024,
  "nb_gru_layer": 3,
  "nb_classes": 2}
    
    model = RawNet(d_args = d_args, device='cpu')

    #Load ckpt.
    model_dict = model.state_dict()
    ckpt = torch.load('RawNet2.pth', map_location=torch.device('cpu'))
    model.load_state_dict(ckpt, model_dict)
    return model

audio_label_map = {
    0: "Real audio",
    1: "Fake audio"
}

def deepfakes_audio_predict(input_audio):
    #Perform inference on audio.
    if isinstance(input_audio, str):
        x, sr = librosa.load(input_audio, sr=16000)
    else:
        sr, x = input_audio
        if x.ndim > 1:
            x = x.mean(axis=1) # mix to mono if stereo
        if x.dtype != np.float32:
            x = x.astype(np.float32) / np.max(np.abs(x))
            
    x_pt = torch.Tensor(x)
    x_pt = torch.unsqueeze(x_pt, dim = 0)

    #Load model.
    model = load_audio_model()

    #Perform inference.
    grads = model(x_pt)

    #Get the argmax.
    grads_np = grads.detach().numpy()
    result = np.argmax(grads_np)

    return audio_label_map[result]