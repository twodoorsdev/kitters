import {
  proxyCatApiRequest,
  handleCatApiResponse,
  createErrorResponse,
} from '../../services/catapi/utils';

export async function GET(request: Request): Promise<Response> {
  try {
    const response = await proxyCatApiRequest('votes');
    return handleCatApiResponse(response);
  } catch (error) {
    console.error('Error fetching votes:', error);
    return createErrorResponse('Failed to fetch votes');
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();

    if (!body.image_id) {
      return createErrorResponse('image_id is required', 400);
    }

    if (body.value === undefined || (body.value !== 1 && body.value !== -1)) {
      return createErrorResponse('value must be 1 or -1', 400);
    }

    const response = await proxyCatApiRequest('votes', {
      method: 'POST',
      body: {
        image_id: body.image_id,
        value: body.value,
      },
    });

    return handleCatApiResponse(response);
  } catch (error) {
    console.error('Error creating vote:', error);
    return createErrorResponse('Failed to create vote');
  }
}
