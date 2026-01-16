"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { sendGTMEvent } from '@next/third-parties/google'
import { insertPSILead } from "@/utils/crmApiHelpers";
import Link from "next/link";

interface Props {
  project?: any;
  location?: string;
  downloadIntent: boolean;
  onSuccessDownload?: (url: string) => void;
}

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(7, { message: "Invalid phone number" }),
  agreement1: z.boolean().refine((val) => val, { message: "You must agree to this" }),
  agreement2: z.boolean().optional(),
  agreement3: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const LuxuryInquireForm = ({ project, location, downloadIntent, onSuccessDownload }: Props) => {
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
    sendGTMEvent({ event: 'Inquiry', value: '1' })
    setIsSubmitting(true);
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("utm_source");
    const currentUrl = window.location.href;
    let sendtomail = 'callcenter@psinv.net';
    const locationVal = project?.proj_location?.toLowerCase() || location?.toLowerCase() || '';
    const projectType = project?.type || 'Apartment';
    const projectName = project?.name || '';
    const projectId = project?.id || '';
    const bedrooms = project?.bedrooms || '';

    // Default values for media types
    let mediaType = "129475";
    let mediaName = "165233";
    let propertyCampaignId = "";
    let methodOfContact = "115747";

    let prop_type = 19;
    let beds = 21935;
    let locId = 91823;

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

    switch (projectType.toLowerCase()) {
      case 'villa':
      case 'villas':
        prop_type = 20;
        break;
      case 'Apartment':
        prop_type = 19;
        break;
      case 'Studio':
        prop_type = 58265;
        break;
      case 'Townhouse':
        prop_type = 131090;
        break;
      default:
        prop_type = 19;
        break;
    }

    switch (bedrooms) {
      case '1':
        beds = 21935;
        break;
      case '2':
        beds = 21936;
        break;
      case '3':
        beds = 21937;
        break;
      case '4':
        beds = 21938;
        break;
      case '5':
        beds = 21939;
        break;
      case '6':
        beds = 21940;
        break;
      case '7':
        beds = 21941;
        break;
      case '8':
        beds = 21942;
        break;
      default:
        beds = 21935;
        break;
    }

    switch (locationVal) {
      case 'abu dhabi':
        locId = 91823;
        break;
      case 'dubai':
        locId = 91578;
        break;
      default:
        locId = 91823;
        break;
    }

    const remarks = `
        Additional consent 1: ${data.agreement1 ? "Yes" : "No"} </br>
        Additional consent 2: ${data.agreement2 ? "Yes" : "No"} </br>
        Additional consent 3: ${data.agreement3 ? "Yes" : "No"} </br>
        Client Name: ${data.firstName} ${data.lastName} </br>
        Client Email: ${data.email} </br>
        Client Phone: ${data.phone} </br>
        ${projectName !== '' ? `Project Name: ${projectName}` : ''} </br>
        ${locationVal !== '' ? `Interested Project Location: ${locationVal}` : ''} </br>        
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
      Remarks: "",
      RequirementType: "91212",
      ContactType: "3",
      CountryID: "65946",
      StateID: locId,
      CityID: locId,
      DistrictID: "",
      CommunityID: "",
      PropertyID: projectId,
      UnitType: prop_type,
      MethodOfContact: methodOfContact,
      MediaType: mediaType,
      MediaName: mediaName,
      DeactivateNotification: "",
      Bedroom: beds,
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
      const psiResponse = await insertPSILead(formDataToSend);
      if (!psiResponse.ok) {
        const text = await psiResponse.text();
        console.error(`PSI API error: ${psiResponse.status} - ${text}`);
      } else {
        const psiData = await psiResponse.json();
        // console.log("PSI success:", psiData);
      }

      const mailRes = await fetch("https://registration.psinv.net/api/sendemail2.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: `         
            <table cellpadding="0" cellspacing="0" width="550" align="center" class="">
                    <tbody class="">
                    <tr class="">
                        <td class="">
                            <table cellpadding="0" cellspacing="0" width="100%" align="center" class="">
                                <tbody class="">
                                <tr class="">
                                    <td align="center" height="80" style="text-align:center;" width="550" bgcolor="#FFFFFF" class=""></td>
                                </tr>
                                <tr class="">
                                    <td height="20" class=""> </td>
                                </tr>
                                </tbody>
                            </table>
                            <table cellpadding="0" cellspacing="0" width="100%" align="center" class="">
                                <tbody class="">
                                <tr class="">
                                    <td colspan="3" height="10" bgcolor="#02344a" class=""></td>
                                </tr>
                                <tr class="">
                                    <td width="10" style="color:#fdfdfd; font-size:16px; background:#02344a;" class=""> 
                                    </td>
                                    <td height="30" style="color:#fff; font-size:16px; background:#02344a; font-weight:bold; color:#FFF;font-family:Arial,  Helvetica, sans-serif" class="">
                                        Inquiry Form - ${currentUrl}
                                    </td>
                                    <td width="10" style="color:#FFFFFF; font-size:16px; background:#02344a;" class=""> 
                                    </td>
                                </tr>
                                <tr class="">
                                    <td colspan="3" height="10" bgcolor="#02344a" class=""></td>
                                </tr>
                                <tr class="">
                                    <td height="20" class=""> </td>
                                </tr>
                                </tbody>
                            </table>
                            <table width="100%" cellspacing="3" cellpadding="5" align="center" style="border:1px solid #e8e6e6" class="">
                                <tbody class="">
                                <tr class="">
                                    <td style="background-color:#f4f3f3;  color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                    font-size:12px; font-weight:bold;" class="">
                                        Name:
                                    </td>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                    font-size:12px; font-weight:bold;" class="">
                                        ${data.firstName} ${data.lastName}
                                    </td>
                                </tr>

                                <tr class="">
                                    <td style="background-color:#f4f3f3;  color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                    font-size:12px; font-weight:bold;" class="">
                                        Email:
                                    </td>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                    font-size:12px; font-weight:bold;" class="">
                                        ${data.email} 
                                    </td>
                                </tr>

                                <tr class="">
                                  <td style="background-color:#f4f3f3;  color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                  font-size:12px; font-weight:bold;" class="">
                                      Phone:
                                  </td>
                                  <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                  font-size:12px; font-weight:bold;" class="">
                                      ${data.phone}
                                  </td>
                                </tr>                                                             
                                
                                ${projectName &&
            `<tr class="">
                                    <td style="background-color:#f4f3f3;  color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                    font-size:12px; font-weight:bold;" class="">
                                        Property interested:
                                    </td>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                    font-size:12px; font-weight:bold;" class="">
                                        ${projectName} 
                                    </td>
                                  </tr>`
            }

                                ${bedrooms &&
            `<tr class="">
                                    <td style="background-color:#f4f3f3;  color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                    font-size:12px; font-weight:bold;" class="">
                                        Number of Bedrooms:
                                    </td>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                    font-size:12px; font-weight:bold;" class="">
                                        ${bedrooms} 
                                    </td>
                                  </tr>`
            }
    
                                </tbody>
                            </table>
                            <table class="">
                                <tbody class="">
                                <tr class="">
                                    <td height="10" style="line-height:9px" class=""> </td>
                                </tr>
                                </tbody>
                            </table>
                            <table cellpadding="0" align="center" cellspacing="0" height="30px" width="550" class="">
                                <tbody class="">
                                <tr class="">
                                    <td align="center" headers="20" style="background:#02344a;color:#FFF; font-size:11px; line-height:9px; font-family:Arial,Helvetica, sans-serif;" class="">
                                        Copyright &copy; 2025, PSI  All rights reserved.
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
          `,
          receiver: sendtomail,
          subject: "New inquiry - Luxury Projects",
          filename: "",
          filedata: ""
        }),
      });

      if (mailRes.ok) {
        setPostId("Success");

        if (downloadIntent && onSuccessDownload && project.projectBrochures) {
          onSuccessDownload(project.projectBrochures);
          setTimeout(() => {
            window.location.href = `/${locale}/thankyou?email=${encodeURIComponent(data.email)}`;
          }, 1000);
        }
        else {
          window.location.href = `/${locale}/thankyou?email=${encodeURIComponent(data.email)}`;
        }
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
      <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white py-6 px-0 rounded-lg">
        {/* Success/Error Messages */}
        {postId === "Success" && <div className="p-3 mb-3 rounded bg-green-500 text-white">Form submitted successfully!</div>}
        {postId === "Error" && <div className="p-3 mb-3 rounded bg-red-500 text-white">Submission failed. Try again.</div>}
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            {...register("firstName")}
            placeholder="First Name"
            className="w-full p-3 border border-[#cecfd0] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            {...register("lastName")}
            placeholder="Last Name"
            className="w-full p-3 border border-[#cecfd0] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>
        <div className="mb-3">
          <label>Phone</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                international
                defaultCountry="AE"
                placeholder="+971-555555555"
                className="w-full p-3 border border-[#cecfd0] rounded-md mb-3 mt-1"
              />
            )}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 border border-[#cecfd0] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full border border-[#E0592A] p-3 mb-6 rounded-md bg-[#E0592A] text-white cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <div className="mb-3">
          <label className="flex items-center space-x-2">
            <span className="text-sm">By clicking Submit, you agree to our <Link href="/en/terms" title="terms">Terms & Conditions</Link> and <a href="/en/privacy">Privacy Policy</a></span>
          </label>
        </div>
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
    </>
  );
};

export default LuxuryInquireForm;