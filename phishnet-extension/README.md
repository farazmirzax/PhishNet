# PhishNet Browser Extension

Professional Chrome extension for AI-powered phishing detection.

## 📁 Files Overview

- **manifest.json** - Extension configuration (permissions, metadata)
- **popup.html** - UI that appears when you click the extension icon
- **popup.js** - Logic that scans URLs and calls the backend API
- **icon.png** - Extension icon (YOU NEED TO CREATE THIS)

---

## 🎨 Quick Icon Setup

Before testing, you need an `icon.png` file (any size, ideally 128x128px).

### Option 1: Use an Online Generator (Fastest)
1. Go to https://www.favicon-generator.org/
2. Upload/create any icon image
3. Download the PNG
4. Add it to this folder as `icon.png`

### Option 2: Use a Placeholder (For Testing)
Run this in PowerShell from this folder to create a simple placeholder:

```powershell
# This creates a simple blue 128x128 PNG with "P" on it
# Just for testing - replace with real icon later
$iconPath = "icon.png"
$bytes = [byte[]]@(137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 2, 0, 0, 0, 144, 119, 83, 222, 0, 0, 0, 12, 73, 68, 65, 84, 8, 99, 248, 207, 192, 0, 0, 3, 1, 1, 0, 24, 205, 211, 225, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130)
[System.IO.File]::WriteAllBytes($iconPath, $bytes)
Write-Host "✅ Placeholder icon created!"
```

---

## 🚀 Local Testing Setup

### Step 1: Make sure your backend is running

```bash
cd ../backend
docker compose up
# Wait for "✅ PhishNet Ready to Serve" message
```

### Step 2: Load the extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Turn ON **Developer mode** (toggle in the top right)
3. Click **Load unpacked**
4. Select this `phishnet-extension` folder
5. You should see the extension loaded with ID and details
6. Pin it to your toolbar (click the puzzle icon, then push pin)

### Step 3: Test it

1. Go to any website (e.g., google.com)
2. Click the PhishNet icon in your toolbar
3. Click **🔍 Scan This Page**
4. You should see the result: **✅ SAFE** or **⚠️ MALICIOUS**

---

## 🔧 Configuration for Production

Once you deploy to Hugging Face Spaces, update `popup.js`:

```javascript
const CONFIG = {
  API_URL: "https://your-username-phishnet.hf.space/api/scan"
};
```

No need to rebuild - just edit the file and reload the extension in Chrome.

---

## 📋 Checklist Before Publishing

- [ ] Created/added `icon.png`
- [ ] Tested locally with `http://localhost:8000`
- [ ] Scanned multiple URLs (phishing + safe ones)
- [ ] UI displays results correctly
- [ ] No console errors (check Chrome DevTools)
- [ ] Updated API_URL for production in `popup.js`
- [ ] Tested with production API on Hugging Face Spaces

---

## 🛠️ Troubleshooting

**"Failed to connect to PhishNet API"**
- Make sure your backend is running: `docker compose up`
- Check the URL in `popup.js` matches your backend
- Ensure CORS is enabled in `backend/app/main.py`

**Icon not showing**
- Make sure `icon.png` exists in this folder
- Try reloading the extension in Chrome (click the refresh icon)

**Results not displaying**
- Open Chrome DevTools (F12) → Console tab
- Click the extension and refresh to see error messages

---

## 📦 Next Steps: Production Deployment

Once you're happy with local testing, follow the Hugging Face deployment guide to go live.

