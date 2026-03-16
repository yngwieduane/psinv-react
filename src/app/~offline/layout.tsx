import React from 'react';

export default function OfflineLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body style={{ backgroundColor: '#1a1a1a', margin: 0 }}>
                {children}
            </body>
        </html>
    );
}
