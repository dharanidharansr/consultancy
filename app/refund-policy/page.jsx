import React from 'react';
import SEOMetadata from '@/components/SEOMetadata';

export default function RefundPolicy() {
  return (
    <>
      <SEOMetadata
        title="Refund & Cancellation Policy - Fresh Mart"
        description="Learn about Fresh Mart's refund and cancellation policies for orders and payment disputes."
        canonical="/refund-policy"
      />

      <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Refund & Cancellation Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: February 26, 2026</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Order Cancellation</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">1.1 Customer-Initiated Cancellation</h3>
              <p className="mb-3">You can cancel your order under the following conditions:</p>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <p className="font-semibold text-blue-800 mb-2">Before Order Processing:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-blue-900">
                  <li>Full refund if cancelled within 1 hour of placing the order</li>
                  <li>Cancellation can be done directly from "My Orders" page</li>
                  <li>Refund will be processed within 7-10 business days</li>
                </ul>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4">
                <p className="font-semibold text-orange-800 mb-2">After Order Processing:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-orange-900">
                  <li>Cancellation may not be possible once the order is out for delivery</li>
                  <li>Contact customer support immediately at +91 1234567890</li>
                  <li>Subject to cancellation charges depending on order status</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">1.2 Fresh Mart-Initiated Cancellation</h3>
              <p className="mb-2">We reserve the right to cancel orders in case of:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Product unavailability or stock issues</li>
                <li>Pricing errors or system glitches</li>
                <li>Delivery area restrictions</li>
                <li>Suspected fraudulent activity</li>
                <li>Force majeure events</li>
              </ul>
              <p className="mt-3 font-semibold">In such cases, full refund will be initiated automatically.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Refund Policy</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1 Refund Eligibility</h3>
              <p className="mb-2">Refunds are applicable in the following scenarios:</p>
              
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-gray-900">✓ Damaged or Defective Products</p>
                  <p className="text-sm">Report within 24 hours of delivery with photo evidence</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-gray-900">✓ Wrong Items Delivered</p>
                  <p className="text-sm">Full refund or replacement guaranteed</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-gray-900">✓ Quality Issues with Perishables</p>
                  <p className="text-sm">Report within 24 hours with supporting evidence</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-gray-900">✓ Order Cancellation (Before Processing)</p>
                  <p className="text-sm">100% refund within stipulated time</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-gray-900">✓ Non-Delivery of Order</p>
                  <p className="text-sm">Full refund if order is not delivered within promised timeframe</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2.2 Non-Refundable Items</h3>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="font-semibold text-red-800 mb-2">❌ Refunds will NOT be provided for:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-red-900">
                  <li>Perishable items after 24 hours of delivery</li>
                  <li>Products with tampered or damaged packaging (by customer)</li>
                  <li>Personal care items that have been opened or used</li>
                  <li>Items marked as "non-returnable" on product page</li>
                  <li>Change of mind after delivery</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Refund Processing</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.1 Refund Timeline</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 font-bold">1</span>
                    <div>
                      <p className="font-semibold">Request Submission: Day 0</p>
                      <p className="text-sm text-gray-600">Submit refund request through "My Orders" or contact support</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 font-bold">2</span>
                    <div>
                      <p className="font-semibold">Review & Approval: 1-2 Business Days</p>
                      <p className="text-sm text-gray-600">Our team reviews your request and supporting documents</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 font-bold">3</span>
                    <div>
                      <p className="font-semibold">Refund Initiation: Upon Approval</p>
                      <p className="text-sm text-gray-600">Refund is initiated to your original payment method</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 font-bold">4</span>
                    <div>
                      <p className="font-semibold">Credit to Account: 7-10 Business Days</p>
                      <p className="text-sm text-gray-600">Time varies based on payment method and bank processing</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3.2 Refund Methods</h3>
              <p className="mb-3">Refunds are processed through the original payment method:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Credit/Debit Card:</strong> 7-10 business days</li>
                <li><strong>UPI:</strong> 5-7 business days</li>
                <li><strong>Net Banking:</strong> 7-10 business days</li>
                <li><strong>Digital Wallets:</strong> 3-5 business days</li>
                <li><strong>Cash on Delivery (COD):</strong> Bank transfer to your registered account (10-15 business days)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Razorpay Payment Gateway</h2>
              <p className="mb-3">
                All payments are processed securely through Razorpay. In case of payment failures or duplicate charges:
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Payment Failure:</h4>
                <ul className="list-disc list-inside ml-4 space-y-1 text-blue-800">
                  <li>If money was deducted but order wasn't created, refund is automatic within 5-7 business days</li>
                  <li>Check your bank statement before contacting support</li>
                </ul>
                
                <h4 className="font-semibold text-blue-900 mt-4 mb-2">Duplicate Charges:</h4>
                <ul className="list-disc list-inside ml-4 space-y-1 text-blue-800">
                  <li>Contact us immediately with transaction details</li>
                  <li>Refund will be processed after verification</li>
                </ul>
              </div>

              <p className="mt-4">
                For Razorpay-specific issues, you can also contact Razorpay support: {' '}
                <a href="https://razorpay.com/support/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 underline">
                  razorpay.com/support
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. How to Request a Refund</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="font-semibold text-gray-900 mb-4">Follow these simple steps:</p>
                
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">Step 1:</span>
                    <span>Log in to your Fresh Mart account</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">Step 2:</span>
                    <span>Go to "My Orders" section</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">Step 3:</span>
                    <span>Select the order you want to return/refund</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">Step 4:</span>
                    <span>Click "Request Refund" or "Return Order"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">Step 5:</span>
                    <span>Provide reason and upload photos (if applicable)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">Step 6:</span>
                    <span>Submit request and track status in "My Orders"</span>
                  </li>
                </ol>
                
                <p className="mt-4 text-sm text-gray-600">
                  Alternatively, contact customer support at <strong>support@freshmart.com</strong> or call <strong>+91 1234567890</strong>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Partial Refunds</h2>
              <p>
                In certain situations, partial refunds may be approved:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                <li>Items with minor defects or damage</li>
                <li>Partial quantity issues in multi-item orders</li>
                <li>Late delivery compensation</li>
                <li>Quality issues affecting only part of the order</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Store Credit</h2>
              <p>
                In some cases, we may offer store credit instead of a monetary refund. Store credit:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                <li>Has no expiration date</li>
                <li>Can be used for future purchases</li>
                <li>Is non-transferable</li>
                <li>Cannot be redeemed for cash</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Contact Us</h2>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <p className="font-semibold text-gray-900 mb-3">For refund and cancellation queries:</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <strong>Email:</strong> refunds@freshmart.com
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <strong>Phone:</strong> +91 1234567890 (Mon-Sat, 9 AM - 6 PM)
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <strong>WhatsApp:</strong> +91 1234567890
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
