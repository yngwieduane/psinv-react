"use client";

import { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useRouter } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";
import { useLocale, useTranslations } from "next-intl";
import { resolveUtmCampaignFromSearch } from "@/utils/utmCampaignMap";
import { insertHubspotLead } from "@/utils/crmApiHelpers";
import { MessageCircle, X, Sparkles, Minimize2, Phone, Mail, User, Send } from 'lucide-react';
import Link from "next/link";

interface ContactInquiryFormProps {
  hideFeedbackButton?: boolean;
}

const ContactInquiryForm: React.FC<ContactInquiryFormProps> = ({ hideFeedbackButton = false }) => {
  const router = useRouter(); // not used now but fine to keep
  const locale = useLocale();
  const isRTL = locale.toLowerCase().startsWith("ar");
  const t = useTranslations("ContactInquiryForm");
  const t1 = useTranslations('Common_Form_Agreements');

  // Resolve UTM once (client only)
  const utmResolved = useMemo(() => {
    if (typeof window === "undefined") return null;
    return resolveUtmCampaignFromSearch(window.location.search);
  }, []);

  const schema = useMemo(
    () =>
      z.object({
        firstName: z.string().min(1, { message: t("errors.firstNameRequired") }),
        lastName: z.string().min(1, { message: t("errors.lastNameRequired") }),
        email: z.string().email({ message: t("errors.invalidEmail") }),
        phone: z.string().min(7, { message: t("errors.invalidPhone") }),
        message: z.string().min(5, { message: t("errors.messageRequired") }),
        agreement1: z.boolean().refine((val) => val, { message: t("errors.mustAgree") }),
        agreement2: z.boolean().optional(),
        agreement3: z.boolean().optional(),
      }),
    [t]
  );

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { agreement1: true, agreement2: true, agreement3: true },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    sendGTMEvent({ event: "Inquiry", value: "1" });
    setIsSubmitting(true);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const currentUrl = window.location.href;

      const campaignId = utmResolved?.campaignId || "";
      const campaignRemarks = utmResolved?.campaignRemarks || "";
      const utm = utmResolved?.utm;
      const source = (utm?.utm_source || urlParams.get("utm_source") || "").toLowerCase();
      let campaign = urlParams.get('utm_campaign') || urlParams.get('?utm_campaign') || '';

      let mediaType = "129475";
      let mediaName = "165233";
      let methodOfContact = "115747";
      let propertyCampaignId = campaignId;
      switch (source) {
        case 'HubspotEmail':
        case 'HubSpotEmail':
        case 'hubspotemail':
        case 'hubspotEmail':
        case 'hs_email':
        case 'Hubspot':
        case 'hubspot':
          mediaType = "63906";
          mediaName = "63907";
          break;
        case "newsletter":
          mediaType = "166277";
          mediaName = "166071";
          break;
        case "sms":
          mediaType = "129474";
          mediaName = "165366";
          break;
        case "google":
          mediaType = "165269";
          mediaName = "128455";
          break;
        default:
          mediaType = "129475";
          mediaName = "165233";
          methodOfContact = "115747";
          break;
      }

      switch (campaign) {
        case 'DripCampaign_hubspot':
          propertyCampaignId = "2134";
          break;
        case 'DripCampaign':
          propertyCampaignId = "2134";
          break;
        default:
          propertyCampaignId = propertyCampaignId;
          break;
      }

      const isHubspotMedia = mediaName === '63907';

      const remarks = `
        Additional consent 1: ${data.agreement1 ? "Yes" : "No"} </br>
        Additional consent 2: ${data.agreement2 ? "Yes" : "No"} </br>
        Additional consent 3: ${data.agreement3 ? "Yes" : "No"} </br>
        Client Name: ${data.firstName} ${data.lastName} </br>
        Client Email: ${data.email} </br>
        Client Phone: ${data.phone} </br>
        Client Message: ${data.message} </br>
        Campaign Remarks: ${campaignRemarks || "-"} </br>
        URL coming from: ${currentUrl}
      `;

      const formDataToSend = {
        TitleID: "129932",
        FirstName: data.firstName,
        FamilyName: data.lastName,
        MobileCountryCode: "",
        MobileAreaCode: "",
        MobilePhone: data.phone,
        TelephoneCountryCode: "",
        TelephoneAreaCode: "",
        Telephone: "",
        Email: data.email,
        NationalityID: "65946",
        LanguageID: "115915",
        CompanyID: "",
        Remarks: data.message,
        RequirementType: "91212",
        ContactType: "3",
        CountryID: "65946",
        StateID: "91823",
        CityID: "91823",
        DistrictID: "102625",
        CommunityID: "",
        PropertyID: "",
        UnitType: "19",
        MethodOfContact: methodOfContact,
        MediaType: mediaType,
        MediaName: mediaName,
        DeactivateNotification: "",
        Bedroom: "21935",
        Bathroom: "21935",
        Budget: "100000",
        Budget2: "1000000",
        AreaFrom: "",
        AreaTo: "",
        RequirementCountryID: "65946",
        ExistingClient: "",
        CompaignSource: "",
        CompaignMedium: "",
        Company: "",
        NumberOfEmployee: "",
        LeadStageId: "",
        LeadRatingId: "",
        UnitId: "",
        ReferredToID: "3458",
        ReferredByID: "3458",
        IsBulkUpload: "",
        ActivityAssignedTo: "3458",
        ActivityDate: "",
        ActivityTypeId: "167234",
        ActivitySubject: "Email Inquiry Copy",
        ActivityRemarks: remarks,
        IsForAutoRotation: "",
        PropertyCampaignId: propertyCampaignId || "",
        contactClassId: "",
      };

      let response;

      if (isHubspotMedia) {
        const hubspotResponse = await insertHubspotLead(formDataToSend);

        if (!hubspotResponse.ok) {
          const text = await hubspotResponse.text();
          throw new Error(`HubSpot API error: ${hubspotResponse.status} - ${text}`);
        }
        response = hubspotResponse;
      }
      else {
        response = await fetch(
          "https://api.portal.psi-crm.com/leads?APIKEY=160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formDataToSend),
          }
        );
      }

      if (!response.ok) {
        console.error("CRM lead create failed:", response.status, await response.text().catch(() => ""));
        setPostId("Error");
        alert("Error submitting the form.");
        return;
      }
      const emailBody = `
        <table style="width:100%; border-collapse:collapse; font-family:Arial, sans-serif; border:1px solid #d9d9d9;">
          <tr>
            <td colspan="2" style="background:#0B4F63; color:#fff; font-weight:700; font-size:18px; padding:12px;">
              Contact Us - Inquiry
            </td>
          </tr>

          <tr>
            <td colspan="2" style="background:#B33A2B; color:#fff; font-weight:700; padding:10px;">
              Client Info
            </td>
          </tr>

          <tr>
            <td style="width:35%; border:1px solid #d9d9d9; padding:10px; font-weight:700;">Client Name</td>
            <td style="width:65%; border:1px solid #d9d9d9; padding:10px;">${data.firstName} ${data.lastName}</td>
          </tr>

          <tr>
            <td style="border:1px solid #d9d9d9; padding:10px; font-weight:700;">Client Email</td>
            <td style="border:1px solid #d9d9d9; padding:10px;">${data.email}</td>
          </tr>

          <tr>
            <td style="border:1px solid #d9d9d9; padding:10px; font-weight:700;">Client Phone</td>
            <td style="border:1px solid #d9d9d9; padding:10px;">${data.phone}</td>
          </tr>

          <tr>
            <td style="border:1px solid #d9d9d9; padding:10px; font-weight:700;">Remarks</td>
            <td style="border:1px solid #d9d9d9; padding:10px;">${data.message}</td>
          </tr>
          <tr>
            <td style="border:1px solid #d9d9d9; padding:10px; font-weight:700;">Campaign Remarks</td>
            <td style="border:1px solid #d9d9d9; padding:10px;">${campaignRemarks || "-"}</td>
          </tr>

          <tr>
            <td style="border:1px solid #d9d9d9; padding:10px; font-weight:700;">URL Coming From</td>
            <td style="border:1px solid #d9d9d9; padding:10px;">
              <a href="${currentUrl}">${currentUrl}</a>
            </td>
          </tr>
        </table>
      `;
      try {
        const receiver = ["wd3@psinv.net", process.env.NEXT_PUBLIC_EMAIL || "callcenter@psinv.net"]
          .filter(Boolean)
          .join(",");

        const mailRes = await fetch("https://registration.psinv.net/api/sendemail2.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            body: emailBody,
            receiver,
            subject: `Contact Us - Inquiry - ${data.firstName} ${data.lastName}`,
            filename: "",
            filedata: "",
          }),
        });

        const mailText = await mailRes.text();
        console.log("[ContactInquiryForm] sendemail2.php", mailRes.status, mailText);
        if (!mailRes.ok) console.error("Email API failed:", mailRes.status, mailText);
      } catch (emailErr) {
        console.error("Email failed (non-blocking):", emailErr);
      }
      setPostId("Success");
      window.location.href = `/${locale}/thankyou?email=${encodeURIComponent(data.email)}`;
    } catch (error) {
      console.error("Error:", error);
      setPostId("Error");
      alert("Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} dir={isRTL ? "rtl" : "ltr"} className="w-full bg-white dark:bg-transparent">
      {postId === "Success" && (
        <div className="p-3 mb-4 rounded bg-green-500 text-white">{t("alerts.success")}</div>
      )}
      {postId === "Error" && (
        <div className="p-3 mb-4 rounded bg-red-500 text-white">{t("alerts.error")}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            {...register("firstName")}
            placeholder={t("placeholders.firstName")}
            className={`w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0c1445]/10 focus:border-[#0c1445] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${isRTL ? "text-right" : ""
              }`}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>

        <div>
          <input
            type="text"
            {...register("lastName")}
            placeholder={t("placeholders.lastName")}
            className={`w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0c1445]/10 focus:border-[#0c1445] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${isRTL ? "text-right" : ""
              }`}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>

        <div>
          <input
            type="email"
            {...register("email")}
            placeholder={t("placeholders.email")}
            className={`w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0c1445]/10 focus:border-[#0c1445] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${isRTL ? "text-right" : ""
              }`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <div className="mb-3">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <div dir="ltr">
                  <PhoneInput
                    {...field}
                    international
                    defaultCountry="AE"
                    countryCallingCodeEditable={false}
                    placeholder={t("placeholders.phone")}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0c1445]/10 focus-within:border-[#0c1445] PhoneInput dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              )}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="mt-4 mb-4">
        <textarea
          {...register("message")}
          placeholder={t("placeholders.message")}
          className={`w-full border bg-gray-50 border border-gray-100 rounded p-3 text-sm outline-none focus:border-gray-400 focus:ring-0 h-40 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${isRTL ? "text-right" : ""
            }`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0c1445] hover:bg-[#0c1445]/90 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed dark:shadow-none dark:border dark:border-white/10"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Send Message
            <Send size={16} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <div className="text-[10px] text-gray-500 space-y-2 mt-4 dark:text-gray-400">
        <div className="my-3">
          <label className="flex items-center space-x-2">
            <span className="text-sm">{t1('byclickingsubmit.part1')} <Link href="/en/terms" title="terms">{t1('byclickingsubmit.terms')}</Link> {t1('byclickingsubmit.and')} <Link href="/en/privacy" title="privacy">{t1('byclickingsubmit.privacy')}</Link></span>
          </label>
        </div>

        {errors.agreement1 && <p className="text-red-500 text-xs">{errors.agreement1.message}</p>}
      </div>
    </form>
  );
};

export default ContactInquiryForm;
