'use client'
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import Footer from "@/components/Footer";
import SEOMetadata from "@/components/SEOMetadata";

const Cart = () => {
  const {
    products,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    loadingStates,
  } = useAppContext();

  return (
    <>
      <Navbar />
      <SEOMetadata
        title="Shopping Cart | Glossary Mart"
        description="View and manage the items in your shopping cart at Glossary Mart. Proceed to checkout, update quantities, or continue shopping."
        keywords="shopping cart, checkout, groceries, order summary"
        url="/cart"
      />
      <div className="flex flex-col lg:flex-row gap-6 md:gap-10 px-4 sm:px-6 md:px-16 lg:px-32 pt-20 md:pt-24 mb-16 md:mb-20">
        <div className="flex-1 w-full overflow-x-auto">
          <LoadingOverlay isLoading={loadingStates.cart}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 border-b border-gray-500/30 pb-4 sm:pb-6 gap-3">
              <p className="text-2xl md:text-3xl text-gray-500">
                Your <span className="font-medium text-orange-600">Cart</span>
              </p>
              <p className="text-lg md:text-xl text-gray-500/80">{getCartCount()} Items</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="text-left">
                  <tr>
                    <th className="text-nowrap pb-6 md:px-4 px-1 text-gray-600 font-medium">
                      Product Details
                    </th>
                    <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                      Price
                    </th>
                    <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                      Quantity
                    </th>
                    <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(cartItems).map((itemKey) => {
                    const keyParts = itemKey.split('_');
                    const productId = keyParts[0];
                    const color = keyParts[1] || null;
                    const size = keyParts[2] || null;
                    const product = products.find(product => product._id === productId);
                    if (!product || cartItems[itemKey] <= 0) return null;
                    return (
                      <tr key={itemKey}>
                        <td className="flex items-center gap-4 py-4 md:px-4 px-1">
                          <div>
                            <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2">
                              {product.image?.[0] ? (
                                <Image
                                  src={product.image[0]}
                                  alt={product.name}
                                  className="w-16 h-auto object-cover mix-blend-multiply"
                                  width={1280}
                                  height={720}
                                />
                              ) : (
                                <div className="w-16 h-16 flex items-center justify-center text-gray-400 text-xs">
                                  No Image
                                </div>
                              )}
                            </div>
                            <button
                              className="md:hidden text-xs text-orange-600 mt-1"
                              onClick={() => updateCartQuantity(itemKey, 0)}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="text-sm hidden md:block">
                            <p className="text-gray-800">{product.name}</p>
                            {color && (
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500">Variant:</span>
                                <span className="text-xs text-gray-600 ml-1">{color}</span>
                              </div>
                            )}
                            {size && (
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500">Pack:</span>
                                <span className="text-xs text-gray-600">{size}</span>
                              </div>
                            )}
                            <button
                              className="text-xs text-orange-600 mt-1"
                              onClick={() => updateCartQuantity(itemKey, 0)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                        <td className="py-4 md:px-4 px-1 text-gray-600">₹{product.offerPrice}</td>
                        <td className="py-4 md:px-4 px-1">
                          <div className="flex items-center md:gap-2 gap-1">
                            <button onClick={() => updateCartQuantity(itemKey, cartItems[itemKey] - 1)}>
                              <Image
                                src={assets.decrease_arrow}
                                alt="decrease_arrow"
                                className="w-4 h-4"
                              />
                            </button>
                            <input onChange={e => updateCartQuantity(itemKey, Number(e.target.value))} type="number" value={cartItems[itemKey]} className="w-8 border text-center appearance-none" />
                            <button onClick={() => addToCart(productId, { color, size })}>
                              <Image
                                src={assets.increase_arrow}
                                alt="increase_arrow"
                                className="w-4 h-4"
                              />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 md:px-4 px-1 text-gray-600">₹{(product.offerPrice * cartItems[itemKey]).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button onClick={() => router.push('/all-products')} className="group flex items-center mt-6 gap-2 text-orange-600">
              <Image
                className="group-hover:-translate-x-1 transition"
                src={assets.arrow_right_icon_colored}
                alt="arrow_right_icon_colored"
              />
              Continue Shopping
            </button>
          </LoadingOverlay>
        </div>
        <OrderSummary />
      </div>
      <Footer />
    </>
  );
};

export default Cart;
