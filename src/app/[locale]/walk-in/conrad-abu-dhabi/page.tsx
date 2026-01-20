"use client";

import React, { useMemo, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { nationalityOptions } from "@/data/youngsters";
import { walkinFormConfig } from "@/utils/walkinConfig";

type Step = 1 | 2 | 3;
type Locale = "en" | "ar";
type ServiceKey =
    | "buy"
    | "lease"
    | "propertyManagement"
    | "investmentDeals"
    | "visaResidency";
type FormState = {
    // step 1
    agentId: string;
    agentName: string;
    salutation: "Mr" | "Mrs";
    firstName: string;
    lastName: string;
    nationality: string;
    residency: "Visiting UAE" | "Living in UAE";

    // step 2
    primaryPhone: string;
    primaryIsWhatsapp: boolean;
    secondaryPhone: string;
    secondaryIsWhatsapp: boolean;
    email: string;
    bestTime: "morning" | "afternoon" | "evening" | "";

    // step 3
    service: ServiceKey | "";
    budgetCurrency: "AED" | "USD" | "EURO" | "CRYPTO";
    minBudget: number | "";
    maxBudget: number | "";
    cityId: string;
    viewingDateChoice: "Today" | "Tomorrow" | "Pick";
    viewingDate: string;
    viewingTime: string;
    rating: number;
    agreed: boolean;
    remarks: string;
};
type BudgetOption = { value: number; label: string };

const generateBudgetRange = (
    start = 1_000_000,
    end = 10_000_000,
    step = 50_000
): BudgetOption[] => {
    const options: BudgetOption[] = [];
    for (let value = start; value <= end; value += step) {
        options.push({ value, label: value.toLocaleString() });
    }
    return options;
};
const CITIES = [
    { id: "auh", name: "Abu Dhabi" },
    { id: "dxb", name: "Dubai" },
    { id: "shj", name: "Sharjah" },
    { id: "ajm", name: "Ajman" },
    { id: "rak", name: "Ras Al Khaimah" },
];
const SERVICE_PORTAL_MAP: Record<
    ServiceKey,
    { ContactType: string; RequirementType: string }
> = {
    buy: {
        ContactType: "3",          // Sales
        RequirementType: "91212",
    },
    lease: {
        ContactType: "4",          // Lease
        RequirementType: "91213",
    },
    propertyManagement: {
        ContactType: "4",
        RequirementType: "537",
    },
    investmentDeals: {
        ContactType: "3",
        RequirementType: "91212",
    },
    visaResidency: {
        ContactType: "3",
        RequirementType: "91212",
    },
};


function getLocaleFromPath(pathname: string): Locale {
    const seg = pathname.split("/").filter(Boolean)[0];
    return seg === "ar" ? "ar" : "en";
}
function ValidationModal({
    errors,
    onClose,
}: {
    errors: string[];
    onClose: () => void;
}) {
    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4"
            onMouseDown={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="w-full max-w-2xl rounded-md bg-white shadow-2xl border border-red-300"
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <h3 className="text-red-600 font-semibold text-lg">
                            Please complete all required fields
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-red-400 hover:text-red-600 text-xl leading-none"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="px-10 pb-6">
                    <ul className="list-disc space-y-2 pl-6 text-red-600 text-sm">
                        {errors.map((e, i) => (
                            <li key={i}>{e}</li>
                        ))}
                    </ul>
                </div>

                {/* Footer */}
                <div className="flex justify-end px-6 pb-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}
function Stepper({ step }: { step: Step }) {
    const steps: Array<{ n: Step; label: string }> = [
        { n: 1, label: "Personal Informations" },
        { n: 2, label: "Contacts" },
        { n: 3, label: "Services" },
    ];

    const stateOf = (n: Step) => (step === n ? "active" : step > n ? "done" : "todo");

    const circleClass = (n: Step) => {
        const s = stateOf(n);
        if (s === "active" || s === "done") return "bg-[#1d1f5a] text-white border-[#1d1f5a]";
        return "bg-white text-[#6b7280] border-[#e5e7eb]";
    };

    const labelClass = (n: Step) => {
        const s = stateOf(n);
        return s === "active" || s === "done" ? "text-[#1d1f5a]" : "text-[#6b7280]";
    };

    return (
        <div className="w-full">
            {/* circles + line */}
            <div className="relative grid grid-cols-3 items-center">
                {/* Base line */}
                <div className="absolute left-0 right-0 top-4 h-[2px] bg-[#e5e7eb]" />

                {steps.map((s) => (
                    <div
                        key={s.n}
                        className={[
                            "flex",
                            s.n === 1 ? "justify-start" : s.n === 2 ? "justify-center" : "justify-end",
                        ].join(" ")}
                    >
                        <div
                            className={[
                                "relative z-10 h-8 w-8 rounded-full border flex items-center justify-center text-xs font-semibold",
                                circleClass(s.n),
                            ].join(" ")}
                        >
                            {s.n}
                        </div>
                    </div>
                ))}
            </div>

            {/* labels */}
            <div className="mt-2 grid grid-cols-3 text-[11px] md:text-xs">
                {steps.map((s) => (
                    <div
                        key={s.n}
                        className={[
                            "flex",
                            s.n === 1 ? "justify-start" : s.n === 2 ? "justify-center" : "justify-end",
                        ].join(" ")}
                    >
                        <span className={labelClass(s.n)}>{s.label}</span>
                    </div>
                ))}
            </div>

            <p className="text-center mt-4 font-semibold text-[#1d1f5a]">Welcome to PSI</p>
        </div>
    );
}
function PrefixInput({
    label,
    value,
    onChange,
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}) {
    return (
        <div className="flex w-full overflow-hidden rounded border border-gray-300 bg-white">
            <div className="flex items-center bg-gray-100 px-3 text-sm text-gray-700 border-r border-gray-300">
                {label}
            </div>

            <input
                className="h-10 w-full px-3 outline-none border-0"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

function PrefixSelect({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: string[];
}) {
    return (
        <div className="flex w-full overflow-hidden rounded border border-gray-300 bg-white">
            <div className="flex items-center bg-gray-100 px-3 text-sm text-gray-700 border-r border-gray-300">
                {label}
            </div>

            <select
                className="h-10 w-full px-3 outline-none border-0 bg-white"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default function Page() {
    const [ratingHover, setRatingHover] = useState(0);
    const slug = "conrad-abu-dhabi";

    const EVENT_TITLE = "Conrad Abu Dhabi Etihad Towers Walk-in";
    const BRANCH = "AUH";
    const SEND_TO = ["callcenter@psinv.net", "yngwie.g@psinv.net"];
    const REFERREDBYID = "3458";

    const [step, setStep] = useState<Step>(1);
    const [submitting, setSubmitting] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const [form, setForm] = useState<FormState>({
        agentId: "",
        agentName: "",
        salutation: "Mr",
        firstName: "",
        lastName: "",
        nationality: "",
        residency: "Visiting UAE",

        primaryPhone: "",
        secondaryPhone: "",
        primaryIsWhatsapp: true,
        secondaryIsWhatsapp: false,
        email: "",
        bestTime: "morning",

        service: "buy",
        budgetCurrency: "AED",
        minBudget: "",
        maxBudget: "",
        cityId: "",
        viewingDateChoice: "Today",
        viewingDate: new Date().toISOString().slice(0, 10),
        viewingTime: "8:00am",
        rating: 0,
        agreed: false,
        remarks: "",
    });
    const config = useMemo(() => walkinFormConfig[slug], [slug]);

    const agentSourceConfig = useMemo(() => {
        const current = walkinFormConfig[slug];
        return current?.agentsByDate
            ? current
            : walkinFormConfig["conrad-hotel-at-etihad-tower-abu-dhabi"];
    }, [slug]);

    const agentsForSelectedDate = useMemo(() => {
        return agentSourceConfig?.agentsByDate?.[form.viewingDate] ?? [];
    }, [agentSourceConfig, form.viewingDate]);

    const budgetOptions = useMemo(() => generateBudgetRange(), []);

    const maxBudgetOptions = useMemo(() => {
        const min = typeof form.minBudget === "number" ? form.minBudget : null;
        if (min == null) return budgetOptions;
        return budgetOptions.filter((b) => b.value >= min);
    }, [budgetOptions, form.minBudget]);
    const locale = useMemo(() => {
        if (typeof window === "undefined") return "en" as Locale;
        return getLocaleFromPath(window.location.pathname);
    }, []);

    const params = useMemo(() => {
        if (typeof window === "undefined") return null;
        return new URLSearchParams(window.location.search);
    }, []);

    const utm_source = params?.get("utm_source") ?? "";
    const utm_medium = params?.get("utm_medium") ?? "";
    const utm_campaign = params?.get("utm_campaign") ?? "";

    const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const setService = (key: ServiceKey) => {
        setForm((prev) => ({ ...prev, service: key }));
    };
    const setRating = (value: number) => {
        setForm((prev) => ({ ...prev, rating: value }));
    };
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        (el as HTMLElement).focus?.();
    };

    const validateStep = (s: Step) => {
        const errs: string[] = [];
        let firstId: string | null = null;

        const push = (id: string, msg: string) => {
            errs.push(msg);
            if (!firstId) firstId = id;
        };

        if (s === 1) {
            if (!form.agentId.trim()) push("agentId", "Host Name is required.");
            if (!form.firstName.trim()) push("firstName", "First Name is required.");
            if (!form.lastName.trim()) push("lastName", "Last Name is required.");
            if (!form.nationality.trim()) push("nationality", "Nationality is required.");
        }

        if (s === 2) {
            if (!form.primaryPhone.trim()) push("primaryPhone", "Mobile Number 1 is required.");
            if (!form.email.trim()) push("email", "Email is required.");

            if (form.primaryPhone) {
                const digits = form.primaryPhone.replace(/\D/g, "");
                if (digits.length < 7 || digits.length > 15) {
                    push("primaryPhone", "Mobile Number 1 must be 7–15 digits.");
                }
            }
        }
        if (s === 3) {
            if (!form.service) push("services", "Please choose a service.");
            if (!form.minBudget) push("minBudget", "Please select minimum budget.");
            if (!form.maxBudget) push("maxBudget", "Please select maximum budget.");

            if (!form.cityId) push("cityId", "Please select a city.");
            if (!form.rating) push("rating", "Please rate your experience.");
            if (!form.agreed) push("agreed", "Please agree to Terms & Conditions and Privacy Policy.");
        }

        return { ok: errs.length === 0, errs, firstId };
    };
    const next = () => {
        const v = validateStep(step);
        if (!v.ok) {
            setErrors(v.errs);
            setShowModal(true);
            if (v.firstId) scrollTo(v.firstId);
            return;
        }
        setStep((prev) => (prev < 3 ? ((prev + 1) as Step) : prev));
        setTimeout(() => scrollTo("topForm"), 50);
    };

    const back = () => {
        setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));
        setTimeout(() => scrollTo("topForm"), 50);
    };
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const v1 = validateStep(1);
        const v2 = validateStep(2);
        const v3 = validateStep(3);

        const allErrs = [...v1.errs, ...v2.errs, ...v3.errs];
        const firstId = v1.firstId ?? v2.firstId ?? v3.firstId;

        if (allErrs.length) {
            setErrors(allErrs);
            setShowModal(true);

            if (firstId) {
                if (["agentId", "firstName", "lastName", "nationality"].includes(firstId)) setStep(1);
                else if (["primaryPhone", "email"].includes(firstId)) setStep(2);
                else setStep(3);

                setTimeout(() => scrollTo(firstId), 80);
            }
            return;
        }

        setSubmitting(true);
        const url = typeof window !== "undefined" ? window.location.href : "";

        const safe = (v: any) =>
            String(v ?? "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

        const serviceLabelMap: Record<ServiceKey, string> = {
            buy: "Sales",
            lease: "Lease",
            propertyManagement: "Property Management",
            investmentDeals: "Investment Deals",
            visaResidency: "UAE Visa & Residency Assistance",
        };
        const serviceIntegration =
            form.service && SERVICE_PORTAL_MAP[form.service]
                ? SERVICE_PORTAL_MAP[form.service]
                : SERVICE_PORTAL_MAP.buy;
        const budgetMin = typeof form.minBudget === "number" ? String(form.minBudget) : "";
        const budgetMax = typeof form.maxBudget === "number" ? String(form.maxBudget) : "";

        const dateLabel =
            form.viewingDateChoice === "Pick"
                ? safe(form.viewingDate)
                : safe(form.viewingDateChoice);

        const shortRemark = `${safe(EVENT_TITLE)}, Agent: ${safe(form.agentName)}`;

        const activityRemarks = [
            `${safe(EVENT_TITLE)}, Agent: ${safe(form.agentName)}`,
            `Client Name:${safe(form.salutation)} ${safe(form.firstName)} ${safe(form.lastName)}`,
            `Client Email:${safe(form.email)}`,
            `Nationality:${safe(form.nationality)}`,
            `Primary Phone Contact:${safe(form.primaryPhone)}${form.primaryIsWhatsapp ? " (WhatsApp)" : ""}`,
            `Secondary Phone Contact:${safe(form.secondaryPhone)}${form.secondaryIsWhatsapp ? " (WhatsApp)" : ""}`,
            `Service Type:${safe(form.service ? serviceLabelMap[form.service] : "")}`,
            `Selected currency:${safe(form.budgetCurrency)}`,
            `Budget-Min:${safe(budgetMin)}`,
            `Budget-Max:${safe(budgetMax)}`,
            `Selected City:${safe(form.cityId)}`,
            `Time to contact:<br>On-spot Viewing Time:${safe(form.viewingTime)}`,
            `Date of Submission:${safe(new Date().toISOString().slice(0, 10))} ${safe(new Date().toLocaleTimeString())}`,
            `Best time to contact:${safe(form.bestTime)}`,
            `Viewing Date:${dateLabel}`,
            `Rating:${safe(form.rating)}`,
            `Form URL:${safe(url)}`,
            `Hosted by:${safe(form.agentName)}`,
        ].join("<br>");

        const payload = {
            slug,
            branch: BRANCH,
            sendto: SEND_TO,
            referredbyid: REFERREDBYID,

            agentId: form.agentId,
            agentName: form.agentName,
            RequirementType: serviceIntegration.RequirementType,
            ContactType: serviceIntegration.ContactType,

            salutation: form.salutation,
            firstName: form.firstName,
            lastName: form.lastName,
            nationality: form.nationality,
            residency: form.residency,

            primaryPhone: form.primaryPhone || "",
            primaryIsWhatsapp: form.primaryIsWhatsapp,
            secondaryPhone: form.secondaryPhone || "",
            secondaryIsWhatsapp: form.secondaryIsWhatsapp,

            email: form.email,
            bestTime: form.bestTime,
            service: form.service,
            budgetCurrency: form.budgetCurrency,

            Budget: typeof form.minBudget === "number" ? form.minBudget : null,
            Budget2: typeof form.maxBudget === "number" ? form.maxBudget : null,

            cityId: form.cityId,
            viewingDateChoice: form.viewingDateChoice,
            viewingDate: form.viewingDate,
            viewingTime: form.viewingTime,
            rating: form.rating,

            utm_source,
            utm_medium,
            utm_campaign,

            remarks: shortRemark,
            activityRemarks,
            eventTitle: EVENT_TITLE,
            formUrl: url,
        };


        try {
            const res = await fetch("/api/external/walkin-registration-conrad", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            });
            const resultText = await res.text();
            let resultJson: any = null;
            try {
                resultJson = JSON.parse(resultText);
            } catch { }

            if (res.ok) {
                // send email
                try {
                    const receiver = SEND_TO.join(",");

                    const formUrl = url || "N/A";
                    const emailBody = `
<html>
  <body style="font-family: Arial, sans-serif; color: #333;">
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 14px;">
      
      <!-- Header -->
      <tr>
        <td colspan="2" style="background-color: rgb(2, 52, 74); color: #ffffff; font-size: 18px; font-weight: bold; text-align:center;">
          Walk-in Registration - ${EVENT_TITLE}
        </td>
      </tr>

      <!-- Event Info -->
      <tr>
        <td colspan="2" style="background-color: #f97316; color: #fff; font-weight: bold;">
          Event Info
        </td>
      </tr>
      <tr><td style="width:220px;"><b>Event Title</b></td><td>${EVENT_TITLE}</td></tr>
      <tr><td><b>Branch</b></td><td>${BRANCH}</td></tr>

      <!-- Client Info -->
      <tr>
        <td colspan="2" style="background-color: #f97316; color: #fff; font-weight: bold;">
          Client Info
        </td>
      </tr>
      <tr><td><b>Salutation</b></td><td>${form.salutation || "N/A"}</td></tr>
      <tr><td><b>First Name</b></td><td>${form.firstName || "N/A"}</td></tr>
      <tr><td><b>Last Name</b></td><td>${form.lastName || "N/A"}</td></tr>
      <tr><td><b>Nationality</b></td><td>${form.nationality || "N/A"}</td></tr>
      <tr><td><b>Residency</b></td><td>${form.residency || "N/A"}</td></tr>

      <!-- Contacts -->
      <tr>
        <td colspan="2" style="background-color: #f97316; color: #fff; font-weight: bold;">
          Contacts
        </td>
      </tr>
      <tr><td><b>Primary Phone</b></td><td>${form.primaryPhone || "N/A"}</td></tr>
      <tr><td><b>Primary WhatsApp</b></td><td>${form.primaryIsWhatsapp ? "Yes" : "No"}</td></tr>
      <tr><td><b>Secondary Phone</b></td><td>${form.secondaryPhone || "N/A"}</td></tr>
      <tr><td><b>Secondary WhatsApp</b></td><td>${form.secondaryIsWhatsapp ? "Yes" : "No"}</td></tr>
      <tr><td><b>Email</b></td><td>${form.email || "N/A"}</td></tr>
      <tr><td><b>Best Time</b></td><td>${form.bestTime || "N/A"}</td></tr>

      <!-- Service -->
      <tr>
        <td colspan="2" style="background-color: #f97316; color: #fff; font-weight: bold;">
          Service Info
        </td>
      </tr>
      <tr><td><b>Service</b></td><td>${form.service || "N/A"}</td></tr>
      <tr><td><b>Budget Currency</b></td><td>${form.budgetCurrency || "N/A"}</td></tr>
      <tr>
        <td><b>Min Budget</b></td>
        <td>${typeof form.minBudget === "number" ? form.minBudget.toLocaleString() : "N/A"}</td>
      </tr>
      <tr>
        <td><b>Max Budget</b></td>
        <td>${typeof form.maxBudget === "number" ? form.maxBudget.toLocaleString() : "N/A"}</td>
      </tr>
      <tr>
        <td><b>Budget Range</b></td>
        <td>
          ${typeof form.minBudget === "number" ? form.minBudget.toLocaleString() : "N/A"}
          -
          ${typeof form.maxBudget === "number" ? form.maxBudget.toLocaleString() : "N/A"}
          (${form.budgetCurrency})
        </td>
      </tr>
      <tr><td><b>City</b></td><td>${form.cityId || "N/A"}</td></tr>

      <!-- Viewing -->
      <tr>
        <td colspan="2" style="background-color: #f97316; color: #fff; font-weight: bold;">
          Viewing
        </td>
      </tr>
      <tr><td><b>Viewing Date Choice</b></td><td>${form.viewingDateChoice || "N/A"}</td></tr>
      <tr><td><b>Viewing Date</b></td><td>${form.viewingDate || "N/A"}</td></tr>
      <tr><td><b>Viewing Time</b></td><td>${form.viewingTime || "N/A"}</td></tr>

      <!-- Hosted By -->
      <tr>
        <td colspan="2" style="background-color: #f97316; color: #fff; font-weight: bold;">
          Hosted By
        </td>
      </tr>
      <tr><td><b>Agent Name</b></td><td>${form.agentName || "N/A"}</td></tr>
      <tr><td><b>Agent ID</b></td><td>${form.agentId || "N/A"}</td></tr>

      <!-- Feedback -->
      <tr>
        <td colspan="2" style="background-color: #f97316; color: #fff; font-weight: bold;">
          Feedback
        </td>
      </tr>
      <tr><td><b>Rating</b></td><td>${form.rating ? `${form.rating}/5` : "N/A"}</td></tr>
      <tr>
        <td><b>Agreed (Terms & Conditions)</b></td>
        <td>${form.agreed ? "Yes" : "No"}</td>
      </tr>
      <!-- Marketing -->
            <tr>
                <td><b>Form URL</b></td>
                <td>
                ${typeof window !== "undefined"
                            ? `<a href="${window.location.href}" target="_blank" rel="noreferrer">${window.location.href}</a>`
                            : "N/A"
                        }
        </td>
        </tr>
      <!-- Footer -->
      <tr>
        <td colspan="2" style="background-color: rgb(2, 52, 74); color: #ffffff; text-align: center; font-size: 12px; padding: 12px;">
          Copyright © 2026 | All Rights Reserved | Property Shop Investment
        </td>
      </tr>

    </table>
  </body>
</html>
`.trim();


                    const mailRes = await fetch("https://registration.psinv.net/api/sendemail2.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            body: emailBody,
                            receiver,
                            subject: `Walk-in Registration - ${form.firstName} ${form.lastName}`,
                            filename: "",
                            filedata: "",
                        }),
                    });

                    const mailText = await mailRes.text();
                    console.log("[Conrad] sendemail2.php", mailRes.status, mailText);

                    if (!mailRes.ok) {
                        console.error("Email API failed:", mailRes.status, mailText);
                    }
                } catch (emailErr) {
                    console.error("Email failed (non-blocking):", emailErr);
                }

                window.location.href = `/${locale}/thankyou?email=${encodeURIComponent(form.email)}`;
            } else {
                console.error("Walkin API error:", resultJson ?? resultText);
                alert("There was an error submitting the form.");
            }
        } catch (err) {
            console.error(err);
            alert("Submission failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };
    const SERVICES: Array<{ key: ServiceKey; label: string }> = [
        { key: "buy", label: "Buy" },
        { key: "lease", label: "Lease" },
        { key: "propertyManagement", label: "Property Management" },
        { key: "investmentDeals", label: "Investment Deals" },
        { key: "visaResidency", label: "UAE Visa & Residency Assistance" },
    ];
    return (
        <div className="bg-white">
            <div className="mx-auto w-full max-w-5xl px-2 pb-10">
                {/* Banner */}
                <div className="w-full">
                    <Image
                        src="/images/walkin-form/conrad-main-image1.png"
                        alt="Conrad Abu Dhabi Etihad Towers"
                        width={2000}
                        height={600}
                        priority
                        className="w-full h-auto"
                    />
                </div>
                <div className="mt-6">
                    <Stepper step={step} />
                </div>
                {/* Form Card */}
                {/* Form Card */}
                <div id="topForm" className="mt-6">
                    <div className="border border-[#e5e7eb] rounded-lg bg-white">
                        <form onSubmit={submit} className="p-4 md:p-8 space-y-6">
                            {showModal && <ValidationModal errors={errors} onClose={() => setShowModal(false)} />}

                            {/* STEP 1 */}
                            {step === 1 && (
                                <>
                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-bold text-[#f97316]">Host Name</label>
                                            <select
                                                id="agentId"
                                                className="mt-2 w-full max-w-sm rounded border border-gray-300 px-3 py-2"
                                                value={form.agentId}
                                                onChange={(e) => {
                                                    const id = e.target.value;
                                                    const name = e.target.selectedOptions?.[0]?.textContent ?? "";
                                                    update("agentId", id);
                                                    update("agentName", name === "-" ? "" : name);
                                                }}
                                            >
                                                <option value="">-</option>

                                                {agentsForSelectedDate.map((a) => (
                                                    <option key={a.id} value={a.id}>
                                                        {a.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-[#f97316]">Client Information</div>

                                            <div className="mt-3">
                                                <div className="text-sm text-[#f97316]">Name</div>
                                                <div className="mt-2 flex items-center gap-6 text-sm">
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="radio"
                                                            checked={form.salutation === "Mr"}
                                                            onChange={() => update("salutation", "Mr")}
                                                        />
                                                        Mr.
                                                    </label>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="radio"
                                                            checked={form.salutation === "Mrs"}
                                                            onChange={() => update("salutation", "Mrs")}
                                                        />
                                                        Mrs.
                                                    </label>
                                                </div>
                                            </div>

                                            {/* 3 columns exactly like screenshot */}
                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                                                <div>
                                                    <input
                                                        id="firstName"
                                                        className="w-full rounded border border-gray-300 px-3 py-2"
                                                        placeholder="First Name"
                                                        value={form.firstName}
                                                        onChange={(e) => update("firstName", e.target.value)}
                                                    />
                                                </div>

                                                <div>
                                                    <input
                                                        id="lastName"
                                                        className="w-full rounded border border-gray-300 px-3 py-2"
                                                        placeholder="Last Name"
                                                        value={form.lastName}
                                                        onChange={(e) => update("lastName", e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <select
                                                        id="nationality"
                                                        className="w-full h-10 rounded border border-gray-300 px-3 bg-white"
                                                        value={form.nationality}
                                                        onChange={(e) => update("nationality", e.target.value)}
                                                    >
                                                        <option value="">Select Nationality</option>

                                                        {nationalityOptions.map((n) => (
                                                            <option key={n} value={n}>
                                                                {n}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        checked={form.residency === "Visiting UAE"}
                                                        onChange={() => update("residency", "Visiting UAE")}
                                                    />
                                                    Visiting UAE
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        checked={form.residency === "Living in UAE"}
                                                        onChange={() => update("residency", "Living in UAE")}
                                                    />
                                                    Living in UAE
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="button"
                                            onClick={next}
                                            className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold py-2 px-10 rounded"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <>
                                    <div className="text-xl font-bold text-[#f97316]">Contacts</div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                        {/* Mobile 1 */}
                                        <div className="flex flex-col">
                                            <label className="block text-sm text-[#1d1f5a]">Mobile Number 1</label>

                                            <div dir="ltr" className="mt-2 w-full">
                                                <PhoneInput
                                                    id="primaryPhone"
                                                    defaultCountry="AE"
                                                    international
                                                    countryCallingCodeEditable={false}
                                                    value={form.primaryPhone ?? ""}
                                                    onChange={(v) => update("primaryPhone", v ?? "")}
                                                    className="w-full"
                                                    numberInputProps={{
                                                        className:
                                                            "w-full h-10 rounded border border-gray-300 px-3 text-gray-800 focus:outline-none",
                                                    }}
                                                />
                                            </div>

                                            <label className="mt-2 flex items-center gap-2 text-xs text-[#1d1f5a]">
                                                <input
                                                    type="checkbox"
                                                    checked={form.primaryIsWhatsapp}
                                                    onChange={(e) => update("primaryIsWhatsapp", e.target.checked)}
                                                />
                                                WhatsApp Account
                                            </label>
                                        </div>

                                        {/* Mobile 2 */}
                                        <div className="flex flex-col">
                                            <label className="block text-sm text-[#1d1f5a]">Mobile Number 2</label>

                                            <div dir="ltr" className="mt-2 w-full">
                                                <PhoneInput
                                                    id="secondaryPhone"
                                                    defaultCountry="AE"
                                                    international
                                                    countryCallingCodeEditable={false}
                                                    value={form.secondaryPhone ?? ""}
                                                    onChange={(v) => update("secondaryPhone", v ?? "")}
                                                    className="w-full"
                                                    numberInputProps={{
                                                        className:
                                                            "w-full h-10 rounded border border-gray-300 px-3 text-gray-800 focus:outline-none",
                                                    }}
                                                />
                                            </div>

                                            <label className="mt-2 flex items-center gap-2 text-xs text-[#1d1f5a]">
                                                <input
                                                    type="checkbox"
                                                    checked={form.secondaryIsWhatsapp}
                                                    onChange={(e) => update("secondaryIsWhatsapp", e.target.checked)}
                                                />
                                                WhatsApp Account
                                            </label>
                                        </div>

                                        {/* Email */}
                                        <div className="flex flex-col">
                                            <label className="block text-sm text-[#1d1f5a]">Email address</label>

                                            <input
                                                id="email"
                                                className="mt-2 w-full h-10 rounded border border-gray-300 px-3 text-gray-800"
                                                placeholder="name@example.com"
                                                value={form.email}
                                                onChange={(e) => update("email", e.target.value)}
                                            />
                                            {/* keep empty space so heights match phone columns */}
                                            <div className="mt-2 h-4" />
                                        </div>
                                    </div>


                                    <div className="pt-2">
                                        <div className="text-sm font-bold text-[#f97316]">
                                            Best time to contact you based on your residency
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-6 text-sm">
                                            {(["morning", "afternoon", "evening"] as const).map((t) => (
                                                <label key={t} className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        checked={form.bestTime === t}
                                                        onChange={() => update("bestTime", t)}
                                                    />
                                                    {t[0].toUpperCase() + t.slice(1)}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={back}
                                            className="border border-gray-800 text-gray-900 font-semibold py-2 px-10 rounded hover:bg-gray-50"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="button"
                                            onClick={next}
                                            className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold py-2 px-10 rounded"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <>
                                    <div className="text-center text-xl font-bold text-[#f97316]">Interested In</div>
                                    <div id="services" className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                        {SERVICES.map((s) => {
                                            const active = form.service === s.key;
                                            return (
                                                <button
                                                    key={s.key}
                                                    type="button"
                                                    onClick={() => setService(s.key)}
                                                    className={[
                                                        "rounded border px-3 py-2 text-center text-sm font-medium",
                                                        active
                                                            ? "bg-[#1d1f5a] text-white border-[#1d1f5a]"
                                                            : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50",
                                                    ].join(" ")}
                                                    aria-pressed={active}
                                                >
                                                    {s.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                        {/* Budget Currency */}
                                        <div className="w-full">
                                            <label className="block text-sm font-bold text-[#f97316]">Budget Currency</label>
                                            <select
                                                className="mt-2 w-full h-10 rounded border border-gray-300 px-3 bg-white"
                                                value={form.budgetCurrency}
                                                onChange={(e) => update("budgetCurrency", e.target.value as any)}
                                            >
                                                <option value="AED">AED</option>
                                                <option value="USD">USD</option>
                                                <option value="EURO">EURO</option>
                                                <option value="CRYPTO">CRYPTO</option>
                                            </select>
                                        </div>

                                        {/* From + To side by side, wider */}
                                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                            {/* From */}
                                            <div className="w-full">
                                                <label className="block text-sm text-[#1d1f5a]">From (Min Budget)</label>
                                                <div className="mt-2 flex w-full overflow-hidden rounded border border-gray-300 bg-white h-10">
                                                    <div className="flex items-center bg-gray-100 px-3 text-sm text-gray-700 border-r border-gray-300">
                                                        From
                                                    </div>
                                                    <select
                                                        id="minBudget"
                                                        className="w-full h-full px-3 bg-white outline-none border-0"
                                                        value={form.minBudget === "" ? "" : String(form.minBudget)}
                                                        onChange={(e) => {
                                                            const v = e.target.value ? Number(e.target.value) : "";
                                                            update("minBudget", v as any);
                                                            update("maxBudget", ""); // reset max when min changes
                                                        }}
                                                    >
                                                        <option value="">Select Min Budget</option>
                                                        {budgetOptions.map((b) => (
                                                            <option key={b.value} value={b.value}>
                                                                {b.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* To */}
                                            <div className="w-full">
                                                <label className="block text-sm text-[#1d1f5a]">To (Max Budget)</label>
                                                <div className="mt-2 flex w-full overflow-hidden rounded border border-gray-300 bg-white h-10">
                                                    <div className="flex items-center bg-gray-100 px-3 text-sm text-gray-700 border-r border-gray-300">
                                                        To
                                                    </div>
                                                    <select
                                                        id="maxBudget"
                                                        className="w-full h-full px-3 bg-white outline-none border-0"
                                                        value={form.maxBudget === "" ? "" : String(form.maxBudget)}
                                                        onChange={(e) => {
                                                            const v = e.target.value ? Number(e.target.value) : "";
                                                            update("maxBudget", v as any);
                                                        }}
                                                        disabled={form.minBudget === ""}  // optional UX like your SearchableSelect
                                                    >
                                                        <option value="">Select Max Budget</option>
                                                        {maxBudgetOptions.map((b) => (
                                                            <option key={b.value} value={b.value}>
                                                                {b.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* City */}
                                    <div className="w-full md:w-1/3 pt-2">
                                        <label className="block text-sm text-[#1d1f5a]">
                                            City <span className="text-red-500">*</span>
                                        </label>

                                        <select
                                            id="cityId"
                                            className="mt-2 w-full h-10 rounded border border-gray-300 px-3 bg-white focus:outline-none"
                                            value={form.cityId}
                                            onChange={(e) => update("cityId", e.target.value)}
                                        >
                                            <option value="">Select City</option>
                                            {CITIES.map((c) => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* Book A Viewing + Time (matches screenshot) */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                        {/* Left: Book A Viewing */}
                                        <div>
                                            <label className="block text-sm text-[#1d1f5a]">Book A Viewing</label>

                                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        update("viewingDateChoice", "Today");
                                                        update("viewingDate", new Date().toISOString().slice(0, 10));
                                                    }}
                                                    className={[
                                                        "h-10 min-w-[96px] px-6 rounded border text-sm",
                                                        form.viewingDateChoice === "Today"
                                                            ? "bg-[#1d1f5a] text-white border-[#1d1f5a]"
                                                            : "bg-white text-[#1d1f5a] border-gray-300",
                                                    ].join(" ")}
                                                >
                                                    Today
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const d = new Date();
                                                        d.setDate(d.getDate() + 1);
                                                        update("viewingDateChoice", "Tomorrow");
                                                        update("viewingDate", d.toISOString().slice(0, 10));
                                                    }}
                                                    className={[
                                                        "h-10 min-w-[96px] px-6 rounded border text-sm",
                                                        form.viewingDateChoice === "Tomorrow"
                                                            ? "bg-[#1d1f5a] text-white border-[#1d1f5a]"
                                                            : "bg-white text-[#1d1f5a] border-gray-300",
                                                    ].join(" ")}
                                                >
                                                    Tomorrow
                                                </button>
                                                {/* ONE real date input (always visible) */}
                                                <input
                                                    id="viewingDate"
                                                    type="date"
                                                    className="h-10 rounded border border-gray-300 px-3"
                                                    value={form.viewingDate}
                                                    onChange={(e) => {
                                                        update("viewingDateChoice", "Pick");
                                                        update("viewingDate", e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {/* Right: Time */}
                                        <div className="w-full">
                                            <label className="block text-sm font-bold text-[#f97316]">Time</label>
                                            <select
                                                id="viewingTime"
                                                className="mt-2 w-full h-10 rounded border border-gray-300 px-3 bg-white"
                                                value={form.viewingTime}
                                                onChange={(e) => update("viewingTime", e.target.value)}
                                            >
                                                <option value="8:00am">8:00am</option>
                                                <option value="9:00am">9:00am</option>
                                                <option value="10:00am">10:00am</option>
                                                <option value="11:00am">11:00am</option>
                                                <option value="12:00pm">12:00pm</option>
                                                <option value="1:00pm">1:00pm</option>
                                                <option value="2:00pm">2:00pm</option>
                                                <option value="3:00pm">3:00pm</option>
                                                <option value="4:00pm">4:00pm</option>
                                                <option value="5:00pm">5:00pm</option>
                                            </select>
                                        </div>
                                    </div>


                                    {/* Rating */}
                                    <div className="pt-4">
                                        <label className="block text-sm font-bold text-[#1d1f5a]">
                                            Rate your experience
                                        </label>

                                        <div className="mt-2 flex items-center gap-3">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((value) => (
                                                    <button
                                                        key={value}
                                                        type="button"
                                                        onClick={() => setRating(value)}
                                                        onMouseEnter={() => setRatingHover(value)}
                                                        onMouseLeave={() => setRatingHover(0)}
                                                        className="p-0.5"
                                                        aria-label={`Rate ${value} star`}
                                                    >
                                                        <FaStar
                                                            size={26}
                                                            className="cursor-pointer"
                                                            color={value <= (ratingHover || form.rating) ? "#facc15" : "#e5e7eb"}
                                                        />
                                                    </button>
                                                ))}
                                            </div>

                                            <span className="text-sm text-gray-600">
                                                {form.rating ? `${form.rating} / 5` : "Not Rated"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <label className="flex items-center gap-2 text-sm text-gray-700">
                                            <input
                                                id="agreed"
                                                type="checkbox"
                                                checked={form.agreed}
                                                onChange={(e) => update("agreed", e.target.checked)}
                                            />
                                            By clicking Submit, you agree to our Terms &amp; Conditions and Privacy Policy.
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-end gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={back}
                                            className="border border-gray-800 text-gray-900 font-semibold py-2 px-10 rounded hover:bg-gray-50"
                                        >
                                            Back
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold py-2 px-10 rounded disabled:opacity-60"
                                        >
                                            {submitting ? "Submitting..." : "Submit"}
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}