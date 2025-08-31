import { RootState } from '../store';

export const getIsImageUploading = (state: RootState) =>
  state.imageActivity.isImageUploading;
