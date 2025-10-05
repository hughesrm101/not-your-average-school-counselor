import { Metadata } from 'next';
import { legalSEO } from '@/lib/seo';

export const metadata: Metadata = legalSEO.terms;

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-1 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-nyasc-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Agreement to Terms</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                By accessing and using the Not Your Average School Counselor website and services, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Description of Service</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                Not Your Average School Counselor provides digital resources, tools, and educational materials designed for school counselors and educational professionals. 
                Our services include but are not limited to:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-nyasc-gray-700">
                <li>Digital products and resources for school counselors</li>
                <li>Educational blog content and articles</li>
                <li>Professional development materials</li>
                <li>Community forums and support</li>
                <li>Email newsletters and communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">User Accounts</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                To access certain features of our service, you may be required to create an account. You are responsible for:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-nyasc-gray-700">
                <li>Providing accurate and complete information</li>
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Intellectual Property Rights</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                All content, materials, and resources provided through our service are protected by intellectual property laws. 
                You may not:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-nyasc-gray-700">
                <li>Copy, distribute, or modify our content without permission</li>
                <li>Use our materials for commercial purposes beyond your professional practice</li>
                <li>Remove copyright or proprietary notices</li>
                <li>Reverse engineer or attempt to extract source code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">License to Use</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                Upon purchase, we grant you a limited, non-exclusive, non-transferable license to use the purchased materials 
                for your professional practice as a school counselor or educational professional. This license does not include 
                the right to resell, redistribute, or share materials with other professionals outside your organization.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Payment Terms</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                All purchases are processed securely through our payment partners. By making a purchase, you agree to:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-nyasc-gray-700">
                <li>Pay all applicable fees and taxes</li>
                <li>Provide accurate billing information</li>
                <li>Authorize us to charge your payment method</li>
                <li>Notify us of any billing disputes within 30 days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Refund Policy</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                Due to the digital nature of our products, all sales are final. We do not offer refunds for digital downloads 
                or products. However, we may consider refunds in exceptional circumstances at our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Prohibited Uses</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                You may not use our service for any unlawful purpose or in any way that could damage, disable, or impair our service. 
                Prohibited activities include:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-nyasc-gray-700">
                <li>Violating any applicable laws or regulations</li>
                <li>Transmitting harmful or malicious code</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Interfering with other users' enjoyment of the service</li>
                <li>Using automated systems to access our service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">User-Generated Content</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                If you submit content to our service (such as comments, reviews, or forum posts), you grant us a non-exclusive, 
                royalty-free license to use, modify, and display such content. You are responsible for ensuring your content 
                does not violate any third-party rights or applicable laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Disclaimers</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                Our service is provided "as is" without warranties of any kind. We do not guarantee that our service will be 
                uninterrupted, error-free, or free of viruses. We are not responsible for any damages resulting from your use 
                of our service or materials.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Limitation of Liability</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                To the maximum extent permitted by law, Not Your Average School Counselor shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, 
                or use, arising from your use of our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Termination</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                We may terminate or suspend your account and access to our service at any time, with or without notice, 
                for any reason, including violation of these terms. Upon termination, your right to use the service will cease immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Governing Law</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                These Terms of Service shall be governed by and construed in accordance with the laws of [Your State/Country], 
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Changes to Terms</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting 
                the updated terms on our website. Your continued use of our service after such changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Contact Information</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-nyasc-gray-50 rounded-lg p-6">
                <p className="text-nyasc-gray-700">
                  <strong>Email:</strong> legal@yourdomain.com<br />
                  <strong>Address:</strong> [Your Business Address]<br />
                  <strong>Phone:</strong> (555) 123-4567
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
