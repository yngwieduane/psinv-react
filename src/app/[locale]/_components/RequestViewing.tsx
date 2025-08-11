"use client";

import { useState } from "react";
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
  message: z.string().optional(),
  agreement1: z.boolean().optional(),
  agreement2: z.boolean().optional(),
  agreement3: z.boolean().optional(),
  selecteddate: z.boolean().optional(),
  selectedtime: z.boolean().optional(),
  selectedplatform: z.boolean().optional(),
});
interface InquiryFormProps {
    hideFeedbackButton?: boolean;
    data?: any;
  }
type FormData = z.infer<typeof schema>;

const RequestViewing: React.FC<InquiryFormProps> = ({ hideFeedbackButton = false }) => {
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

const [meetingType, setMeetingType] = useState('zoom');
const [selectedDate, setSelectedDate] = useState('');
const [selectedTime, setSelectedTime] = useState('');

  const getNext7Days = () => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const label = days[date.getDay()];
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short'
      }).toUpperCase();
      return { label, date: formattedDate };
    });
  };

  const dates = getNext7Days();

const times = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
    '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM'
];
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
        Selected Platform: ${meetingType} </br>
        Selected Date: ${selectedDate} </br>
        Selected Time: ${selectedTime} </br>
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
        <div className="flex justify-center mb-4 border-b">
            <button 
            className={`px-4 py-2 font-medium ${meetingType === 'zoom' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`} 
            onClick={() => setMeetingType('zoom')}>Zoom</button>
            <button 
            className={`px-4 py-2 font-medium ${meetingType === 'physical' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`} 
            onClick={() => setMeetingType('physical')}>Physical Meeting</button>
        </div>
        <div className="mb-3">
            <div className="grid grid-cols-2 gap-2 justify-center">
                <div>
                    <input
                        type="text"
                        {...register("firstName")}
                        placeholder="First Name"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        {...register("lastName")}
                        placeholder="Last Name"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>
            </div>
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
        <div className="mb-4">
            <div className="text-sm font-semibold mb-2">Select available dates</div>
            <div className="flex flex-wrap gap-2">
            {dates.map((d, i) => (
                <button
                    type="button"
                    key={i}
                    onClick={() => setSelectedDate(d.date)}
                    className={`px-3 py-2 rounded-md border text-sm ${selectedDate === d.date ? 'bg-blue-100 border-blue-600 text-blue-600' : 'bg-white border-gray-300 text-gray-800'}`}
                >
                    <div className="font-bold">{d.label}</div>
                    <div>{d.date}</div>
                </button>
            ))}
            </div>
        </div>

        <div className="mb-4">
            <div className="text-sm font-semibold mb-2">Available times</div>
            <div className="flex flex-wrap gap-2">
            {times.map((time, i) => (
                <button
                type="button"
                key={i}
                onClick={() => setSelectedTime(time)}
                className={`px-3 py-1.5 rounded-md border text-sm ${selectedTime === time ? 'bg-blue-100 border-blue-600 text-blue-600' : 'bg-white border-gray-300 text-gray-800'}`}
                >
                {time}
                </button>
            ))}
            </div>
        </div>
        <button
          type="submit"
          className="w-full border border-[#111954] p-3 mb-6 rounded-md text-[#0c1445] bg-white hover:bg-[#0c1445] hover:text-white font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default RequestViewing;