export function initBrightCallFormBridge(formSelector = 'form[data-brightcall-form]') {
    if (typeof window === "undefined") return;

    // BrightCall loads window.leadCM
    const leadCM = (window as any).leadCM;
    if (!leadCM) return;

    let callInit = false;

    const forms = document.querySelectorAll<HTMLFormElement>(formSelector);
    if (!forms.length) return;

    forms.forEach((form) => {
        // Your submit is a <button>, not <input type="submit">
        const submitBtn =
            form.querySelector<HTMLButtonElement>('button[type="submit"]') ||
            form.querySelector<HTMLInputElement>('input[type="submit"]');

        if (!submitBtn) return;

        // phone selector (react-phone-number-input renders input[type="tel"])
        const getPhone = () => {
            const tel = form.querySelector<HTMLInputElement>('input[type="tel"]');
            const raw = tel?.value ?? "";
            return raw.replace(/\s/g, "").replace("+", "");
        };

        // attach click (matches the BrightCall snippet behavior)
        submitBtn.addEventListener("click", () => {
            const phoneNumber = getPhone();

            if (phoneNumber && leadCM?.call && !callInit) {
                callInit = true;

                const call = () => leadCM.call(phoneNumber, "universal_form");

                if (leadCM.formBeforeCall) {
                    leadCM.formBeforeCall(phoneNumber, form, call);
                } else {
                    call();
                }
            }
        });

        // Build custom params (same as your snippet)
        leadCM.formBeforeCall = function (phoneNumber: string, formEl: Element, call: () => void) {
            const fname = (formEl.querySelector<HTMLInputElement>("#fname")?.value ?? "").trim();
            const lname = (formEl.querySelector<HTMLInputElement>("#lname")?.value ?? "").trim();
            const email = (formEl.querySelector<HTMLInputElement>('input[type="email"]')?.value ?? "").trim();

            const custom_params: Record<string, string> = {
                lc_param_phone: phoneNumber,
            };

            const fullName = [fname, lname].filter(Boolean).join(" ").trim();
            if (fullName) custom_params.lc_param_name = fullName;
            if (email) custom_params.lc_param_email = email;

            // Dispatch to BrightCall
            if (typeof leadCM.dispatchCustomEvent === "function") {
                leadCM.dispatchCustomEvent("CUSTOM_PARAMS", custom_params, call);
            } else {
                call();
            }
        };
    });
}
