import { ImagePickerAsset } from 'expo-image-picker';
import { useCallback } from 'react';
import { ImageSource } from '../../components/ImageSource';
import { useAppDispatch } from '../../store/overrides';
import { useUploadImageMutation } from '../../store/services/CatApi';
import { launchNativeCamera } from '../../store/thunks/launchNativeCamera';
import { launchNativePhotoPicker } from '../../store/thunks/launchNativePhotoPicker';

export type InteractiveImageSourceProps = {
  source: 'camera' | 'library';
  onImageSelect?: (image: ImagePickerAsset) => void;
  onComplete?: () => void;
};

const upperCaseFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const ImageSourceButton = ({
  source,
  onImageSelect,
  onComplete,
}: InteractiveImageSourceProps) => {
  const dispatch = useAppDispatch();
  const [uploadImageFn, { isLoading }] = useUploadImageMutation();

  const thunk =
    source === 'camera' ? launchNativeCamera : launchNativePhotoPicker;

  const icon = source === 'camera' ? 'camera' : 'images';

  const handleSelectAndUpload = useCallback(async () => {
    const response = await dispatch(thunk()).unwrap();

    // The user cancelled the picker
    if (response.assets === null) {
      return;
    }

    if (!Array.isArray(response.assets)) {
      // @TODO Handle this better
      throw new Error('No images found');
    }

    if (response.assets.length > 1) {
      // @TODO Handle this better
      throw new Error('More than one image found');
    }

    const [firstImage] = response.assets;

    if (onImageSelect) {
      onImageSelect(firstImage);
    }

    await uploadImageFn(firstImage).unwrap();
    if (onComplete) {
      onComplete();
    }
  }, [dispatch, onComplete, onImageSelect, thunk, uploadImageFn]);

  const displaySource = upperCaseFirstLetter(source);

  return (
    <ImageSource
      testID={`Sheet<Upload>.${displaySource}`}
      disabled={isLoading}
      icon={icon}
      label={displaySource}
      onPress={handleSelectAndUpload}
    />
  );
};
