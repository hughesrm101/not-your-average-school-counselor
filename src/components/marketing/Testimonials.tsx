'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Elementary School Counselor',
    content: 'Finally, a lesson plan that actually works! My students were so engaged with the Making Friends activities. I wish I had found this sooner.',
    rating: 5,
    platform: 'TPT',
    product: 'Making Friends & Keeping Them'
  },
  {
    name: 'Michael R.',
    role: 'Middle School Counselor',
    content: 'These Mindful Walking Worksheets are perfect for my students who can\'t sit still. They love the movement and I love that they\'re actually learning.',
    rating: 5,
    platform: 'Etsy',
    product: 'Mindful Walking Worksheets'
  },
  {
    name: 'Jennifer L.',
    role: 'High School Counselor',
    content: 'The Parent Newsletters have been a lifesaver. I used to spend hours creating these from scratch. Now I can focus on what really matters - my students.',
    rating: 5,
    platform: 'TPT',
    product: 'Parent Newsletters Bundle'
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-nyasc-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">What Counselors Are Saying</h2>
          <p className="body-large text-nyasc-gray-600 max-w-3xl mx-auto">
            Real feedback from real counselors who are using these resources in their schools every day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative"
            >
              <Quote className="h-8 w-8 text-nyasc-blue-200 mb-4" />
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-nyasc-yellow-500 fill-current" />
                ))}
              </div>

              <p className="text-nyasc-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-nyasc-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-nyasc-gray-600">{testimonial.role}</div>
                </div>
                <div className="text-xs text-nyasc-blue-600 font-medium bg-nyasc-blue-50 px-2 py-1 rounded">
                  {testimonial.platform}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}