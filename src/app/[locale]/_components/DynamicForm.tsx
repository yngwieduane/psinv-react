"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { config } from "process";
import { insertHubspotLead } from "@/utils/crmApiHelpers";
import { UserIcon, EmailIcon } from "./FormIcons";
import { Send } from "lucide-react";

// Define Schema (Only `propertyListing` Now)
const propertyListingSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(7, { message: "Invalid phone number" }),
  propertyPurpose: z.string().min(1, { message: "Property purpose is required" }),
});

type PropertyListingFormData = z.infer<typeof propertyListingSchema>;

interface DynamicFormProps {
  formType: "propertyListing"; // Ensure it's explicitly defined
  city?: string;
}

const CITY_CONFIG: Record<string, { email: string; apiUrl: string; referredTo?: number; referredBy?: number; assignedTo?: number; cityVal: number; placeholder_property: string; }> = {
  'Dubai': {
    email: 'callcenter@psidubai.com, yngwie.g@psinv.net',
    apiUrl: 'https://api.portal.dubai-crm.com/leads?APIKEY=d301dba69732065cd006f90c6056b279fe05d9671beb6d29f2d9deb0206888c38239a3257ccdf4d0',
    referredTo: 4421,
    referredBy: 4421,
    assignedTo: 4421,
    cityVal: 91578,
    placeholder_property: '301813',
  },
  'Abu Dhabi': {
    email: 'callcenter@psinv.net, yngwie.g@psinv.net',
    apiUrl: 'https://api.portal.psi-crm.com/leads?APIKEY=160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a',
    referredTo: 3458,
    referredBy: 3458,
    cityVal: 91823,
    placeholder_property: '20392',
  },
  'DEFAULT': {
    email: 'callcenter@psinv.net, yngwie.g@psinv.net',
    apiUrl: 'https://api.portal.psi-crm.com/leads?APIKEY=160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a',
    referredTo: 3458,
    referredBy: 3458,
    cityVal: 91823,
    placeholder_property: '',
  }
};

