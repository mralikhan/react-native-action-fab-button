import { ReactNode } from 'react';

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

export interface IconProps {
  name: string;
  color?: string;
  size?: number;
  style?: any;
}
