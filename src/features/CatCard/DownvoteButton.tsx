import { useCallback } from 'react';
import { IconButton } from '../../components/IconButton';
import { useDownvoteImageMutation } from '../../services/CatApi';
import { CardProps } from './shared';

export const DownvoteButton = ({ item }: CardProps) => {
  const { mutate: downvoteMutationFn, isPending: isLoading } = useDownvoteImageMutation();

  const handlePress = useCallback(() => {
    downvoteMutationFn(item.id);
  }, [item.id, downvoteMutationFn]);
  return (
    <IconButton
      testID={`Card.Button<Downvote>.${item.id}`}
      disabled={isLoading}
      iconProps={{ name: 'thumbsdown', size: 24, color: 'red' }}
      onPress={handlePress}
    />
  );
};
