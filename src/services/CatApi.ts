import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ImagePickerAsset } from 'expo-image-picker';

export type Breed = {
  id: number;
  name: string;
  wikipedia_url: string;
};

export type ApiImage = {
  id: string;
  url: string;
  width: number | null;
  height: number | null;
  mime_type: string;
  entities: [];
  breeds: Breed[];
  animals: [];
  categories: [];
};

export type ApiVote = {
  id: number;
  image_id: string;
  sub_id?: string;
  created_at: string;
  value: number;
  country_code: string;
  image: Pick<ApiImage, 'id' | 'url'>;
};

export type ApiFavourite = {
  id: number;
  user_id: string;
  image_id: string;
  sub_id?: string;
  created_at: string;
  image: Pick<ApiImage, 'id' | 'url'>;
};

const generateFileName = (uri: string) => {
  const parts = uri.split('.');
  const extension = parts[parts.length - 1];

  return `IMG_${Date.now()}.${extension}`;
};

const api = {
  async getMyImages({ limit = 10, page = 0 }: { limit?: number; page?: number } = {}) {
    const response = await fetch(`/api/images?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch images');
    return response.json() as Promise<ApiImage[]>;
  },

  async getMyFavourites() {
    const response = await fetch('/api/favourites');
    if (!response.ok) throw new Error('Failed to fetch favourites');
    return response.json() as Promise<ApiFavourite[]>;
  },

  async getMyVotes() {
    const response = await fetch('/api/votes');
    if (!response.ok) throw new Error('Failed to fetch votes');
    return response.json() as Promise<ApiVote[]>;
  },

  async uploadImage(image: ImagePickerAsset) {
    const body = new FormData();

    const rnBlob = {
      uri: image.uri,
      type: image.mimeType,
      name: image.fileName ?? generateFileName(image.uri),
    } as unknown as Blob;

    body.append('file', rnBlob);

    const response = await fetch('/api/images', {
      method: 'POST',
      body,
    });

    if (!response.ok) throw new Error('Failed to upload image');
    return response.json() as Promise<ApiImage>;
  },

  async favouriteImage(id: string) {
    const response = await fetch('/api/favourites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_id: id }),
    });

    if (!response.ok) throw new Error('Failed to favourite image');
    return response.json() as Promise<{ id: number; message: string }>;
  },

  async unfavouriteImage(id: number) {
    const response = await fetch(`/api/favourites/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to unfavourite image');
    return response.json() as Promise<{ id: number; message: string }>;
  },

  async upvoteImage(id: string) {
    const response = await fetch('/api/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_id: id, value: 1 }),
    });

    if (!response.ok) throw new Error('Failed to upvote image');
  },

  async downvoteImage(id: string) {
    const response = await fetch('/api/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_id: id, value: -1 }),
    });

    if (!response.ok) throw new Error('Failed to downvote image');
  },

  async deleteImage(id: string) {
    const response = await fetch(`/api/images/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete image');
  },
};

export const useGetMyImagesQuery = (params: { limit?: number; page?: number } = {}) => {
  return useQuery({
    queryKey: ['images', params],
    queryFn: () => api.getMyImages(params),
  });
};

export const useGetMyFavouritesQuery = () => {
  return useQuery({
    queryKey: ['favourites'],
    queryFn: api.getMyFavourites,
  });
};

export const useGetMyVotesQuery = () => {
  return useQuery({
    queryKey: ['votes'],
    queryFn: api.getMyVotes,
  });
};

export const useUploadImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.uploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });
};

export const useFavouriteImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.favouriteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] });
    },
  });
};

export const useUnfavouriteImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.unfavouriteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] });
    },
  });
};

export const useUpvoteImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.upvoteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['votes'] });
    },
  });
};

export const useDownvoteImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.downvoteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['votes'] });
    },
  });
};

export const useDeleteImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });
};