'use client';

import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
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
interface ContactFormPopUpProps {
  onSaveFormData?: (formData: any) => void;
  isReportDownload?: boolean;
  title?: string;
  submitLabel?: string;
}
type FormData = z.infer<typeof schema>;

const ContactFormPopUp: React.FC<ContactFormPopUpProps> = (props) => {

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
    
      const resText = await response.text(); // helpful for debugging
    
      if (response.ok) {
        console.log("Success:", resText);
        setPostId("Success");
    
        if (props.isReportDownload) {
          window.open("https://drive.google.com/uc?export=download&id=1bfzAozM9M3btdu1CPT3MgrsYlYC2CxoY", "_blank");
          setTimeout(() => {
            window.location.href = `/${locale}/thankyou?email=${encodeURIComponent(data.email)}`;
          }, 1500);
        } else {
          window.location.href = `/${locale}/thankyou?email=${encodeURIComponent(data.email)}`;
        }
      } else {
        console.error("Response not OK:", resText);
        setPostId("Error");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setPostId("Error");
    }
  }  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white p-6 rounded-lg">
        {/* Success/Error Messages */}
        {postId === "Success" && <div className="p-3 mb-3 rounded bg-green-500 text-white">Form submitted successfully!</div>}
        {postId === "Error" && <div className="p-3 mb-3 rounded bg-red-500 text-white">Submission failed. Try again.</div>}
        <h2 className="text-2xl font-semibold text-center mb-4 text-purple-800">
  {props.title || "Inquire"}  {/* Fallback if no title is passed */}
</h2>
  <div className="mb-3">
    <label className="block mb-1 text-sm font-medium text-gray-700">First Name</label>
    <input
      type="text"
      {...register("firstName")}
      placeholder="First Name"
      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
  </div>
  <div className="mb-3">
    <label className="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
    <input
      type="text"
      {...register("lastName")}
      placeholder="Last Name"
      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
  </div>
        <div className="mb-3">
        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="mb-3">
        <label className="block mb-1 text-sm font-medium text-gray-700">Phone number</label>
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
        <button
          type="submit"
          className="w-full border border-[#E46027] p-3 mb-6 rounded-md text-white bg-[#E46027] hover:bg-orange-700 hover:text-white font-semibold"
          disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : (props.submitLabel || "Submit")}
        </button>
        <div className="flex justify-between gap-4 mb-6">
        <a
  href="https://wa.me/97122052888?text=*Property*%0AI%20am%20Interested%20.%20Kindly%20send%20me%20more%20information.%0A%0A"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center w-1/2 p-3 border rounded-md text-black hover:bg-green-100"
>
  <span
    className="w-5 h-5 mr-2"
    dangerouslySetInnerHTML={{
      __html: `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10 19.375C14.8325 19.375 18.75 15.4575 18.75 10.625C18.75 5.79251 14.8325 1.875 10 1.875C5.16751 1.875 1.25 5.79251 1.25 10.625C1.25 12.1943 1.66312 13.6671 2.38655 14.9406L1.25 19.375L5.82179 18.3149C7.06336 18.9909 8.48682 19.375 10 19.375ZM10 18.0288C14.089 18.0288 17.4038 14.714 17.4038 10.625C17.4038 6.53597 14.089 3.22115 10 3.22115C5.91097 3.22115 2.59615 6.53597 2.59615 10.625C2.59615 12.2038 3.09031 13.6672 3.9324 14.8689L3.26923 17.3558L5.79996 16.7231C6.99335 17.5466 8.44036 18.0288 10 18.0288Z" fill="#BFC8D0"></path>
          <path d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C8.4201 17.5 6.9543 17.0115 5.74541 16.1773L3.18182 16.8182L3.8536 14.299C3.00058 13.0817 2.5 11.5993 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" fill="url(#paint0_linear_2027_564)"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18.75C14.8325 18.75 18.75 14.8325 18.75 10C18.75 5.16751 14.8325 1.25 10 1.25C5.16751 1.25 1.25 5.16751 1.25 10C1.25 11.5693 1.66312 13.0421 2.38655 14.3156L1.25 18.75L5.82179 17.6899C7.06336 18.3659 8.48682 18.75 10 18.75ZM10 17.4038C14.089 17.4038 17.4038 14.089 17.4038 10C17.4038 5.91097 14.089 2.59615 10 2.59615C5.91097 2.59615 2.59615 5.91097 2.59615 10C2.59615 11.5788 3.09031 13.0422 3.9324 14.2439L3.26923 16.7308L5.79996 16.0981C6.99335 16.9216 8.44036 17.4038 10 17.4038Z" fill="white"></path>
          <path d="M7.81251 5.93749C7.60447 5.51963 7.28533 5.55662 6.96292 5.55662C6.38673 5.55662 5.48828 6.2468 5.48828 7.53128C5.48828 8.58399 5.95216 9.73633 7.51526 11.4601C9.02378 13.1237 11.0059 13.9843 12.6514 13.955C14.2969 13.9257 14.6354 12.5097 14.6354 12.0315C14.6354 11.8196 14.5039 11.7138 14.4133 11.6851C13.8525 11.416 12.8183 10.9145 12.583 10.8203C12.3477 10.7261 12.2248 10.8535 12.1484 10.9229C11.935 11.1262 11.512 11.7255 11.3672 11.8604C11.2224 11.9952 11.0064 11.9269 10.9166 11.876C10.5859 11.7433 9.68933 11.3445 8.97467 10.6517C8.09083 9.79492 8.03896 9.50015 7.87244 9.23775C7.73922 9.02784 7.83698 8.89905 7.88576 8.84276C8.07619 8.62304 8.33913 8.2838 8.45705 8.11523C8.57496 7.94665 8.48135 7.6907 8.42518 7.53128C8.18361 6.84569 7.97895 6.27178 7.81251 5.93749Z" fill="white"></path>
          <defs>
            <linearGradient id="paint0_linear_2027_564" x1="16.5625" y1="4.375" x2="2.5" y2="17.5" gradientUnits="userSpaceOnUse">
              <stop stop-color="#5BD066"></stop>
              <stop offset="1" stop-color="#27B43E"></stop>
            </linearGradient>
          </defs>
        </svg>
      `,
    }}
  />
  WhatsApp
