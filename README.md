# 🛡️ PhishNet

**Advanced Hybrid Phishing Detection System (Rule-Based + Deep Learning)**

PhishNet is a full-stack cybersecurity tool that detects phishing URLs in real-time. It utilizes a **Hybrid Architecture** combining a high-speed whitelist engine with a custom **Deep Learning Y-Network** (Bi-LSTM + Dense layers) to analyze URL patterns and protect users from malicious attacks.

## ✨ Features

- 🧠 **Hybrid Detection Engine** - Instantly validates trusted domains (Whitelist) before engaging AI.
- 🤖 **Deep Learning Model** - Custom "Y-Network" architecture (Bi-LSTM for text + Dense for metadata).
- ⚡ **Real-time Analysis** - Millisecond-latency scanning.
- 🎨 **Cyberpunk UI** - Modern interface built with React, TypeScript, and Tailwind CSS v4.
- 📝 **Explainable AI (XAI)** - Generates a "Detailed Analysis Report" explaining *why* a URL was flagged (e.g., "Too many dots", "IP address usage").
- 🔒 **Secure Sandbox** - Analyzes URL strings lexically without visiting or executing the malicious site.

## 🏗️ Tech Stack

### Backend
- **Python 3.10+**
- **FastAPI** - High-performance Async API
- **TensorFlow/Keras** - Deep Learning Framework
- **Scikit-learn** - Feature Scaling & Preprocessing
- **Joblib/Pickle** - Artifact serialization

### Frontend
- **React 18** (TypeScript)
- **Vite** - Next-gen frontend tooling
- **Tailwind CSS v4** - Utility-first styling engine
- **Lucide React** - Modern iconography
- **Axios** - Promise-based HTTP client

## 📦 Project Structure

```bash
PhishNet/
├── backend/
│   ├── app/
│   │   ├── main.py             # Server entry point
│   │   ├── api/endpoints.py    # /scan route
│   │   └── services/
│   │       ├── feature_extractor.py  # Calculates 12 lexical features
│   │       └── predictor.py          # Hybrid (Whitelist + AI) logic
│   ├── models/                 # Saved .keras model
│   ├── data/
│   │   └── processed/          # Saved Tokenizer & Scaler
│   └── training/               # Jupyter Notebooks for training
│
└── frontend/
    ├── src/
    │   ├── components/         # Scanner & ResultCard components
    │   └── types.ts            # TypeScript interfaces
    └── vite.config.ts

```

## 🚀 Getting Started

### Prerequisites

* Python 3.8+
* Node.js 18+

### 1. Backend Setup

Navigate to the backend directory and set up the Python environment:

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate it
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

# Install dependencies
pip install tensorflow pandas numpy scikit-learn matplotlib seaborn fastapi "uvicorn[standard]" python-multipart joblib

# (Optional) Freeze dependencies for future use
pip freeze > requirements.txt

```

Start the Server:

```bash
uvicorn app.main:app --reload

```

*Server is running at: `http://127.0.0.1:8000*`

### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend

# Install dependencies
npm install

# Start the Development Server
npm run dev

```

*Client is running at: `http://localhost:5173*`

## 🎯 Usage

1. Open the application in your browser (`http://localhost:5173`).
2. Enter a URL to analyze (e.g., `http://secure-login-paypal-update.com`).
3. Click **SCAN**.
4. View the results:
* **Risk Level:** (Safe, Moderate, Critical)
* **Confidence Score:** AI certainty percentage.
* **Analysis Report:** Specific reasons for the flag.



## 🧪 API Endpoints

### POST `/api/scan`

Analyzes a URL for phishing indicators.

**Request Body:**

```json
{
  "url": "[http://example-phish.com](http://example-phish.com)"
}

```

**Response:**

```json
{
  "url": "[http://example-phish.com](http://example-phish.com)",
  "is_phishing": true,
  "confidence_score": 0.98,
  "risk_level": "CRITICAL",
  "details": [
    "⚠️ URL is suspiciously long",
    "⚠️ Excessive number of dots detected",
    "⚠️ Deep Learning pattern match"
  ]
}

```

## 🔬 Model Details

The AI model utilizes a **Multi-Input "Y-Network" Architecture**:

1. **Branch 1 (Text Sequence):** Character-level Embedding → Bi-Directional LSTM (Learns semantic patterns in the URL string).
2. **Branch 2 (Metadata):** Dense Layers processing 12 calculated features (Length, IP presence, Dot count, Hyphen count, etc.).
3. **Fusion:** Both branches are concatenated and passed through a final Dense layer with Sigmoid activation.

## 🤝 Contributing

Contributions are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License.
```
Distributed under the MIT License.
```