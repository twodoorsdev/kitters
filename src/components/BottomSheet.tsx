import { ComponentProps, ReactNode, useEffect, useRef } from 'react';
import RNBottomSheet, {
  BottomSheetView as RNBottomSheetView,
} from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native-unistyles';

export type BottomSheetProps = Omit<
  ComponentProps<typeof RNBottomSheet>,
  'children'
> & {
  children?: ReactNode;
  open?: boolean;
};

export const BottomSheet = ({
  children,
  open = false,
  ...props
}: BottomSheetProps) => {
  const sheetRef = useRef<RNBottomSheet>(null);

  useEffect(() => {
    if (open) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [open]);

  return (
    <RNBottomSheet
      ref={sheetRef}
      backgroundStyle={styles.root}
      // containerStyle={styles.root}
      enablePanDownToClose={true}
      index={-1}
      snapPoints={[200]}
      {...props}
    >
      <RNBottomSheetView style={styles.content}>
        {children ?? null}
      </RNBottomSheetView>
    </RNBottomSheet>
  );
};

const styles = StyleSheet.create((theme, runtime) => ({
  root: {
    backgroundColor: theme.colors.background.$3,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginBottom: runtime.insets.bottom,
  },
}));
