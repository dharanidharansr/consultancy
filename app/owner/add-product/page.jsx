'use client'
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Image from 'next/image';

const AddProduct = () => {
    const { user, getToken } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        offerPrice: '',
        category: '',
        genderCategory: 'Veg',
        brand: '',
        inventory: [],
        stockSettings: {
            trackInventory: true,
            allowBackorders: false,
            globalLowStockThreshold: 10
        }
    });

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const categories = ['Fruits & Vegetables', 'Dairy & Bakery', 'Staples', 'Snacks & Branded Foods', 'Beverages', 'Personal Care', 'Home Care'];
    
    // Category-specific pack sizes
    const categoryPackSizes = {
        'Fruits & Vegetables': ['Unit', '250g', '500g', '1kg', '2kg', '5kg'],
        'Dairy & Bakery': ['Unit', 'Pack', '250ml', '500ml', '1L', 'Dozen'],
        'Staples': ['Unit'],
        'Snacks & Branded Foods': ['Unit', 'Pack', '100g', '200g', '500g', '1kg'],
        'Beverages': ['250ml', '500ml', '750ml', '1L', '2L', 'Pack'],
        'Personal Care': ['Unit'],
        'Home Care': ['Unit']
    };

    // Get pack sizes based on selected category
    const getAvailableSizes = () => {
        return categoryPackSizes[productData.category] || ['Unit', 'Pack', '500g', '1kg', 'Bundle', 'Box'];
    };

    const addVariant = () => {
        const currentSizes = getAvailableSizes();
        setProductData(prev => ({
            ...prev,
            inventory: [...prev.inventory, {
                variant: {
                    name: '',
                    code: '#000000',
                    image: ''
                },
                packStock: currentSizes.map(size => ({
                    packSize: size,
                    quantity: 0,
                    lowStockThreshold: 5
                }))
            }]
        }));
    };

    const updateVariant = (variantIndex, field, value) => {
        setProductData(prev => {
            const newInventory = [...prev.inventory];
            newInventory[variantIndex].variant[field] = value;
            return { ...prev, inventory: newInventory };
        });
    };
    const updatePackStock = (variantIndex, packIndex, field, value) => {
        setProductData(prev => {
            const newInventory = [...prev.inventory];
            newInventory[variantIndex].packStock[packIndex][field] = parseInt(value) || 0;
            return { ...prev, inventory: newInventory };
        });
    };

    // Update inventory when category changes
    const handleCategoryChange = (newCategory) => {
        const newSizes = categoryPackSizes[newCategory] || ['Unit', 'Pack', '500g', '1kg', 'Bundle', 'Box'];
        
        setProductData(prev => {
            // Update category
            const updated = { ...prev, category: newCategory };
            
            // Update existing variants with new pack sizes
            if (updated.inventory.length > 0) {
                updated.inventory = updated.inventory.map(variant => ({
                    ...variant,
                    packStock: newSizes.map(size => {
                        // Try to preserve existing quantity for matching sizes
                        const existingPack = variant.packStock.find(p => p.packSize === size);
                        return {
                            packSize: size,
                            quantity: existingPack?.quantity || 0,
                            lowStockThreshold: existingPack?.lowStockThreshold || 5
                        };
                    })
                }));
            }
            
            return updated;
        });
    };

    const removeVariant = (variantIndex) => {
        setProductData(prev => ({
            ...prev,
            inventory: prev.inventory.filter((_, index) => index !== variantIndex)
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        setImages(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const removeImage = (indexToRemove) => {
        const newImages = images.filter((_, index) => index !== indexToRemove);
        const newPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);
        URL.revokeObjectURL(imagePreviews[indexToRemove]);
        setImages(newImages);
        setImagePreviews(newPreviews);
    };

    const calculateTotalStock = () => {
        return productData.inventory.reduce((total, variantData) => {
            return total + variantData.packStock.reduce((variantTotal, packData) => {
                return variantTotal + packData.quantity;
            }, 0);
        }, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('Please sign in to add products');
            return;
        }

        if (productData.inventory.length === 0) {
            toast.error('Please add at least one variant');
            return;
        }

        for (let i = 0; i < productData.inventory.length; i++) {
            const variant = productData.inventory[i];

            const variantName = variant.variant.name?.trim();
            if (!variantName) {
                toast.error(`Variant name is required for item ${i + 1}`);
                return;
            }

            if (variantName.startsWith('#')) {
                toast.error(`Please enter a variant name for item ${i + 1}`);
                return;
            }

            const hasStock = variant.packStock.some(pack => pack.quantity > 0);
            if (!hasStock) {
                toast.error(`At least one pack size must have stock for ${variant.variant.name}`);
                return;
            }
        }

        if (images.length === 0) {
            toast.error('Please add at least one product image');
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();

            Object.keys(productData).forEach(key => {
                if (key !== 'inventory' && key !== 'stockSettings') {
                    formData.append(key, productData[key]);
                }
            });

            formData.append('inventory', JSON.stringify(productData.inventory));
            formData.append('stockSettings', JSON.stringify(productData.stockSettings));
            formData.append('totalStock', calculateTotalStock());

            images.forEach((image, index) => {
                formData.append(`image${index}`, image);
            });
            formData.append('imageCount', images.length);

            const token = await getToken();
            const response = await axios.post('/api/admin/products/add', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success('Product added successfully!');
                setProductData({
                    name: '',
                    description: '',
                    price: '',
                    offerPrice: '',
                    category: '',
                    genderCategory: 'Veg',
                    brand: '',
                    inventory: [],
                    stockSettings: {
                        trackInventory: true,
                        allowBackorders: false,
                        globalLowStockThreshold: 10
                    }
                });
                setImages([]);
                setImagePreviews([]);
            } else {
                toast.error(response.data.message || 'Failed to add product');
            }

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data?.message || 'Server error occurred');
            } else if (error.request) {
                toast.error('Network error - please check your connection');
            } else {
                toast.error('Failed to add product');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="w-full flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Access Denied</h2>
                    <p className="text-gray-500">Please sign in to add products.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full p-4 md:p-8 bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 transition-colors">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8">Add New Product</h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    value={productData.name}
                                    onChange={(e) => setProductData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Brand *
                                </label>
                                <input
                                    type="text"
                                    value={productData.brand}
                                    onChange={(e) => setProductData(prev => ({ ...prev, brand: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    value={productData.category}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                {productData.category && (
                                    <p className="mt-1 text-xs text-gray-500">
                                        Pack sizes: {getAvailableSizes().join(', ')}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Brand *
                                </label>
                                <input
                                    type="text"
                                    value={productData.brand}
                                    onChange={(e) => setProductData(prev => ({ ...prev, brand: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Type
                                </label>
                                <select
                                    value={productData.genderCategory}
                                    onChange={(e) => setProductData(prev => ({ ...prev, genderCategory: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="Veg">Veg</option>
                                    <option value="Non-Veg">Non-Veg</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Egg">Egg</option>
                                    <option value="N/A">N/A</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Original Price *
                                </label>
                                <input
                                    type="number"
                                    value={productData.price}
                                    onChange={(e) => setProductData(prev => ({ ...prev, price: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Offer Price *
                                </label>
                                <input
                                    type="number"
                                    value={productData.offerPrice}
                                    onChange={(e) => setProductData(prev => ({ ...prev, offerPrice: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                value={productData.description}
                                onChange={(e) => setProductData(prev => ({ ...prev, description: e.target.value }))}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Images *
                            </label>
                            <input
                                type="file"
                                multiple={true}
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />

                            {imagePreviews.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <Image
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                width={200}
                                                height={200}
                                                className="w-full h-32 object-cover rounded-md border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                ×
                                            </button>
                                            <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                                {index + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-2 text-sm text-gray-500">
                                <p>• Select multiple images by holding Ctrl/Cmd while clicking</p>
                                <p>• Supported formats: JPG, PNG, GIF (Max 5MB each)</p>
                                <p>• Recommended: 800x800px or higher resolution</p>
                            </div>
                        </div>

                        <div className="border-t pt-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800">Inventory Management</h2>
                                <div className="text-sm text-gray-600">
                                    Total Stock: <span className="font-semibold text-orange-600">{calculateTotalStock()}</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {productData.inventory.map((variantData, variantIndex) => (
                                    <VariantInventoryCard
                                        key={variantIndex}
                                        variantData={variantData}
                                        variantIndex={variantIndex}
                                        availableSizes={getAvailableSizes()}
                                        onUpdateVariant={updateVariant}
                                        onUpdatePackStock={updatePackStock}
                                        onRemoveVariant={removeVariant}
                                        categoryName={productData.category}
                                    />
                                ))}

                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-orange-400 hover:text-orange-500 transition-colors flex items-center justify-center gap-2"
                                >
                                    <span className="text-xl">+</span>
                                    Add Variant
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? 'Adding Product...' : 'Add Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const VariantInventoryCard = ({
    variantData,
    variantIndex,
    availableSizes,
    onUpdateVariant,
    onUpdatePackStock,
    onRemoveVariant,
    categoryName
}) => {
    const calculateVariantTotal = () => {
        return variantData.packStock.reduce((total, pack) => total + pack.quantity, 0);
    };

    return (
        <div className="bg-gray-50 rounded-lg p-6 border">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                    <div
                        className="w-12 h-12 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: variantData.variant.code }}
                    ></div>
                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-600">Variant Name</label>
                        <input
                            type="text"
                            placeholder="Variant name (e.g., Spicy, Standard)"
                            value={variantData.variant.name}
                            onChange={(e) => onUpdateVariant(variantIndex, 'name', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <label className="block text-xs font-medium text-gray-600">Dispaly Color</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={variantData.variant.code}
                                onChange={(e) => onUpdateVariant(variantIndex, 'code', e.target.value)}
                                className="w-16 h-9 border border-gray-300 rounded cursor-pointer"
                                aria-label="Pick color"
                            />
                            <input
                                type="text"
                                value={variantData.variant.code}
                                onChange={(e) => onUpdateVariant(variantIndex, 'code', e.target.value)}
                                className="w-28 px-2 py-2 border border-gray-300 rounded-md text-xs font-mono uppercase"
                                placeholder="#000000"
                                maxLength={7}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                        Variant Total: <span className="font-semibold text-blue-600">{calculateVariantTotal()}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => onRemoveVariant(variantIndex)}
                        className="text-red-500 hover:text-red-700 text-sm"
                    >
                        Remove
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {availableSizes.map((size, packIndex) => {
                    const packData = variantData.packStock[packIndex];
                    const isLowStock = packData.quantity <= packData.lowStockThreshold;

                    return (
                        <div key={size} className="bg-white rounded-lg p-3 border hover:border-orange-200 transition-colors">
                            <div className="text-center font-medium text-gray-700 mb-2 text-sm">{size}</div>
                            <div className="space-y-2">
                                <div>
                                    <input
                                        type="number"
                                        value={packData.quantity}
                                        placeholder="Qty"
                                        onChange={(e) => onUpdatePackStock(variantIndex, packIndex, 'quantity', e.target.value)}
                                        className={`w-full px-2 py-1.5 border rounded text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 ${isLowStock && packData.quantity > 0 ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
                                            }`}
                                        min="0"
                                    />
                                </div>
                                {packData.quantity > 0 && (
                                    <div className="text-xs text-green-600 text-center font-medium">In Stock</div>
                                )}
                                {packData.quantity === 0 && (
                                    <div className="text-xs text-gray-400 text-center">Out of Stock</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AddProduct;
