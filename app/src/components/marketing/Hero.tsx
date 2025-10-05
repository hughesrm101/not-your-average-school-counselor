'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Star, Users, Award, BookOpen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Resources Available', value: '25+' },
  { label: 'Students Helped', value: '5,000+' },
  { label: 'Counselors Supported', value: '2,500+' },
];

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-nyasc-blue-600 via-nyasc-blue-700 to-nyasc-blue-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="relative z-10 flex items-center min-h-screen py-20">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto text-center">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-nyasc-yellow-100 text-nyasc-yellow-800">
                <Star className="h-4 w-4 mr-2" />
                Featured on TPT, Etsy & TikTok • 2,500+ Counselors Trust Us
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                Real Resources for{' '}
                <span className="text-nyasc-yellow-500">Real Counselors</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                I've been where you are - overwhelmed, under-resourced, and trying to make a difference. 
                These are the tools I wish I had when I started. Created by a counselor, for counselors.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button size="lg" className="bg-nyasc-yellow-500 text-nyasc-gray-800 hover:bg-nyasc-yellow-600 text-lg px-8 py-4">
                Explore My Resources
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-nyasc-gray-900 text-lg px-8 py-4"
                onClick={() => setIsVideoPlaying(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Take a Look Inside
              </Button>
            </motion.div>

            {/* Social Proof & Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-lg text-white/80">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Product Preview Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 text-center">
                <div className="h-16 w-16 bg-nyasc-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-nyasc-gray-800" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Making Friends & Keeping Them</h3>
                <p className="text-white/70 text-sm mb-3">The lesson plan I wish I had when students struggled with friendship</p>
                <div className="text-nyasc-yellow-500 font-bold">$4.50</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 text-center">
                <div className="h-16 w-16 bg-nyasc-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Mindful Walking Worksheets</h3>
                <p className="text-white/70 text-sm mb-3">Perfect for those students who need to move to focus</p>
                <div className="text-nyasc-yellow-500 font-bold">$2.75</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 text-center">
                <div className="h-16 w-16 bg-nyasc-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Parent Newsletters Bundle</h3>
                <p className="text-white/70 text-sm mb-3">Save hours every month with these ready-to-send newsletters</p>
                <div className="text-nyasc-yellow-500 font-bold">$8.00</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video modal placeholder */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">See What's Inside</h3>
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="text-nyasc-gray-500 hover:text-nyasc-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="aspect-video bg-nyasc-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-nyasc-gray-500">
                <Play className="h-16 w-16 mx-auto mb-4" />
                <p>Take a peek at our real resources</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}