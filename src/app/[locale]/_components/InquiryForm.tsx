"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";
import { TOKENS } from "@/utils/crmApiHelpers";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";



interface InquiryFormProps {
  hideFeedbackButton?: boolean;
  branchCode?: "auh" | "dxb" | "assets";
}
type BranchCode = NonNullable<InquiryFormProps["branchCode"]>;

const TEST_EMAILS: readonly string[] = [];
const BRANCH_EMAIL_MAP: Record<BranchCode, string> = {
  auh: process.env.NEXT_PUBLIC_EMAIL || "callcenter@psinv.net",
  dxb: process.env.NEXT_PUBLIC_EMAIL_DXB || "callcenter@psidubai.com",
  assets: process.env.NEXT_PUBLIC_EMAIL_ASSETS || "callcenter@psiassets.com",
};

type BranchIds = {
  refto: string;
  refby: string;
  assignto: string;
  CountryID?: string;
  StateID?: string;
  CityID?: string;
  DistrictID?: string;
};

const BRANCH_IDS: Record<BranchCode, BranchIds> = {
  auh: {
    refto: "3458",
    refby: "3458",
    assignto: "3458",
    CountryID: "65946",
    StateID: "91823",
    CityID: "91823",
    DistrictID: "102625",
  },
  dxb: {
    refto: "4421",
    refby: "4421",
    assignto: "4421",
    CountryID: "65948",
    StateID: "63719",
    CityID: "63719",
  },
  assets: {
    refto: "4794",
    refby: "4794",
    assignto: "4794",
    CountryID: "65946",
    StateID: "91823",
    CityID: "91823",
    DistrictID: "102625",
  },
};

function getBranchIds(branchCode: BranchCode) {
  return BRANCH_IDS[branchCode] || BRANCH_IDS.auh;
}

function getReceiverEmail(branchCode: BranchCode) {
  const branchEmail = BRANCH_EMAIL_MAP[branchCode] || BRANCH_EMAIL_MAP.auh;
  return [branchEmail, ...TEST_EMAILS].filter(Boolean).join(",");
}
const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");

