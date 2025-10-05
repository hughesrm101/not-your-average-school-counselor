import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Free Resources', href: '/freebies' },
    { name: 'Product Categories', href: '/shop?category=all' },
    { name: 'Grade Levels', href: '/shop?grade=all' },
    { name: 'Blog Categories', href: '/blog?category=all' },
    { name: 'Search', href: '/search' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Account Dashboard', href: '/account' },
    { name: 'Downloads', href: '/account/downloads' },
    { name: 'Referrals', href: '/account/referrals' },
    { name: 'Email Preferences', href: '/account/preferences' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Service', href: '/legal/terms' },
    { name: 'Refund Policy', href: '/legal/refund' },
    { name: 'Cookie Policy', href: '/legal/cookies' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://facebook.com/nyasc',
      icon: Facebook,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/nyasc',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/nyasc',
      icon: Linkedin,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/nyasc',
      icon: Instagram,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-nyasc-gray-900 text-white">
      <div className="container-custom">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NY</span>
              </div>
              <span className="font-heading font-bold text-xl">NYASC</span>
            </div>
            <p className="text-nyasc-gray-300 mb-6 max-w-sm">
              Professional resources and tools for school counselors. Empowering educators with evidence-based strategies and digital products.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-nyasc-gray-300">
                <Mail className="h-4 w-4" />
                <span>hi@yourdomain.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-nyasc-gray-300">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-nyasc-gray-300">
                <MapPin className="h-4 w-4" />
                <span>United States</span>
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-nyasc-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-nyasc-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-nyasc-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="py-8 border-t border-nyasc-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-white mb-2">Stay Updated</h3>
              <p className="text-nyasc-gray-300 text-sm">
                Get the latest resources and tips delivered to your inbox.
              </p>
            </div>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-4 py-2 bg-nyasc-gray-800 border border-nyasc-gray-700 rounded-lg text-white placeholder-nyasc-gray-400 focus:outline-none focus:ring-2 focus:ring-nyasc-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-nyasc-yellow-500 text-nyasc-gray-800 font-medium rounded-lg hover:bg-nyasc-yellow-600 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-8 border-t border-nyasc-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Copyright */}
            <div className="mb-4 md:mb-0">
              <p className="text-nyasc-gray-400 text-sm">
                © {new Date().getFullYear()} Not Your Average School Counselor. All rights reserved.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-nyasc-gray-400 hover:text-white transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap items-center space-x-6">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-nyasc-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
