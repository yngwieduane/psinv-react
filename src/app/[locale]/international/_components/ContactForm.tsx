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
import { insertHubspotLead, insertPSILead } from "@/utils/crmApiHelpers"

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


import { useTranslations } from 'next-intl';

const ContactForm = () => {
    const t = useTranslations('InternationalPage.form_section');
    const tMessages = useTranslations('InternationalPage.form_messages');
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
        message: '',
    });

    const onchangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    }

    const onSubmit = async (data: FormData) => {

        if (typeof window === 'undefined') return; //ensure code runs only in browser

        const APIKey = '160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a';
        const sendToMail = "callcenter@psinv.net";

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
                if (mediaName === "63907") {
                    const hubspotResponse = await insertHubspotLead(formDataToSend);
                    if (!hubspotResponse.ok) {
                        const text = await hubspotResponse.text();
                        console.error(`HubSpot API error: ${hubspotResponse.status} - ${text}`);
                    } else {
                        const hubspotData = await hubspotResponse.json();
                        // console.log("HubSpot success:", hubspotData);
                    }
                } else {
                    const psiResponse = await insertPSILead(formDataToSend);
                    if (!psiResponse.ok) {
                        const text = await psiResponse.text();
                        console.error(`PSI API error: ${psiResponse.status} - ${text}`);
                    } else {
                        const psiData = await psiResponse.json();
                        // console.log("PSI success:", psiData);
                    }
                }
            } catch (crmError) {
                console.error("CRM insertion failed:", crmError);
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
                                        Contact Form - International
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
                                        Client Name:
                                    </td>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                    font-size:12px; font-weight:bold;" class="">
                                        ${data.fname} ${data.lname}
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

                                <tr class="">
                                  <td style="background-color:#f4f3f3;  color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                  font-size:12px; font-weight:bold;" class="">
                                      Message:
                                  </td>
                                  <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                  font-size:12px; font-weight:bold;" class="">
                                      ${data.message}
                                  </td>
                                </tr>

                                <tr class="">
                                  <td style="background-color:#f4f3f3;  color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                  font-size:12px; font-weight:bold;" class="">
                                      URL coming from:
                                  </td>
                                  <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                  font-size:12px; font-weight:bold;" class="">
                                      ${currentUrl}
                                  </td>
                                </tr>
    
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
                    receiver: sendToMail,
                    subject: "New Enquiry - International",
                    filename: "",
                    filedata: ""
                }),
            });

            if (mailRes.ok) {
                const files = [
                    { path: "/assets/documents/international/PSI-Company-Profile.pdf", name: "PSI-Company-Profile.pdf" },
                    { path: "/assets/documents/international/PSI-International-Investor-Guide.pdf", name: "PSI-International-Investor-Guide.pdf" }
                ];

                files.forEach(file => {
                    const a = document.createElement("a");
                    a.href = file.path;
                    a.download = file.name;
                    a.style.display = "none";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });

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

    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex flex-column md:gap-7 gap-10">
                    <div className="w-full lg:flex lg:gap-5">
                        <div className="inputGroup lg:w-1/2 w-full lg:mb-0 mb-10">
                            <label htmlFor="fname" className={`font-[900] md:text-lg text-md ${montserratBold.className}`}>{t('fname')}</label>
                            <input type="text"
                                {...register('fname')} placeholder={t('fname')}
                                className={`block w-full py-3 border-b border-[#000] placeholder-[#999] lg:mt-7 mt-4 text-lg focus-visible:outline-none`} />
                            {errors.fname?.message && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.fname.message}
                                </p>
                            )}
                        </div>
                        <div className="inputGroup lg:w-1/2 w-full">
                            <label htmlFor="lname" className={`font-[900] md:text-lg text-md ${montserratBold.className}`}>{t('lname')}</label>
                            <input type="text"
                                {...register('lname')} placeholder={t('lname')}
                                className="block w-full py-3 border-b border-[#000] placeholder-[#999] lg:mt-7 mt-4 text-lg focus-visible:outline-none" />
                            {errors.lname?.message && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.lname.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="inputGroup w-full mb-2">
                        <label htmlFor="email" className={`font-[900] md:text-lg text-md ${montserratBold.className}`}>{t('email_address')}</label>
                        <input type="text"
                            {...register('email')} placeholder={t('email')}
                            className="block w-full py-3 border-b border-[#000] placeholder-[#999] lg:mt-7 mt-4 text-lg focus-visible:outline-none" />
                        {errors.email?.message && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="inputGroup  w-full mb-0">
                        <label htmlFor="phone" className={`font-[900] md:text-lg text-md ${montserratBold.className}`}>{t('telephone_number')}</label>
                        <Controller name="phone"
                            control={control}
                            render={({ field }) => (
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
                        <label htmlFor="message" className={`font-[900] md:text-lg text-md ${montserratBold.className}`}>{t('message')}</label>
                        <textarea rows={5}
                            {...register('message')} placeholder={t('message')}
                            className="block w-full py-3 border-b border-[#000] placeholder-[#999] lg:mt-7 mt-4 text-lg focus-visible:outline-none" />
                        {errors.message?.message && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.message.message}
                            </p>
                        )}
                    </div>
                    <input type="text" className="hidden gclid_field clid_field" id="gclid_field" name="gclid_field"
                        placeholder="gclid_field" />
                    {isSubmitting && (
                        tMessages('submitting')
                    )}
                    {(!isSubmitting && !isSubmitSuccess) ? (
                        <div className='md:w-auto w-full flex justify-end mt-7'>
                            <button type="submit" disabled={isSubmitting} className={`${AudreyNormal.className} 
                        relative uppercase lg:text-lg text-sm px-9 py-7 hover:text-white place-self-end
                        after:content-[''] after:absolute lg:after:w-[170px] after:w-[170px] lg:after:h-[80px] after:h-[80px]
                        after:border after:border-black md:after:inset-0 after:-right-3 after:top-0 after:rounded-[50%] 
                        after:transition after:duration-300 after:rotate-[335deg]
                        hover:after:bg-black cursor-pointer`}>
                                <span className="relative z-10">{t('register')}</span>
                            </button>
                        </div>
                    ) : ""
                    }

                    {!isSubmitting && !isSubmitSuccess ? (
                        <>
                            <p className="text-xs font-[700]">{t('desc')}</p>
                            <div className="flex flex-column gap-0">
                                <div className="mb-0">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" {...register("agreement1")} className="rounded border-gray-300" defaultChecked />
                                        <span className="text-sm">{tMessages('agree_terms')}</span>
                                    </label>
                                    {errors.agreement1 && <p className="text-red-500 text-sm mb-0">{errors.agreement1.message}</p>}
                                </div>
                                <div className="mb-0">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" {...register("agreement2")} className="rounded border-gray-300" defaultChecked />
                                        <span className="text-sm">{tMessages('agree_calls')}</span>
                                    </label>
                                </div>
                                <div className="mb-0">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" {...register("agreement3")} className="rounded border-gray-300" defaultChecked />
                                        <span className="text-sm">{tMessages('agree_projects')}</span>
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
                        <div className='alert alert-info text-center' role='alert'>{tMessages('success').split('.')[0]}.<br />
                            {tMessages('success').split('.')[1]}.</div>
                    </>
                )}

                {isAlreadySubmitted && (
                    <>
                        <div className="w-full">
                            <div className='bg-yellow-100 text-center text-sm p-4 text-[#78350F]' role='alert'>
                                {tMessages('already_submitted')}
                            </div>
                        </div>
                    </>
                )}

            </form>
        </>
    )
}

export default ContactForm