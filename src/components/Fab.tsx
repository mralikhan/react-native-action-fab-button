import React from 'react';
import ActionButton, { ActionButtonItem } from './ActionButton';
import Icon from './Icon';

export interface FabOption {
  title: string;
  icon: string;
  screen?: string;
  [key: string]: any;
}

export interface FabProps {
  onPress?: () => void;
  options?: FabOption[];
  onOptionPress?: (screen?: string, option?: FabOption) => void;
  icon?: string;
  buttonColor?: string;
  position?: 'left' | 'right';
  offsetX?: number;
  offsetY?: number;
  size?: number;
  spacing?: number;
  verticalOrientation?: 'up' | 'down';
  hideShadow?: boolean;
  backgroundTappable?: boolean;
  bgColor?: string;
  bgOpacity?: number;
  autoInactive?: boolean;
  iconColors?: string[];
}

const Fab: React.FC<FabProps> = ({
  onPress,
  options,
  onOptionPress,
  icon = 'plus',
  buttonColor = '#1253bc',
  position = 'right',
  offsetX = 30,
  offsetY = 50,
  size = 56,
  spacing = 0,
  verticalOrientation = 'up',
  hideShadow = true,
  backgroundTappable = true,
  bgColor = 'transparent',
  bgOpacity = 0.6,
  autoInactive = true,
  iconColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'],
}) => {
  const defaultButtonColor = buttonColor;

  if (options && options?.length > 0) {
    return (
      <ActionButton 
        buttonColor={defaultButtonColor} 
        hideShadow={hideShadow}
        position={position}
        offsetX={offsetX}
        offsetY={offsetY}
        size={size}
        spacing={spacing}
        verticalOrientation={verticalOrientation}
        backgroundTappable={backgroundTappable}
        bgColor={bgColor}
        bgOpacity={bgOpacity}
        autoInactive={autoInactive}
        renderIcon={() => <Icon name={icon} color="white" size={24} />}
      >
        {options?.map((option, index) => {
          const color = iconColors[index % iconColors.length];
          return (
            <ActionButtonItem
              key={index}
              buttonColor={color}
              textContainerStyle={{backgroundColor: 'white'}}
              textStyle={{color: '#333'}}
              title={option?.title}
              onPress={() => onOptionPress?.(option?.screen, option)}
            >
              <Icon name={option?.icon} color="white" size={20} />
            </ActionButtonItem>
          );
        })}
      </ActionButton>
    );
  } else {
    return (
      <ActionButton
        buttonColor={defaultButtonColor}
        onPress={onPress}
        hideShadow={hideShadow}
        position={position}
        offsetX={offsetX}
        offsetY={offsetY}
        size={size}
        renderIcon={() => <Icon name={icon} color="white" size={24} />}
      />
    );
  }
};

export default Fab;
