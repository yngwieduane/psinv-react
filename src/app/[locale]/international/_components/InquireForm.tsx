'use client'
import { z } from "zod"
import { formSchema } from "../_components/lib/Schema"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css";
import styles from '../_components/InquiryForm.module.css'
import { useState } from "react"
import { usePathname } from "next/navigation"

interface FormValue {
    fname: string,
    lname: string,
    email: string,
    phone: string,
    howtocontact: string,
}

interface props {
    fromModal : boolean,
}

type FormData = z.infer<typeof formSchema>


const InquireForm = (props:any) => {
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
        resolver: zodResolver(formSchema),
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
        howtocontact: '',
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
                Preferred method to contact: ${data.howtocontact ? data.howtocontact : ""} </br>                
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

                const mailRes = await fetch("https://psinv.net/api/sendemail.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        body: `
                        List Your Property<br><br>
                        Name: ${data.fname}  ${data.lname} </br>
                        Email: ${data.email} </br>
                        Phone: ${data.phone} </br> 
                        Preferred Contact Method: ${data.howtocontact} </br>                       
                        URL coming from: ${currentUrl}
                        `,
                        receiver: sendToMail,
                        subject: "New Enquiry - International",
                        filename: "",
                        filedata: ""
                    }),
                });

                if(res.ok || mailRes.ok) {
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
            <div className="w-full flex flex-column gap-4">
                <div className="inputGroup  w-full mb-2">
                    <label htmlFor="fname" className="hidden">First Name</label>
                    <input type="text"
                    {...register('fname')} placeholder="First Name"
                    className="block w-full px-5 py-3 border border-[#fff] rounded-[7px] placeholder-[#fff]" />
                    {errors.fname?.message && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.fname.message}
                        </p>
                    )}
                </div>
                <div className="inputGroup  w-full mb-2">
                    <label htmlFor="lname" className="hidden">Last Name</label>
                    <input type="text" 
                    {...register('lname')} placeholder="Last Name"
                    className="block w-full px-5 py-3 border border-[#fff] rounded-[7px] placeholder-[#fff]" />
                    {errors.lname?.message && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.lname.message}
                        </p>
                    )}
                </div>
                <div className="inputGroup  w-full mb-2">
                    <label htmlFor="email" className="hidden">Email</label>
                    <input type="text"
                    {...register('email')} placeholder="Email"
                    className="block w-full px-5 py-3 border border-[#fff] rounded-[7px] placeholder-[#fff]" />
                    {errors.email?.message && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="inputGroup  w-full mb-0">
                    <label htmlFor="phone" className="hidden">Phone</label>
                    <Controller name="phone"
                    control={control}                        
                    render={({field}) => (
                        <div>
                            <PhoneInput                
                                international
                                {...field}
                                {...register('phone')}
                                defaultCountry="AE"                       
                                className={`w-full block px-5 py-3 border rounded-md border border-[#A6A6A6] 
                                rounded-[7px] placeholder-[#A6A6A6] ${styles.phoneField}`}
                                onChange={(value) => field.onChange(value)}
                                />
                            {errors.phone && <p className="text-red-500 text-sm mt-[0px]">{errors.phone.message}</p>}                                    
                        </div>
                    )} 
                    />                                 
                    
                </div>
                <div className="inputGroup w-full mb-0">
                    <label htmlFor="howtocontact" className="block mb-3">How would you like to be contacted? *</label>
                    <select className={`w-full block px-5 py-3 border rounded-md mb-3 border border-[#A6A6A6] 
                                rounded-[7px] placeholder-[#A6A6A6] ${styles.phoneField}`}
                                {...register('howtocontact')} onChange={onchangeField} >
                        <option value="">Select an option</option>
                        <option value="Call">Phone Call</option>
                        <option value="Whatsapp">Whats App</option>
                        <option value="Email">Email</option>
                    </select>
                    {errors.howtocontact && <p className="text-red-500 text-sm mt-[-5px]">{errors.howtocontact.message}</p>}
                </div>
                <input type="text" className="hidden gclid_field clid_field" id="gclid_field" name="gclid_field" 
                        placeholder= "gclid_field" />
                {isSubmitting && (
                    'Submitting...'
                )}
                {(!isSubmitting && !isSubmitSuccess) ? (
                    <button type="submit" className="uppercase rounded py-3 text-xl cursor-pointer
                    hover:scale-[103%] transition-all ease-in-out duration-400" disabled={isSubmitting}
                    style={{backgroundImage:"linear-gradient(180deg, rgb(250, 167, 5) 29%, rgb(149, 116, 0) 100%)"}}>
                        Submit                    
                    </button>
                ) : ""
            }

                {!isSubmitting && !isSubmitSuccess ?  (
                    <>
                        <p className={` ${!props.fromModal ? "text-center" : ""} text-xs `}>By creating an account, you agree to our <span className="text-[#ED9C4B]">Terms of Service</span> and
                    have read and understood the <span className="text-[#ED9C4B]">Privacy Policy</span></p>
                    <p className={`${!props.fromModal ? "text-center" : ""} text-xs`}>Company Profile and International Investor Guide will be downloaded upon submitting your details</p>
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

export default InquireForm