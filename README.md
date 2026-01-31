# 🛡️ PhishNet

**Advanced AI-powered phishing detection system built with deep learning**

PhishNet is a full-stack web application that uses machine learning to detect phishing URLs in real-time. It analyzes URL patterns and characteristics to identify potential threats and protect users from malicious websites.

![PhishNet Screenshot](https://via.placeholder.com/800x400?text=PhishNet+Dashboard)

## ✨ Features

- 🤖 **AI-Powered Detection** - Deep learning model trained on phishing datasets
- ⚡ **Real-time Analysis** - Instant URL scanning and risk assessment
- 🎨 **Modern UI** - Beautiful, responsive interface with gradient animations
- 📊 **Detailed Reports** - Comprehensive analysis with confidence scores
- 🔒 **Secure** - Safe URL analysis without executing malicious code
- 📈 **Risk Levels** - Clear categorization (Safe, Moderate, Critical)

## 🏗️ Tech Stack

### Backend
- **Python 3.x** - Core backend language
- **FastAPI** - High-performance web framework
- **TensorFlow/Keras** - Deep learning model
- **scikit-learn** - Feature extraction and preprocessing
- **Pydantic** - Data validation

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

## 📦 Project Structure

```
PhishNet/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app entry point
│   │   ├── api/
│   │   │   └── endpoints.py     # API routes
│   │   ├── core/
│   │   │   └── config.py        # Configuration
│   │   └── services/
│   │       ├── feature_extractor.py  # URL feature extraction
│   │       └── predictor.py          # ML model predictions
│   ├── models/
│   │   └── phishnet_v1.keras    # Trained model
│   ├── data/
│   │   ├── raw/                 # Original datasets
│   │   └── processed/           # Preprocessed data
│   ├── training/
│   │   └── train_model.py       # Model training script
│   └── requirements.txt         # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Scanner.tsx      # URL input component
    │   │   └── ResultCard.tsx   # Results display
    │   ├── App.tsx              # Main app component
    │   ├── types.ts             # TypeScript types
    │   └── index.css            # Global styles
    ├── package.json             # Node dependencies
    └── vite.config.ts           # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the FastAPI server:
```bash
uvicorn app.main:app --reload
```

The backend will run on `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🎯 Usage

1. Open the application in your browser
2. Enter a URL you want to analyze
3. Click "SCAN" to perform the analysis
4. View the results with:
   - Risk level (Safe, Moderate, Critical)
   - Confidence score
   - Detailed analysis report
5. Click "Scan Another URL" to analyze more URLs

## 🧪 API Endpoints

### POST `/api/scan`
Analyze a URL for phishing indicators

**Request Body:**
```json
{
  "url": "http://example.com"
}
```

**Response:**
```json
{
  "url": "http://example.com",
  "is_phishing": false,
  "confidence_score": 0.85,
  "display_confidence": "85.0%",
  "risk_level": "SAFE",
  "details": [
    "URL length is normal (27 characters)",
    "Domain appears legitimate",
    "No suspicious patterns detected"
  ]
}
```

## 🔬 Model Training

To retrain the model with new data:

```bash
cd backend/training
python train_model.py
```

The model uses features such as:
- URL length and structure
- Domain characteristics
- Special character patterns
- Subdomain analysis
- HTTPS presence

## 🛠️ Development

### Backend Development
- Add new features in `backend/app/services/`
- Update API routes in `backend/app/api/endpoints.py`
- Modify model in `backend/training/train_model.py`

### Frontend Development
- Add new components in `frontend/src/components/`
- Update styling in `frontend/src/index.css`
- Modify types in `frontend/src/types.ts`

## 📝 License

MIT License - feel free to use this project for learning and development

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Known Issues

- TensorFlow dependency needs to be installed for the backend
- Model file needs to be present in `backend/models/`

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**⚠️ Disclaimer:** This tool is for educational purposes. Always verify URLs through multiple sources before making security decisions.
