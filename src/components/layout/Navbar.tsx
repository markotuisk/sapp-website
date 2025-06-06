import React from 'react';
import { NavLinks } from './navbar/NavLinks';
import { NavActions } from './navbar/NavActions';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { EnhancedMobileMenu } from './navbar/EnhancedMobileMenu';

export const Navbar = () => {
  // Add any state or handlers here if needed

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <NavActions />
            </div>
            <LanguageSelector />
            <EnhancedMobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};
