import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Animated, 
  Easing, 
  LayoutAnimation, 
  Platform,
  UIManager
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface PremiumAccordionProps {
  /**
   * Title text displayed in the accordion header.
   */
  title: string;
  /**
   * Content text/node displayed inside the expanded body.
   */
  content: string | React.ReactNode;
  /**
   * Optional default expanded state.
   */
  defaultExpanded?: boolean;
}

/**
 * Premium, production-ready expandable accordion component with smooth micro-animations,
 * 48dp ergonomic touch bounds, and WCAG AA contrast text pairings.
 */
export default function PremiumAccordion({
  title,
  content,
  defaultExpanded = false,
}: PremiumAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  // Animation value for chevron rotation (0 to 1)
  const rotationAnim = useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;

  const toggleAccordion = () => {
    // Configure layout transition
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    const targetValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);

    // Animate chevron rotation
    Animated.timing(rotationAnim, {
      toValue: targetValue,
      duration: 200,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true, // Optimizes rotation frame performance on native thread
    }).start();
  };

  // Map animated value to degree rotation
  const chevronRotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View 
      style={[
        styles.cardContainer,
        isExpanded ? styles.cardExpanded : styles.cardCollapsed
      ]}
    >
      <TouchableOpacity
        onPress={toggleAccordion}
        style={styles.headerButton}
        activeOpacity={0.6}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
        accessibilityLabel={title}
        accessibilityHint="Double tap to expand or collapse details"
      >
        <Text style={styles.titleText} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
        <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
          <ChevronDown color="#475569" size={20} strokeWidth={2.5} />
        </Animated.View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.contentContainer}>
          {typeof content === 'string' ? (
            <Text style={styles.contentText}>
              {content}
            </Text>
          ) : (
            content
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 6,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardCollapsed: {
    borderColor: '#f1f5f9', // Slate 100 border
  },
  cardExpanded: {
    borderColor: '#cbd5e1', // Slate 300 border shift for distinct styling
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    minHeight: 52, // Exceeds the 48dp touch target threshold (mobile standard)
    backgroundColor: 'transparent',
  },
  titleText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a', // Deep Slate - High Contrast WCAG AA compliant
    lineHeight: 20,
    marginRight: 12,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9', // Slate 100 divider
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569', // Muted Slate - High Contrast WCAG AA compliant
  },
});
