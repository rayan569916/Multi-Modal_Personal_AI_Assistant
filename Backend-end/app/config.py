import os

BASE_DIR=os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER=os.path.join(BASE_DIR,"uploads")
os.makedirs(UPLOAD_FOLDER,exist_ok=True)

MODEL_NAME = "microsoft/phi-2"
MAX_NEW_TOKENS = 500
TEMPERATURE = 1.0