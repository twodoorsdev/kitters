import { Octicons } from '@expo/vector-icons';
import { ComponentProps, useCallback, useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  StyleSheet,
  UnistylesVariants, useUnistyles,
} from 'react-native-unistyles';
import { AnimatedIconToggle } from './AnimatedIconToggle';

export type IconButtonProps = ComponentProps<typeof Pressable> &
  UnistylesVariants<typeof styles> & {
    iconProps: ComponentProps<typeof Octicons>;
    activeIconProps?: ComponentProps<typeof Octicons>;
  };

export const IconButton = ({
  // Get icon props first
  iconProps,
  activeIconProps,
  // Unistyles variants
  rounded,
  // Pressable props
  style,
  onPress,
  ...props
}: IconButtonProps) => {
  const { theme } = useUnistyles();
  styles.useVariants({
    rounded,
  })

  const [toggled, setToggled] = useState(false);
  const handleTogglePressed = useCallback(
    (e: GestureResponderEvent) => {
      if (props.disabled) {
        return;
      }

      setToggled(!toggled);
      if (onPress) {
        onPress(e);
      }
    },
    [onPress, props.disabled, toggled]
  );

  const themedIconProps = {
    ...iconProps,
    color: iconProps.color || theme.colors.typography.$5,
  };

  const themedActiveIconProps = {
    ...(activeIconProps ?? iconProps),
    color: (activeIconProps ?? iconProps).color || theme.colors.typography.$5,
  };

  return (
    <Pressable
      style={[styles.root, style as StyleProp<ViewStyle>]}
      onPress={handleTogglePressed}
      {...props}
    >
      <AnimatedIconToggle
        fade
        scale
        iconName={themedIconProps.name}
        iconColor={themedIconProps.color}
        toggledIconName={themedActiveIconProps?.name}
        toggledIconColor={themedActiveIconProps?.color}
        toggled={toggled}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.translucent,
    // borderRadius: theme.radii.circle,
    margin: theme.space.$1,
    padding: theme.space.$2,

    variants: {
      rounded: {
        false: {},
        true: {
          borderRadius: theme.radii.circle,
          // margin: theme.space.$1,
          // padding: theme.space.$2,
        },
      },
    },
  },
}));
