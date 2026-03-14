'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const OrderPlaced = () => {
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      router.push('/')
    }
  }, [countdown, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full text-center">

        {/* Animated checkmark circle */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-12 w-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for your purchase. Your order has been confirmed and is being prepared.
        </p>

        {/* Countdown ring */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-orange-500">
          <span className="text-xl font-bold text-orange-600">{countdown}</span>
        </div>
        <p className="text-sm text-gray-400">
          Redirecting to home in <span className="font-semibold text-orange-600">{countdown}</span> second{countdown !== 1 ? 's' : ''}...
        </p>

        <button
          onClick={() => router.push('/')}
          className="mt-8 w-full rounded-xl bg-orange-600 py-3 text-white font-semibold hover:bg-orange-700 transition"
        >
          Go to Home Now
        </button>
      </div>
    </div>
  )
}

export default OrderPlaced
