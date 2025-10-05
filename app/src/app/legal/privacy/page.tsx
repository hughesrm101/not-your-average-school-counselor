import { Metadata } from 'next';
import { legalSEO } from '@/lib/seo';

export const metadata: Metadata = legalSEO.privacy;

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-1 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-nyasc-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Introduction</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                Not Your Average School Counselor ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                you visit our website and use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Information We Collect</h2>
              
              <h3 className="heading-4 mb-3">Personal Information</h3>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-nyasc-gray-700">
                <li>Create an account or register for our services</li>
                <li>Make a purchase or download products</li>
                <li>Subscribe to our newsletter or email communications</li>
                <li>Contact us for support or inquiries</li>
                <li>Participate in surveys or feedback forms</li>
              </ul>

              <h3 className="heading-4 mb-3">Automatically Collected Information</h3>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                We may automatically collect certain information about your device and usage patterns, including:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-nyasc-gray-700">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website information</li>
                <li>Device identifiers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">How We Use Your Information</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-nyasc-gray-700">
                <li>Provide and maintain our services</li>
                <li>Process transactions and deliver products</li>
                <li>Send you important updates and communications</li>
                <li>Improve our website and services</li>
                <li>Provide customer support</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraud and security threats</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Information Sharing and Disclosure</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-nyasc-gray-700">
                <li>With your explicit consent</li>
                <li>To trusted service providers who assist us in operating our website and conducting our business</li>
                <li>When required by law or to protect our rights and safety</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Data Security</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
                the internet or electronic storage is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Your Rights and Choices</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-nyasc-gray-700">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Cookies and Tracking Technologies</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Third-Party Services</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                Our website may contain links to third-party websites or services. We are not responsible for the 
                privacy practices of these third parties. We encourage you to review their privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Children's Privacy</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                Our services are not directed to children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe your 
                child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Changes to This Privacy Policy</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Contact Us</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="bg-nyasc-gray-50 rounded-lg p-6">
                <p className="text-nyasc-gray-700">
                  <strong>Email:</strong> privacy@yourdomain.com<br />
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
