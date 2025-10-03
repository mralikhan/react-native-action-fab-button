import React, { useState, useRef, ReactNode } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export interface ActionButtonProps {
  buttonColor?: string;
  btnOutRange?: string;
  outRangeScale?: number;
  onPress?: () => void;
  hideShadow?: boolean;
  fixNativeFeedbackRadius?: boolean;
  renderIcon?: () => ReactNode;
  children?: ReactNode;
  size?: number;
  spacing?: number;
  autoInactive?: boolean;
  onLongPress?: () => void;
  backgroundTappable?: boolean;
  verticalOrientation?: 'up' | 'down';
  position?: 'left' | 'right';
  offsetX?: number;
  offsetY?: number;
  radius?: number;
  bgColor?: string;
  bgOpacity?: number;
  buttonTextStyle?: any;
  useNativeFeedback?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  buttonColor = '#1253bc',
  btnOutRange = '#1253bc',
  outRangeScale = 1,
  onPress,
  hideShadow = false,
  fixNativeFeedbackRadius = false,
  renderIcon,
  children,
  size = 56,
  spacing = 0,
  autoInactive = true,
  onLongPress,
  backgroundTappable = false,
  verticalOrientation = 'up',
  position = 'right',
  offsetX = 30,
  offsetY = 50,
  radius = 100,
  bgColor = 'transparent',
  bgOpacity = 0.6,
  buttonTextStyle = {},
  useNativeFeedback = true,
}) => {
  const [active, setActive] = useState(false);
  const [resetToken, setResetToken] = useState(false);
  
  const anim = useRef(new Animated.Value(0)).current;
  const bgAnimation = useRef(new Animated.Value(0)).current;

  const animateButton = () => {
    if (active) {
      reset();
      return;
    }

    Animated.parallel([
      Animated.spring(anim, {
        toValue: 1,
        useNativeDriver: false,
      }),
      Animated.timing(bgAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();

    setActive(true);
  };

  const reset = () => {
    Animated.parallel([
      Animated.spring(anim, {
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.timing(bgAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();

    setTimeout(() => {
      setActive(false);
    }, 250);
  };

  const getActionButtonStyle = () => {
    const positioning = position === 'left' ? { left: offsetX } : { right: offsetX };
    
    return [
      styles.actionBarItem,
      {
        width: size,
        height: size,
        backgroundColor: buttonColor,
        bottom: offsetY,
        ...positioning,
      },
      !hideShadow && styles.shadow,
    ];
  };

  const getActionsStyle = () => {
    const positioning = position === 'left' ? { left: offsetX + 8 } : { right: offsetX + 8 };
    
    return [
      styles.actionsVertical,
      {
        bottom: offsetY + size + spacing + 0, // Add more space to bring actions closer to main button
        ...positioning,
      },
    ];
  };

  const renderButton = () => {
    const animatedViewStyle = {
      transform: [
        {
          scale: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, outRangeScale],
          }),
        },
        {
          rotate: anim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg'],
          }),
        },
      ],
    };

    return (
      <TouchableOpacity 
      activeOpacity={0.9}
      onPress={() => {
        if (onPress) {
          onPress();
        }
        if(children){

            animateButton();
        }
      }}
      onLongPress={onLongPress}
      style={getActionButtonStyle()}>
        <TouchableOpacity
          style={styles.actionBarItem}
          activeOpacity={0.85}
          onPress={() => {
            if (onPress) {
              onPress();
            }
            if(children){

                animateButton();
            }
          }}
          onLongPress={onLongPress}
        >
          <Animated.View style={[styles.btn, animatedViewStyle]}>
            {renderIcon ? (
              renderIcon()
            ) : (
              <Text style={[styles.btnText, buttonTextStyle]}>+</Text>
            )}
          </Animated.View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderActions = () => {
    if (!children) return null;

    const actionButtons = React.Children.map(children, (child, index) => {
      if (!child || !React.isValidElement(child)) return null;

      const animationStyle = {
        opacity: anim,
        transform: [
          {
            scale: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
          {
            translateY: anim.interpolate({
              inputRange: [0, 15],
              outputRange: [0, verticalOrientation === 'up' ? -((index + 1) * (size + spacing)) : ((index + 1) * (size + spacing))],
            }),
          },
        ],
      };

      return (
        <Animated.View key={index} style={[styles.actionButton, animationStyle]}>
          {React.cloneElement(child as React.ReactElement<any>, {
            onPress: () => {
              if ((child as any).props?.onPress) {
                (child as any).props.onPress();
              }
              if (autoInactive) {
                reset();
              }
            },
          })}
        </Animated.View>
      );
    });

    return (
      <View style={getActionsStyle()}>
        {actionButtons}
      </View>
    );
  };

  const renderTappableBackground = () => {
    const bgStyle = {
      backgroundColor: bgColor,
      opacity: bgAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, bgOpacity],
      }),
    };

    return (
      <Animated.View style={[styles.overlay, bgStyle]}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => {
            if (backgroundTappable) {
              reset();
            }
          }}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      {active && renderTappableBackground()}
      {active && renderActions()}
      {renderButton()}
    </View>
  );
};

export interface ActionButtonItemProps {
  title?: string;
  onPress?: () => void;
  buttonColor?: string;
  textStyle?: any;
  textContainerStyle?: any;
  spaceBetween?: number;
  size?: number;
  children?: ReactNode;
  hideLabelShadow?: boolean;
  shadowStyle?: any;
}

// Action Button Item Component
export const ActionButtonItem: React.FC<ActionButtonItemProps> = ({
  title,
  onPress,
  buttonColor = '#1253bc',
  textStyle = {},
  textContainerStyle = {},
  spaceBetween = 15,
  size = 50,
  children,
  hideLabelShadow = false,
  shadowStyle = {},
}) => {
  return (
    <View style={styles.actionButtonItemContainer}>
      {title && (
        <View style={[styles.textContainer, textContainerStyle, !hideLabelShadow && styles.textShadow, shadowStyle]}>
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      )}
      <TouchableOpacity
        style={[
          styles.actionButtonItem,
          {
            backgroundColor: buttonColor,
            width: size,
            height: size,
            marginLeft: spaceBetween,
          },
        ]}
        activeOpacity={0.85}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
  actionBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    position: 'absolute',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    width: '100%',
    height: '100%',
  },
  btnText: {
    marginTop: -4,
    fontSize: 24,
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
  },
  actionsVertical: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    position: 'absolute',
  },
  actionButton: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    marginBottom: 0,
    justifyContent: 'flex-end',
  },
  actionButtonItemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 4,
    justifyContent: 'flex-end',
    minHeight: 0,
  },
  actionButtonItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 12,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
  },
  text: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },
  textShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ActionButton;
