from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.predictor import PhishNetPredictor

router = APIRouter()

# 1. Initialize the AI (Load model once when server starts)
# This might take 2-3 seconds to load, but then it stays ready.
print("⏳ Initializing AI Service...")
try:
    predictor = PhishNetPredictor()
except Exception as e:
    print(f"❌ Failed to load model: {e}")
    # We don't crash here so you can fix it without restarting the whole container,
    # but requests will fail.
    predictor = None

# 2. Define the Request Format
class URLRequest(BaseModel):
    url: str

# 3. Define the Route
@router.post("/scan")
async def scan_url(request: URLRequest):
    if not predictor:
        raise HTTPException(status_code=500, detail="AI Model not loaded")
    
    try:
        # Pass the URL to our 'Y-Network'
        result = predictor.predict(request.url)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))