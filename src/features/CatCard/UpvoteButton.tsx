import { useCallback } from 'react';
import { IconButton } from '../../components/IconButton';
import { useUpvoteImageMutation } from '../../store/services/CatApi';
import { CardProps } from './shared';

export const UpvoteButton = ({ item }: CardProps) => {
  const [upvoteMutationFn, { isLoading }] = useUpvoteImageMutation();

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
