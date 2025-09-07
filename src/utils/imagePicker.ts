import * as ImagePicker from 'expo-image-picker';
import { requestCameraPermission, requestPhotoLibraryPermission } from './permissions';

export const launchCamera = async () => {
  await requestCameraPermission();
  return ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });
};

export const launchPhotoPicker = async () => {
  await requestPhotoLibraryPermission();
  return ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: false,
  });
};