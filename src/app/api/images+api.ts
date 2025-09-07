import {
  proxyCatApiRequest,
  handleCatApiResponse,
  createErrorResponse,
} from '../../services/catapi/utils';

export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') ?? '0';
    const limit = searchParams.get('limit') ?? '10';

    const response = await proxyCatApiRequest(
      `images?page=${page}&limit=${limit}`,
    );
    return handleCatApiResponse(response);
  } catch (error) {
    console.error('Error fetching images:', error);
    return createErrorResponse('Failed to fetch images');
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();

    // Forward the FormData directly to Cat API
    const response = await proxyCatApiRequest('images/upload', {
      method: 'POST',
      body: formData,
    });

    return handleCatApiResponse(response);
  } catch (error) {
    console.error('Error uploading image:', error);
    return createErrorResponse('Failed to upload image');
  }
}
