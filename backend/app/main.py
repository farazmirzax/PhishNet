from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router

app = FastAPI(title="PhishNet API", version="1.0")

# 1. CORS Security (Allow Frontend to access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow React to call us
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Connect the Routes
app.include_router(router, prefix="/api")

@app.get("/")
def home():
    return {"message": "PhishNet Brain is Active 🧠. Use /api/scan to check URLs."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)