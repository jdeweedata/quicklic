const API_BASE_URL = process.env.NPS_API_BASE_URL || 'https://api.nptracker.co.za';

export class NPSClient {
  private token: string;

  constructor() {
    this.token = process.env.NPS_API_KEY || '';
    if (!this.token) {
      throw new Error('NPS API key is required');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async verifyLicense(scanData: string) {
    return this.request('/NPS-LIC/', {
      method: 'POST',
      body: JSON.stringify({ scan: scanData }),
    });
  }

  async getRemainingCredits() {
    return this.request('/user/credits').then(response => response.credits);
  }
}