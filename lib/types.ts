export interface LicenseDisc {
  vehicleRegNumber: string;
  licenseNumber: string;
  make: string;
  model: string;
  vin: string;
  engineNumber: string;
  expiryDate: string;
  vehicleClass: string;
  ownerID: string;
  ownerName: string;
}

export interface ScanResult {
  id: string;
  timestamp: string;
  licenseData: LicenseDisc;
  status: 'valid' | 'expired' | 'suspicious';
  isValid: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  organization?: string;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  autoScan: boolean;
  saveHistory: boolean;
}