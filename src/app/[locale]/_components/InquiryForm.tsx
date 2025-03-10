"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FeedbackButton from "../_components/FeedbackButton";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(7, { message: "Invalid phone number" }),
  message: z.string().min(5, { message: "Message is required" }),
  agreement1: z.boolean().refine((val) => val, { message: "You must agree to this" }),
  agreement2: z.boolean().optional(),
  agreement3: z.boolean().optional(),
});
interface InquiryFormProps {
    hideFeedbackButton?: boolean;
  }
type FormData = z.infer<typeof schema>;

const InquiryForm: React.FC<InquiryFormProps> = ({ hideFeedbackButton = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en"; 
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
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("utm_source");
    const currentUrl = window.location.href;

    // Default values for media types
    let mediaType = "129475";
    let mediaName = "165233";
    let propertyCampaignId = "";
    let methodOfContact = "115747";

    switch (source) {
      case "newsletter":
        mediaType = "166277";
        mediaName = "166071";
        propertyCampaignId = "";
        methodOfContact = "MethodOfContactVal";
        break;
      case "sms":
        mediaType = "129474";
        mediaName = "165366";
        methodOfContact = "MethodOfContactVal";
        break;
      case "Google":
      case "google":
        mediaType = "165269";
        mediaName = "128455";
        propertyCampaignId = "";
        methodOfContact = "MethodOfContactVal";
        break;
      default:
        mediaType = "129475";
        mediaName = "165233";
        methodOfContact = "115747";
        break;
    }
    const remarks = `
        Additional consent 1: ${data.agreement1 ? "Yes" : "No"} </br>
        Additional consent 2: ${data.agreement2 ? "Yes" : "No"} </br>
        Additional consent 3: ${data.agreement3 ? "Yes" : "No"} </br>
        Client Name: ${data.firstName} ${data.lastName} </br>
        Client Email: ${data.email} </br>
        Client Phone: ${data.phone} </br>
        Client Message: ${data.message} </br>
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
      PropertyCampaignId: propertyCampaignId,
      contactClassId: "",
    };

    try {
      const response = await fetch("https://api.portal.psi-crm.com/leads?APIKEY=160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });
      
      if (response.ok) {
        setPostId("Success");
        window.location.href = `/${locale}/thankyou?email=${encodeURIComponent(data.email)}`;
    } else {
        alert("Error submitting the form.");
    }
    } catch (error) {
      console.error("Error:", error);
      setPostId("Error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white p-6 rounded-lg">
        {/* Success/Error Messages */}
        {postId === "Success" && <div className="p-3 mb-3 rounded bg-green-500 text-white">Form submitted successfully!</div>}
        {postId === "Error" && <div className="p-3 mb-3 rounded bg-red-500 text-white">Submission failed. Try again.</div>}
        <h2 className="text-lg font-bold mb-4 text-[#111954]">Inquire</h2>
        <div className="mb-3">
          <input
            type="text"
            {...register("firstName")}
            placeholder="First Name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>
        <div className="mb-3">
          <input
            type="text"
            {...register("lastName")}
            placeholder="Last Name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>
        <div className="mb-3">
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="mb-3">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                international
                defaultCountry="AE"
                placeholder="+971-555555555"
                className="w-full p-3 border rounded-md mb-3"
              />
            )}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
        <div className="mb-3">
          <textarea
            {...register("message")}
            placeholder="Hi, I would like to contact you"
            rows={4}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full border border-[#111954] p-3 mb-6 rounded-md text-[#0c1445] bg-[#fff] hover:bg-[#0c1445] hover:text-[#fff] font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <div className="mb-3">
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register("agreement1")} className="rounded border-gray-300" defaultChecked />
            <span className="text-sm">I agree to the Terms & Conditions and Privacy Policy</span>
          </label>
          {errors.agreement1 && <p className="text-red-500 text-sm">{errors.agreement1.message}</p>}
        </div>

        <div className="mb-3">
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register("agreement2")} className="rounded border-gray-300" defaultChecked />
            <span className="text-sm">Agree to receive calls and communications</span>
          </label>
        </div>
        <div className="mb-3">
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register("agreement3")} className="rounded border-gray-300" defaultChecked />
            <span className="text-sm">Receive calls about various projects</span>
          </label>
        </div>
      </form>
      {!hideFeedbackButton && (
        <div className="mt-4">
          <button
            type="button"
            className="w-full bg-[#111954] text-white p-3 rounded-md hover:bg-[#0c1445] transition"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              router.push("/en/customer-feedback");
            }}
          >
            Your Feedback
          </button>
        </div>
      )}
    </>
  );
};

export default InquiryForm;