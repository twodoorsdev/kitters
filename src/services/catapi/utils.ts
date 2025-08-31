const CAT_API_BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = process.env.CAT_API_KEY;

export interface CatApiError {
  message: string;
  level: string;
  status: number;
}

export function createCatApiHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (!API_KEY) {
    console.error('No API key set for Cat API');
  } else {
    headers['x-api-key'] = API_KEY;
  }

  return headers;
}

export function createCatApiUrl(endpoint: string): string {
  return `${CAT_API_BASE_URL}/${endpoint}`;
}

export async function proxyCatApiRequest(
  endpoint: string,
  options: {
    method?: string;
    body?: any;
    headers?: HeadersInit;
  } = {}
): Promise<Response> {
  const { method = 'GET', body, headers: customHeaders = {} } = options;

  const headers = {
    ...createCatApiHeaders(),
    ...customHeaders,
  };

  // Remove Content-Type for FormData requests
  if (body instanceof FormData) {
    delete (headers as any)['Content-Type'];
  }

  const response = await fetch(createCatApiUrl(endpoint), {
    method,
    headers,
    body: body instanceof FormData ? body : JSON.stringify(body),
  });

  return response;
}

export function createErrorResponse(message: string, status: number = 500): Response {
  return Response.json(
    { error: message },
    { status }
  );
}

export async function handleCatApiResponse(response: Response): Promise<Response> {
  if (!response.ok) {
    let errorMessage = `Cat API error: ${response.status} ${response.statusText}`;

    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // If we can't parse error JSON, use the default message
    }

    return createErrorResponse(errorMessage, response.status);
  }

  const data = await response.json();
  return Response.json(data);
}