'use client';

import { motion } from 'framer-motion';
import { Download, Users, Award, Heart } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Download,
    title: 'Browse & Download',
    description: 'Explore our library of evidence-based resources designed specifically for school counselors. Download instantly and start using right away.',
    color: 'text-nyasc-blue-600',
    bgColor: 'bg-nyasc-blue-100',
  },
  {
    step: '02',
    icon: Users,
    title: 'Implement & Engage',
    description: 'Use our ready-to-use lesson plans, worksheets, and activities with your students. Everything is professionally designed and tested.',
    color: 'text-nyasc-green-600',
    bgColor: 'bg-nyasc-green-100',
  },
  {
    step: '03',
    icon: Award,
    title: 'See Results',
    description: 'Watch your students grow and develop the skills they need to succeed. Track progress and celebrate achievements together.',
    color: 'text-nyasc-orange-600',
    bgColor: 'bg-nyasc-orange-100',
  },
  {
    step: '04',
    icon: Heart,
    title: 'Join Community',
    description: 'Connect with fellow counselors, share success stories, and get support from our vibrant community of professionals.',
    color: 'text-nyasc-yellow-600',
    bgColor: 'bg-nyasc-yellow-100',
  },
];

export default function HowItWorks() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="heading-2 mb-4">How It Works</h2>
        <p className="body-large text-nyasc-gray-600 max-w-3xl mx-auto">
          Getting started with our resources is simple. Follow these four easy steps to transform your counseling practice and make a lasting impact on your students.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-nyasc-blue-200 to-nyasc-green-200 transform translate-x-4 z-0" />
              )}
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${step.bgColor} mb-6`}>
                  <Icon className={`h-8 w-8 ${step.color}`} />
                </div>
                
                <div className={`text-sm font-bold ${step.color} mb-2`}>
                  STEP {step.step}
                </div>
                
                <h3 className="text-xl font-semibold text-nyasc-gray-900 mb-4">
                  {step.title}
                </h3>
                
                <p className="text-nyasc-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <div className="bg-gradient-to-r from-nyasc-blue-50 to-nyasc-green-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-nyasc-gray-900 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-nyasc-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of school counselors who are already making a difference with our resources. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3 bg-nyasc-blue-600 text-white font-semibold rounded-lg hover:bg-nyasc-blue-700 transition-colors"
            >
              Browse Resources
            </a>
            <a
              href="/blog"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-nyasc-blue-600 text-nyasc-blue-600 font-semibold rounded-lg hover:bg-nyasc-blue-600 hover:text-white transition-colors"
            >
              Read Our Blog
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
