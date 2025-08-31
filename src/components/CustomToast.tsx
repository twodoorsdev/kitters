import { ComponentProps } from 'react';
// import { BaseToast } from 'react-native-toast-message';
import { useUnistyles } from 'react-native-unistyles';

export const CustomToast = () => {
  const { theme } = useUnistyles();

  return null

  // return (
  //   <BaseToast
  //     {...props}
  //     style={{ borderLeftColor: 'transparent' }}
  //     contentContainerStyle={{ paddingHorizontal: 15 }}
  //     text1Style={{
  //       fontSize: theme.fontSizes.$2,
  //       fontWeight: theme.fontWeights.bold,
  //     }}
  //   />
  // );
};
