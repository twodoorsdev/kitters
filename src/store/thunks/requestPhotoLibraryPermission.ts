import * as ImagePicker from 'expo-image-picker';
import { createAppAsyncThunk } from '../overrides';

const writeOnlyPermission = false;

export const requestPhotoLibraryPermission = createAppAsyncThunk(
  'photos/requestPermission',
  async () => {
    const currentState = await ImagePicker.getMediaLibraryPermissionsAsync(
      writeOnlyPermission
    );

    if (currentState.status === 'granted') {
      return currentState;
    }

    const updatedState = await ImagePicker.requestMediaLibraryPermissionsAsync(
      writeOnlyPermission
    );

    if (updatedState.status !== 'granted') {
      return Promise.reject(updatedState);
    }

    return updatedState;
  }
);
