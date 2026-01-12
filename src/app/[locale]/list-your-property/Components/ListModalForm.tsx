"use client";

import { Select } from "@headlessui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataSchema2 } from "./lib/Schema2";
import 'react-datepicker/dist/react-datepicker.css';
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { insertHubspotLead } from "@/utils/crmApiHelpers";
import Link from "next/link";

type FormData = z.infer<typeof FormDataSchema2>

const steps: { id: string, name: string, progressValue: string, progressImg: string, fields: (keyof FormData)[] }[] = [
    {
        id: "Step 1",
        name: "Personal information",
        progressValue: "0",
        progressImg: '',
        fields: ['fname', 'lname', 'email', 'phone']
    },
    {
        id: "Step 2",
        name: "Prop details 1",
        progressValue: "17",
        progressImg: "/assets/images/list-property/progress-17.svg",
        fields: ['location', 'property']
    },
]

const CITY_CONFIG: Record<string, { email: string; apiUrl: string; referredTo?: number; referredBy?: number; assignedTo?: number }> = {
    'Dubai': {
        email: 'callcenter@psidubai.com, yngwie.g@psinv.net',
        apiUrl: 'https://api.portal.dubai-crm.com/leads?APIKEY=d301dba69732065cd006f90c6056b279fe05d9671beb6d29f2d9deb0206888c38239a3257ccdf4d0',
        referredTo: 4421,
        referredBy: 4421,
        assignedTo: 4421,
    },
    'Abu Dhabi': {
        email: 'callcenter@psinv.net, yngwie.g@psinv.net',
        apiUrl: 'https://api.portal.psi-crm.com/leads?APIKEY=160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a',
        referredTo: 3458,
        referredBy: 3458,
    },
    'DEFAULT': {
        email: 'callcenter@psinv.net, yngwie.g@psinv.net',
        apiUrl: 'https://api.portal.psi-crm.com/leads?APIKEY=160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a',
    }
};

const getCityConfig = (cityName: string) => {
    if (['Dubai', 'Sharjah'].includes(cityName)) {     //If Sharjah, use DUbai CRM
        return CITY_CONFIG['Dubai'];
    }
    return CITY_CONFIG[cityName] || CITY_CONFIG['DEFAULT'];
}

interface FormValue {
    fname: string;
    lname: string;
    email: string;
    phone: string;
    purpose: string;
    proptype: string;
    beds: string;
    location: string;
    property: string;
    cityName: string;
    propName: string;
}
interface ListFormProps {
    fromModal?: boolean;
}


