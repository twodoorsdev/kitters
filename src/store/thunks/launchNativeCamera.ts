import * as ImagePicker from 'expo-image-picker';

import { createAppAsyncThunk } from '../overrides';
import { requestCameraPermission } from './requestCameraPermission';

export const launchNativeCamera = createAppAsyncThunk(
  'photos/launchNativeCamera',
  async (_, { dispatch }) => {
    await dispatch(requestCameraPermission());

    return ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }
);
