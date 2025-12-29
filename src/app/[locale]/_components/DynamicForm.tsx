"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

// Define Schema (Only `propertyListing` Now)
const propertyListingSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(7, { message: "Invalid phone number" }),
  propertyPurpose: z.string().min(1, { message: "Property purpose is required" }),
  agreement1: z.boolean().optional(),
  agreement2: z.boolean().optional(),
  agreement3: z.boolean().optional(),
});

type PropertyListingFormData = z.infer<typeof propertyListingSchema>;

interface DynamicFormProps {
  formType: "propertyListing"; // Ensure it's explicitly defined
}

const DynamicForm = ({ formType }: DynamicFormProps) => { 
    const locale = useLocale();
    const isRTL = locale.toLowerCase().startsWith("ar");    
    const t = useTranslations("ListPropertyForm"); 
    const agreements_t = useTranslations("Common_Form_Agreements");

    const propertyListingSchema = z.object({
      firstName: z.string().min(1, { message: t("errors.firstNameRequired") }),
      lastName: z.string().min(1, { message: t("errors.lastNameRequired") }),
      email: z.string().email({ message: t("errors.invalidEmail") }),
      phone: z.string().min(7, { message: t("errors.invalidPhone") }),
      propertyPurpose: z.string().min(1, { message: t("errors.choosePurpose") }),
      agreement1: z.boolean().optional(),
      agreement2: z.boolean().optional(),
      agreement3: z.boolean().optional(),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PropertyListingFormData>({
    resolver: zodResolver(propertyListingSchema),
    defaultValues: {
      agreement1: true,
      agreement2: true,
      agreement3: true
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: PropertyListingFormData) => {
    setIsSubmitting(true);
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("utm_source") || "default";
    const currentUrl = window.location.href;
    let propertyCampaignId = "";
    const mediaMappings: Record<string, { mediaType: string; mediaName: string; methodOfContact: string }> = {
      newsletter: { mediaType: "166277", mediaName: "166071", methodOfContact: "MethodOfContactVal" },
      sms: { mediaType: "129474", mediaName: "165366", methodOfContact: "MethodOfContactVal" },
      google: { mediaType: "165269", mediaName: "128455", methodOfContact: "MethodOfContactVal" },
      default: { mediaType: "129475", mediaName: "165233", methodOfContact: "115747" },
    };

    const { mediaType, mediaName, methodOfContact } = mediaMappings[source.toLowerCase()] || mediaMappings.default;

    const remarks = `
      Additional consent 1: ${data.agreement1 ? "Yes" : "No"} </br>
      Additional consent 2: ${data.agreement2 ? "Yes" : "No"} </br>
      Additional consent 3: ${data.agreement3 ? "Yes" : "No"} </br>
      Client Name: ${data.firstName} ${data.lastName} </br>
      Client Email: ${data.email} </br>
      Client Phone: ${data.phone} </br>
      Purpose: ${data.propertyPurpose} </br>
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
      Remarks: remarks,
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
      PropertyCampaignId: propertyCampaignId,
      contactClassId: "",
    };
    const apiUrl = `https://api.portal.psi-crm.com/leads?APIKEY=${process.env.NEXT_PUBLIC_API_KEY}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataToSend),
    });

    console.log("Response Status:", response.status);

    if (!response.ok) {
      let errorMessage = "Error submitting the form.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (err) {
        console.warn("Response is not JSON format.");
      }
      alert(`Error: ${errorMessage}`);
      return;
    }

    console.log("Form submitted successfully.");
    window.location.href = `/${locale}/thankyou?email=${encodeURIComponent(data.email)}`;
  } 
  catch (error) {
    console.error("Fetch Error:", error);
    alert("Network error. Please try again.");
  } 
  finally {
    setIsSubmitting(false);
  }
};
      
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">{t("firstName")}</label>
          <input {...register("firstName")} placeholder={t("Enter First Name")} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-secondary focus:bg-white focus:ring-0 transition-all" />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>
        <div className="w-1/2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">{t("lastName")}</label>
          <input {...register("lastName")} placeholder={t("Enter Last Name")} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-secondary focus:bg-white focus:ring-0 transition-all" />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>
      </div>

      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">{t("email")}</label>
      <input {...register("email")} placeholder={t("Enter Email")} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-secondary focus:bg-white focus:ring-0 transition-all" />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">{t("phone")}</label>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => <PhoneInput {...field} dir={isRTL ? "rtl" : "ltr"} international defaultCountry="AE" className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-secondary focus:bg-white focus:ring-0 transition-all" aria-label="Phone Number"/>}
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">{t("purpose")} *</label>
      <select {...register("propertyPurpose")} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-secondary focus:bg-white focus:ring-0 transition-all" aria-label="Property Purpose">
        <option value="">{t("Choose purpose")}</option>
        <option value="sell">{t("sell_purpose")}</option>
        <option value="rent">{t("rent_purpose")}</option>
        <option value="invest">{t("invest_purpose")}</option>
      </select>
      {errors.propertyPurpose && <p className="text-red-500 text-sm">{errors.propertyPurpose.message}</p>}

      <button type="submit" className="w-full relative text-md overflow-hidden rounded bg-orange-700 px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer" disabled={isSubmitting}>
        {isSubmitting ? t("form_submitting") : t("form_submit")}
      </button>

      <p className="text-[10px] text-gray-400 mt-2">
        {t("clickingTerms.part1")} <Link href={`${locale}/terms`} className="text-blue-600">{t("clickingTerms.part2")}</Link> {t("clickingTerms.part3")}
      </p>

      <div className="space-y-2 mt-4 text-[10px] text-gray-400">
        <label className="flex items-start gap-2">
          <input type="checkbox" {...register("agreement1")} className="mt-0.5 accent-secondary w-4 h-4 border-gray-300 rounded defaultChecked" />
          <span>{agreements_t("agreement1")}</span>
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" {...register("agreement2")} className="mt-0.5 accent-secondary w-4 h-4 border-gray-300 rounded defaultChecked" />
          <span>{agreements_t("agreement2")}</span>
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" {...register("agreement3")} className="mt-0.5 accent-secondary w-4 h-4 border-gray-300 rounded defaultChecked" />
          <span>{agreements_t("agreement3")}</span>
        </label>
      </div>
    </form>
  );
};

export default DynamicForm;
