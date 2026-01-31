export interface ScanResult {
  url: string;
  is_phishing: boolean;
  confidence_score: number;
  display_confidence: string;
  risk_level: "SAFE" | "MODERATE" | "CRITICAL";
  details: string[];
}