const getCityConfig = (cityName: string) => {
  if (['Dubai', 'Sharjah'].includes(cityName)) {     //If Sharjah, use DUbai CRM
    return CITY_CONFIG['Dubai'];
  }
  return CITY_CONFIG[cityName] || CITY_CONFIG['DEFAULT'];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formType, city }) => {
  const locale = useLocale();
  const isRTL = locale.toLowerCase().startsWith("ar");
  const t = useTranslations("ListPropertyForm");
  const t_agreement = useTranslations('Common_Form_Agreements');

  const propertyListingSchema = z.object({
    firstName: z.string().min(1, { message: t("errors.firstNameRequired") }),
    lastName: z.string().min(1, { message: t("errors.lastNameRequired") }),
    email: z.string().email({ message: t("errors.invalidEmail") }),
    phone: z.string().min(7, { message: t("errors.invalidPhone") }),
    propertyPurpose: z.string().min(1, { message: t("errors.choosePurpose") }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PropertyListingFormData>({
    resolver: zodResolver(propertyListingSchema),
    defaultValues: {

    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const cityConfig = getCityConfig(city ?? 'Abu Dhabi');

  const onSubmit = async (data: PropertyListingFormData) => {
    setIsSubmitting(true);
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("utm_source") || "default";
    let campaign = urlParams.get('utm_campaign') || urlParams.get('?utm_campaign') || '';
    const currentUrl = window.location.href;
    let propertyCampaignId = "";
    const mediaMappings: Record<string, { mediaType: string; mediaName: string; methodOfContact: string }> = {
      newsletter: { mediaType: "166277", mediaName: "166071", methodOfContact: "MethodOfContactVal" },
      sms: { mediaType: "129474", mediaName: "165366", methodOfContact: "MethodOfContactVal" },
      google: { mediaType: "165269", mediaName: "128455", methodOfContact: "MethodOfContactVal" },
      default: { mediaType: "129475", mediaName: "165233", methodOfContact: "115747" },
    };

    let { mediaType, mediaName, methodOfContact } = mediaMappings[source.toLowerCase()] || mediaMappings.default;

    let ReferredToID = cityConfig.referredTo ?? '3458';
    let ReferredByID = cityConfig.referredBy ?? '3458';
    let ActivityAssignedTo = cityConfig.referredBy ?? '3458';
    let contactType, requirementType, Budget, Budget2, propertyId;

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
        propertyCampaignId = "";
        methodOfContact = methodOfContact;
        break;
      case "newsletter":
        mediaType = "166277";
        mediaName = "166071";
        propertyCampaignId = "";
        methodOfContact = methodOfContact;
        break;
      case "sms":
        mediaType = "129474";
        mediaName = "165366";
        methodOfContact = methodOfContact;
        break;
      case "Google":
      case "google":
        mediaType = "165269";
        mediaName = "128455";
        propertyCampaignId = "";
        methodOfContact = methodOfContact;
        break;
      default:
        mediaType = "129475";
        mediaName = "165233";
        methodOfContact = "115747";
        break;
    }

    switch (campaign) {
      case 'Luxury_Projects_Campaign':
        propertyCampaignId = "2178";
        break;
      default:
        propertyCampaignId = propertyCampaignId;
        break;
    }

    switch (data.propertyPurpose) {
      case 'sell':
        contactType = "1";
        requirementType = "91212";
        Budget = "427";
        Budget2 = "1335";
        propertyId = cityConfig.placeholder_property;
        break;

      case 'rent':
        contactType = "4";
        requirementType = "91213";
        Budget = "234";
        Budget2 = "1661";
        propertyId = cityConfig.placeholder_property;
        break;

      case 'manage':
        contactType = "1";
        requirementType = "91212";
        Budget = "427";
        Budget2 = "1335";
        propertyId = cityConfig.placeholder_property;
        break;

      default:
        contactType = "1";
        requirementType = "91212";
        Budget = "427";
        Budget2 = "1335";
        propertyId = cityConfig.placeholder_property;
        break;
    }

    const isHubspotMedia = mediaName === '63907';

    const remarks = `      
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
      RequirementType: requirementType,
      ContactType: contactType,
      CountryID: "65946",
      StateID: cityConfig.cityVal,
      CityID: cityConfig.cityVal,
      DistrictID: "",
      CommunityID: "",
      PropertyID: propertyId,
      UnitType: "19",
      MethodOfContact: methodOfContact,
      MediaType: mediaType,
      MediaName: mediaName,
      DeactivateNotification: "",
      Bedroom: "21935",
      Bathroom: "21935",
      Budget: Budget,
      Budget2: Budget2,
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
      ReferredToID: ReferredToID,
      ReferredByID: ReferredByID,
      IsBulkUpload: "",
      ActivityAssignedTo: ActivityAssignedTo,
      ActivityDate: "",
      ActivityTypeId: "167234",
      ActivitySubject: "Email Inquiry Copy",
      ActivityRemarks: remarks,
      IsForAutoRotation: "",
      PropertyCampaignId: propertyCampaignId,
      contactClassId: "",
    };
    const apiUrl = cityConfig.apiUrl;

    try {
      if (isHubspotMedia) {
        const hubspotResponse = await insertHubspotLead(formDataToSend);

        if (!hubspotResponse.ok) {
          const text = await hubspotResponse.text();
          throw new Error(`HubSpot API error: ${hubspotResponse.status} - ${text}`);
        }

      }
      else {
        await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formDataToSend),
        });
      }

      const mailRes = await fetch("https://registration.psinv.net/api/sendemail2.php", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: `
            <table cellpadding="0" cellspacing="0" width="550" align="center">
                <tbody>
                    <tr>
                        <td align="center" height="80" style="text-align:center;" width="550" bgcolor="#FFFFFF"></td>
                    </tr>
                    <tr>
                        <td height="10" bgcolor="#02344a"></td>
                    </tr>
                    <tr>
                        <td height="30" style="color:#fff; font-size:16px; background:#02344a; font-weight:bold; padding:0 10px; font-family:Arial, Helvetica, sans-serif">
                            List Your Property Inquiry Form - ${currentUrl}
                        </td>
                    </tr>
                    <tr>
                        <td height="10" bgcolor="#02344a"></td>
                    </tr>
                    <tr>
                        <td>
                            <table width="100%" cellspacing="3" cellpadding="5" style="border:1px solid #e8e6e6">
                                <tbody>
                                    <tr>
                                        <td width="150" style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Client Name:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.firstName} ${data.lastName}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Email:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.email}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Phone:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.phone}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Purpose:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.propertyPurpose}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">URL:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${currentUrl}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
          `,
          receiver: cityConfig.email,
          subject: "New Inquiry - Property Shop Investment - List Property",
          filename: "",
          filedata: ""
        })
      });


      if (!mailRes.ok) {
        let errorMessage = "Error submitting the form.";
        try {
          const errorData = await mailRes.json();
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
          <div className="relative space-y-1">
            <UserIcon />
            <input
              {...register("firstName")}
              placeholder={t("firstName")}
              className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0c1445]/10 focus:border-[#0c1445] dark:focus:ring-white/10 dark:focus:border-white dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
            />
          </div>
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>
        <div className="w-1/2">
          <div className="relative space-y-1">
            <input
              {...register("lastName")}
              placeholder={t("lastName")}
              className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0c1445]/10 focus:border-[#0c1445] dark:focus:ring-white/10 dark:focus:border-white dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
            />
          </div>
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="relative space-y-1">
        <EmailIcon />
        <input
          {...register("email")}
          placeholder={t("email")}
          className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0c1445]/10 focus:border-[#0c1445] dark:focus:ring-white/10 dark:focus:border-white dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
        />
      </div>
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <PhoneInput
            {...field}
            dir={isRTL ? "rtl" : "ltr"}
            international
            defaultCountry="AE"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus-within:ring-2 focus-within:ring-[#0c1445]/10 focus-within:border-[#0c1445] dark:focus-within:ring-white/10 dark:focus-within:border-white dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
            aria-label="Phone Number"
            numberInputProps={{
              className: "w-full bg-transparent focus:outline-none text-sm placeholder:text-gray-400"
            }}
          />
        )}
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

      <select
        {...register("propertyPurpose")}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0c1445]/10 focus:border-[#0c1445] dark:focus:ring-white/10 dark:focus:border-white dark:bg-neutral-800 dark:border-neutral-700 dark:text-white transition-all"
        aria-label="Property Purpose"
      >
        <option value="">{t("purpose")}</option>
        <option value="sell">{t("sell_purpose")}</option>
        <option value="rent">{t("rent_purpose")}</option>
        <option value="manage">{t("manage_purpose")}</option>
      </select>
      {errors.propertyPurpose && <p className="text-red-500 text-sm">{errors.propertyPurpose.message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mb-5 bg-[#0c1445] hover:bg-[#0c1445]/90 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            {t("form_submit")}
            <Send size={16} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <div className="my-3">
        <label className="flex items-center space-x-2">
          <span className="text-[10px] text-gray-500 space-y-2 mt-4 italic">{t_agreement('byclickingsubmit.part1')} <Link href="/terms" title="terms" className="underline">{t_agreement('byclickingsubmit.terms')}</Link> {t_agreement('byclickingsubmit.and')} <Link href="/privacy" title="privacy" className="underline">{t_agreement('byclickingsubmit.privacy')}</Link></span>
        </label>
      </div>

    </form>
  );
};

export default DynamicForm;
