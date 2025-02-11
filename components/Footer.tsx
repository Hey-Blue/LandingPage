import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';

const Footer = () => {
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

  const handleButtonClick = () => {
    const link = getStoreLink();
    if (link.startsWith('/')) {
      window.location.href = link;
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-items-center text-center">
          {/* Legal Links */}
          <div className="space-y-4 w-full">
            <h3 className="font-semibold text-gray-900 text-lg">Legal</h3>
            <div className="space-y-3">
              <a 
                href="/tos"
                className="block text-gray-600 hover:text-blue-600 transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="/privacy"
                className="block text-gray-600 hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4 w-full">
            <h3 className="font-semibold text-gray-900 text-lg">Connect With Us</h3>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://www.facebook.com/itsheyblue/"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/itsheyblue/"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/company/hey-blue/posts/?feedView=all"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* App Download */}
          <div className="space-y-4 w-full">
            <h3 className="font-semibold text-gray-900 text-lg">Get the App</h3>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all mx-auto"
              onClick={handleButtonClick}
            >
              {getButtonText()}
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Hey Blue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;