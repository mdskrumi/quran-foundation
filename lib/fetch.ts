import TokenManager from './tokenManager';

export const Fetch = async ({
  baseUrl = process.env.BASE_URL,
  endpoint,
  method = 'GET',
  headers,
  body,
  tags = [],
  revalidate = 0
}: {
  baseUrl?: string;
  endpoint: string;
  method?: string;
  headers?: HeadersInit;
  body?: any;
  tags?: string[];
  revalidate?: number;
}): Promise<{ status: number; data: any } | never> => {
  
  if (!baseUrl) {
    throw new Error('BASE_URL environment variable is required');
  }

  if (!endpoint) {
    throw new Error('endpoint parameter is required');
  }

  let authHeaders: HeadersInit = {};
  
  // Always get auth token since you mentioned auth is always required
  try {
    const tokenManager = TokenManager.getInstance();
    const token = await tokenManager.getToken();
    const clientId = process.env.CLIENT_ID!;
    authHeaders = {
      'x-auth-token': token,
      'x-client-id': clientId,
    };
  } catch (error) {
    console.error('Failed to get access token:', error);
    throw new Error('Authentication failed');
  }

  try {
    const result = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...headers
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      next: {
        tags,
        revalidate
      }
    });

    // Handle 401 Unauthorized - token might be expired, retry with fresh token
    if (result.status === 401) {
      const tokenManager = TokenManager.getInstance();
      tokenManager.clearToken();
      
      // Retry once with fresh token
      const newToken = await tokenManager.getToken();
      const retryResult = await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${newToken}`,
          ...headers
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
        next: {
          tags,
          revalidate
        }
      });

      const retryData = await retryResult.json();
      return {
        status: retryResult.status,
        data: retryData
      };
    }

    const data = await result.json();

    return {
      status: result.status,
      data
    };
  } catch (error) {
    throw {
      error: error
    };
  }
};