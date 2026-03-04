"use client"
import { useEffect, useState, useCallback } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import SEOMetadata from "@/components/SEOMetadata";
import ProductReviews from "@/components/ProductReviews";
import RecentlyViewed from "@/components/RecentlyViewed";
import { addToRecentlyViewed } from "@/lib/recentlyViewed";
import ShareButton from "@/components/ShareButton";
import React from "react";
import toast from "react-hot-toast";

const Product = () => {

    const { id } = useParams();
    const { products, router, addToCart, user, favorites, addFavorite, removeFavorite } = useAppContext();

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedPackSize, setSelectedPackSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showFullDescription, setShowFullDescription] = useState(false);

    // ── Inventory helpers ──────────────────────────────────────────────────────

    const getVariants = (prod) => {
        if (!prod || !Array.isArray(prod.inventory) || prod.inventory.length === 0) return [];
        return prod.inventory
            .map(item => ({
                name: item.variant?.name || item.variant?.code || '',
                totalStock: Array.isArray(item.packStock)
                    ? item.packStock.reduce((s, ps) => s + (ps.quantity || 0), 0)
                    : 0
            }))
            .filter(v => v.name);
    };

    const getPackSizes = (prod, variantName) => {
        if (!prod || !variantName || !Array.isArray(prod.inventory)) return [];
        const invItem = prod.inventory.find(
            item => item.variant?.name === variantName || item.variant?.code === variantName
        );
        if (!invItem || !Array.isArray(invItem.packStock)) return [];
        return invItem.packStock.map(ps => ({ packSize: ps.packSize, quantity: ps.quantity || 0 }));
    };

    const getSpecificStock = (prod, variantName, packSizeName) => {
        if (!prod || !variantName || !packSizeName || !Array.isArray(prod.inventory)) return 0;
        const invItem = prod.inventory.find(
            item => item.variant?.name === variantName || item.variant?.code === variantName
        );
        if (!invItem || !Array.isArray(invItem.packStock)) return 0;
        const ps = invItem.packStock.find(p => p.packSize === packSizeName);
        return ps ? (ps.quantity || 0) : 0;
    };

    const getTotalStock = (prod) => {
        if (!prod) return 0;
        if (prod.totalStock !== undefined) return prod.totalStock;
        if (Array.isArray(prod.inventory) && prod.inventory.length > 0) {
            return prod.inventory.reduce((total, item) =>
                total + (Array.isArray(item.packStock)
                    ? item.packStock.reduce((s, ps) => s + (ps.quantity || 0), 0)
                    : 0), 0);
        }
        return prod.stock || 0;
    };

    // ── Fetch product ──────────────────────────────────────────────────────────

    const fetchProductData = useCallback(() => {
        if (!Array.isArray(products)) return;
        const product = products.find(p => p?._id === id);
        if (!product) return;
        setProductData(product);
        setSelectedVariant(null);
        setSelectedPackSize(null);
        setQuantity(1);
        const variants = getVariants(product);
        if (variants.length > 0) {
            const first = variants.find(v => v.totalStock > 0) || variants[0];
            setSelectedVariant(first.name);
        }
    }, [products, id]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchProductData();
        if (id) addToRecentlyViewed(id);
    }, [id, fetchProductData]);

    // ── Derived state ──────────────────────────────────────────────────────────

    const variants = productData ? getVariants(productData) : [];
    const packSizes = productData ? getPackSizes(productData, selectedVariant) : [];
    const selectedStock = productData ? getSpecificStock(productData, selectedVariant, selectedPackSize) : 0;
    const totalStock = productData ? getTotalStock(productData) : 0;
    const hasVariants = variants.length > 0;
    const canAddToCart = hasVariants
        ? (selectedVariant && selectedPackSize && selectedStock > 0)
        : totalStock > 0;

    const isFavorite = favorites?.includes(productData?._id);

    // ── Handlers ───────────────────────────────────────────────────────────────

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        if (!user) {
            toast.error('Please sign in to add favorites');
            setTimeout(() => router.push('/sign-in'), 1500);
            return;
        }
        if (isFavorite) removeFavorite(productData._id);
        else addFavorite(productData._id);
    };

    const handleAddToCart = () => {
        if (!canAddToCart) return;
        if (hasVariants) {
            addToCart(productData._id, { color: selectedVariant, size: selectedPackSize, quantity });
        } else {
            addToCart(productData._id, { quantity });
        }
    };

    // ── Render ─────────────────────────────────────────────────────────────────

    if (!productData) return <Loading />;

    return (
        <>
            <SEOMetadata
                title={`${productData.name} | Fresh Mart`}
                description={`${productData.description?.slice(0, 150)}... Buy fresh ${productData.category} at Rs.${productData.offerPrice}`}
                keywords={`${productData.name}, ${productData.brand}, ${productData.category}, grocery, fresh`}
                imageUrl={productData.image?.[0]}
                url={`/product/${id}`}
                product={{
                    name: productData.name,
                    description: productData.description,
                    image: productData.image?.[0],
                    brand: productData.brand,
                    category: productData.category,
                    _id: productData._id,
                    sku: productData.sku || productData._id,
                    offerPrice: productData.offerPrice,
                    new_price: productData.offerPrice,
                    price: productData.price,
                    stock: totalStock,
                    ratings: productData.ratings || []
                }}
            />
            <Navbar />

            <div className="px-4 sm:px-6 md:px-16 lg:px-32 pt-20 md:pt-24 space-y-8 md:space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16">

                    {/* Image panel */}
                    <div className="px-0 sm:px-2 lg:px-4 xl:px-6">
                        <div className="rounded-2xl md:rounded-lg overflow-hidden bg-gray-500/10 mb-4 relative aspect-[4/5]">
                            <button
                                type="button"
                                onClick={handleFavoriteClick}
                                className={`absolute top-3 right-3 z-20 h-10 w-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center ${isFavorite ? 'text-orange-600' : 'text-gray-700'}`}
                                aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
                            >
                                <Image className="h-4 w-4" src={assets.heart_icon} alt="heart"
                                    style={{ filter: isFavorite ? 'invert(32%) sepia(98%) saturate(749%) hue-rotate(359deg) brightness(97%) contrast(101%)' : 'none' }}
                                />
                            </button>
                            <div className="absolute top-3 left-2 z-10 md:hidden">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="h-10 w-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center"
                                    aria-label="Go back"
                                >
                                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            </div>
                            {totalStock > 0 && totalStock < 10 && (
                                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">Only few left</span>
                            )}
                            {(mainImage || productData.image?.[0]) ? (
                                <Image
                                    src={mainImage || productData.image[0]}
                                    alt={productData.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-contain mix-blend-multiply"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">No Image Available</div>
                            )}
                            {productData.image?.length > 1 && (
                                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-center gap-2">
                                    {productData.image.map((img, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setMainImage(img)}
                                            className={`h-12 w-12 rounded-lg overflow-hidden bg-white/90 shadow-sm border ${mainImage === img || (!mainImage && i === 0) ? 'border-orange-500' : 'border-transparent'}`}
                                            aria-label={`View image ${i + 1}`}
                                        >
                                            <Image src={img} alt={`view ${i + 1}`} className="object-cover w-full h-full" width={48} height={48} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details panel */}
                    <div className="flex flex-col bg-white md:bg-transparent rounded-t-3xl md:rounded-none mt-4 md:mt-0 p-4 sm:p-6 md:p-0 shadow md:shadow-none relative z-10">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                            <h1 className="text-2xl sm:text-3xl font-medium text-gray-800/90 flex-1">{productData.name}</h1>
                            <div className="hidden md:block">
                                <ShareButton product={productData} title={productData.name} description={productData.description} image={productData.image?.[0]} />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                {[...Array(4)].map((_, i) => <Image key={i} className="h-4 w-4" src={assets.star_icon} alt="star" />)}
                                <Image className="h-4 w-4" src={assets.star_dull_icon} alt="star" />
                            </div>
                            <p className="text-sm">(4.5)</p>
                        </div>

                        <div className="mt-2 sm:mt-3">
                            <p className={`text-gray-600 text-sm sm:text-base ${showFullDescription ? '' : 'max-h-16 overflow-hidden'}`}>
                                {productData.description}
                            </p>
                            {productData.description?.length > 140 && (
                                <button type="button" onClick={() => setShowFullDescription(p => !p)} className="mt-2 text-sm font-medium text-orange-600 hover:text-orange-700">
                                    {showFullDescription ? 'Show Less' : 'Read More'}
                                </button>
                            )}
                        </div>

                        <div className="flex items-end gap-3 mt-4 sm:mt-6">
                            <p className="text-2xl sm:text-3xl font-semibold text-gray-900">Rs.{productData.offerPrice}</p>
                            <span className="text-xs sm:text-base font-normal text-gray-500 line-through">Rs.{productData.price}</span>
                        </div>

                        <hr className="bg-gray-200 my-4 sm:my-6" />

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-gray-700">Brand</p>
                                <p className="text-sm text-gray-800/80">{productData.brand}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-gray-700">Category</p>
                                <p className="text-sm text-gray-800/80">{productData.category}</p>
                            </div>

                            {hasVariants && (
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-semibold text-gray-700">Variant</p>
                                        {selectedVariant && <span className="text-[11px] text-gray-500">Selected: {selectedVariant}</span>}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {variants.map((v, idx) => {
                                            const isDisabled = v.totalStock < 1;
                                            const isSelected = selectedVariant === v.name;
                                            return (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => {
                                                        if (!isDisabled) {
                                                            setSelectedVariant(v.name);
                                                            setSelectedPackSize(null);
                                                            setQuantity(1);
                                                        }
                                                    }}
                                                    disabled={isDisabled}
                                                    aria-pressed={isSelected}
                                                    title={isDisabled ? 'Out of stock' : `${v.totalStock} in stock`}
                                                    className={`min-h-[40px] px-3 py-1.5 rounded-full border text-xs font-medium transition focus:outline-none ${
                                                        isDisabled ? 'bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed border-gray-200'
                                                        : isSelected ? 'border-orange-500 ring-2 ring-orange-300 bg-white'
                                                        : 'border-gray-300 bg-white active:scale-[0.98]'
                                                    }`}
                                                >
                                                    {v.name}
                                                    {isDisabled && <span className="ml-1 text-xs">(Out)</span>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {hasVariants && (
                                <div className="space-y-1.5">
                                    <p className="text-xs font-semibold text-gray-700">Pack Size</p>
                                    {!selectedVariant && <p className="text-[11px] text-gray-400">Select a variant first</p>}
                                    <div className="flex flex-wrap gap-1.5">
                                        {packSizes.map((ps, idx) => {
                                            const isOutOfStock = ps.quantity <= 0;
                                            const isDisabled = !selectedVariant || isOutOfStock;
                                            const isSelected = selectedPackSize === ps.packSize;
                                            const isLowStock = ps.quantity > 0 && ps.quantity <= 5;
                                            return (
                                                <div key={idx} className="flex flex-col items-start">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (!isDisabled) {
                                                                setSelectedPackSize(ps.packSize);
                                                                setQuantity(1);
                                                            }
                                                        }}
                                                        disabled={isDisabled}
                                                        aria-pressed={isSelected}
                                                        className={`min-h-[40px] px-3.5 py-1.5 rounded-full border text-xs font-semibold transition focus:outline-none ${
                                                            isDisabled ? 'bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed border-gray-200'
                                                            : isSelected ? 'bg-green-600 text-white border-green-600'
                                                            : 'bg-white text-gray-700 border-gray-300 active:scale-[0.98]'
                                                        }`}
                                                    >
                                                        {ps.packSize}
                                                        {isOutOfStock && <span className="ml-1 text-red-400">X</span>}
                                                    </button>
                                                    {isLowStock && <span className="mt-1 text-[10px] text-red-600 font-medium">Only {ps.quantity} left</span>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold text-gray-700">Quantity</label>
                                    <span className="text-[11px] text-gray-500 font-medium">
                                        {hasVariants && selectedVariant && selectedPackSize
                                            ? `${selectedStock} available`
                                            : !hasVariants ? `${totalStock} available` : ''}
                                    </span>
                                </div>
                                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white w-fit">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        disabled={quantity <= 1}
                                        className="w-10 h-10 flex items-center justify-center active:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                        aria-label="Decrease quantity"
                                    >
                                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <div className="w-12 h-10 flex items-center justify-center border-x border-gray-300 bg-gray-50">
                                        <span className="text-sm font-semibold text-gray-900">{quantity}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const maxStock = hasVariants ? selectedStock : totalStock;
                                            if (maxStock > 0 && quantity < maxStock) setQuantity(q => q + 1);
                                        }}
                                        disabled={!canAddToCart || quantity >= (hasVariants ? selectedStock : totalStock)}
                                        className="w-10 h-10 flex items-center justify-center active:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                        aria-label="Increase quantity"
                                    >
                                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[11px] text-gray-600">
                                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5">
                                    <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Freshly Sourced
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5">
                                    <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Hygienically Packed
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5">
                                    <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Quality Checked
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-4 mt-8 sm:mt-10">
                            {totalStock <= 0 ? (
                                <div className="w-full py-3.5 text-center bg-gray-100 text-gray-500 rounded font-medium">
                                    Out of Stock
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={!canAddToCart}
                                        className={`w-full py-3.5 transition rounded ${
                                            canAddToCart ? 'bg-gray-100 text-gray-800/80 hover:bg-gray-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        {hasVariants && !selectedVariant ? 'Select Variant'
                                            : hasVariants && !selectedPackSize ? 'Select Pack Size'
                                            : 'Add to Cart'}
                                    </button>
                                    <button
                                        onClick={() => { handleAddToCart(); if (canAddToCart) router.push('/cart'); }}
                                        disabled={!canAddToCart}
                                        className={`w-full py-3.5 transition rounded ${
                                            canAddToCart ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-orange-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        Buy now
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-4 sm:px-6 md:px-16 lg:px-32 py-8 md:py-12">
                    <ProductReviews productId={id} />
                </div>

                <div className="px-4 sm:px-6 md:px-16 lg:px-32 py-8 md:py-12">
                    <RecentlyViewed currentProductId={id} />
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mb-4 mt-16">
                        <p className="text-3xl font-medium">Featured <span className="font-medium text-orange-600">Products</span></p>
                        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                        {products.slice(0, 5).map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                    <button
                        onClick={() => router.push('/all-products')}
                        className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
                    >
                        See more
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Product;
