"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const url = searchParams.get("url") || "/";
  const email = searchParams.get("email");

  useEffect(() => {
    setTimeout(() => {
      router.push(url); // Redirect to original URL after 5 seconds
    }, 5000);
  }, [router, url]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white text-center px-6"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('https://psinv.net/assets/images/thankyou-bg.jpg?ver=2')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white">Thank You for Your Inquiry</h1>
        <p className="text-lg mt-2 text-white">Our agent will contact you soon.</p>

        {email && (
          <p className="mt-2 text-sm text-white">
            Confirmation sent to: <span className="font-bold">{email}</span>
          </p>
        )}

        <p className="mt-4 text-sm">Redirecting in 5 seconds...</p>
        <p className="mt-2">
          Not redirected?{" "}
          <a href={url} className="text-blue-400 underline">Click here</a>
        </p>
      </div>
    </div>
  );
}