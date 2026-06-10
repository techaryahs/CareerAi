import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  StatusBar,
  ViewStyle,
  ScrollViewProps
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';

interface LayoutWrapperProps extends ScrollViewProps {
  children: React.ReactNode;
  /**
   * Title text displayed in the inline header.
   */
  title?: string;
  /**
   * Optional footer component (e.g. primary actions) anchored at the bottom.
   */
  footer?: React.ReactNode;
  /**
   * Extra styling for the outer container view.
   */
  containerStyle?: ViewStyle;
  /**
   * Extra styling for the ScrollView content container.
   */
  contentContainerStyle?: ViewStyle;
  /**
   * Disable the KeyboardAvoidingView wrapper.
   */
  disableKeyboardAvoiding?: boolean;
}

/**
 * Premium, production-grade LayoutWrapper with inline Flexbox headers.
 * Resolves overlapping and double-header issues by disabling native headers globally
 * and rendering a clean, safe-area-aware header inline at the top of the viewport.
 */
export default function LayoutWrapper({
  children,
  title,
  footer,
  containerStyle,
  contentContainerStyle,
  disableKeyboardAvoiding = false,
  ...scrollViewProps
}: LayoutWrapperProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Determine if we can go back in the current navigation stack
  const canGoBack = navigation && typeof navigation.canGoBack === 'function' && navigation.canGoBack();

  const handleBackPress = () => {
    if (canGoBack) {
      navigation.goBack();
    }
  };

  const showHeader = title !== undefined || canGoBack;

  const content = (
    <View style={[styles.outerContainer, containerStyle]}>
      {/* Configure standard system status bar styling */}
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent 
      />

      {/* Dynamic Inline Flex Header (Only renders if title is specified or back is possible) */}
      {showHeader && (
        <View style={[
          styles.headerContainer, 
          { paddingTop: Math.max(insets.top, 12) } // Apply safe area inset only to header top
        ]}>
          {/* Left Side: Back Button or Spacer */}
          <View style={styles.headerLeft}>
            {canGoBack ? (
              <TouchableOpacity
                onPress={handleBackPress}
                style={styles.circularBackButton}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Go back"
              >
                <ArrowLeft color="#475569" size={20} strokeWidth={2.5} />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Middle Side: Title */}
          <View style={styles.headerMiddle}>
            {title ? (
              <Text 
                style={styles.headerTitleText} 
                numberOfLines={1} 
                ellipsizeMode="tail"
              >
                {title}
              </Text>
            ) : null}
          </View>

          {/* Right Side: Spacer to balance the 3-column layout */}
          <View style={styles.headerRight} />
        </View>
      )}

      {/* Scrollable Page Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { 
            // Apply bottom safe-area insets if no sticky footer is present
            paddingBottom: footer ? 16 : insets.bottom + 24 
          },
          contentContainerStyle
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        {...scrollViewProps}
      >
        {children}
      </ScrollView>

      {/* Sticky Bottom Actions */}
      {footer && (
        <View style={[
          styles.footer, 
          { paddingBottom: Math.max(insets.bottom, 16) }
        ]}>
          {footer}
        </View>
      )}
    </View>
  );

  if (disableKeyboardAvoiding) {
    return content;
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 24 })}
    >
      {content}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  outerContainer: {
    flex: 1,
    backgroundColor: '#f8fafc', // Edge-to-edge background color
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0', // Muted border divider
  },
  headerLeft: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerMiddle: {
    flex: 1,
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  headerRight: {
    width: 40,
  },
  circularBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a', // Deep Slate
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  footer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});
