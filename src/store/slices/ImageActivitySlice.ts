import { createSlice } from '@reduxjs/toolkit';
import { CatApi } from '../services/CatApi';

const initialState = {
  isImageUploading: false,
};

export const ImageActivitySlice = createSlice({
  name: 'imageActivity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        CatApi.endpoints.uploadImage.matchPending,
        (state, { payload }) => {
          state.isImageUploading = true;
        },
      )
      .addMatcher(
        CatApi.endpoints.uploadImage.matchFulfilled,
        (state, { payload }) => {
          state.isImageUploading = false;
        },
      )
      .addMatcher(
        CatApi.endpoints.uploadImage.matchRejected,
        (state, { payload }) => {
          state.isImageUploading = false;
        },
      );
  },
});
