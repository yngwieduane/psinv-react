// src/app/[locale]/conrad-abu-dhabi/page.tsx
'use client';

import React from 'react';

export default function ConradAbuDhabiPage() {
    return (
        <div className="w-full h-screen">
            <iframe
                src="https://registration.psinv.net/registration-mailer/conrad-hotel-new/"
                title="Conrad Abu Dhabi Registration"
                className="w-full h-full border-0"
                allow="camera; microphone; fullscreen"
                loading="lazy"
            />
        </div>
    );
}
