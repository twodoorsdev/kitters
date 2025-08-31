import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { match, P } from 'ts-pattern';

import { Text } from '../../components/Text';
import { DownvoteButton } from './DownvoteButton';
import { CardProps } from './shared';
import { UpvoteButton } from './UpvoteButton';

export const CardActions = ({ item }: CardProps) => {
  const score = useMemo(() => {
    const votes = item.votes || [];
    return votes.reduce((acc, curr) => acc + curr.value, 0);
  }, [item.votes]);
  const prefix = useMemo(() => {
    return match(score)
      .with(P.number.positive(), () => '😼')
      .with(P.number.negative(), () => '😾')
      .otherwise(() => '🐱');
  }, [score]);

  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        <UpvoteButton item={item} />
        <Text testID={`Card.ScorePrefix.${item.id}`} style={styles.voteCount}>
          {prefix}
        </Text>
        <Text testID={`Card.Score.${item.id}`} style={styles.voteCount}>
          {score}
        </Text>
        <DownvoteButton item={item} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {},
  inner: {
    backgroundColor: theme.colors.background.translucent,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomLeftRadius: theme.radii.$3,
    borderBottomRightRadius: theme.radii.$3,
  },
  voteCount: {
    alignSelf: 'center',
    fontSize: theme.fontSizes.$3,
  },
}));
