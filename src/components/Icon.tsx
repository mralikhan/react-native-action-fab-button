import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faHome, faUser, faCog, faSearch, faHeart, faStar, faEdit, faTrash, faSave, faTimes, faCheck, faArrowLeft, faArrowRight, faBars, faShare, faDownload, faUpload, faCamera, faImage, faFile, faFolder, faEnvelope, faPhone, faMapMarkerAlt, faCalendar, faClock, faBell, faLock, faUnlock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Icon mapping for common icons
const iconMap: { [key: string]: IconDefinition } = {
  plus: faPlus,
  home: faHome,
  user: faUser,
  settings: faCog,
  search: faSearch,
  heart: faHeart,
  star: faStar,
  edit: faEdit,
  trash: faTrash,
  save: faSave,
  close: faTimes,
  check: faCheck,
  'arrow-left': faArrowLeft,
  'arrow-right': faArrowRight,
  menu: faBars,
  share: faShare,
  download: faDownload,
  upload: faUpload,
  camera: faCamera,
  image: faImage,
  file: faFile,
  folder: faFolder,
  envelope: faEnvelope,
  phone: faPhone,
  'map-marker': faMapMarkerAlt,
  calendar: faCalendar,
  clock: faClock,
  bell: faBell,
  lock: faLock,
  unlock: faUnlock,
  eye: faEye,
  'eye-slash': faEyeSlash,
};

export interface IconProps {
  name: string;
  color?: string;
  size?: number;
  style?: any;
}

const Icon: React.FC<IconProps> = ({ name, color = '#000', size = 16, style }) => {
  const iconDefinition = iconMap[name.toLowerCase()];
  
  if (!iconDefinition) {
    console.warn(`Icon "${name}" not found. Available icons: ${Object.keys(iconMap).join(', ')}`);
    return null;
  }

  return (
    <FontAwesomeIcon 
      icon={iconDefinition} 
      color={color} 
      size={size} 
      style={style}
    />
  );
};

export default Icon;
