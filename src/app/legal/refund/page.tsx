import { Metadata } from 'next';
import { legalSEO } from '@/lib/seo';

export const metadata: Metadata = legalSEO.refund;

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-1 mb-8">Refund Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-nyasc-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <h2 className="heading-4 text-red-800 mb-2">Important Notice</h2>
              <p className="text-red-700">
                Due to the digital nature of our products, all sales are final. We do not offer refunds for digital downloads or products.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Digital Product Policy</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                All products sold through Not Your Average School Counselor are digital downloads. Once you complete your purchase 
                and download the product, the transaction is considered final. This policy is in place because:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-nyasc-gray-700">
                <li>Digital products cannot be "returned" in the traditional sense</li>
                <li>Once downloaded, the product is immediately available for use</li>
                <li>We cannot verify that downloaded content has been deleted</li>
                <li>Digital products are not subject to the same return policies as physical goods</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">What This Means for You</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                Before making a purchase, please ensure that:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-nyasc-gray-700">
                <li>You have read the product description carefully</li>
                <li>You understand what is included in the product</li>
                <li>You have the necessary software to use the product</li>
                <li>The product meets your professional needs</li>
                <li>You are authorized to make the purchase</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Exceptional Circumstances</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                In very rare cases, we may consider a refund at our sole discretion. These circumstances may include:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-nyasc-gray-700">
                <li>Technical issues that prevent you from accessing the product</li>
                <li>Duplicate purchases due to system errors</li>
                <li>Products that are significantly different from their description</li>
                <li>Unauthorized purchases made with stolen payment information</li>
              </ul>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                If you believe you qualify for a refund under these exceptional circumstances, please contact us within 7 days 
                of your purchase with detailed information about the issue.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Technical Support</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                If you experience technical difficulties with your purchase, we are here to help. Before requesting a refund, 
                please contact our support team who can assist you with:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-nyasc-gray-700">
                <li>Download issues</li>
                <li>File compatibility problems</li>
                <li>Access to your account</li>
                <li>Product usage questions</li>
                <li>Technical troubleshooting</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Chargebacks and Disputes</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                If you initiate a chargeback or dispute with your payment provider without first contacting us, we reserve the right 
                to suspend your account and deny future purchases. We encourage you to contact us directly to resolve any issues 
                before taking such action.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Product Guarantees</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                While we do not offer refunds, we stand behind the quality of our products. We guarantee that:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-nyasc-gray-700">
                <li>All products are professionally designed and evidence-based</li>
                <li>Products will be accessible and functional as described</li>
                <li>We will provide technical support for legitimate issues</li>
                <li>We will address any product defects or errors promptly</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Contact Us</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                If you have questions about this refund policy or need assistance with your purchase, please contact us:
              </p>
              <div className="bg-nyasc-gray-50 rounded-lg p-6">
                <p className="text-nyasc-gray-700">
                  <strong>Email:</strong> support@yourdomain.com<br />
                  <strong>Phone:</strong> (555) 123-4567<br />
                  <strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">Policy Updates</h2>
              <p className="body-regular text-nyasc-gray-700 mb-4">
                We reserve the right to update this refund policy at any time. Any changes will be posted on this page with an 
                updated revision date. Your continued use of our service after any changes constitutes acceptance of the updated policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
