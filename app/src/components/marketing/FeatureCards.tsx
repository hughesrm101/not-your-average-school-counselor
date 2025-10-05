'use client';

import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Shield, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: BookOpen,
    title: 'Ready When You Are',
    description: 'No more staying late to create materials. These resources are ready to use the moment you download them.',
    benefits: ['Instant Download', 'Tested in Real Schools', 'Grades K-12'],
    color: 'nyasc-blue',
  },
  {
    icon: Users,
    title: 'From One Counselor to Another',
    description: 'I\'ve been where you are - overwhelmed, trying to help every student, and running out of time. These are the tools that got me through.',
    benefits: ['Real Experience', 'Practical Solutions', 'Counselor-to-Counselor'],
    color: 'nyasc-yellow',
  },
  {
    icon: Award,
    title: 'Students Love These Activities',
    description: 'When students are engaged, real learning happens. These resources have helped thousands of students make positive changes.',
    benefits: ['5,000+ Students Helped', 'Evidence-Based Methods', 'Measurable Outcomes'],
    color: 'nyasc-blue',
  },
];

export default function FeatureCards() {
  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="heading-2 mb-4">Why Choose Not Your Average School Counselor?</h2>
        <p className="body-large text-nyasc-gray-600 max-w-3xl mx-auto">
          We understand the unique challenges school counselors face. Our evidence-based resources are designed to support your professional growth and enhance your impact on student success.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isBlue = feature.color === 'nyasc-blue';
          
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card-hover h-full p-8 text-left">
                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${
                  isBlue 
                    ? 'bg-nyasc-blue-100 text-nyasc-blue-600 group-hover:bg-nyasc-blue-200' 
                    : 'bg-nyasc-yellow-100 text-nyasc-yellow-600 group-hover:bg-nyasc-yellow-200'
                } transition-colors duration-200`}>
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="heading-4 mb-4">{feature.title}</h3>
                <p className="body-regular text-nyasc-gray-600 mb-6">
                  {feature.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-nyasc-gray-600">
                      <div className={`h-2 w-2 rounded-full mr-3 ${
                        isBlue ? 'bg-nyasc-blue-500' : 'bg-nyasc-yellow-500'
                      }`} />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant="ghost" 
                  className={`w-full ${
                    isBlue 
                      ? 'text-nyasc-blue-600 hover:bg-nyasc-blue-50' 
                      : 'text-nyasc-yellow-600 hover:bg-nyasc-yellow-50'
                  }`}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="heading-3 mb-4">Ready to Make a Real Difference?</h3>
          <p className="body-large mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of counselors who are already using these resources to support their students and reclaim their time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-nyasc-gray-900 hover:bg-gray-100">
              Explore My Resources
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-nyasc-gray-900">
              Visit My TPT Store
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
