import * as ImagePicker from 'expo-image-picker';

export const requestCameraPermission = async () => {
  const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
  if (!cameraPermission.granted) {
    throw new Error('Camera permission is required');
  }
};

export const requestPhotoLibraryPermission = async () => {
  const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!libraryPermission.granted) {
    throw new Error('Photo library permission is required');
  }
};