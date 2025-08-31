import { ScrollView, Text, View } from 'react-native';

export const MockList = ({ colors = ['blue', 'red'] }) => {
  const items = Array.from({ length: 20 }).map((_, i) => i);
  const getBackgroundColor = (index: number) => {
    if (index % 2 === 0) {
      return colors[0];
    }

    return colors[1];
  };

  return (
    <ScrollView>
      {items.map((item, i) => (
        <View
          key={i}
          style={{ height: 100, backgroundColor: getBackgroundColor(i) }}
        >
          <Text>{i + 1}</Text>
        </View>
      ))}
    </ScrollView>
  );
};
