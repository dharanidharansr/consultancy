import React from 'react';
import SEOMetadata from '@/components/SEOMetadata';

export default function TermsAndConditions() {
  return (
    <>
      <SEOMetadata
        title="Terms and Conditions - Fresh Mart"
        description="Read the terms and conditions for using Fresh Mart's online grocery shopping platform."
        canonical="/terms-and-conditions"
      />

      <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: February 26, 2026</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Agreement to Terms</h2>
              <p>
                By accessing or using Fresh Mart's website and services, you agree to be bound by these Terms and Conditions. 
                If you do not agree with any part of these terms, you may not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Use of Services</h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1 Eligibility</h3>
              <p>You must be at least 18 years old to use our services. By using our platform, you represent that you meet this age requirement.</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.2 Account Registration</h3>
              <p className="mb-2">When creating an account, you agree to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Orders and Payment</h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.1 Order Placement</h3>
              <p>
                All orders placed through our platform are subject to acceptance. We reserve the right to refuse or cancel any order 
                for reasons including but not limited to product availability, errors in pricing, or suspected fraudulent activity.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.2 Pricing</h3>
              <p>
                All prices are listed in Indian Rupees (INR) and are subject to change without notice. We strive to provide accurate pricing, 
                but errors may occur. If we discover a pricing error, we will inform you and give you the option to confirm or cancel your order.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.3 Payment Processing</h3>
              <p>
                We use Razorpay as our payment gateway. All payment transactions are subject to Razorpay's terms and conditions. 
                We accept various payment methods including credit/debit cards, UPI, net banking, and digital wallets.
              </p>
              <p className="mt-2">Payment must be completed before order processing begins.</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.4 Order Confirmation</h3>
              <p>
                You will receive an order confirmation email once your payment is successfully processed. This confirmation does not signify 
                our acceptance of your order, merely that we have received it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Delivery</h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.1 Delivery Areas</h3>
              <p>We currently deliver to select areas. Delivery availability will be confirmed during checkout.</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.2 Delivery Timeframes</h3>
              <p>
                We aim to deliver orders within the estimated timeframe provided at checkout. However, delivery times are estimates and 
                may vary due to factors beyond our control.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.3 Failed Deliveries</h3>
              <p>
                If delivery cannot be completed due to incorrect address information or unavailability of recipient, additional charges may apply 
                for redelivery attempts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Returns and Refunds</h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.1 Return Policy</h3>
              <p className="mb-2">We accept returns for:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Damaged or defective products</li>
                <li>Incorrect items delivered</li>
                <li>Quality issues with perishable items (within 24 hours of delivery)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.2 Non-Returnable Items</h3>
              <p className="mb-2">The following items cannot be returned:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Perishable goods after 24 hours</li>
                <li>Products with tampered packaging</li>
                <li>Personal care items that have been opened</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.3 Refund Process</h3>
              <p>
                Approved refunds will be processed within 7-10 business days to the original payment method. 
                Refund timelines may vary depending on your bank or payment provider.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Product Information</h2>
              <p>
                We strive to provide accurate product descriptions, images, and information. However, we do not warrant that product descriptions 
                or other content is error-free. Images are for reference only and actual products may vary slightly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Intellectual Property</h2>
              <p>
                All content on our website, including text, graphics, logos, images, and software, is the property of Fresh Mart or its content 
                suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. User Conduct</h2>
              <p className="mb-2">You agree not to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Use our services for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of our website</li>
                <li>Submit false or misleading information</li>
                <li>Harass or harm other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Fresh Mart shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of or inability to use our services. Our total liability shall not exceed the amount 
                you paid for the specific product or service giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Indemnification</h2>
              <p>
                You agree to indemnify and hold Fresh Mart harmless from any claims, losses, damages, liabilities, and expenses arising from 
                your use of our services or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">11. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. 
                Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">12. Governing Law</h2>
              <p>
                These Terms and Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction 
                of the courts located in [Your City], India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">13. Contact Information</h2>
              <p className="mb-2">For questions about these Terms and Conditions, please contact us:</p>
              <ul className="list-none ml-4 space-y-1">
                <li><strong>Email:</strong> support@freshmart.com</li>
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
