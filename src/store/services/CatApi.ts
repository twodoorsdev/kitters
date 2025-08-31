import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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

export const CatApi = createApi({
  reducerPath: 'catsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thecatapi.com/v1/',
    prepareHeaders: (headers) => {
      // @TODO In a real app, this should throw an error to be handled by an ErrorBoundary
      if (!process.env.EXPO_PUBLIC_CAT_API_KEY) {
        console.error('No API key set for Cat API');
        return headers;
      }

      headers.set('x-api-key', process.env.EXPO_PUBLIC_CAT_API_KEY);
      return headers;
    },
  }),
  tagTypes: ['Favourite', 'Image', 'Vote'],
  endpoints: (build) => ({
    getMyImages: build.query<ApiImage[], { limit?: number; page?: number }>({
      // The API defaults to `limit=1`, which is ridiculous so we re-set it to 10 here.
      query: ({ page = 0, limit = 10 }) => `images?page=${page}&limit=${limit}`,
      providesTags: ['Image'],
    }),

    getMyFavourites: build.query<ApiFavourite[], void>({
      query: () => `favourites`,
      providesTags: ['Favourite'],
    }),

    getMyVotes: build.query<ApiVote[], void>({
      query: () => `votes`,
      providesTags: ['Vote'],
    }),

    uploadImage: build.mutation<ApiImage, ImagePickerAsset>({
      query: (image) => {
        const body = new FormData();

        // This is a hack/trick (tr-hack? hatrick?) because React Native/Expo
        // Blob/File objects are FUBAR.
        const rnBlob = {
          uri: image.uri,
          type: image.mimeType,
          name: image.fileName ?? generateFileName(image.uri),
        } as unknown as Blob;

        body.append('file', rnBlob);

        return {
          url: 'images/upload',
          method: 'POST',
          body,
        };
      },
      // transformErrorResponse(baseQueryReturnValue, meta, arg): unknown {
      //   console.log({ baseQueryReturnValue, meta, arg });
      //   return baseQueryReturnValue.data;
      // },
      // transformResponse(baseQueryReturnValue, meta, arg) {
      //   console.log({ baseQueryReturnValue, meta, arg });
      //   return baseQueryReturnValue.data;
      // },
      invalidatesTags: ['Image'],
    }),

    favouriteImage: build.mutation<{ id: number; message: string }, string>({
      query: (id) => {
        return {
          url: `favourites`,
          method: 'POST',
          body: {
            image_id: id,
          },
        };
      },

      invalidatesTags: ['Favourite'],
    }),

    unfavouriteImage: build.mutation<{ id: number; message: string }, number>({
      query: (id) => {
        return {
          url: `favourites/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Favourite'],
    }),

    upvoteImage: build.mutation<void, string>({
      query: (id) => {
        return {
          url: `votes`,
          method: 'POST',
          body: {
            image_id: id,
            value: 1,
          },
        };
      },
      invalidatesTags: ['Vote'],
    }),

    downvoteImage: build.mutation<void, string>({
      query: (id) => {
        return {
          url: `votes`,
          method: 'POST',
          body: {
            image_id: id,
            value: -1,
          },
        };
      },
      invalidatesTags: ['Vote'],
    }),

    deleteImage: build.mutation<void, string>({
      query: (id) => {
        return {
          url: `images/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Image'],
    }),
  }),
});

export const {
  endpoints,
  useGetMyImagesQuery,
  useGetMyFavouritesQuery,
  useLazyGetMyFavouritesQuery,
  useGetMyVotesQuery,
  useFavouriteImageMutation,
  useUnfavouriteImageMutation,
  useUpvoteImageMutation,
  useDownvoteImageMutation,
  useDeleteImageMutation,
  useUploadImageMutation,
} = CatApi;
