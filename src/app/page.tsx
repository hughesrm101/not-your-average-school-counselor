import { Suspense } from 'react';
import { Metadata } from 'next';
import { homeSEO } from '@/lib/seo';
import { generateOrganizationStructuredData, generateWebsiteStructuredData } from '@/lib/seo';
import Hero from '@/components/marketing/Hero';
import FeatureCards from '@/components/marketing/FeatureCards';
import NewsletterForm from '@/components/marketing/NewsletterForm';
import Testimonials from '@/components/marketing/Testimonials';
import FeaturedBlog from '@/components/marketing/FeaturedBlog';
import FeaturedProducts from '@/components/marketing/FeaturedProducts';
import StatsSection from '@/components/marketing/StatsSection';
import HowItWorks from '@/components/marketing/HowItWorks';
import PricingSection from '@/components/marketing/PricingSection';
import CTASection from '@/components/marketing/CTASection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: homeSEO.title,
  description: homeSEO.description,
};

export default function HomePage() {
  const organizationStructuredData = generateOrganizationStructuredData();
  const websiteStructuredData = generateWebsiteStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        <section className="section-padding bg-nyasc-gray-50">
          <div className="container-custom">
            <FeatureCards />
          </div>
        </section>
        
        <section className="section-padding">
          <div className="container-custom">
            <Suspense fallback={<div>Loading featured products...</div>}>
              <FeaturedProducts />
            </Suspense>
          </div>
        </section>
        
        <section className="section-padding bg-nyasc-gray-50">
          <div className="container-custom">
            <Testimonials />
          </div>
        </section>
        
        <section className="section-padding">
          <div className="container-custom">
            <PricingSection />
          </div>
        </section>
        
        <section className="section-padding bg-nyasc-blue-900 text-white">
          <div className="container-custom">
            <NewsletterForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
