import { proxyCatApiRequest, handleCatApiResponse, createErrorResponse } from '../../../services/catapi/utils';

export async function DELETE(request: Request, { id }: { id: string }): Promise<Response> {
  try {
    if (!id) {
      return createErrorResponse('Image ID is required', 400);
    }

    const response = await proxyCatApiRequest(`images/${id}`, {
      method: 'DELETE',
    });

    return handleCatApiResponse(response);
  } catch (error) {
    console.error('Error deleting image:', error);
    return createErrorResponse('Failed to delete image');
  }
}