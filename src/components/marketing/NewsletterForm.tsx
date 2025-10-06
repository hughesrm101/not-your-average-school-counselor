'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackNewsletterSubscription } from '@/lib/analytics';

const topics = [
  'Social Emotional Learning',
  'Crisis Intervention',
  'College & Career Readiness',
  'Bullying Prevention',
  'Mental Health Support',
  'Assessment Tools',
  'Professional Development',
  'Parent Communication',
];

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<'weekly' | 'monthly'>('weekly');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      // Track analytics
      trackNewsletterSubscription({
        email,
        topics: selectedTopics,
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Implement actual newsletter subscription
      console.log('Newsletter subscription:', {
        email,
        topics: selectedTopics,
        frequency,
      });

      setStatus('success');
      setEmail('');
      setSelectedTopics([]);
    } catch (err) {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
        <h3 className="heading-3 mb-4 text-white">Welcome to the Community!</h3>
        <p className="body-large text-white/90 mb-6">
          Thank you for subscribing! You'll receive our latest resources and updates.
        </p>
        <Button 
          onClick={() => setStatus('idle')}
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-nyasc-gray-900"
        >
          Subscribe Another Email
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center">
            <Mail className="h-8 w-8 text-nyasc-yellow-500" />
          </div>
        </div>

        <h2 className="heading-2 mb-4 text-white">Stay Updated</h2>
        <p className="body-large text-white/90 mb-8">
          Get the latest resources, tips, and insights delivered to your inbox. 
          Join thousands of school counselors who trust NYASC for professional development.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-nyasc-yellow-500 focus:border-transparent transition-all duration-200"
              disabled={status === 'loading'}
            />
            {error && (
              <div className="flex items-center mt-2 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}
          </div>

          {/* Topic selection */}
          <div className="text-left">
            <label className="block text-white font-medium mb-3">
              Topics of Interest (Optional)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {topics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedTopics.includes(topic)
                      ? 'bg-nyasc-yellow-500 text-nyasc-gray-800'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  disabled={status === 'loading'}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency selection */}
          <div className="text-left">
            <label className="block text-white font-medium mb-3">
              Email Frequency
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  value="weekly"
                  checked={frequency === 'weekly'}
                  onChange={(e) => setFrequency(e.target.value as 'weekly' | 'monthly')}
                  className="mr-2 text-nyasc-yellow-500 focus:ring-nyasc-yellow-500"
                  disabled={status === 'loading'}
                />
                <span className="text-white">Weekly</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  value="monthly"
                  checked={frequency === 'monthly'}
                  onChange={(e) => setFrequency(e.target.value as 'weekly' | 'monthly')}
                  className="mr-2 text-nyasc-yellow-500 focus:ring-nyasc-yellow-500"
                  disabled={status === 'loading'}
                />
                <span className="text-white">Monthly</span>
              </label>
            </div>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-nyasc-yellow-500 text-nyasc-gray-800 hover:bg-nyasc-yellow-600"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe to Newsletter'}
          </Button>

          <p className="text-white/60 text-sm">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </motion.div>
  );
}
