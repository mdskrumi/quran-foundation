interface TokenData {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  timestamp: number;
}

class TokenManager {
  private static instance: TokenManager;
  private tokenData: TokenData | null = null;
  private tokenPromise: Promise<string> | null = null;

  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  private isTokenExpired(tokenData: TokenData): boolean {
    const now = Date.now();
    const expirationTime = tokenData.timestamp + (tokenData.expires_in * 1000);
    // Adding 5-minute buffer before expiration (3600s - 300s = 3300s remaining)
    return now >= (expirationTime - 5 * 60 * 1000);
  }

  private async fetchNewToken(): Promise<string> {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET; 
    
    if (!clientId || !clientSecret) {
      throw new Error('Client credentials not configured');
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    try {
      const response = await fetch(`${process.env.AUTH_URL}/oauth2/token`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&scope=content'
      });

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.status}`);
      }

      const data = await response.json();
      
      this.tokenData = {
        access_token: data.access_token,
        token_type: data.token_type,
        expires_in: data.expires_in,
        scope: data.scope,
        timestamp: Date.now()
      };

      return data.access_token;
    } catch (error) {
      this.tokenPromise = null; 
      throw error;
    }
  }

  async getToken(): Promise<string> {
    if (this.tokenData && !this.isTokenExpired(this.tokenData)) {
      return this.tokenData.access_token;
    }

    if (this.tokenPromise) {
      return this.tokenPromise;
    }

    this.tokenPromise = this.fetchNewToken();
    
    try {
      const token = await this.tokenPromise;
      this.tokenPromise = null; 
      return token;
    } catch (error) {
      this.tokenPromise = null; 
      throw error;
    }
  }

  clearToken(): void {
    this.tokenData = null;
    this.tokenPromise = null;
  }
}

export default TokenManager;