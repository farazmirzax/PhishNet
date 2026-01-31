import re
from urllib.parse import urlparse

class FeatureExtractor:
    def __init__(self):
        # We don't need to load anything, just logic
        pass

    def extract(self, url: str) -> list:
        """
        Takes a raw URL string and returns the list of 12 numerical features
        expected by the Dense layer of our neural network.
        Order MUST match the training order:
        ['length_url', 'length_hostname', 'ip', 'nb_dots', 'nb_hyphens', 
         'nb_at', 'nb_qm', 'nb_and', 'nb_eq', 'nb_slash', 'nb_colon', 'ratio_digits_url']
        """
        
        # 1. Parse the URL to get the hostname (domain)
        # If no scheme (http/https) is provided, add it to help parsing
        if not re.match(r"^https?", url):
            url_for_parsing = "http://" + url
        else:
            url_for_parsing = url
            
        try:
            parsed = urlparse(url_for_parsing)
            hostname = parsed.netloc
        except:
            hostname = ""

        # 2. CALCULATE FEATURES
        
        # Feature 1: length_url
        length_url = len(url)
        
        # Feature 2: length_hostname
        length_hostname = len(hostname)
        
        # Feature 3: ip (Is the domain just an IP address?)
        # Regex to check for standard IPv4 format
        ip_pattern = r"(([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\/)|" \
                     r"((0x[0-9a-fA-F]{1,2})\.(0x[0-9a-fA-F]{1,2})\.(0x[0-9a-fA-F]{1,2})\.(0x[0-9a-fA-F]{1,2})\/)" \
                     r"(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}"
        ip = 1 if re.search(ip_pattern, url) else 0
        
        # Feature 4: nb_dots (Count '.')
        nb_dots = url.count('.')
        
        # Feature 5: nb_hyphens (Count '-')
        nb_hyphens = url.count('-')
        
        # Feature 6: nb_at (Count '@')
        nb_at = url.count('@')
        
        # Feature 7: nb_qm (Count '?')
        nb_qm = url.count('?')
        
        # Feature 8: nb_and (Count '&')
        nb_and = url.count('&')
        
        # Feature 9: nb_eq (Count '=')
        nb_eq = url.count('=')
        
        # Feature 10: nb_slash (Count '/')
        nb_slash = url.count('/')
        
        # Feature 11: nb_colon (Count ':')
        nb_colon = url.count(':')
        
        # Feature 12: ratio_digits_url (How many characters are numbers?)
        digits = sum(c.isdigit() for c in url)
        ratio_digits_url = digits / length_url if length_url > 0 else 0

        # Return the list in the EXACT order expected by the scaler
        return [
            length_url, length_hostname, ip, nb_dots, nb_hyphens, 
            nb_at, nb_qm, nb_and, nb_eq, nb_slash, nb_colon, ratio_digits_url
        ]

# Simple test to verify it works
if __name__ == "__main__":
    extractor = FeatureExtractor()
    test_url = "http://secure-login.paypal.com/signin?id=555"
    print(f"Testing URL: {test_url}")
    print(f"Features: {extractor.extract(test_url)}")