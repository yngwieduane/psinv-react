"use client";

import React from 'react';

export default function OfflinePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#bfa75d' }}>You are offline</h1>
            <p className="text-lg opacity-80 mb-8 max-w-md">
                It looks like you've lost your internet connection. Some features may not be available until you reconnect.
            </p>
            <button
                className="px-6 py-3 rounded-md font-semibold"
                style={{ backgroundColor: '#bfa75d', color: '#1a1a1a' }}
                onClick={() => window.location.reload()}
            >
                Try Again
            </button>
        </div>
    );
}