const ListModalForm: React.FC<ListFormProps> = ({ fromModal }) => {
    const t = useTranslations("ListYourPropertyPage");

    const pathname = usePathname();
    const locale = pathname.split("/")[1] || 'en';
    const baseURL = typeof window !== 'undefined' ? window.location.origin : '';

    const [currentStep, setCurrentStep] = useState(0);

    const [allProps, setAllProps] = useState<any[]>([]);
    const [props, setProps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [postId, setPostId] = useState<string | null>(null);
    const [cityName, setCityName] = useState('');
    const [propName, setPropName] = useState('');
    const [gclidField, setGclidField] = useState('');
    const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        trigger,
        reset,
        setValue,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema2),
        defaultValues: {
            agreement1: true,
            agreement2: true,
            agreement3: true,
        },
    });

    const next = async () => {
        const fields = steps[currentStep].fields;
        if (fields && fields.length > 0) {
            const isValid = await trigger(fields, { shouldFocus: true });
            if (!isValid) { console.log(fields, "Empty.."); return }
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(step => step + 1);
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(step => step - 1);
        }
    }

    const [formValue, setFormValue] = useState<FormValue>({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        purpose: '',
        proptype: '',
        beds: '',
        location: '',
        property: '',
        cityName: "",
        propName: "",
    });

    useEffect(() => {
        const fetchAllProperties = async () => {
            setLoading(true);

            try {
                const totalPages = 36;      //From API "totalCount":845
                const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

                const batchSize = 5;
                const allFetched: any[] = [];

                for (let i = 0; i < pageNumbers.length; i += batchSize) {
                    const batch = pageNumbers.slice(i, i + batchSize);
                    const fetchPromises = batch.map(page =>
                        fetch(`/api/external/allprojects?page=${page}`).then(res => res.json())
                    );
                    const responses = await Promise.all(fetchPromises);

                    responses.forEach(res => {
                        if (res?.result?.length != 0) {
                            allFetched.push(...res.result);
                        }
                    });
                }

                setAllProps(allFetched);

            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProperties();
    }, []);

    useEffect(() => {
        if (!formValue.location) return;
        const filtered = allProps.filter(
            prop => prop.city && prop.city.trim() === formValue.cityName
        );
        setProps(filtered);

    }, [formValue.location, allProps]);

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    }
    const onChangeLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLocation = e.target.options[e.target.selectedIndex];
        const city = selectedLocation.getAttribute('data-value') || '';
        const locationValue = e.target.value;
        setFormValue(prev => ({
            ...prev,
            location: locationValue,
            cityName: city,
        }));
        setCityName(city);
        setValue('cityName', city);
    }
    const onChangeProperty = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProperty = e.target.options[e.target.selectedIndex];
        const property_id = selectedProperty.value || '';
        setFormValue({ ...formValue, property: property_id, propName: selectedProperty.text });
        setPropName(selectedProperty.text);
        setValue('propName', selectedProperty.text);
    }

    // Unified config management
    const cityConfig = getCityConfig(cityName);

    const onSubmit = async (data: FormData) => {
        if (typeof window === 'undefined') return; //ensure code runs only in browser

        const lastSubmitTime = localStorage.getItem("formSubmitTime");
        const now = Date.now();
        const cooldown = 10 * 60 * 1000; // 10 minutes 

        if (lastSubmitTime && now - parseInt(lastSubmitTime) < cooldown) {
            setIsAlreadySubmitted(true);
            return;
        }

        try {
            setIsSubmitting(true);
            let bedrooms, bathrooms, contactType, requirementType, ReferredByID,
                ReferredToID, ActivityAssignedTo, Budget, Budget2, unitType, sendtomail;

            //console.log("Final submission data:", finalData);                   

            await new Promise(resolve => setTimeout(resolve, 2000));

            let urlParams = new URLSearchParams(window.location.search);
            let source = urlParams.get('utm_source') || '';
            let campaign = urlParams.get('utm_campaign') || urlParams.get('?utm_campaign') || '';
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
            let mediaType = "129475";
            let mediaName = "165233";
            let propertyCampaignId = "";
            let newRemarks = "";
            let methodOfContact = "115747";
            let isAuhOnlyCampaign = false;

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
                    mediaType = "129475";
                    mediaName = "165233";
                    methodOfContact = "115747";
                    break;
            }

            switch (campaign) {
                case 'RamahnIsland_Hubspot':
                    propertyCampaignId = "2133";
                    newRemarks = "Rotation:Ramhan Rotation";
                    isAuhOnlyCampaign = true;
                    break;
                case 'ALReemHills_Hubspot':
                    propertyCampaignId = "2127";
                    isAuhOnlyCampaign = true;
                    break;
                case 'SAADIYATLAGOONS_hubspot':
                    propertyCampaignId = "2128";
                    isAuhOnlyCampaign = true;
                    break;
                case 'SAADIYATLAGOONS_hupspot':
                    propertyCampaignId = "2128";
                    isAuhOnlyCampaign = true;
                    break;
                case 'YasRiva_Hubspot':
                    propertyCampaignId = "2132";
                    isAuhOnlyCampaign = true;
                    break;
                case 'Hudayriyat_Hubspot':
                case 'Hudayriyat_HubSpot':
                    propertyCampaignId = "2177";
                    isAuhOnlyCampaign = true;
                    break;
                case 'DripCampaign_hubspot':
                case 'DripCampaign':
                    propertyCampaignId = "2134";
                    newRemarks = "";
                    isAuhOnlyCampaign = true;
                    break;
                case 'Landlord_Hubspot':
                    propertyCampaignId = "2199";
                    newRemarks = "rotation:landlord ";
                    isAuhOnlyCampaign = true;
                    break;
                case '10.2025_jubail_island_lisitingCampaign':
                    propertyCampaignId = "2374";
                    newRemarks = "rotation:Jubail landlord ";
                    isAuhOnlyCampaign = true;
                    break;
                default:
                    propertyCampaignId = propertyCampaignId;
                    isAuhOnlyCampaign = false;
                    break;
            }

            switch (data.beds) {
                case "1":
                    bedrooms = 21935;
                    break;
                case "2":
                    bedrooms = 21936;
                    break;
                case "3":
                    bedrooms = 21937;
                    break;
                case "4":
                    bedrooms = 21938;
                    break;
                case "5":
                    bedrooms = 21939;
                    break;
                case "6":
                    bedrooms = 21940;
                    break;
                default:
                    bedrooms = 21935;
                    break;
            }

            switch (data.purpose) {
                case 'Sale':
                    contactType = 1;
                    requirementType = 91212;
                    ReferredToID = 3458;
                    ReferredByID = 3458;
                    ActivityAssignedTo = 3458;
                    Budget = 2000000;
                    Budget2 = 7000000;
                    break;
                case 'Rent':
                    contactType = 2;
                    requirementType = 91213;
                    ReferredToID = 4794;
                    ReferredByID = 3458;
                    ActivityAssignedTo = 4794;
                    Budget = 65000;
                    Budget2 = 1000000;
                    break;
                case 'Manage':
                    contactType = 2;
                    requirementType = 537;
                    ReferredToID = 3458;
                    ReferredByID = 3458;
                    ActivityAssignedTo = 3458;
                    Budget = 2000000;
                    Budget2 = 7000000;
                    break;
                default:
                    contactType = 1;
                    requirementType = 91212;
                    ReferredToID = 3458;
                    ReferredByID = 3458;
                    ActivityAssignedTo = 3458;
                    Budget = 2000000;
                    Budget2 = 7000000;
                    break;
            }

            switch (data.proptype) {
                case 'Apartment':
                    unitType = 19;
                    break;
                case 'Villa':
                    unitType = 20;
                    break;
                case 'Townhouse':
                    unitType = 131090;
                    break;
                case 'Residential%20Land':
                    unitType = 47390;
                    break;
                case 'Office':
                    unitType = 24;
                    break;
                case 'Commercial%20Plot':
                    unitType = 47388;
                    break;
                default:
                    unitType = 19;
                    break;
            }

            if (cityConfig.referredTo) ReferredToID = cityConfig.referredTo;
            if (cityConfig.referredBy) ReferredByID = cityConfig.referredBy;
            if (cityConfig.assignedTo) ActivityAssignedTo = cityConfig.assignedTo;
            sendtomail = cityConfig.email;

            const isHubspotMedia = mediaName === '63907';

            const remarks = `
                Additional consent 1 : ${data.agreement1 ? "Yes" : "No"} </br>
                Additional consent 2 : ${data.agreement2 ? "Yes" : "No"} </br>
                Additional consent 3 : ${data.agreement3 ? "Yes" : "No"} </br>
                Client name: ${data.fname}  ${data.lname} </br>
                Client email: ${data.email} </br>
                Client phone: ${data.phone} </br>                
                Purpose: ${data.purpose ? data.purpose : ""} </br>
                Property type: ${data.proptype ? data.proptype : ""} </br>
                Bedrooms: ${data.beds ? data.beds : ""} </br>
                Location: ${data.cityName} </br>
                Property: ${data.propName} </br>
                URL coming from: ${currentUrl}
            `;

            if (['Dubai', 'Sharjah'].includes(cityName) && isAuhOnlyCampaign) {
                propertyCampaignId = "";        //put campaign id empty if city is dubai and campaign in of AUH
            }

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
                Remarks: "",
                RequirementType: requirementType,
                ContactType: contactType,
                CountryID: "65946",
                StateID: data.location,
                CityID: data.location,
                DistrictID: "",
                CommunityID: "",
                PropertyID: data.property,
                UnitType: unitType,
                MethodOfContact: methodOfContact,
                MediaType: mediaType,
                MediaName: mediaName,
                DeactivateNotification: "",
                Bedroom: bedrooms,
                Bathroom: "21935",
                Budget: Budget,
                Budget2: Budget2,
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
                ReferredToID: ReferredToID,
                ReferredByID: ReferredByID,
                IsBulkUpload: "",
                ActivityAssignedTo: ActivityAssignedTo,
                ActivityDate: "",
                ActivityTypeId: "167234",
                ActivitySubject: "Email Inquiry Copy",
                ActivityRemarks: remarks + ". " + newRemarks,
                IsForAutoRotation: "",
                PropertyCampaignId: propertyCampaignId,
                contactClassId: "",
                google_gclid: gclidField,
            };

            try {

                if (isHubspotMedia && !['Dubai', 'Sharjah'].includes(cityName)) {
                    console.log("Inserting lead into HubSpot CRM...");
                    const hubspotResponse = await insertHubspotLead(formDataToSend);

                    if (!hubspotResponse.ok) {
                        const text = await hubspotResponse.text();
                        throw new Error(`HubSpot API error: ${hubspotResponse.status} - ${text}`);
                    }

                    const hubspotData = await hubspotResponse.json();
                    //console.log("Lead inserted into HubSpot:", hubspotData);
                } else {
                    await fetch(`${cityConfig.apiUrl}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formDataToSend),
                    });
                }

                const mailRes = await fetch("https://registration.psinv.net/api/sendemail2.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        body: `
                        <table cellpadding="0" cellspacing="0" width="550" align="center" style="border:1px solid #e8e6e6">
                            <tbody>
                                <tr>
                                    <td colspan="2" height="30" style="color:#fff; font-size:16px; background:#02344a; font-weight:bold; padding:0 10px; font-family:Arial, Helvetica, sans-serif">
                                        List Your Property Inquiry Form - ${currentUrl}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">Name:</td>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">${data.fname} ${data.lname}</td>
                                </tr>
                                <tr>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">Email:</td>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">${data.email}</td>
                                </tr>
                                <tr>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">Phone:</td>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">${data.phone}</td>
                                </tr>
                                <tr>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">Purpose:</td>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">${data.purpose || '-'}</td>
                                </tr>
                                ${data.proptype ? `
                                <tr>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">Property Type:</td>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">${data.proptype}</td>
                                </tr>` : ''}
                                ${data.beds ? `
                                <tr>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">Bedroom:</td>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">${data.beds}</td>
                                </tr>` : ''}
                                ${data.cityName ? `
                                <tr>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">Location:</td>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">${data.cityName}</td>
                                </tr>` : ''}
                                ${data.propName ? `
                                <tr>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">Property:</td>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">${data.propName}</td>
                                </tr>` : ''}
                                <tr>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">URL coming from:</td>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; padding: 10px;">${currentUrl}</td>
                                </tr>
                            </tbody>
                        </table>
                        `,
                        receiver: cityConfig.email,
                        subject: "New inquiry - List Your Property",
                        filename: "",
                        filedata: ""
                    }),
                });

                setPostId("success");
                setIsSubmitSuccess(true);
                setIsAlreadySubmitted(false);
                localStorage.setItem("formSubmitTime", Date.now().toString());

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
            <div className="flex justify-between mb-5 relative">
                <h2 className={fromModal ?
                    'hidden text-4xl text-[#E35F27] font-bold leading-normal'
                    : 'text-4xl text-[#E35F27] font-bold leading-normal'}>{t("form.title")}</h2>
                {isSubmitSuccess !== true && (
                    <div className=" absolute right-0 bottom-[-30px]">
                        <p>{currentStep + 1} {t("form.labels.of")} {steps.length}</p>
                    </div>
                )
                }
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="listForm">
                {!isSubmitSuccess && currentStep === 0 && (
                    <>
                        <div className="inputGroup  w-full mb-4">
                            <label htmlFor="fname" className="text-sm block">{t("form.labels.firstName")} <sup className="imp text-[#E35F27]">*</sup></label>
                            <input type="text"
                                {...register('fname')} placeholder={t("form.placeholders.firstName")}
                                className="block w-full px-5 py-3 border border-[#A6A6A6] rounded-[7px] placeholder-[#A6A6A6]" />
                            {errors.fname?.message && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.fname.message}
                                </p>
                            )}
                        </div>

                        <div className="inputGroup w-full mb-4">
                            <label htmlFor="lname" className="text-sm block">{t("form.labels.lastName")} <sup className="imp text-[#E35F27]">*</sup></label>
                            <input type="text" placeholder={t("form.placeholders.lastName")}
                                {...register('lname')}
                                className="block w-full px-5 py-3 border border-[#A6A6A6] rounded-[7px] placeholder-[#A6A6A6]" />
                            {errors.lname?.message && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.lname.message}
                                </p>
                            )}
                        </div>

                        <div className="inputGroup w-full">
                            <label htmlFor="lname" className="text-sm block">{t("form.labels.phone")} <sup className="imp text-[#E35F27]">*</sup></label>
                            <Controller name="phone"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <PhoneInput
                                            international
                                            {...field}
                                            {...register('phone')}
                                            defaultCountry="AE"
                                            className="block w-full px-5 py-3 border rounded-md mb-3 border border-[#A6A6A6] 
                                    rounded-[7px] placeholder-[#A6A6A6]"
                                            onChange={(value) => field.onChange(value)}
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-[-5px]">{errors.phone.message}</p>}
                                    </div>
                                )}
                            />
                        </div>
                        <div className="inputGroup w-full">
                            <label htmlFor="email" className="text-sm block">{t("form.labels.email")} <sup className="imp text-[#E35F27]">*</sup></label>
                            <input type="email" placeholder={t("form.placeholders.email")}
                                {...register('email')}
                                className="block w-full px-5 py-3 border border-[#A6A6A6] rounded-[7px] placeholder-[#A6A6A6]" />
                            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
                        </div>
                        <button className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" onClick={next}>{t("form.buttons.next")}</button>
                    </>
                )}

                {!isSubmitSuccess && currentStep === 1 && (
                    <>
                        <div className="w-full mb-5 mt-3">
                            <div className="inputGroup">
                                <label htmlFor="purpose" className="text-sm block">{t("form.labels.purpose")}</label>
                                <Select {...register('purpose')} onChange={onChangeField}
                                    className="w-full px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] text-[#2C2D65] text-sm font-medium">
                                    <option>{t("form.placeholders.selectPurpose")}</option>
                                    <option value="Sale">{t("form.options.purpose.sale")}</option>
                                    <option value="Rent">{t("form.options.purpose.rent")}</option>
                                    <option value="Manage">{t("form.options.purpose.manage")}</option>
                                </Select>
                            </div>
                        </div>
                        <div className="w-full mb-5 mt-3">
                            <div className="inputGroup">
                                <label htmlFor="location" className="text-sm w-1/3">{t("form.labels.location")}<sup className="imp text-[#E35F27]">*</sup></label>
                                <Select
                                    {...register('location')} required onChange={onChangeLocation}
                                    className="w-full px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] text-[#2C2D65] text-sm font-medium">
                                    <option>{t("form.placeholders.selectLocation")}</option>
                                    <option value="91823" data-value="Abu Dhabi">{t("form.options.location.abu_dhabi")}</option>
                                    <option value="91578" data-value="Dubai">{t("form.options.location.dubai")}</option>
                                    <option value="166131" data-value="Sharjah">{t("form.options.location.sharjah")}</option>
                                    <option value="58467" data-value="Ras Al Khaimah">{t("form.options.location.rak")}</option>
                                </Select>
                                {errors.location && <p className="block text-red-500 text-sm mt-3">{errors.location.message}</p>}
                            </div>
                        </div>
                        <div className="w-full mb-5 mt-3">
                            <div className="inputGroup">
                                <label htmlFor="prop-type" className="text-sm w-1/3">{t("form.labels.propType")}</label>
                                <Select {...register('proptype')} onChange={onChangeField}
                                    className="w-full px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] text-[#2C2D65] text-sm font-medium">
                                    <option>{t("form.placeholders.selectPropType")}</option>
                                    <option value="Villa">{t("form.options.propType.villa")}</option>
                                    <option value="Apartment">{t("form.options.propType.apartment")}</option>
                                    <option value="Townhouse">{t("form.options.propType.townhouse")}</option>
                                </Select>
                            </div>
                        </div>

                        <div className="w-full mb-5 mt-3">
                            <div className="inputGroup">
                                <label htmlFor="property" className="text-sm w-1/3">{t("form.labels.property")} <sup className="imp text-[#E35F27]">*</sup></label>
                                {loading ? (
                                    <p>{t("form.messages.loading_props")}</p>
                                ) : (
                                    <Select
                                        value={formValue.property}
                                        {...register('property')}
                                        onChange={onChangeProperty}
                                        className="px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] w-full text-[#2C2D65] text-sm font-medium required"
                                    >
                                        <option value="">{t("form.placeholders.selectProperty")}</option>
                                        {props.map((prop: any) => (
                                            <option key={prop.propertyID} value={prop.propertyID}>
                                                {prop.propertyName}
                                            </option>
                                        ))}
                                    </Select>

                                )}
                                {errors.property && <p className="block text-red-500 text-sm mt-3">{errors.property.message}</p>}
                            </div>
                        </div>
                        <div className="w-full mb-5 mt-3">
                            <div className="inputGroup">
                                <label htmlFor="beds" className="text-sm w-1/3">{t("form.labels.beds")}</label>
                                <Select {...register('beds')} onChange={onChangeField}
                                    className="w-full px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] text-[#2C2D65] text-sm font-medium">
                                    <option>{t("form.placeholders.selectBeds")}</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </Select>
                            </div>
                        </div>
                        <input type="text" id="propName" value={formValue.propName}
                            {...register('propName')} className="hidden" readOnly />
                        <input type="text" id="cityName" value={formValue.cityName}
                            {...register('cityName')} className="hidden" readOnly />
                        <input type="text" className="hidden gclid_field clid_field" id="gclid_field" name="gclid_field"
                            placeholder="gclid_field" />

                        <div className="flex justify-between gap-5 mb-4">
                            <button className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" onClick={prev}>{t("form.buttons.previous")}</button>
                            <button
                                type="submit"
                                className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" disabled={isSubmitting} >{isSubmitting ? t("form.buttons.submitting") : t("form.buttons.submit")}</button>
                        </div>

                        <div className="mb-3">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" {...register("agreement1")} className="rounded border-gray-300" defaultChecked />
                                <span className="text-sm">{t("form.labels.agreement1")}</span>
                            </label>
                            {errors.agreement1 && <p className="text-red-500 text-sm">{errors.agreement1.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" {...register("agreement2")} className="rounded border-gray-300" defaultChecked />
                                <span className="text-sm">{t("form.labels.agreement2")}</span>
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" {...register("agreement3")} className="rounded border-gray-300" defaultChecked />
                                <span className="text-sm">{t("form.labels.agreement3")}</span>
                            </label>
                        </div>
                    </>
                )}

                {isSubmitSuccess && (
                    <>
                        <div className="w-full items-center">
                            <img src="/assets/images/list-property/list-thankyou.svg" alt="thank you" className="mb-5 mx-auto"></img>
                            <div className="thankyou-text text-center bg-[#e35f271a] px-15 py-10 rounded-[16px] w-full">
                                <h2 className="text-5xl text-[#272963] font-bold mb-4">{t("form.messages.thank_you")}</h2>
                                <p className="text-[#525151] text-lg">{t("form.messages.success_message")}</p>
                            </div>
                        </div>
                    </>
                )}

                {isAlreadySubmitted && (
                    <>
                        <div className="w-full">
                            <div className='bg-yellow-100 text-center text-sm p-4 text-[#78350F]' role='alert'>
                                {t("form.messages.already_submitted")}
                            </div>
                        </div>
                    </>
                )}

            </form>
            {!isSubmitSuccess && (
                <p className="text-sm text-[#8A8A8A] mt-5">{t("form.labels.footer_agreement")} <Link href="terms" title="Terms & Conditions">Terms & Conditions</Link> and <Link href="privacy" title="Privacy Policy">Privacy Policy</Link></p>
            )}

        </>
    )
}

export default ListModalForm