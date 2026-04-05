// Configuration: Update this when deploying to production
const CONFIG = {
  // For local testing: use localhost
  // For production: use your Hugging Face Spaces URL
  API_URL: "http://localhost:8000/api/scan"
};

document.addEventListener('DOMContentLoaded', function() {
  const scanBtn = document.getElementById('scan-btn');
  const scanCustomBtn = document.getElementById('scan-custom-btn');
  const customUrlInput = document.getElementById('custom-url');
  const resultsDiv = document.getElementById('results');
  const loaderDiv = document.getElementById('loader');
  const errorDiv = document.getElementById('error');
  const urlDisplay = document.getElementById('current-url');

  let currentUrl = '';

  // Get the current tab's URL and display it
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    currentUrl = tabs[0].url;
    urlDisplay.textContent = currentUrl || "Unable to get URL";
  });

  // Handle current page scan
  scanBtn.addEventListener('click', async () => {
    await scanUrl(currentUrl);
  });

  // Handle custom URL scan
  scanCustomBtn.addEventListener('click', async () => {
    const customUrl = customUrlInput.value.trim();
    if (!customUrl) {
      errorDiv.style.display = 'block';
      errorDiv.innerHTML = '❌ Please enter a URL to scan';
      return;
    }
    
    // Add protocol if missing
    let urlToScan = customUrl;
    if (!customUrl.startsWith('http://') && !customUrl.startsWith('https://')) {
      urlToScan = 'https://' + customUrl;
    }
    
    await scanUrl(urlToScan);
  });

  async function scanUrl(url) {
    // Reset UI
    scanBtn.disabled = true;
    loaderDiv.style.display = 'block';
    resultsDiv.style.display = 'none';
    errorDiv.style.display = 'none';

    try {
      // Call the PhishNet API
      const response = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      displayResults(data);

    } catch (error) {
      console.error('Error scanning URL:', error);
      loaderDiv.style.display = 'none';
      scanBtn.disabled = false;
      errorDiv.style.display = 'block';
      errorDiv.innerHTML = `
        <strong>❌ Connection Failed</strong><br/>
        <small>Make sure your PhishNet backend is running at:<br/>${CONFIG.API_URL}</small>
      `;
    }
  }

  function displayResults(data) {
    loaderDiv.style.display = 'none';
    scanBtn.disabled = false;

    const isSafe = !data.is_phishing;
    const className = isSafe ? 'safe' : 'danger';
    const statusEmoji = isSafe ? '✅' : '⚠️';
    const statusText = isSafe ? 'SAFE' : 'MALICIOUS';
    const riskLevel = data.risk_level || 'UNKNOWN';

    let html = `
      <div class="status-badge">${statusEmoji}</div>
      <div class="status-text ${className}">${statusText}</div>
      <div class="confidence">
        <span class="confidence-label">Confidence:</span> ${data.display_confidence}
      </div>
      <div class="confidence">
        <span class="confidence-label">Risk Level:</span> <strong>${riskLevel}</strong>
      </div>
    `;

    if (data.details && data.details.length > 0) {
      html += `
        <div class="details-section">
          <h4>Details</h4>
          <ul>
            ${data.details.map(detail => `<li>${detail}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    resultsDiv.innerHTML = html;
    resultsDiv.className = className;
    resultsDiv.style.display = 'block';
  }
});
