import { proxyCatApiRequest, handleCatApiResponse, createErrorResponse } from '../../services/catapi/utils';

export async function GET(request: Request): Promise<Response> {
  try {
    const response = await proxyCatApiRequest('favourites');
    return handleCatApiResponse(response);
  } catch (error) {
    console.error('Error fetching favourites:', error);
    return createErrorResponse('Failed to fetch favourites');
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();

    if (!body.image_id) {
      return createErrorResponse('image_id is required', 400);
    }

    const response = await proxyCatApiRequest('favourites', {
      method: 'POST',
      body: {
        image_id: body.image_id,
      },
    });

    return handleCatApiResponse(response);
  } catch (error) {
    console.error('Error creating favourite:', error);
    return createErrorResponse('Failed to create favourite');
  }
}