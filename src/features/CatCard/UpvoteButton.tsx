import { useCallback } from 'react';
import { IconButton } from '../../components/IconButton';
import { useUpvoteImageMutation } from '../../services/CatApi';
import { CardProps } from './shared';

export const UpvoteButton = ({ item }: CardProps) => {
  const { mutate: upvoteMutationFn, isPending: isLoading } = useUpvoteImageMutation();

  const handlePress = useCallback(() => {
    upvoteMutationFn(item.id);
  }, [item.id, upvoteMutationFn]);

  return (
    <IconButton
      testID={`Card.Button<Upvote>.${item.id}`}
      disabled={isLoading}
      iconProps={{ name: 'thumbsup', size: 24, color: 'green' }}
      onPress={handlePress}
    />
  );
};
