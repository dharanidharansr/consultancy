"use client";
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import toast from 'react-hot-toast';

const UnifiedNotificationIcon = () => {
    const { user, router } = useAppContext();

    const handleClick = () => {
        if (!user) {
            toast.error('Please sign in to view notifications');
            return;
        }
        router.push('/notifications');
    };

    return (
        <div onClick={handleClick} className="relative cursor-pointer">
            <div className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Image
                    src={assets.notification_icon}
                    alt="Notifications"
                    width={20}
                    height={20}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                />
            </div>
        </div>
    );
};

export default UnifiedNotificationIcon;