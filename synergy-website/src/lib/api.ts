const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  // Check if we are running on the server
  const isServer = typeof window === 'undefined';

  let headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // If server-side, we must grab cookies from next/headers
  if (isServer) {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId');
    if (sessionId) {
       // Append cookie header for server-to-server request
       headers = { ...headers, Cookie: `sessionId=${sessionId.value}` };
    }
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'omit' // We are relying on server-side cookies forwarding or interceptors if needed
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data.data; // We wrapped all success responses in ok(data) -> { success: true, data }
}

export const api = {
  get: (endpoint: string, init?: RequestInit) => apiFetch(endpoint, { ...init, method: 'GET' }),
  post: (endpoint: string, body?: any, init?: RequestInit) => apiFetch(endpoint, { ...init, method: 'POST', body: JSON.stringify(body) }),
  patch: (endpoint: string, body?: any, init?: RequestInit) => apiFetch(endpoint, { ...init, method: 'PATCH', body: JSON.stringify(body) }),
  put: (endpoint: string, body?: any, init?: RequestInit) => apiFetch(endpoint, { ...init, method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint: string, init?: RequestInit) => apiFetch(endpoint, { ...init, method: 'DELETE' }),
};
