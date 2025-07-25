"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import clsx from "clsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectMetaMap } from '@/utils/projectMeta';
import { RegistrationFormPayload } from '@/types/registrationTypes';

const languageMap: Record<string, string> = {
  en: "115915", // English
  ar: "115911", // Arabic
  ru: "115925", // Russian
  sr: "115926", // Serbian
  fr: "115916", // French
  de: "115917", // German
  es: "115928", // Spanish
  zh: "115913", // Chinese
  it: "115921", // Italian
  tr: "115930", // Turkish
  nl: "115914", // Dutch
};

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(7, { message: "Invalid phone number" }),
  consent1: z.boolean().optional(),
  consent2: z.boolean().optional(),
  consent3: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

type RegistrationFormProps = {
  slug: string;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({ slug }) => {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const getSubmitKey = (email: string, slug: string) => `lastSubmit:${email}:${slug}`;

  const hasRecentlySubmitted = (email: string, slug: string): boolean => {
    const key = getSubmitKey(email, slug);
    const lastSubmission = localStorage.getItem(key);
    if (!lastSubmission) return false;

    const now = Date.now();
    const lastTime = parseInt(lastSubmission, 10);

    return now - lastTime < 300000;
  };

  const markAsSubmitted = (email: string, slug: string): void => {
    const key = getSubmitKey(email, slug);
    localStorage.setItem(key, Date.now().toString());
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);

    const utmKeys = ["utm_source", "utm_medium", "utm_campaign"];

    utmKeys.forEach((key) => {
      const value = params.get(key);
      if (value && !localStorage.getItem(key)) {
        localStorage.setItem(key, value);
      }
    });
  }, []);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const utm_campaign = useMemo(() => {
    return (
      searchParams.get("utm_campaign") ||
      localStorage.getItem("utm_campaign") ||
      ""
    );
  }, [searchParams]);

  const onSubmit = async (data: FormData) => {
    if (hasRecentlySubmitted(data.email, slug)) {
      alert(
        locale === "ar"
          ? "لقد أرسلت هذا النموذج مؤخرًا. يرجى المحاولة مرة أخرى بعد بضع دقائق."
          : "You’ve already submitted this form recently. Please try again in a few minutes."
      );
      return;
    }
    const projectMeta = projectMetaMap[slug] || {};
    const utmRawMeta = projectMeta?.utmMetaMap?.[utm_campaign] || {};

    const utmMeta: {
      MediaType?: number;
      MediaName?: number;
      MethodOfContact?: number;
    } = {
      MediaType: utmRawMeta.media_Type,
      MediaName: utmRawMeta.media_Name,
      MethodOfContact: utmRawMeta.MethodOfContactVal,
    };


    function stripDirectionChars(input: string): string {
      return input.replace(/[\u202A-\u202E]/g, '');
    }
    const fullRemark = `
Additional consent 1 : ${data.consent1 ? "YES" : "NO"}</br>
Additional consent 2 : ${data.consent2 ? "YES" : "NO"}</br>
Additional consent 3 : ${data.consent3 ? "YES" : "NO"}</br>
Remarks: ${projectMeta?.utmRemarksMap?.[utm_campaign] || projectMeta?.remarks || ''}</br>
Client Name: ${data.firstName} ${data.lastName}</br>
Client Email: ${data.email}</br>
Client Phone: ${data.phone}</br>
branch: ${projectMeta?.Branch || ''}</br>
URL coming from: ${window?.location?.href}`;
    const formDataToSend: RegistrationFormPayload & {
      slug: string;
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
    } = {
      TitleID: "129932",
      FirstName: data.firstName,
      FamilyName: data.lastName,
      MobileCountryCode: "971",
      MobileAreaCode: "",
      MobilePhone: data.phone,
      TelephoneCountryCode: "",
      TelephoneAreaCode: "",
      Telephone: "",
      Email: data.email,
      NationalityID: "65946",
      LanguageID: languageMap[locale] || "115915", // Default to English
      CompanyID: "",
      Remarks: projectMeta?.utmRemarksMap?.[utm_campaign] || projectMeta?.remarks || '',
      RequirementType: projectMeta.RequirementType || 91212,
      ContactType: projectMeta.ContactType,
      CountryID: projectMeta.CountryID,
      StateID: projectMeta.StateID,
      CityID: projectMeta.CityID,
      DistrictID: projectMeta.DistrictID || "",
      CommunityID: projectMeta.CommunityID ?? undefined,
      SubCommunityID: projectMeta.SubCommunityID ?? undefined,
      PropertyID: projectMeta.PropertyID,
      UnitType: projectMeta.UnitType,
      MediaType: (utmMeta?.MediaType || projectMeta.media_Type) ?? 0,
      MediaName: (utmMeta?.MediaName || projectMeta.media_Name) ?? 0,
      MethodOfContact: (utmMeta?.MethodOfContact || projectMeta.MethodOfContactVal) ?? 0,
      DeactivateNotification: "",
      Bedroom: projectMeta.Bedroom || "21935",
      Bathroom: projectMeta.Bathroom || "21935",
      Budget: projectMeta.Budget || "100000",
      Budget2: projectMeta.Budget2 || "1000000",
      AreaFrom: "300",
      RequirementCountryID: projectMeta.CountryID,
      ExistingClient: "",
      CompaignSource: "",
      CompaignMedium: "",
      Company: "",
      NumberOfEmployee: "",
      LeadStageId: "",
      LeadRatingId: "",
      UnitId: "",
      ReferredToID: projectMeta.ReferredToID || "3458",
      ReferredByID: projectMeta.ReferredByID || "3458",
      ActivityAssignedTo: projectMeta.ActivityAssignedTo || "3458",
      ActivityDate: "",
      ActivityTypeId: "167234",
      ActivitySubject: "Email Inquiry Copy",
      ActivityRemarks: stripDirectionChars(fullRemark),
      IsForAutoRotation: "true",
      PropertyCampaignId: (projectMeta.utmCampaignMap?.[utm_campaign]) || projectMeta.PropertyCampaignId,
      google_gclid: projectMeta?.gclid || '',
      slug,
      utm_campaign: searchParams.get("utm_campaign") || localStorage.getItem("utm_campaign") || "",
      utm_source: searchParams.get("utm_source") || localStorage.getItem("utm_source") || "",
      utm_medium: searchParams.get("utm_medium") || localStorage.getItem("utm_medium") || "",
    };

    try {
      const response = await fetch('/api/external/registration', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSend),
      });
      const responseData = await response.json();
      if (response.ok) {
        setSuccessMessage("Thank you for your inquiry. We will contact you soon.");
        setTimeout(() => {
          window.location.href = `/${locale}/thankyou?email=${encodeURIComponent(data.email)}`;
        }, 2000);
      } else {
        alert("Error submitting the form.");
      }
    } catch (error: unknown) {
      const err = error as Error;
      alert(`Submission failed.`);
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {successMessage && (
        <div
          className={clsx(
            "col-span-full mb-4 rounded-md border border-green-300 bg-green-100 px-4 py-3 text-sm text-green-800 shadow-sm",
            locale === "ar" && "text-right"
          )}
        >
          {locale === "ar"
            ? "شكرًا لاستفسارك. سنتواصل معك قريبًا."
            : "Thank you for your inquiry. We will contact you soon."}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={clsx(
          "grid grid-cols-1 md:grid-cols-2 gap-4",
          locale === "ar" && "text-right rtl",
          isSubmitting && "opacity-60 pointer-events-none"
        )}
      >
        <div>
          <label className="label-required">{locale === "ar" ? "الاسم الأول" : "First Name"}</label>
          <input
            {...register("firstName")}
            type="text"
            className={clsx("w-full px-3 py-2 border border-[#cecfd0] rounded-[7px] placeholder-[#A6A6A6]", locale === "ar" && "text-right")}
            placeholder={locale === "ar" ? "الاسم الأول" : "First Name"}
          />
          {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="label-required">{locale === "ar" ? "الاسم الأخير" : "Last Name"}</label>
          <input
            {...register("lastName")}
            type="text"
            className={clsx("w-full px-3 py-2 border border-[#cecfd0] rounded-[7px] placeholder-[#A6A6A6]", locale === "ar" && "text-right")}
            placeholder={locale === "ar" ? "الاسم الأخير" : "Last Name"}
          />
          {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
        </div>
        <div>
          <label className="label-required">{locale === "ar" ? "رقم الهاتف" : "Mobile Number"}</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                international
                defaultCountry="AE"
                className={clsx("w-full px-3 py-2 border border-[#cecfd0] rounded-[7px] placeholder-[#A6A6A6]", locale === "ar" && "text-right")}
                placeholder="+971-555555555"
              />
            )}
          />
          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="label-required">{locale === "ar" ? "الإيميل" : "Email"}</label>
          <input
            {...register("email")}
            type="email"
            className={clsx("w-full px-3 py-2 border border-[#cecfd0] rounded-[7px] placeholder-[#A6A6A6]", locale === "ar" && "text-right")}
            placeholder="email@example.com"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="col-span-full space-y-2 mt-4 text-sm">
          <label className="block">
            <input type="checkbox" defaultChecked className="mr-2" {...register("consent1")} />
            Agree to receive calls and communications via various channels from PSI from 09:00 am to 09:00 pm
          </label>
          <label className="block">
            <input type="checkbox" defaultChecked className="mr-2" {...register("consent2")} />
            Agree to receive multiple calls and communications via various channels regarding my enquiry
          </label>
          <label className="block">
            <input type="checkbox" defaultChecked className="mr-2" {...register("consent3")} />
            Agree to receive calls and communications via various channels on various projects, products, and services
          </label>
        </div>
        <div className="col-span-full text-xs text-gray-500 mt-4">
          <p className="italic">
            {locale === "ar" ? "بالنقر على إرسال، فإنك توافق على " : "By clicking Submit, you agree to our "}
            <a href={`/${locale}/terms`} className="underline">
              {locale === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
            </a>
            {locale === "ar" ? " و " : " and "}
            <a href={`/${locale}/privacy`} className="underline">
              {locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </a>
          </p>
        </div>
        <div className="col-span-full mt-4">
          <button type="submit" className="bg-black text-white px-6 py-2 hover:bg-gray-800" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : locale === "ar" ? "إرسال" : "Submit"}
          </button>

        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
