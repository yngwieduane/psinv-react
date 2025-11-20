"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { usePathname } from "next/navigation";

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
    const pathname = usePathname();
    const locale = pathname.split("/")[1] || "en"; 
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
          <label className="block mb-1 text-sm font-medium">First Name</label>
          <input {...register("firstName")} placeholder="Enter First Name" className="w-full border p-3 rounded" />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>
        <div className="w-1/2">
          <label className="block mb-1 text-sm font-medium">Last Name</label>
          <input {...register("lastName")} placeholder="Enter Last Name" className="w-full border p-3 rounded" />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>
      </div>

      <label className="block mb-1 text-sm font-medium">Email</label>
      <input {...register("email")} placeholder="Enter Email" className="w-full border p-3 rounded" />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <label className="block mb-1 text-sm font-medium">Phone Number</label>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => <PhoneInput {...field} international defaultCountry="AE" className="w-full border p-3 rounded" aria-label="Phone Number"/>}
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

      <label className="block mb-1 text-sm font-medium">Property Purpose *</label>
      <select {...register("propertyPurpose")} className="w-full border p-3 rounded" aria-label="Property Purpose">
        <option value="">Choose purpose</option>
        <option value="sell">Sell</option>
        <option value="rent">Rent</option>
        <option value="invest">Invest</option>
      </select>
      {errors.propertyPurpose && <p className="text-red-500 text-sm">{errors.propertyPurpose.message}</p>}

      <button type="submit" className="w-full relative text-xl overflow-hidden rounded bg-orange-700 px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      <p className="text-gray-600 text-sm mt-2 italic">
        By clicking Submit, you agree to our <a href="#" className="text-blue-600">Terms & Conditions</a> and Privacy Policy
      </p>

      <div className="space-y-2 mt-4 text-[12px]">
        <label className="flex items-start gap-2">
          <input type="checkbox" {...register("agreement1")} className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded defaultChecked" />
          <span>Agree to receive calls and communications via various channels from PSI from 09:00 am to 09:00 pm</span>
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" {...register("agreement2")} className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded defaultChecked" />
          <span>Agree to receive multiple calls and communications via various channels regarding my enquiry</span>
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" {...register("agreement3")} className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded defaultChecked" />
          <span>Agree to receive calls and communications via various channels on various projects, products, and services</span>
        </label>
      </div>
    </form>
  );
};

export default DynamicForm;
