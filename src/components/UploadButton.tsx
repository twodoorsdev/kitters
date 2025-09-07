import { ComponentProps } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { CatButton } from './CatButton/CatButton';

const isTestMode = (process.env.EXPO_PUBLIC_TEST_MODE ?? 'false') === 'true';

export type UploadButtonProps = ComponentProps<typeof Pressable>;

export const UploadButton = ({ style, ...props }: UploadButtonProps) => {
  return (
    <Pressable
      style={[styles.root, style as StyleProp<ViewStyle>]}
      {...props}
    >
      {/* Don't animate in test mode because it causes Detox to hang */}
      <CatButton
        animated={!isTestMode}
        onPress={props.onPress}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftEar: {
    position: 'absolute',
    top: -40,
    left: 0,
    height: 55,
    width: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: 'black',
  },
  rightEar: {
    position: 'absolute',
    top: -40,
    right: 0,
    height: 55,
    width: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 25,
    backgroundColor: 'black',
  },
  button: {
    height: 60,
    width: 60,
    marginVertical: -30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
  },
});
