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
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const label = days[date.getDay()];
      const dayNum = date.getDate();
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short'
      }).toUpperCase();
      return { label, dayNum, fullDate: formattedDate };
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
    <div className="bg-white p-6 md:p-8 rounded-3xl w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Success/Error Messages */}
        {postId === "Success" && (
          <div className="p-4 rounded-xl bg-green-50 text-green-700 border border-green-100 flex items-center justify-center font-medium">
            Form submitted successfully!
          </div>
        )}
        {postId === "Error" && (
          <div className="p-4 rounded-xl bg-red-50 text-red-700 border border-red-100 flex items-center justify-center font-medium">
            Submission failed. Please try again.
          </div>
        )}

        {/* Meeting Type Selection */}
        <div className="flex bg-gray-50 p-1.5 rounded-xl border border-gray-100">
          <button
            type="button"
            className={`cursor-pointer flex-1 py-3 px-4 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 ${meetingType === 'zoom'
              ? 'bg-white text-secondary shadow-sm ring-1 ring-black/5'
              : 'text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setMeetingType('zoom')}
          >
            Zoom Meeting
          </button>
          <button
            type="button"
            className={`cursor-pointer flex-1 py-3 px-4 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 ${meetingType === 'physical'
              ? 'bg-white text-secondary shadow-sm ring-1 ring-black/5'
              : 'text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setMeetingType('physical')}
          >
            Physical Meeting
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <input
              type="text"
              {...register("firstName")}
              placeholder="First Name"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-gray-400"
            />
            {errors.firstName && <p className="text-red-500 text-xs px-2">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-1">
            <input
              type="text"
              {...register("lastName")}
              placeholder="Last Name"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-gray-400"
            />
            {errors.lastName && <p className="text-red-500 text-xs px-2">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="space-y-1">
          <input
            type="email"
            {...register("email")}
            placeholder="Email Address"
            className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-gray-400"
          />
          {errors.email && <p className="text-red-500 text-xs px-2">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                international
                defaultCountry="AE"
                placeholder="Phone Number"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-secondary/20 focus-within:border-secondary transition-all"
                numberInputProps={{
                  className: "w-full bg-transparent focus:outline-none placeholder:text-gray-400"
                }}
              />
            )}
          />
          {errors.phone && <p className="text-red-500 text-xs px-2">{errors.phone.message}</p>}
        </div>

        {/* Date Selection */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700 ml-1">Select Date</label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {dates.map((d, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setSelectedDate(d.fullDate)}
                className={`cursor-pointer flex-shrink-0 w-16 h-20 flex flex-col items-center justify-center rounded-xl border transition-all duration-200 ${selectedDate === d.fullDate
                  ? 'bg-indigo-950 text-white border-secondary shadow-lg shadow-orange-500/20 translate-y-[-2px]'
                  : 'bg-white border-gray-100 text-gray-500 hover:border-secondary/30 hover:bg-gray-50'
                  }`}
              >
                <span className="text-xs font-medium uppercase tracking-wider opacity-80">{d.label}</span>
                <span className="text-xl font-bold mt-1">{d.dayNum}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700 ml-1">Select Time</label>
          <div className="flex flex-wrap gap-2">
            {times.map((time, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setSelectedTime(time)}
                className={`cursor-pointer px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-200 ${selectedTime === time
                  ? 'bg-indigo-950 text-white border-secondary shadow-lg shadow-orange-500/20'
                  : 'bg-white border-gray-100 text-gray-600 hover:border-secondary/30 hover:bg-gray-50'
                  }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer w-full mt-6 border bg-indigo-950 border-indigo-950 text-white font-bold py-3 rounded-xl hover:bg-gray-800 hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Request Meeting"
          )}
        </button>
        {/* Consent text like screenshot */}
        <div className="text-[15px] text-gray-500 space-y-2 mt-4">
          <p className="italic">
            By clicking Submit, you agree to our Terms &amp; Conditions and Privacy Policy
          </p>

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("agreement1")}
              className="mt-0.5 accent-[#111954]"
              defaultChecked
            />
            <span>
              Agree to receive calls and communications via various channels from PSI from
              09:00 am to 09:00 pm
            </span>
          </label>

          {errors.agreement1 && (
            <p className="text-red-500 text-xs">{errors.agreement1.message}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default RequestViewing;
