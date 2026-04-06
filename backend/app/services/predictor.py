import os
import pickle
import joblib
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from app.services.feature_extractor import FeatureExtractor

class PhishNetPredictor:
    def __init__(self):
        # Define paths relative to this file
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        
        self.model_path = os.path.join(base_dir, 'models', 'phishnet_v1.keras')
        self.token_path = os.path.join(base_dir, 'data', 'processed', 'tokenizer.pickle')
        self.scaler_path = os.path.join(base_dir, 'data', 'processed', 'scaler.joblib')
        
        # Load artifacts
        print("🔄 Loading Model and Processors...")
        self.model = tf.keras.models.load_model(self.model_path)
        
        with open(self.token_path, 'rb') as handle:
            self.tokenizer = pickle.load(handle)
            
        self.scaler = joblib.load(self.scaler_path)
        self.extractor = FeatureExtractor()
        
        # Config (Must match training!)
        self.MAX_SEQUENCE_LENGTH = 150
        print("✅ PhishNet Ready to Serve.")

    def predict(self, url: str):
        # --- LAYER 1: WHITELIST CHECK (Rule-Based) ---
        # AI is great, but we trust our own "Known Good" list more.
        # This prevents False Positives on major platforms.
        
        # simple domain extraction for whitelist
        domain = url.split('//')[-1].split('/')[0].lower().replace('www.', '')
        
        WHITELIST = {
            "github.com", "google.com", "paypal.com", "microsoft.com", 
            "apple.com", "amazon.com", "facebook.com", "instagram.com",
            "stackoverflow.com", "linkedin.com", "youtube.com", "reddit.com",
            "twitter.com", "wikipedia.org", "huggingface.co", "openai.com",
            "pytorch.org", "tensorflow.org", "kaggle.com", "medium.com"
        }

        if domain in WHITELIST:
            return {
                "url": url,
                "is_phishing": False,
                "confidence_score": 0.0,
                "display_confidence": "100%",
                "risk_level": "SAFE",
                "details": ["✅ Domain is in the Trusted Whitelist.", "✅ AI Scan skipped for optimization."]
            }

        # --- LAYER 2: AI SCAN (Deep Learning) ---
        # 1. Prepare Input A: Text Sequence
        seq = self.tokenizer.texts_to_sequences([url])
        padded_seq = pad_sequences(seq, maxlen=self.MAX_SEQUENCE_LENGTH, padding='post', truncating='post')
        
        # 2. Prepare Input B: Metadata Features
        raw_features = self.extractor.extract(url)
        scaled_features = self.scaler.transform(np.array(raw_features).reshape(1, -1))
        
        # 3. Predict
        prediction_score = self.model.predict({'url_input': padded_seq, 'meta_input': scaled_features})[0][0]
        
        # 4. Interpret Result
        is_phishing = prediction_score > 0.5
        confidence = prediction_score if is_phishing else (1 - prediction_score)
        
        # --- LAYER 3: EXPLAINABILITY REPORT ---
        details = []
        hostname = url.split('//')[-1].split('/')[0]

        if is_phishing:
            # Phishing indicators - be more granular
            if raw_features[2] == 1:
                details.append("⚠️ Host uses an IP address instead of a domain name.")
            if raw_features[0] > 75:
                details.append(f"⚠️ URL is suspiciously long ({raw_features[0]} characters).")
            if len(hostname) > 40:
                details.append(f"⚠️ Hostname is unusually long ({len(hostname)} chars) - often used to hide malicious intent.")
            if raw_features[3] > 3:
                details.append(f"⚠️ Excessive subdomains detected ({raw_features[3]} dots) - possible masking attack.")
            if raw_features[4] > 0:
                details.append(f"⚠️ Hyphens in domain name ({raw_features[4]}) - common in phishing URLs.")
            if raw_features[5] > 0:
                details.append("⚠️ URL contains '@' symbol - often used to obscure destination.")
            if raw_features[6] > 0:
                details.append("⚠️ Question mark without HTTPS - potential redirect vulnerability.")
            if raw_features[11] > 0.45:
                details.append("⚠️ High ratio of digits in URL - random padding common in phishing.")
            
            # Add AI confidence only if very few features matched (pattern-based detection)
            if len(details) == 0:
                details.append(f"🤖 Deep learning model detected phishing pattern ({confidence * 100:.1f}% confidence).")
            
        else:
            details.append("✅ URL structure appears legitimate.")
            if len(hostname) <= 30:
                details.append("✅ Hostname length is normal.")
            if raw_features[0] < 75:
                details.append("✅ URL length is within standard range.")
            if raw_features[3] <= 3:
                details.append("✅ Domain structure is standard (minimal subdomains).")

        return {
            "url": url,
            "is_phishing": bool(is_phishing),
            "confidence_score": float(prediction_score),
            "display_confidence": f"{confidence * 100:.1f}%",
            "risk_level": "CRITICAL" if prediction_score > 0.8 else "MODERATE" if prediction_score > 0.5 else "SAFE",
            "details": details
        }