'use client';

import { motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Individual Resources',
    description: 'Perfect for trying specific resources',
    price: '$2.75',
    period: 'starting at',
    features: [
      'Individual lesson plans',
      'Single worksheets & activities',
      'Instant download',
      'Lifetime access',
      'Email support',
    ],
    cta: 'Browse Resources',
    href: '/shop',
    popular: false,
    color: 'border-nyasc-blue-200',
    bgColor: 'bg-white',
  },
  {
    name: 'Resource Bundles',
    description: 'Best value for multiple resources',
    price: '$8.00',
    period: 'starting at',
    features: [
      'Multiple related resources',
      'Save up to 25%',
      'Themed collections',
      'Instant download',
      'Priority support',
      'Bonus materials included',
    ],
    cta: 'View Bundles',
    href: '/shop?category=bundles',
    popular: true,
    color: 'border-nyasc-blue-500',
    bgColor: 'bg-nyasc-blue-50',
  },
  {
    name: 'Complete Sets',
    description: 'Everything you need for a topic',
    price: '$15.00',
    period: 'starting at',
    features: [
      'All 5 essential resources',
      'Save $6.00 vs individual',
      'Complete counseling toolkit',
      'Instant download',
      'VIP support',
      'Future updates included',
    ],
    cta: 'Get Complete Toolkit',
    href: '/shop/bundle/nyasc-essential-counseling-resources-bundle',
    popular: false,
    color: 'border-nyasc-green-200',
    bgColor: 'bg-white',
  },
];

export default function PricingSection() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="heading-2 mb-4">Simple, Transparent Pricing</h2>
        <p className="body-large text-nyasc-gray-600 max-w-3xl mx-auto">
          Choose the option that works best for your needs. All resources are professionally designed, evidence-based, and ready to use immediately.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative rounded-2xl border-2 ${plan.color} ${plan.bgColor} p-8 ${
              plan.popular ? 'transform scale-105 shadow-lg' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="inline-flex items-center px-4 py-2 bg-nyasc-yellow-500 text-nyasc-gray-900 font-semibold rounded-full text-sm">
                  <Star className="h-4 w-4 mr-1" />
                  Most Popular
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-nyasc-gray-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-nyasc-gray-600 mb-4">
                {plan.description}
              </p>
              <div className="mb-2">
                <span className="text-4xl font-bold text-nyasc-gray-900">
                  {plan.price}
                </span>
                <span className="text-nyasc-gray-600 ml-2">
                  {plan.period}
                </span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 text-left">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <Check className="h-5 w-5 text-nyasc-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-nyasc-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={plan.href}
              className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors ${
                plan.popular
                  ? 'bg-nyasc-blue-600 text-white hover:bg-nyasc-blue-700'
                  : 'bg-nyasc-gray-100 text-nyasc-gray-900 hover:bg-nyasc-gray-200'
              }`}
            >
              {plan.cta}
            </a>
          </motion.div>
        ))}
      </div>

      {/* Additional info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <div className="bg-nyasc-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-nyasc-green-100 rounded-lg mb-4">
                <Zap className="h-6 w-6 text-nyasc-green-600" />
              </div>
              <h4 className="font-semibold text-nyasc-gray-900 mb-2">Instant Access</h4>
              <p className="text-sm text-nyasc-gray-600">
                Download immediately after purchase
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-nyasc-blue-100 rounded-lg mb-4">
                <Check className="h-6 w-6 text-nyasc-blue-600" />
              </div>
              <h4 className="font-semibold text-nyasc-gray-900 mb-2">Lifetime Access</h4>
              <p className="text-sm text-nyasc-gray-600">
                Keep your resources forever
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-nyasc-orange-100 rounded-lg mb-4">
                <Star className="h-6 w-6 text-nyasc-orange-600" />
              </div>
              <h4 className="font-semibold text-nyasc-gray-900 mb-2">Money Back Guarantee</h4>
              <p className="text-sm text-nyasc-gray-600">
                30-day satisfaction guarantee
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
