from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pickle  
import numpy as np
from typing import List
import pandas as pd

with open("model.pkl", "rb") as f:
    model = pickle.load(f)

csv_path = "final_data_with_prognosis.csv"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SelectedDisease(BaseModel):
    sym: List[str]

class feature_send:
    
    def extract_features():
      df = pd.read_csv(csv_path)
      X = df.drop("prognosis", axis=1)
      return list(X.columns)
    

SYSLIST = feature_send.extract_features()
def symptoms_to_features(symptoms: List[str]) -> np.ndarray:
    """Convert symptom list to binary vector for ML model"""
    features = [1 if s in symptoms else 0 for s in SYSLIST]
    return np.array(features).reshape(1, -1)

@app.post("/dashboard")
async def dashboard(data: SelectedDisease):
    features = symptoms_to_features(data.sym)

    prediction = model.predict(features)[0]
    score_proba  = model.predict_proba(features)[0]

    confidence = float(np.max(score_proba)) * 100  

    return {
        "predicted_disease": str(prediction),
        "symptoms_received": data.sym,
        "Score" : confidence
    }