const InquiryForm: React.FC<InquiryFormProps> = ({
  hideFeedbackButton = false,
  branchCode = "auh",
}) => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  const t = useTranslations('InquiryFormProject');
  const router = useRouter();
  const schema = z.object({
    firstName: z.string().min(1, { message: t('errors.firstName') }),
    lastName: z.string().min(1, { message: t('errors.lastName') }),
    email: z.string().email({ message: t('errors.email') }),
    phone: z.string().min(7, { message: t('errors.phone') }),
    message: z.string().min(5, { message: t('errors.message') }), // Assuming key 'errors.message' exists or will be added
    agreement1: z.boolean().refine((val) => val, { message: t('errors.agreement1') }), // Assuming key 'errors.agreement1' exists
    agreement2: z.boolean().optional(),
    agreement3: z.boolean().optional(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      agreement1: true,
      agreement2: true,
      agreement3: true,
      phone: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    sendGTMEvent({ event: "Inquiry", value: "1" });
    setIsSubmitting(true);

    const urlParams = new URLSearchParams(window.location.search);
    const source = (urlParams.get("utm_source") || "").toLowerCase();
    const currentUrl = window.location.href;

    let mediaType = "129475";
    let mediaName = "165233";
    let propertyCampaignId = "";
    let methodOfContact = "115747";

    switch (source) {
      case "newsletter":
        mediaType = "166277";
        mediaName = "166071";
        methodOfContact = "MethodOfContactVal";
        break;

      case "sms":
        mediaType = "129474";
        mediaName = "165366";
        methodOfContact = "MethodOfContactVal";
        break;

      case "google":
        mediaType = "165269";
        mediaName = "128455";
        methodOfContact = "MethodOfContactVal";
        break;

      default:
        mediaType = "129475";
        mediaName = "165233";
        methodOfContact = "115747";
        break;
    }

    const remarks = `
      Additional consent 1: ${data.agreement1 ? "Yes" : "No"} <br/>
      Additional consent 2: ${data.agreement2 ? "Yes" : "No"} <br/>
      Additional consent 3: ${data.agreement3 ? "Yes" : "No"} <br/>
      Client Name: ${data.firstName} ${data.lastName} <br/>
      Client Email: ${data.email} <br/>
      Client Phone: ${data.phone} <br/>
      Client Message: ${escapeHtml(data.message)} <br/>
      URL coming from: ${currentUrl}
    `;
    const ids = getBranchIds(branchCode);
    const auhIds = BRANCH_IDS.auh;
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
      CountryID: ids.CountryID ?? auhIds.CountryID,
      StateID: ids.StateID ?? auhIds.StateID,
      CityID: ids.CityID ?? auhIds.CityID,
      DistrictID: ids.DistrictID ?? auhIds.DistrictID,
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
      ReferredToID: ids.refto,
      ReferredByID: ids.refby,
      IsBulkUpload: "",
      ActivityAssignedTo: ids.assignto,
      ActivityDate: "",
      ActivityTypeId: "167234",
      ActivitySubject: "Email Inquiry Copy",
      ActivityRemarks: remarks,
      IsForAutoRotation: "",
      PropertyCampaignId: propertyCampaignId,
      contactClassId: "",
    };

    let apiUrl = "https://api.portal.psi-crm.com/leads";
    let apiKey = TOKENS.PSI;

    if (branchCode === "dxb") {
      apiUrl = "https://api.portal.dubai-crm.com/leads";
      apiKey = TOKENS.DUBAI;
    } else if (branchCode === "assets") {
      apiUrl = "https://portal.psiassets-crm.com/api/leads";
      apiKey = TOKENS.HUBSPOT_ASSETS;
    }
    try {
      const res = await fetch(`${apiUrl}?APIKEY=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSend),
      });

      const result = await res.json().catch(() => null);
      if (res.ok) {
        try {
          const receiver = getReceiverEmail(branchCode);

          const branchLabel =
            branchCode === "auh" ? "AUH" : branchCode === "dxb" ? "Dubai" : "Assets";

          const emailBody = `
      <table style="width:100%; border-collapse:collapse; font-family:Arial, sans-serif; border:1px solid #d9d9d9;">
        <tr>
          <td colspan="2" style="background:#0B4F63; color:#fff; font-weight:700; font-size:18px; padding:12px;">
           Inquiry Page
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
          <td style="border:1px solid #d9d9d9; padding:10px; font-weight:700;">Branch</td>
          <td style="border:1px solid #d9d9d9; padding:10px;">${branchLabel}</td>
        </tr>
        <tr>
          <td style="border:1px solid #d9d9d9; padding:10px; font-weight:700;">Additional Consent</td>
          <td style="border:1px solid #d9d9d9; padding:10px;">
            1: ${data.agreement1 ? "YES" : "NO"} |
            2: ${data.agreement2 ? "YES" : "NO"} |
            3: ${data.agreement3 ? "YES" : "NO"}
          </td>
        </tr>
        <tr>
          <td style="border:1px solid #d9d9d9; padding:10px; font-weight:700;">URL Coming From</td>
          <td style="border:1px solid #d9d9d9; padding:10px;">
            <a href="${window.location.href}">${window.location.href}</a>
          </td>
        </tr>
      </table>
    `;

          const mailRes = await fetch("https://registration.psinv.net/api/sendemail2.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              body: emailBody,
              receiver,
              subject: `Registration Page - ${data.firstName} ${data.lastName}`,
              filename: "",
              filedata: "",
            }),
          });

          const mailText = await mailRes.text();
          console.log("[InquiryForm] sendemail2.php status", mailRes.status, mailText);

          if (!mailRes.ok) console.error("Email API failed:", mailRes.status, mailText);
        } catch (emailErr) {
          console.error("Email failed (non-blocking):", emailErr);
        }

        setPostId("Success");
        window.location.href = `/${locale}/thankyou?email=${encodeURIComponent(data.email)}`;
      } else {
        console.error("CRM error:", res.status, result);
        setPostId("Error");
        alert(t('alerts.error'));
      }
    } catch (error) {
      console.error("Error:", error);
      setPostId("Error");
      alert("Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white p-5">
        {postId === "Success" && (
          <div className="p-3 mb-4 rounded bg-green-500 text-white">
            {t('alerts.success')}
          </div>
        )}
        {postId === "Error" && (
          <div className="p-3 mb-4 rounded bg-red-500 text-white">
            {t('alerts.error')}
          </div>
        )}

        <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">{t('title')}</h2>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                {...register("firstName")}
                placeholder={t('fields.firstName.placeholder')}
                className="w-full border border-gray-300 rounded p-3 text-sm outline-none focus:border-gray-400 focus:ring-0"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                {...register("lastName")}
                placeholder={t('fields.lastName.placeholder')}
                className="w-full border border-gray-300 rounded p-3 text-sm outline-none focus:border-gray-400 focus:ring-0"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <input
              type="email"
              {...register("email")}
              placeholder={t('fields.email.placeholder')}
              className="w-full border border-gray-300 rounded p-3 text-sm outline-none focus:border-gray-400 focus:ring-0"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="border border-gray-300 rounded overflow-hidden">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    international
                    defaultCountry="AE"
                    countryCallingCodeEditable={false}
                    placeholder={t('fields.phone.placeholder')}
                    className="psi-phone-input"
                    value={field.value || ""}
                    onChange={(val) => field.onChange(val || "")}
                  />
                )}
              />
            </div>

            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <textarea
            {...register("message")}
            placeholder={t('fields.message.placeholder')}
            className="w-full border border-gray-300 rounded p-3 text-sm outline-none focus:border-gray-400 focus:ring-0 h-40 resize-none"
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer w-full mt-6 font-bold py-3 rounded-xl border bg-indigo-950 border-indigo-950 text-white hover:bg-indigo-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('buttons.submitting') : t('buttons.submit')}
        </button>

        <div className="text-[10px] text-gray-500 space-y-2 mt-4">
          <p className="italic">
            {t.rich('fineprint.text', {
              terms: (chunks) => <Link href="/terms" className="underline">{chunks}</Link>,
              privacy: (chunks) => <Link href="/privacy" className="underline">{chunks}</Link>
            })}
          </p>

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("agreement1")}
              className="mt-0.5 accent-[#111954]"
              defaultChecked
            />
            <span>
              {t('consents.c1')}

            </span>
          </label>

          {errors.agreement1 && (
            <p className="text-red-500 text-xs">{errors.agreement1.message}</p>
          )}
        </div>
      </form>
    </>
  );
};

export default InquiryForm;
