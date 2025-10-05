'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Heart } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '2,500+',
    label: 'School Counselors',
    description: 'Trust our resources daily',
    color: 'text-nyasc-blue-600',
    bgColor: 'bg-nyasc-blue-100',
  },
  {
    icon: BookOpen,
    value: '50+',
    label: 'Resources Created',
    description: 'Evidence-based materials',
    color: 'text-nyasc-green-600',
    bgColor: 'bg-nyasc-green-100',
  },
  {
    icon: Heart,
    value: '25,000+',
    label: 'Students Helped',
    description: 'Through our resources',
    color: 'text-nyasc-orange-600',
    bgColor: 'bg-nyasc-orange-100',
  },
  {
    icon: Award,
    value: '500+',
    label: 'Schools Supported',
    description: 'Across the country',
    color: 'text-nyasc-yellow-600',
    bgColor: 'bg-nyasc-yellow-100',
  },
];

export default function StatsSection() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="heading-2 mb-4">Trusted by Counselors Nationwide</h2>
        <p className="body-large text-nyasc-gray-600 max-w-3xl mx-auto">
          Join thousands of school counselors who rely on our evidence-based resources to make a real difference in students' lives.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} mb-4`}>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-nyasc-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-nyasc-gray-600">
                {stat.description}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional trust indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 pt-16 border-t border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-nyasc-gray-900 mb-2">4.9/5</div>
            <div className="text-sm text-nyasc-gray-600">Average Rating</div>
            <div className="text-xs text-nyasc-gray-500 mt-1">Based on 500+ reviews</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-nyasc-gray-900 mb-2">98%</div>
            <div className="text-sm text-nyasc-gray-600">Would Recommend</div>
            <div className="text-xs text-nyasc-gray-500 mt-1">To fellow counselors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-nyasc-gray-900 mb-2">24/7</div>
            <div className="text-sm text-nyasc-gray-600">Support Available</div>
            <div className="text-xs text-nyasc-gray-500 mt-1">Community & resources</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
