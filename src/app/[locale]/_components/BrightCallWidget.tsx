"use client";

import Script from "next/script";
import { useEffect } from "react";
import { initBrightCallFormBridge } from "@/utils/brightCall/brightCallBridge";

type Props = {
    widgetKey: string;
    formSelector?: string; // optional: override which forms to attach to
};

export default function BrightCallWidget({ widgetKey, formSelector }: Props) {
    // After BrightCall is present, attach to forms
    useEffect(() => {
        // run once immediately, and again a bit later (in case the widget loads slowly)
        initBrightCallFormBridge(formSelector);
        const t = window.setTimeout(() => initBrightCallFormBridge(formSelector), 1500);
        return () => window.clearTimeout(t);
    }, [formSelector, widgetKey]);

    if (!widgetKey) return null;

    return (
        <>
            <Script id={`brightcall-${widgetKey}`} strategy="afterInteractive">
                {`
          (function () {
            var widget_key = "${widgetKey}";
            window.leadCM = window.leadCM || { widget_key: widget_key };
            window.leadCM.widget_key = widget_key;

            var em = document.createElement("script");
            em.type = "text/javascript";
            em.async = true;
            em.src = "https://app.convolo.ai/js/icallback.js?v=" + Math.random() + "&key=" + widget_key + "&uri=" + encodeURIComponent(window.location.href);

            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(em, s);
          })();
        `}
            </Script>
        </>
    );
}
