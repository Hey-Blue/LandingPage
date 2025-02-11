// hooks/useAppStore.ts
import { useState, useEffect } from 'react';

export const useAppStore = () => {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios');
    } else if (/android/.test(userAgent)) {
      setPlatform('android');
    }
  }, []);

  const getStoreLink = () => {
    if (platform === 'ios') {
      return 'https://apps.apple.com/us/app/hey-blue/id6499293126';
    } else if (platform === 'android') {
      return 'https://play.google.com/store/apps/details?id=com.development.heyblue&hl=en_US';
    }
    return '/app';
  };

  const getButtonText = () => {
    if (platform === 'ios') {
      return 'Download on App Store';
    } else if (platform === 'android') {
      return 'Get it on Google Play';
    }
    return 'Download the App!';
  };

  return { platform, getStoreLink, getButtonText };
};