import React from 'react';
import SEOMetadata from '@/components/SEOMetadata';

export default function PrivacyPolicy() {
  return (
    <>
      <SEOMetadata
        title="Privacy Policy - Fresh Mart"
        description="Read our privacy policy to understand how Fresh Mart collects, uses, and protects your personal information."
        canonical="/privacy-policy"
      />

      <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: February 26, 2026</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
              <p>
                Welcome to Fresh Mart ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1 Personal Information</h3>
              <p className="mb-2">We collect personal information that you voluntarily provide to us when you:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Register for an account</li>
                <li>Make a purchase</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact customer support</li>
              </ul>
              <p className="mt-3">This information may include:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Name and contact information (email, phone number, address)</li>
                <li>Payment information (processed securely through Razorpay)</li>
                <li>Order history and preferences</li>
                <li>Account credentials</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.2 Automatically Collected Information</h3>
              <p className="mb-2">When you visit our website, we automatically collect certain information, including:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>IP address and browser type</li>
                <li>Device information</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <p className="mb-2">We use your information to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Process and fulfill your orders</li>
                <li>Manage your account and provide customer support</li>
                <li>Send order confirmations and updates</li>
                <li>Improve our products and services</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Payment Processing</h2>
              <p>
                All payment transactions are processed through Razorpay, a secure third-party payment gateway. We do not store your complete credit card or 
                debit card information on our servers. Razorpay complies with PCI-DSS standards and maintains the highest level of security for payment processing.
              </p>
              <p className="mt-3">
                For more information about how Razorpay handles your payment data, please refer to{' '}
                <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 underline">
                  Razorpay's Privacy Policy
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Information Sharing and Disclosure</h2>
              <p className="mb-2">We may share your information with:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (e.g., payment processing, delivery services)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
              </ul>
              <p className="mt-3">We do not sell your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Your Rights</h2>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Access and receive a copy of your personal data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences. 
                Note that disabling cookies may affect the functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. 
                If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
                and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">11. Contact Us</h2>
              <p className="mb-2">If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="list-none ml-4 space-y-1">
                <li><strong>Email:</strong> privacy@freshmart.com</li>
                <li><strong>Phone:</strong> +91 1234567890</li>
                <li><strong>Address:</strong> Fresh Mart, India</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
