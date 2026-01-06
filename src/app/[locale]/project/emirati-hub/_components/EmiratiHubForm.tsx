'use client'
import { z } from "zod"
import { EmiratiFormSchema } from "./lib/EmiratiFormSchema"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css";
import { useState } from "react"
import { usePathname } from "next/navigation"

interface FormValue {
    fname: string,
    lname: string,
    email: string,
    phone: string,
    city?: string,
    profession: string,
}

interface props {
    fromModal: boolean,
}

type FormData = z.infer<typeof EmiratiFormSchema>

const EmiratiHubForm = (props: any) => {
    const pathname = usePathname();
    const locale = pathname.split("/")[1] || 'en';

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);
    const [gclidField, setGclidField] = useState('');
    const [postId, setPostId] = useState<string | null>(null);
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        control, trigger,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(EmiratiFormSchema),
        defaultValues: {
            agreement1: true,
            agreement2: true,
            agreement3: true,
        },
    });

    const [formValue, setFormValue] = useState<FormValue>({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        city: '',
        profession: '',
    });

    const onchangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    }

    const onSubmit = async (data: FormData) => {

        if (typeof window === 'undefined') return; //ensure code runs only in browser

        const APIKey = '160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a';
        // const sendToMail = "callcenter@psinv.net";
        const sendToMail = "wd6@psinv.net";

        const lastSubmitTime = localStorage.getItem("formSubmitTime");
        const now = Date.now();
        const cooldown = 10 * 60 * 1000 //10 minutes

        if (lastSubmitTime && now - parseInt(lastSubmitTime) < cooldown) {
            setIsAlreadySubmitted(true);
            return;
        }

        try {
            setIsSubmitting(true);
            setIsAlreadySubmitted(false);

            await new Promise(resolve => setTimeout(resolve, 2000));

            let urlParams = new URLSearchParams(window.location.search);
            let source = urlParams.get('utm_source') || '';
            let campaign = urlParams.get('utm_campaign') || '';
            let gclid = urlParams.get('gclid_field') || '';
            let currentUrl = window.location.href;

            setGclidField(gclid);

            if (gclidField !== '') {
                source = 'google_ads';
            }
            else {
                source = source;
            }

            // Default values for media types
            let mediaType = "165232";
            let mediaName = "63475";
            let propertyCampaignId = "";
            let methodOfContact = "62132";

            switch (source) {
                case 'HubspotEmail':
                case 'HubSpotEmail':
                case 'hubspotemail':
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
                    mediaType = "165232";
                    mediaName = "63475";
                    methodOfContact = "62132";
                    break;
            }

            // switch (campaign) {
            //     case '':
            //         propertyCampaignId = "";

            //     default:
            //         propertyCampaignId = propertyCampaignId;
            // }            

            const remarks = `
                Additional consent 1 : ${data.agreement1 ? "Yes" : "No"} </br>
                Additional consent 2 : ${data.agreement2 ? "Yes" : "No"} </br>
                Additional consent 3 : ${data.agreement3 ? "Yes" : "No"} </br>
                Client name: ${data.fname}  ${data.lname} </br>
                Client email: ${data.email} </br>
                Client phone: ${data.phone} </br>
                City: ${data.city ? data.city : ""} </br>  
                Profession: ${data.profession ? data.profession : ""} </br>                
                URL coming from: ${currentUrl}
            `;

            const formDataToSend = {
                TitleID: "129932",
                FirstName: data.fname,
                FamilyName: data.lname,
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
                Remarks: "Emirati Hub Enquiry Form",
                RequirementType: "91212",
                ContactType: "3",
                CountryID: "65946",
                StateID: "91823",
                CityID: "91823",
                DistrictID: "",
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
                AreaFrom: "300",
                AreaTo: "10000",
                RequirementCountryID: "65946",
                ExistingClient: "",
                CompaignSource: "",
                CompaignMedium: "",
                Company: "",
                NumberOfEmployee: "",
                LeadStageId: "",
                LeadRatingId: "454",
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
                google_gclid: gclidField,
            };

            try {
                let apiURL = "";
                if (mediaName === "63907") {
                    const token = "400b0c41cea6ae771d9090684ccbcd3696aab50aa47d7dcdddd3018934a337bc8ac18f7581f6664e";
                    apiURL = `https://api.portal.psi-crm.com/integrations/hubspot/createLead?apiKey=${token}`;
                } else {
                    apiURL = `https://api.portal.psi-crm.com/leads?APIKEY=${APIKey}`;
                }

                const res = await fetch(apiURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formDataToSend)
                });

                const mailRes = await fetch("https://registration.psinv.net/api/sendemail2.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        body: `
                        List Your Property<br><br>
                        Name: ${data.fname}  ${data.lname} </br>
                        Email: ${data.email} </br>
                        Phone: ${data.phone} </br> 
                        City: ${data.city} </br> 
                        Profession: ${data.profession} </br>                       
                        URL coming from: ${currentUrl}
                        `,
                        receiver: sendToMail,
                        subject: "New Enquiry - Emirati Hub",
                        filename: "",
                        filedata: ""
                    }),
                });

                if (res.ok || mailRes.ok) {

                    setPostId("success");
                    setIsSubmitSuccess(true);
                    setIsAlreadySubmitted(false);
                    window.location.href = `/${locale}/thankyou?${encodeURIComponent(data.email)}`;
                    localStorage.setItem("formSubmitTime", Date.now().toString());
                } else {
                    alert("Error submitting the form.");
                }

            } catch (error) {
                console.log(error);
                setPostId("Error");
            } finally {
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex flex-col gap-6">
                    <div className="w-full">
                        <label htmlFor="fname" className="hidden text-gray-500 mb-2">First name*</label>
                        <input type="text" placeholder="First name*"
                            {...register('fname')}
                            className="block w-full text-lg px-0 py-2 border-b border-gray-300 focus:border-[#CE641D] focus:ring-0 outline-none bg-transparent transition-colors" />
                        {errors.fname?.message && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.fname.message}
                            </p>
                        )}
                    </div>
                    <div className="w-full">
                        <label htmlFor="lname" className="hidden text-gray-500 mb-2">Second name*</label>
                        <input type="text" placeholder="Second name*"
                            {...register('lname')}
                            className="block w-full text-lg px-0 py-2 border-b border-gray-300 focus:border-[#CE641D] focus:ring-0 outline-none bg-transparent transition-colors" />
                        {errors.lname?.message && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.lname.message}
                            </p>
                        )}
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="hidden text-gray-500 mb-2">Email*</label>
                        <input type="text" placeholder="Email*"
                            {...register('email')}
                            className="block w-full text-lg px-0 py-2 border-b border-gray-300 focus:border-[#CE641D] focus:ring-0 outline-none bg-transparent transition-colors" />
                        {errors.email?.message && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="w-full">
                        {/* Phone - usually no label or inherent label in design? keeping it clean as per image which shows just the input */}
                        <Controller name="phone"
                            control={control}
                            render={({ field }) => (
                                <div className="border-b border-gray-300 focus-within:border-[#CE641D] transition-colors">
                                    <PhoneInput
                                        international
                                        {...field}
                                        {...register('phone')}
                                        defaultCountry="AE"
                                        className={`w-full bg-transparent outline-none py-2`}
                                        numberInputProps={{
                                            className: "w-full text-lg bg-transparent border-none outline-none focus:ring-0 px-2"
                                        }}
                                        onChange={(value) => field.onChange(value)}
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                                </div>
                            )}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="city" className="hidden text-gray-500 mb-2">City</label>
                        <select className={`block w-full text-lg px-0 py-2 border-b border-gray-300 focus:border-[#CE641D] focus:ring-0 outline-none bg-transparent transition-colors`}
                            {...register('city')} onChange={onchangeField} >
                            <option value="">City</option>
                            <option value="Abu Dhabi">Abu Dhabi</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Sharjah">Sharjah</option>
                            <option value="Ajman">Ajman</option>
                            <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                            <option value="Fujairah">Fujairah</option>
                            <option value="Umm Al Quwain">Umm Al Quwain</option>
                            <option value="Al Ain">Al Ain</option>
                        </select>
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                    </div>
                    <div className="w-full">
                        <label htmlFor="profession" className="hidden text-gray-500 mb-2">Profession*</label>
                        <input type="text" placeholder="Profession*"
                            {...register('profession')}
                            className="block w-full text-lg px-0 py-2 border-b border-gray-300 focus:border-[#CE641D] focus:ring-0 outline-none bg-transparent transition-colors" />
                        {errors.profession?.message && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.profession.message}
                            </p>
                        )}
                    </div>

                    <input type="text" className="hidden gclid_field clid_field" id="gclid_field" name="gclid_field"
                        placeholder="gclid_field" />

                    <div className="mt-4">
                        {isSubmitting ? (
                            <button disabled className="w-full bg-[#CE641D] text-white font-bold py-4 px-8 rounded transition duration-300 opacity-70 cursor-not-allowed">
                                Submitting...
                            </button>
                        ) : (
                            !isSubmitSuccess && (
                                <button type="submit" className="w-full bg-[#CE641D] hover:bg-[#b55518] text-white font-bold py-4 px-8 rounded transition duration-300 text-lg border-none" disabled={isSubmitting}>
                                    Apply Now
                                </button>
                            )
                        )}
                    </div>

                    {!isSubmitting && !isSubmitSuccess ? (
                        <>
                            <div className="text-xs text-gray-500 mt-2">
                                By clicking Submit, you agree to our <a href="/terms" target="_blank" className="text-[#CE641D] hover:underline">Terms & Conditions</a> and <a href="/privacy" target="_blank" className="text-[#CE641D] hover:underline">Privacy Policy</a>
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <div>
                                    <label className="flex items-start space-x-2 cursor-pointer">
                                        <input type="checkbox" {...register("agreement2")} className="rounded text-[#CE641D] focus:ring-[#CE641D] mt-1" defaultChecked />
                                        <span className="text-xs text-gray-600">Agree to receive calls and communications via various channels from PSI from 09:00 am to 09:00 pm</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="flex items-start space-x-2 cursor-pointer">
                                        <input type="checkbox" {...register("agreement3")} className="rounded text-[#CE641D] focus:ring-[#CE641D] mt-1" defaultChecked />
                                        <span className="text-xs text-gray-600">Agree to receive calls and communications via various channels on various projects, products and services</span>
                                    </label>
                                </div>
                            </div>
                        </>
                    ) : ""}
                </div>
                {isSubmitSuccess && (
                    <>
                        <div className='alert alert-info text-center' role='alert'>Thank You for your inquiry.<br />
                            We will contact you soon.</div>
                    </>
                )}

                {isAlreadySubmitted && (
                    <>
                        <div className="w-full">
                            <div className='bg-yellow-100 text-center text-sm p-4 text-[#78350F]' role='alert'>
                                You've already submitted. Please wait a few minutes before trying again.
                            </div>
                        </div>
                    </>
                )}

            </form>
        </>
    )
}

export default EmiratiHubForm