</a>


<button
  type="button"
  className="flex items-center justify-center w-1/2 p-3 border rounded-md text-black hover:bg-gray-100"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    className="w-5 h-5 mr-2"
  >
    <path
      d="M17.8332 14.1V16.6C17.8341 16.8321 17.7866 17.0618 17.6936 17.2744C17.6006 17.4871 17.4643 17.678 17.2933 17.8349C17.1222 17.9918 16.9203 18.1112 16.7005 18.1856C16.4806 18.2599 16.2477 18.2875 16.0165 18.2666C13.4522 17.988 10.989 17.1118 8.82486 15.7083C6.81139 14.4289 5.10431 12.7218 3.82486 10.7083C2.41651 8.53432 1.54007 6.05914 1.26653 3.48331C1.2457 3.25287 1.27309 3.02061 1.34695 2.80133C1.4208 2.58205 1.53951 2.38055 1.6955 2.20966C1.8515 2.03877 2.04137 1.90224 2.25302 1.80875C2.46468 1.71526 2.69348 1.66686 2.92486 1.66665H5.42486C5.82928 1.66267 6.22136 1.80588 6.528 2.06959C6.83464 2.3333 7.03493 2.69952 7.09153 3.09998C7.19705 3.90003 7.39274 4.68558 7.67486 5.44165C7.78698 5.73992 7.81125 6.06407 7.74478 6.37571C7.67832 6.68735 7.52392 6.9734 7.29986 7.19998L6.24153 8.25831C7.42783 10.3446 9.15524 12.072 11.2415 13.2583L12.2999 12.2C12.5264 11.9759 12.8125 11.8215 13.1241 11.7551C13.4358 11.6886 13.7599 11.7129 14.0582 11.825C14.8143 12.1071 15.5998 12.3028 16.3999 12.4083C16.8047 12.4654 17.1744 12.6693 17.4386 12.9812C17.7029 13.2931 17.8433 13.6913 17.8332 14.1Z"
      stroke="#212529"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  600 548 200
</button>
</div>
        <div className="border border-gray-300 rounded-lg p-5 mb-6">
  {/* Heading */}
  <p className="text-[#111954] text-sm mb-4">
    By clicking Submit, you agree to our{" "}
    <span className="font-semibold underline cursor-pointer">
      Terms & Conditions
    </span>{" "}
    and{" "}
    <span className="font-semibold underline cursor-pointer">
      Privacy Policy
    </span>
  </p>

  {/* Checkbox 1 */}
  <div className="mb-3">
    <label className="flex items-start space-x-2">
      <input
        type="checkbox"
        {...register("agreement1")}
        className="mt-1 rounded border-gray-300"
        defaultChecked
      />
      <span className="text-sm text-[#111954]">
        Agree to receive calls and communications via various channels from PSI from 09:00 am to 09:00 pm
      </span>
    </label>
  </div>

  {/* Checkbox 2 */}
  <div className="mb-3">
    <label className="flex items-start space-x-2">
      <input
        type="checkbox"
        {...register("agreement2")}
        className="mt-1 rounded border-gray-300"
        defaultChecked
      />
      <span className="text-sm text-[#111954]">
        Agree to receive multiple calls and communications via various channels regarding my enquiry
      </span>
    </label>
  </div>

  {/* Checkbox 3 */}
  <div className="mb-3">
    <label className="flex items-start space-x-2">
      <input
        type="checkbox"
        {...register("agreement3")}
        className="mt-1 rounded border-gray-300"
        defaultChecked
      />
      <span className="text-sm text-[#111954]">
        Agree to receive calls and communications via various channels on various projects, products and services
      </span>
    </label>
  </div>
</div>


      </form>
    </>
  );
};

export default ContactFormPopUp;