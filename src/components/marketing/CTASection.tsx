'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Users, BookOpen } from 'lucide-react';

const ctaItems = [
  {
    icon: Download,
    title: 'Get Started Today',
    description: 'Browse our library of evidence-based resources',
    action: 'Explore Resources',
    href: '/shop',
    color: 'text-nyasc-blue-600',
    bgColor: 'bg-nyasc-blue-100',
  },
  {
    icon: Users,
    title: 'Join Our Community',
    description: 'Connect with fellow school counselors',
    action: 'Join Community',
    href: '/blog',
    color: 'text-nyasc-green-600',
    bgColor: 'bg-nyasc-green-100',
  },
  {
    icon: BookOpen,
    title: 'Read Our Blog',
    description: 'Get tips, strategies, and success stories',
    action: 'Read Blog',
    href: '/blog',
    color: 'text-nyasc-orange-600',
    bgColor: 'bg-nyasc-orange-100',
  },
];

export default function CTASection() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="heading-2 mb-4">Ready to Transform Your Counseling Practice?</h2>
        <p className="body-large text-nyasc-gray-600 max-w-3xl mx-auto">
          Join thousands of school counselors who are already making a difference with our evidence-based resources. Start your journey today and see the impact on your students.
        </p>
      </motion.div>

      {/* Main CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="bg-gradient-to-r from-nyasc-blue-600 to-nyasc-green-600 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Start Making a Difference Today
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get instant access to our complete library of school counseling resources. Download, implement, and see results immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-nyasc-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse All Resources
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/shop/bundle/nyasc-essential-counseling-resources-bundle"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-nyasc-blue-600 transition-colors"
            >
              Get Complete Toolkit
            </a>
          </div>
        </div>
      </motion.div>

      {/* Secondary CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ctaItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${item.bgColor} mb-6`}>
                <Icon className={`h-8 w-8 ${item.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-nyasc-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-nyasc-gray-600 mb-6">
                {item.description}
              </p>
              <a
                href={item.href}
                className={`inline-flex items-center justify-center px-6 py-3 ${item.color} border-2 border-current font-semibold rounded-lg hover:bg-current hover:text-white transition-colors`}
              >
                {item.action}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          );
        })}
      </div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 pt-16 border-t border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-nyasc-gray-900 mb-1">2,500+</div>
            <div className="text-sm text-nyasc-gray-600">Happy Counselors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-nyasc-gray-900 mb-1">4.9/5</div>
            <div className="text-sm text-nyasc-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-nyasc-gray-900 mb-1">25,000+</div>
            <div className="text-sm text-nyasc-gray-600">Students Helped</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-nyasc-gray-900 mb-1">500+</div>
            <div className="text-sm text-nyasc-gray-600">Schools Supported</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
