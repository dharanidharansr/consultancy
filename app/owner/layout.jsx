'use client'
import React from 'react'
import { useAppContext } from '@/context/AppContext'
import Loading from '@/components/Loading'
import OwnerLayout from '@/components/OwnerLayout'

const Layout = ({ children }) => {
  const { user, isSeller, isAdmin, userData } = useAppContext();

  // Still loading user data
  if (user === undefined || (user && !userData)) {
    return <Loading />;
  }

  // Not signed in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-medium mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-4">Please sign in to access the owner dashboard.</p>
          <a href="/sign-in" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 font-medium">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  // Signed in but not admin or seller
  if (!isAdmin && !isSeller) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-5xl mb-4">🚫</div>
          <h2 className="text-xl font-medium mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don&apos;t have permission to access the owner dashboard.</p>
          <a href="/" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 font-medium">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return <OwnerLayout>{children}</OwnerLayout>;
}

export default Layout
