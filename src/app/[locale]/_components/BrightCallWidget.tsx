// src/app/[locale]/_components/BrightCallWidget.tsx
"use client";

import Script from "next/script";
import { useEffect, useMemo } from "react";

declare global {
    interface Window {
        leadCM?: any;
    }
}

type Props = {
    widgetKey: string;
    /** which form attribute to bind */
    formType: "registration" | "landing";
};

function bindBrightCallForm(formType: Props["formType"]) {
    const forms = document.querySelectorAll<HTMLFormElement>(
        `form[data-brightcall-form="${formType}"]`
    );

    if (!forms?.length) return;

    let callInit = false;

    forms.forEach((formEl) => {
        const submitBtn =
            formEl.querySelector<HTMLButtonElement>('button[type="submit"]') ??
            formEl.querySelector<HTMLInputElement>('input[type="submit"]');

        if (!submitBtn) return;

        // phone input can be from react-phone-number-input (type="tel")
        window.leadCM.formTelInputSelector = function (el: HTMLElement) {
            const tel = el.querySelector<HTMLInputElement>('input[type="tel"]')?.value ?? "";
            return tel.replace(/ /g, "").replace("+", "");
        };

        // attach ONLY once per element
        if ((submitBtn as any).__brightcallBound) return;
        (submitBtn as any).__brightcallBound = true;

        submitBtn.addEventListener("click", () => {
            const phoneNumber = window.leadCM?.formTelInputSelector?.(formEl) ?? "";
            if (!phoneNumber) return;

            if (window.leadCM && window.leadCM.call && !callInit) {
                callInit = true;

                const call = () => window.leadCM.call(phoneNumber, "universal_form");

                if (window.leadCM.formBeforeCall) {
                    window.leadCM.formBeforeCall(phoneNumber, formEl, call);
                } else {
                    call();
                }
            }
        });

        // Collect data before calling
        window.leadCM.formBeforeCall = function (
            phoneNumber: string,
            el: HTMLElement,
            call: () => void
        ) {
            const fnameInput = el.querySelector<HTMLInputElement>("input#fname");
            const lnameInput = el.querySelector<HTMLInputElement>("input#lname");

            // your email input is already type="email" in your form
            const emailInput = el.querySelector<HTMLInputElement>('input[type="email"]');

            const userfName = fnameInput?.value ?? "";
            const userlName = lnameInput?.value ?? "";
            const userEmail = emailInput?.value ?? "";

            const custom_params: Record<string, string> = {
                lc_param_phone: phoneNumber,
            };

            const fullName = `${userfName} ${userlName}`.trim();
            if (fullName) custom_params["lc_param_name"] = fullName;
            if (userEmail) custom_params["lc_param_email"] = userEmail;

            // ✅ This is what you can check in the console:
            console.log("[BrightCall] CUSTOM_PARAMS", custom_params);

            window.leadCM.dispatchCustomEvent("CUSTOM_PARAMS", custom_params, call);
        };
    });
}

export default function BrightCallWidget({ widgetKey, formType }: Props) {
    const cleanKey = (widgetKey ?? "").trim();

    const scriptBody = useMemo(() => {
        if (!cleanKey) return "";
        return `
      (function () {
        var widget_key = "${cleanKey}";
        window.leadCM = window.leadCM || {};
        window.leadCM.widget_key = widget_key;

        var em = document.createElement('script');
        em.type = 'text/javascript';
        em.async = true;
        em.src = 'https://app.convolo.ai/js/icallback.js?v=' + Math.random()
          + '&key=' + widget_key
          + '&uri=' + encodeURIComponent(window.location.href);

        em.setAttribute('data-brightcall', 'icallback');
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(em, s);
      })();
    `;
    }, [cleanKey]);

    // After widget loads, bind the form behavior
    useEffect(() => {
        if (!cleanKey) return;

        const t = window.setInterval(() => {
            if (window.leadCM?.dispatchCustomEvent && window.leadCM?.call) {
                window.clearInterval(t);
                bindBrightCallForm(formType);
            }
        }, 250);

        return () => window.clearInterval(t);
    }, [cleanKey, formType]);

    if (!cleanKey) return null;

    return (
        <Script id={`brightcall-${formType}`} strategy="afterInteractive">
            {scriptBody}
        </Script>
    );
}
