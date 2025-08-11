'use client'
import { z } from "zod"
import { contactSchema } from "./lib/ContactSchema"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css";
import styles from '../_components/InquiryForm.module.css'
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Montserrat } from "next/font/google";
import { AudreyNormal } from "@/utils/fonts";

const montserratBold = Montserrat({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-montserrat-bold',
});

interface FormValue {
    fname: string,
    lname: string,
    email: string,
    phone: string,
    message: string,
}

type FormData = z.infer<typeof contactSchema>


const ContactForm = () => {
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
        resolver: zodResolver(contactSchema),
        defaultValues: {
        agreement1 : true,
        agreement2 : true,
        agreement3 : true,
    },
    });
    
    const [formValue, setFormValue] = useState<FormValue>({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        message: '',
    });

    const onchangeField = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormValue({ ...formValue, [e.target.name]:e.target.value });
    }

    const onSubmit = async (data:FormData) => {        

        if(typeof window === 'undefined') return ; //ensure code runs only in browser

        const APIKey = '160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a';
        const sendToMail = "wd6@psinv.net";

        const lastSubmitTime = localStorage.getItem("formSubmitTime");
        const now = Date.now();
        const cooldown = 10*60*1000 //10 minutes

        if(lastSubmitTime && now - parseInt(lastSubmitTime) < cooldown) {
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

            if(gclidField !== '') {
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

            
            
            const remarks = `
                Additional consent 1 : ${data.agreement1 ? "Yes" : "No"} </br>
                Additional consent 2 : ${data.agreement2 ? "Yes" : "No"} </br>
                Additional consent 3 : ${data.agreement3 ? "Yes" : "No"} </br>
                Client name: ${data.fname}  ${data.lname} </br>
                Client email: ${data.email} </br>
                Client phone: ${data.phone} </br>              
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
                Remarks: "International Enquiry Form",
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
                contactClassId: "68",
                google_gclid: gclidField,
            };

            try {
                const res = await fetch(`https://api.portal.psi-crm.com/leads?APIKEY=${APIKey}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formDataToSend)
                });

                const mailRes = await fetch("https://psinv.net/api/sendemail.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        body: `
                        List Your Property<br><br>
                        Name: ${data.fname}  ${data.lname} </br>
                        Email: ${data.email} </br>
                        Phone: ${data.phone} </br> 
                        Message: ${data.message} </br>                      
                        URL coming from: ${currentUrl}
                        `,
                        receiver: sendToMail,
                        subject: "New Enquiry - International",
                        filename: "",
                        filedata: ""
                    }),
                });

                if(res.ok || mailRes.ok) {
                    
                    const file1 = "/assets/documents/international/PSI-Company-Profile.pdf";
                    const a = document.createElement("a");
                    a.href= file1;
                    a.download = "PSI-Company-Profile.pdf";
                    a.style.display = "none";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);

                    setPostId("success");
                    setIsSubmitSuccess(true);
                    setIsAlreadySubmitted(false);
                    window.location.href = `/${locale}/thankyou?${encodeURIComponent(data.email)}`;
                    localStorage.setItem("formSubmitTime", Date.now().toString());
                } else {
                    alert("Error submitting the form.");
                }    

            } catch(error) {
                console.log(error);
                setPostId("Error");
            } finally {
                setIsSubmitting(false);
            }
        }catch(error){
            console.error("Submission failed:", error);
        }finally{
            setIsSubmitting(false);
        }        
    }
    
    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex flex-column md:gap-7 gap-10">
                <div className="w-full lg:flex lg:gap-5">
                    <div className="inputGroup lg:w-1/2 w-full lg:mb-0 mb-10">
                        <label htmlFor="fname" className={`font-[900] md:text-lg text-md ${montserratBold.className}`}>First Name</label>
                        <input type="text"
                        {...register('fname')} placeholder="First Name" 
                        className={`block w-full py-3 border-b border-[#000] placeholder-[#999] lg:mt-7 mt-4 text-lg focus-visible:outline-none`} />
                        {errors.fname?.message && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.fname.message}
                            </p>
                        )}
                    </div>
                    <div className="inputGroup lg:w-1/2 w-full">
                        <label htmlFor="lname" className={`font-[900] md:text-lg text-md ${montserratBold.className}`}>Last Name</label>
                        <input type="text"
                        {...register('lname')} placeholder="Last Name" 
                        className="block w-full py-3 border-b border-[#000] placeholder-[#999] lg:mt-7 mt-4 text-lg focus-visible:outline-none" />
                        {errors.lname?.message && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.lname.message}
                            </p>
                        )}
                    </div>
                </div>                
                
                <div className="inputGroup w-full mb-2">
                    <label htmlFor="email" className={`font-[900] md:text-lg text-md ${montserratBold.className}`}>Email Address</label>
                    <input type="text"
                    {...register('email')} placeholder="Email"
                    className="block w-full py-3 border-b border-[#000] placeholder-[#999] lg:mt-7 mt-4 text-lg focus-visible:outline-none" />
                    {errors.email?.message && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="inputGroup  w-full mb-0">
                    <label htmlFor="phone" className={`font-[900] md:text-lg text-md ${montserratBold.className}`}>Telephone Number</label>
                    <Controller name="phone"
                    control={control}                   
                    render={({field}) => (
                        <div>
                            <PhoneInput                
                                international 
                                {...field}
                                {...register('phone')}
                                defaultCountry="AE"                
                                className={`block w-full py-3 border-b border-[#000] lg:mt-7 mt-4 text-lg ${styles.phoneField}`}
                                onChange={(value) => field.onChange(value)}
                                />
                            {errors.phone && <p className="text-red-500 text-sm mt-[0px]">{errors.phone.message}</p>}                                    
                        </div>
                    )} 
                    />                                 
                    
                </div>
                <div className="inputGroup w-full mb-2">
                    <label htmlFor="message" className={`font-[900] md:text-lg text-md ${montserratBold.className}`}>Message</label>
                    <textarea rows={5}
                    {...register('message')} placeholder="Message"
                    className="block w-full py-3 border-b border-[#000] placeholder-[#999] lg:mt-7 mt-4 text-lg focus-visible:outline-none" />
                    {errors.message?.message && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.message.message}
                        </p>
                    )}
                </div>
                <input type="text" className="hidden gclid_field clid_field" id="gclid_field" name="gclid_field" 
                        placeholder= "gclid_field" />
                {isSubmitting && (
                    'Submitting...'
                )}
                {(!isSubmitting && !isSubmitSuccess) ? (                    
                    <div className='md:w-auto w-full flex justify-end mt-7'>
                        <button type="submit" disabled={isSubmitting} className={`${AudreyNormal.className} 
                        relative uppercase lg:text-lg text-sm px-9 py-7 hover:text-white place-self-end
                        after:content-[''] after:absolute lg:after:w-[170px] after:w-[170px] lg:after:h-[80px] after:h-[80px]
                        after:border after:border-black after:inset-0 after:rounded-[50%] 
                        after:transition after:duration-300 after:rotate-[335deg]
                        hover:after:bg-black cursor-pointer`}>
                            <span className="relative z-10">Register</span>
                        </button>
                    </div>
                ) : ""
            }

                {!isSubmitting && !isSubmitSuccess ?  (
                    <>
                        <p className="text-xs font-[700]">Company Profile and International Investor Guide will be downloaded upon submitting your details</p>
                    <div className="flex flex-column gap-0">                    
                        <div className="mb-0">
                            <label className="flex items-center space-x-2">
                            <input type="checkbox" {...register("agreement1")} className="rounded border-gray-300" defaultChecked />
                            <span className="text-sm">I agree to the Terms & Conditions and Privacy Policy</span>
                            </label>
                            {errors.agreement1 && <p className="text-red-500 text-sm mb-0">{errors.agreement1.message}</p>}
                        </div>
                        <div className="mb-0">
                            <label className="flex items-center space-x-2">
                            <input type="checkbox" {...register("agreement2")} className="rounded border-gray-300" defaultChecked />
                            <span className="text-sm">Agree to receive calls and communications</span>
                            </label>
                        </div>
                        <div className="mb-0">
                            <label className="flex items-center space-x-2">
                            <input type="checkbox" {...register("agreement3")} className="rounded border-gray-300" defaultChecked />
                            <span className="text-sm">Receive calls about various projects</span>
                            </label>
                        </div>
                    </div>
                    </>                    
                )
                :
                ""      
            }                
                
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

export default ContactForm