'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <nav className="container-custom" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NY</span>
              </div>
              <span className="font-heading font-bold text-xl text-nyasc-gray-900">
                Not Your Average School Counselor
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  pathname === item.href
                    ? 'text-nyasc-blue-600'
                    : 'text-nyasc-gray-700 hover:text-nyasc-blue-600'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping cart</span>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-nyasc-yellow-500 text-nyasc-gray-800 text-xs font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Button>

            {/* User Account */}
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User account</span>
            </Button>

            {/* CTA Button */}
            <Button className="hidden sm:flex">
              Get Started
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200',
                    pathname === item.href
                      ? 'bg-nyasc-blue-50 text-nyasc-blue-600'
                      : 'text-nyasc-gray-700 hover:bg-nyasc-gray-50 hover:text-nyasc-blue-600'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button className="w-full">
                  Get Started
                </Button>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
