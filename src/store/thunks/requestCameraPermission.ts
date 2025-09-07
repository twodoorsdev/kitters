import * as ImagePicker from 'expo-image-picker';

import { createAppAsyncThunk } from '../overrides';

export const requestCameraPermission = createAppAsyncThunk(
  'photos/requestPermission',
  async () => {
    const currentState = await ImagePicker.getCameraPermissionsAsync();

    if (currentState.status === 'granted') {
      return currentState;
    }

    const updatedState = await ImagePicker.requestCameraPermissionsAsync();

    if (updatedState.status !== 'granted') {
      return Promise.reject(updatedState);
    }

    return updatedState;
  },
);
