'use client';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OwnerDashboard = () => {
    const { getToken, user } = useAppContext();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalProducts: 0,
        totalContacts: 0,
        recentOrders: [],
        ordersByStatus: {},
        period: 'all',
        startDate: null,
        endDate: null,
    });

    const fetchOwnerStats = useCallback(async ({
        period = selectedPeriod,
        startDate = customStartDate,
        endDate = customEndDate,
    } = {}) => {
        try {
            setLoading(true);
            const token = await getToken();

            const params = { period };
            if (period === 'custom') {
                if (!startDate || !endDate) {
                    toast.error('Please select both start and end dates');
                    setLoading(false);
                    return;
                }
                params.startDate = startDate;
                params.endDate = endDate;
            }

            const response = await axios.get('/api/admin/stats', {
                params,
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setStats(response.data.data);
            } else {
                toast.error(response.data.message || 'Failed to fetch stats');
            }
        } catch (error) {
            console.error('Error fetching owner stats:', error);
            toast.error('Failed to load owner dashboard');
        } finally {
            setLoading(false);
        }
    }, [getToken, selectedPeriod, customStartDate, customEndDate]);

    useEffect(() => {
        if (user && selectedPeriod !== 'custom') {
            fetchOwnerStats({ period: selectedPeriod });
        }
    }, [user, fetchOwnerStats, selectedPeriod]);

    useEffect(() => {
        if (
            user &&
            selectedPeriod === 'custom' &&
            customStartDate &&
            customEndDate
        ) {
            fetchOwnerStats({
                period: 'custom',
                startDate: customStartDate,
                endDate: customEndDate,
            });
        }
    }, [
        user,
        selectedPeriod,
        customStartDate,
        customEndDate,
        fetchOwnerStats,
    ]);

    const periodOptions = [
        { value: 'all', label: 'All Time' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'custom', label: 'Custom' },
    ];

    const periodLabel = stats.period === 'weekly'
        ? 'Last 7 Days'
        : stats.period === 'monthly'
            ? 'Last 30 Days'
            : stats.period === 'custom' && stats.startDate && stats.endDate
                ? `${new Date(stats.startDate).toLocaleDateString()} - ${new Date(stats.endDate).toLocaleDateString()}`
            : 'All Time';

    const StatCard = ({ label, value, icon, color = 'blue' }) => {
        const colorClasses = {
            blue: 'bg-blue-50 border-blue-200',
            green: 'bg-green-50 border-green-200',
            purple: 'bg-purple-50 border-purple-200',
            orange: 'bg-orange-50 border-orange-200',
            red: 'bg-red-50 border-red-200',
        };

        return (
            <div className={`${colorClasses[color]} border rounded-lg p-6`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm font-medium">{label}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                    </div>
                    <div className="text-3xl opacity-20">{icon}</div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 w-full bg-gray-50 min-h-screen pt-6 md:pt-8">
            <div className="mb-6 md:mb-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-2">
                    <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
                        aria-label="Go back"
                    >
                        ←
                    </button>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Glossary Mart Dashboard</h1>
                    </div>
                    <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
                        {periodOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setSelectedPeriod(option.value)}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${selectedPeriod === option.value
                                    ? 'bg-orange-500 text-white shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedPeriod === 'custom' && (
                    <div className="flex flex-col sm:flex-row sm:items-end gap-3 mt-3 bg-white border border-gray-200 rounded-xl p-3">
                        <div className="flex flex-col">
                            <label htmlFor="custom-start-date" className="text-xs font-medium text-gray-600 mb-1">Start Date</label>
                            <input
                                id="custom-start-date"
                                type="date"
                                value={customStartDate}
                                onChange={(e) => setCustomStartDate(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="custom-end-date" className="text-xs font-medium text-gray-600 mb-1">End Date</label>
                            <input
                                id="custom-end-date"
                                type="date"
                                value={customEndDate}
                                min={customStartDate || undefined}
                                onChange={(e) => setCustomEndDate(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>
                        <button
                            onClick={() => fetchOwnerStats({
                                period: 'custom',
                                startDate: customStartDate,
                                endDate: customEndDate,
                            })}
                            className="h-10 px-4 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600"
                        >
                            Apply
                        </button>
                    </div>
                )}

                <p className="text-gray-600 mt-2">Welcome back, {user?.name || 'Partner'} · Showing {periodLabel}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard label={selectedPeriod === 'all' ? 'Total Customers' : 'Active Customers'} value={stats.totalUsers} icon="👥" color="blue" />
                <StatCard label={selectedPeriod === 'all' ? 'Orders' : `${periodLabel} Orders`} value={stats.totalOrders} icon="📦" color="green" />
                <StatCard label={selectedPeriod === 'all' ? 'Revenue' : `${periodLabel} Revenue`} value={`₹${stats.totalRevenue.toLocaleString()}`} icon="💰" color="orange" />
                <StatCard label={selectedPeriod === 'all' ? 'Products' : `${periodLabel} Products`} value={stats.totalProducts} icon="🛍️" color="blue" />
                <StatCard label={selectedPeriod === 'all' ? 'Messages' : `${periodLabel} Messages`} value={stats.totalContacts} icon="💬" color="red" />
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <Link href="/owner/customers">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer text-center">
                            <div className="text-2xl mb-2">👥</div>
                            <p className="text-sm font-medium text-gray-900">Customers</p>
                        </div>
                    </Link>
                    <Link href="/owner/orders">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer text-center">
                            <div className="text-2xl mb-2">📦</div>
                            <p className="text-sm font-medium text-gray-900">Orders</p>
                        </div>
                    </Link>
                    <Link href="/owner/add-product">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer text-center">
                            <div className="text-2xl mb-2">➕</div>
                            <p className="text-sm font-medium text-gray-900">Add Product</p>
                        </div>
                    </Link>
                    <Link href="/owner/inventory">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer text-center">
                            <div className="text-2xl mb-2">📦</div>
                            <p className="text-sm font-medium text-gray-900">Inventory</p>
                        </div>
                    </Link>
                    <button
                        onClick={() => fetchOwnerStats({
                            period: selectedPeriod,
                            startDate: customStartDate,
                            endDate: customEndDate,
                        })}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer text-center"
                    >
                        <div className="text-2xl mb-2">🔄</div>
                        <p className="text-sm font-medium text-gray-900">Refresh</p>
                    </button>
                </div>
            </div>

            {Object.keys(stats.ordersByStatus).length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Orders by Status</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(stats.ordersByStatus).map(([status, count]) => (
                            <div key={status} className="bg-white border border-gray-200 rounded-lg p-4">
                                <p className="text-gray-600 text-sm font-medium capitalize">{status}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-2">{count}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {stats.recentOrders && stats.recentOrders.length > 0 && (
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                        <Link href="/owner/orders" className="text-orange-600 hover:text-orange-700 font-medium">
                            View All →
                        </Link>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {stats.recentOrders.slice(0, 5).map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                                {order._id.slice(-8).toUpperCase()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {order.userId || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                                ₹{order.amount?.toLocaleString() || 0}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                        'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {order.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {order.date ? new Date(order.date * 1000).toLocaleDateString() : '—'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OwnerDashboard;
