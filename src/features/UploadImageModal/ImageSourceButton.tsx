import { ImagePickerAsset } from 'expo-image-picker';
import { useCallback } from 'react';
import { ImageSource } from '../../components/ImageSource';
import { useUploadImageMutation } from '../../services/CatApi';
import { launchCamera, launchPhotoPicker } from '../../utils/imagePicker';

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
  const { mutateAsync: uploadImageFn, isPending: isLoading } = useUploadImageMutation();

  const launchFn = source === 'camera' ? launchCamera : launchPhotoPicker;

  const icon = source === 'camera' ? 'camera' : 'images';

  const handleSelectAndUpload = useCallback(async () => {
    const response = await launchFn();

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

    await uploadImageFn(firstImage);
    if (onComplete) {
      onComplete();
    }
  }, [onComplete, onImageSelect, launchFn, uploadImageFn]);

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
