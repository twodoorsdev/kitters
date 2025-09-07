import { useCallback } from 'react';
import { Alert } from 'react-native';
import { IconButton } from '../../components/IconButton';
import { useDeleteImageMutation } from '../../services/CatApi';
import { CardProps } from './shared';

export const DeleteButton = ({ item }: CardProps) => {
  const { mutate: deleteMutationFn, isPending: isLoading } =
    useDeleteImageMutation();

  const handleDelete = useCallback(() => {
    Alert.alert('Delete', 'Are you sure you want to delete this image?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => deleteMutationFn(item.id),
      },
    ]);
  }, [deleteMutationFn, item.id]);

  return (
    <IconButton
      testID={`Card.Button<Delete>.${item.id}`}
      rounded
      disabled={isLoading}
      iconProps={{ name: 'trash', size: 24 }}
      onPress={handleDelete}
    />
  );
};
