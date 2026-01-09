"use client";

import { Select } from "@headlessui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { boolean, isValid, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataSchema } from "./lib/Schema";
import { faPaperclip, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'react-datepicker/dist/react-datepicker.css';
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { insertHubspotLead } from "@/utils/crmApiHelpers";
import Link from "next/link";

type FormData = z.infer<typeof FormDataSchema>


interface FormValue {
    fname: string;
    lname: string;
    email: string;
    phone: string;
    purpose: string;
    description: string;
    proptype: string;
    beds: string;
    location: string;
    property: string;
    unitview: string;
    unitsize: string;
    baths: string;
    parking: string;
    unitnumber: string;
    askingprice: string;
    service: string;
    status: string;
    readytoview: string;
    propertyimages: File[];
    propertyspa: File | null;
    propertydeed: File | null;
    passport: File | null;
    datetoview: string;
    timetoview: string;
    cityName: string;
    propName: string;
}


const CITY_CONFIG: Record<string, { email: string; apiUrl: string; referredTo?: number; referredBy?: number; assignedTo?: number }> = {
    'Dubai': {
        email: 'callcenter@psidubai.com',
        apiUrl: 'https://api.portal.dubai-crm.com/leads?APIKEY=d301dba69732065cd006f90c6056b279fe05d9671beb6d29f2d9deb0206888c38239a3257ccdf4d0',
        referredTo: 4421,
        referredBy: 4421,
        assignedTo: 4421,
    },
    'Abu Dhabi': {
        email: 'callcenter@psinv.net',
        apiUrl: 'https://api.portal.psi-crm.com/leads?APIKEY=160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a',
        referredTo: 3458,
        referredBy: 3458,
    },
    'DEFAULT': {
        email: 'callcenter@psinv.net',
        apiUrl: 'https://api.portal.psi-crm.com/leads?APIKEY=160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a',
    }
};

const getCityConfig = (cityName: string) => {
    if (['Dubai', 'Sharjah'].includes(cityName)) {     //If Sharjah, use DUbai CRM
        return CITY_CONFIG['Dubai'];
    }
    return CITY_CONFIG[cityName] || CITY_CONFIG['DEFAULT'];
}

interface ListFormProps {
    fromModal?: boolean;
}


const ListForm: React.FC<ListFormProps> = ({ fromModal }) => {
    const t = useTranslations("ListYourPropertyPage");

    const steps: { id: string, name: string, progressValue: string, progressImg: string, fields: (keyof FormData)[] }[] = [
        {
            id: "Step 1",
            name: t("form.steps.personal_info"),
            progressValue: "0",
            progressImg: '',
            fields: ['fname', 'lname', 'email', 'phone']
        },
        {
            id: "Step 2",
            name: t("form.steps.prop_details_1"),
            progressValue: "17",
            progressImg: "/assets/images/list-property/progress-17.svg",
            fields: ['location']
        },
        {
            id: "Step 3",
            name: t("form.steps.prop_details_2"),
            progressValue: "34",
            progressImg: "/assets/images/list-property/progress-34.svg",
            fields: ['property']
        },
        {
            id: "Step 4",
            name: t("form.steps.prop_details_3"),
            progressValue: "50",
            progressImg: "/assets/images/list-property/progress-50.svg",
            fields: []
        },
        {
            id: "Step 5",
            name: t("form.steps.files"),
            progressValue: "67",
            progressImg: "/assets/images/list-property/progress-67.svg",
            fields: []
        },
        {
            id: "Step 6",
            name: t("form.steps.complete"),
            progressValue: "100",
            progressImg: "/assets/images/list-property/progress-100.svg",
            fields: []
        }
    ]

    const pathname = usePathname();
    const locale = pathname.split("/")[1] || 'en';
    const baseURL = typeof window !== 'undefined' ? window.location.origin : '';

    const [currentStep, setCurrentStep] = useState(0);

    const [allProps, setAllProps] = useState<any[]>([]);
    const [props, setProps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const dateRef = useRef<HTMLInputElement>(null);
    const timeRef = useRef<HTMLInputElement>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [postId, setPostId] = useState<string | null>(null);
    const [cityName, setCityName] = useState('');
    const [propName, setPropName] = useState('');
    const [gclidField, setGclidField] = useState('');
    const [hasSentMail, setHasSentMail] = useState(false);
    const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);


    const {
        register,
        handleSubmit,
        control,
        trigger,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema),
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
            if (currentStep === 0 && !hasSentMail) {
                const success = await sendEmail();
                if (!success) {
                    console.log("Email send failed.");
                    return;
                }
                setHasSentMail(true);
            }
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep((step) => step + 1);
        }
    };

    const sendEmail = async () => {
        const config = getCityConfig(formValue.cityName);
        try {
            const response = await fetch("https://registration.psinv.net/api/sendemail2.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    body: `
            <table cellpadding="0" cellspacing="0" width="550" align="center">
                <tbody>
                    <tr>
                        <td align="center" height="80" style="text-align:center;" width="550" bgcolor="#FFFFFF"></td>
                    </tr>
                    <tr>
                        <td height="10" bgcolor="#02344a"></td>
                    </tr>
                    <tr>
                        <td height="30" style="color:#fff; font-size:16px; background:#02344a; font-weight:bold; padding:0 10px; font-family:Arial, Helvetica, sans-serif">
                            New Inquiry - List Your Property
                        </td>
                    </tr>
                    <tr>
                        <td height="10" bgcolor="#02344a"></td>
                    </tr>
                    <tr>
                        <td>
                            <table width="100%" cellspacing="3" cellpadding="5" style="border:1px solid #e8e6e6">
                                <tbody>
                                    <tr>
                                        <td width="150" style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Name:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${formValue.fname} ${formValue.lname}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Email:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${formValue.email}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Phone:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${formValue.phone}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Purpose:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${formValue.purpose}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Message:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${formValue.description ? formValue.description : ""}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
               `,
                    receiver: config.email,
                    subject: "New inquiry - List Your Property",
                    filename: "",
                    filedata: "",
                }),
            });

            if (!response.ok) throw new Error('Email failed');

            return true;
        } catch (err) {
            console.error("sendEmail error:", err);
            return false;
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(step => step - 1);
        }
    }

    const [propertyImages, setPropertyImages] = useState<File[]>([]);
    const [propertySpa, setPropertySpa] = useState<File>();
    const [propertyDeed, setPropertyDeed] = useState<File>();
    const [passportFile, setPassportFile] = useState<File>();

    const [formValue, setFormValue] = useState<FormValue>({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        purpose: '',
        description: '',
        proptype: '',
        beds: '',
        location: '',
        property: '',
        unitview: '',
        unitsize: '',
        baths: '',
        parking: '',
        unitnumber: '',
        askingprice: '',
        service: '',
        status: '',
        readytoview: '',
        propertyimages: [],
        propertyspa: null,
        propertydeed: null,
        passport: null,
        datetoview: "",
        timetoview: "",
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
    }
    const onChangeProperty = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProperty = e.target.options[e.target.selectedIndex];
        const property_id = selectedProperty.value || '';
        setFormValue({ ...formValue, property: property_id, propName: selectedProperty.text });
        setPropName(selectedProperty.text);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;

        if (!files || files.length === 0) return;

        switch (name) {
            case 'propertyimages':
                setPropertyImages(Array.from(files)); // multiple files
                break;
            case 'propertyspa':
                setPropertySpa(files[0]); // single file
                break;
            case 'propertydeed':
                setPropertyDeed(files[0]); // single file
                break;
            case 'passportfile':
                setPassportFile(files[0]); // single file
                break;
        }

        setFormValue(prev => ({
            ...prev,
            [name]: name === 'propertyimages' ? Array.from(files) : files[0],
        }));
    };

    const setDateRef = useCallback(
        (el: HTMLInputElement | null) => {
            dateRef.current = el;
            register('datetoview').ref(el); // manually forward ref to React Hook Form
        }, [register]
    );


    const handleDateClick = () => {
        const inputDate = dateRef.current;
        if (inputDate) {
            if (typeof inputDate.showPicker === "function") {
                inputDate.showPicker();
            } else {
                inputDate.click();
            }
        }
    };
    const setTimeRef = useCallback(
        (el: HTMLInputElement | null) => {
            timeRef.current = el;
            register('timetoview').ref(el);
        }, [register]
    );

    const handleTimeClick = () => {
        const inputTime = timeRef.current;
        if (inputTime) {
            if (typeof inputTime.showPicker === "function") {
                inputTime.showPicker();
            } else {
                inputTime.click();
            }
        }
    }

    const uploadFiles = async (files: File[] | File, fieldname: string) => {
        const formData = new FormData();
        if (Array.isArray(files)) {
            files.forEach(file => formData.append('files', file));
        }
        else {
            formData.append('files', files);
        }
        formData.append('field', fieldname);

        const uploadResponse = await fetch('/api/uploads/list-property', {
            method: 'POST',
            body: formData,
        });

        if (!uploadResponse.ok) {
            throw new Error(`file upload failed ${fieldname}`);
        }
        if (uploadResponse.ok) {
            //setIsSubmitSuccess(true);
        }
        const uploadResult = await uploadResponse.json();
        return uploadResult.fileUrls;
    };

    const isValidFile = (file: string | undefined | null): boolean => {
        return file !== undefined && file !== null && file !== '' && file !== 'null' && file !== 'undefined';
    };

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
                ReferredToID, ActivityAssignedTo, Budget, Budget2, unitType;

            const uploadedFiles = {
                propertyimages: await uploadFiles(propertyImages, 'propertyimages'),
                spa: propertySpa ? await uploadFiles(propertySpa, 'spa') : [],
                deed: propertyDeed ? await uploadFiles(propertyDeed, 'deed') : [],
                passport: passportFile ? await uploadFiles(passportFile, 'passport') : []
            };

            const finalData = {
                ...data,
                attachments: uploadedFiles,
            }

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
                    isAuhOnlyCampaign = true;
                    newRemarks = "";
                    break;
                case 'Landlord_Hubspot':
                    propertyCampaignId = "2199";
                    isAuhOnlyCampaign = true;
                    newRemarks = "rotation:landlord ";
                    break;
                case '10.2025_jubail_island_lisitingCampaign':
                    propertyCampaignId = "2374";
                    isAuhOnlyCampaign = true;
                    newRemarks = "rotation:Jubail landlord ";
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

            switch (data.baths) {
                case "1":
                    bathrooms = 21935;
                    break;
                case "2":
                    bathrooms = 21936;
                    break;
                case "3":
                    bathrooms = 21937;
                    break;
                case "4":
                    bathrooms = 21938;
                    break;
                case "5":
                    bathrooms = 21939;
                    break;
                case "6":
                    bathrooms = 21940;
                    break;
                default:
                    bathrooms = 21935;
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


            const isHubspotMedia = mediaName === '63907';

            if (cityConfig.referredTo) ReferredToID = cityConfig.referredTo;
            if (cityConfig.referredBy) ReferredByID = cityConfig.referredBy;
            if (cityConfig.assignedTo) ActivityAssignedTo = cityConfig.assignedTo;

            const remarks = `
                Additional consent 1 : ${data.agreement1 ? "Yes" : "No"} </br>
                Additional consent 2 : ${data.agreement2 ? "Yes" : "No"} </br>
                Additional consent 3 : ${data.agreement3 ? "Yes" : "No"} </br>
                Client name: ${data.fname}  ${data.lname} </br>
                Client email: ${data.email} </br>
                Client phone: ${data.phone} </br>
                Client message: ${data.description ? data.description : ""} </br>
                Purpose: ${data.purpose ? data.purpose : ""} </br>
                Property type: ${data.proptype ? data.proptype : ""} </br>
                Bedrooms: ${data.beds ? data.beds : ""} </br>
                Location: ${data.cityName} </br>
                Property: ${data.propName} </br>
                Unit view: ${data.unitview} </br>
                Unit size: ${data.unitsize} </br>
                Bathrooms: ${data.baths} </br>
                Parking: ${data.parking} </br>
                Unit number: ${data.unitnumber} </br>
                Asking price: ${data.askingprice} </br>
                Status: ${data.status} </br>
                Service: ${data.service} </br>
                Ready to view: ${data.readytoview} </br>                              
                
                ${uploadedFiles.propertyimages?.length > 0
                    ? `Attach external image: </br>${uploadedFiles.propertyimages.map((url: string) => `${baseURL}${url}`).join('</br>')}</br>`
                    : ''}
                ${uploadedFiles.spa?.length > 0
                    ? `Attach SPA: </br>${uploadedFiles.spa.map((url: string) => `${baseURL}${url}`).join('</br>')}</br>`
                    : ''}               
                ${uploadedFiles.deed?.length > 0
                    ? `Attach Title Deed: </br>${uploadedFiles.deed.map((url: string) => `${baseURL}${url}`).join('</br>')}</br>`
                    : ''}
                ${uploadedFiles.passport?.length > 0
                    ? `Passport: </br>${uploadedFiles.passport.map((url: string) => `${baseURL}${url}`).join('</br>')}</br>`
                    : ''}
                
                Date to view: ${data.datetoview} </br>
                Time to view: ${data.timetoview} </br>
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
                Remarks: data.description,
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
                Bathroom: bathrooms,
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
                    console.log("Lead inserted into HubSpot:", hubspotData);
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
            <table cellpadding="0" cellspacing="0" width="550" align="center">
                <tbody>
                    <tr>
                        <td align="center" height="80" style="text-align:center;" width="550" bgcolor="#FFFFFF"></td>
                    </tr>
                    <tr>
                        <td height="10" bgcolor="#02344a"></td>
                    </tr>
                    <tr>
                        <td height="30" style="color:#fff; font-size:16px; background:#02344a; font-weight:bold; padding:0 10px; font-family:Arial, Helvetica, sans-serif">
                            List Your Property - Full Inquiry
                        </td>
                    </tr>
                    <tr>
                        <td height="10" bgcolor="#02344a"></td>
                    </tr>
                    <tr>
                        <td>
                            <table width="100%" cellspacing="3" cellpadding="5" style="border:1px solid #e8e6e6">
                                <tbody>
                                    <tr>
                                        <td width="150" style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Name:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.fname} ${data.lname}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Email:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.email}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Phone:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.phone}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Message:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.description ? data.description : ""}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Purpose:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.purpose ? data.purpose : ""}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Property type:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.proptype ? data.proptype : ""}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Bedrooms:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.beds ? data.beds : ""}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Location:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.cityName}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Property:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.propName}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Unit view:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.unitview}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Unit size:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.unitsize}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Bathrooms:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.baths}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Parking:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.parking}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Unit number:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.unitnumber}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Asking price:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.askingprice}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Status:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.status}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Service:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.service}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Ready to view:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.readytoview}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">External images:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${propertyImages ? `${baseURL}${uploadedFiles.propertyimages}` : '-'}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">SPA:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${propertySpa ? `${baseURL}${uploadedFiles.spa}` : '-'}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Title Deed:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${propertyDeed ? `${baseURL}${uploadedFiles.deed}` : '-'}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Passport:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${passportFile ? `${baseURL}${uploadedFiles.passport}` : '-'}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Date to view:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.datetoview}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">Time to view:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${data.timetoview}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">URL:</td>
                                        <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold;">${currentUrl}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
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
            <div className="flex justify-between mb-5">
                <h2 className={fromModal ?
                    'hidden text-4xl text-[#E35F27] font-bold leading-normal'
                    : 'md:text-4xl text-2xl text-[#E35F27] font-bold leading-normal'}>{t("form.title")}</h2>
                {/* desktop progress bar */}
                {currentStep !== 0 && (
                    <div className="progree-bar md:block hidden">
                        {/* {steps[currentStep].progressValue} */}
                        <img src={`${steps[currentStep].progressImg}`}></img>
                    </div>
                )}
            </div>
            <form data-brightcall-form="registration" onSubmit={handleSubmit(onSubmit)} className="listForm">
                {!isSubmitSuccess && currentStep === 0 && (
                    <>
                        <div className="w-full md:flex mb-4 gap-5">
                            <div className="inputGroup md:w-1/2 md:mb-0 mb-3">
                                <label htmlFor="fname" className="text-sm block leading-loose">{t("form.labels.firstName")} <sup className="imp text-[#E35F27]">*</sup></label>
                                <input type="text" id="fname"
                                    {...register('fname')} onChange={onChangeField} placeholder={t("form.placeholders.firstName")}
                                    className="block w-full px-5 py-3 border border-[#A6A6A6] rounded-[7px] placeholder-[#A6A6A6]" />
                                {errors.fname?.message && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.fname.message}
                                    </p>
                                )}
                            </div>
                            <div className="inputGroup md:w-1/2 md:mb-0 mb-3">
                                <label htmlFor="lname" className="text-sm block leading-loose">{t("form.labels.lastName")} <sup className="imp text-[#E35F27]">*</sup></label>
                                <input type="text" id="lname" placeholder={t("form.placeholders.lastName")}
                                    {...register('lname')} onChange={onChangeField}
                                    className="block w-full px-5 py-3 border border-[#A6A6A6] rounded-[7px] placeholder-[#A6A6A6]" />
                                {errors.lname?.message && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.lname.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="w-full md:flex gap-5">
                            <div className="inputGroup md:w-1/2 md:mb-0 mb-3">
                                <label htmlFor="phone" className="text-sm block leading-loose">{t("form.labels.phone")} <sup className="imp text-[#E35F27]">*</sup></label>
                                <Controller name="phone"
                                    control={control}
                                    render={({ field }) => (
                                        <div>
                                            <PhoneInput id="phone"
                                                international
                                                {...field}
                                                {...register('phone')}
                                                defaultCountry="AE"
                                                className="block w-full px-5 py-3 border rounded-md mb-3 border border-[#A6A6A6] 
                                    rounded-[7px] placeholder-[#A6A6A6]"

                                                onChange={(value) => {
                                                    field.onChange(value);
                                                    setFormValue(prev => ({ ...prev, phone: value?.toString() || '' }));
                                                }}


                                            />
                                            {errors.phone && <p className="text-red-500 text-sm mt-[-5px]">{errors.phone.message}</p>}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="inputGroup md:w-1/2 md:mb-0 mb-3">
                                <label htmlFor="email" className="text-sm block leading-loose">{t("form.labels.email")} <sup className="imp text-[#E35F27]">*</sup></label>
                                <input type="email" id="email" placeholder={t("form.placeholders.email")}
                                    {...register('email')} onChange={onChangeField}
                                    className="block w-full px-5 py-3 border border-[#A6A6A6] rounded-[7px] placeholder-[#A6A6A6]" />
                                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className="w-full mb-5 mt-3">
                            <div className="inputGroup">
                                <label htmlFor="purpose" className="text-sm block leading-loose">{t("form.labels.purpose")}</label>
                                <Select
                                    {...register('purpose')} id="purpose"
                                    onChange={onChangeField}
                                    className={`w-full px-5 py-3 border border-[#A6A6A6] rounded-[7px] ${formValue.purpose === "" ? "select-placeholder placeholder-[#A6A6A6]" : ""}`}
                                >
                                    <option>{t("form.placeholders.purpose")}</option>
                                    <option value="Sale">{t("form.options.purpose.sale")}</option>
                                    <option value="Rent">{t("form.options.purpose.rent")}</option>
                                    <option value="Manage">{t("form.options.purpose.manage")}</option>
                                </Select>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="inputGroup">
                                <label htmlFor="description" className="text-sm block leading-loose">{t("form.labels.description")}</label>
                                <textarea id="description" {...register('description')} onChange={onChangeField}
                                    className="w-full px-5 py-3 border border-[#A6A6A6] rounded-[7px] placeholder-[#A6A6A6] h-[150px]"
                                    placeholder={t("form.placeholders.description")}>

                                </textarea>
                            </div>
                        </div>
                        <button className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" onClick={next}>{t("form.buttons.next")}</button>
                    </>
                )}

                {!isSubmitSuccess && currentStep === 1 && (
                    <>
                        <div className="w-full mb-4 flex flex-col gap-5">
                            <div className="inputGroup w-full md:flex items-center">
                                <label htmlFor="prop-type" className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.propType")}</label>
                                <Select {...register('proptype')} onChange={onChangeField}
                                    className="px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] md:w-2/3 w-full text-[#2C2D65] text-sm font-medium">
                                    <option>{t("form.placeholders.selectPropType")}</option>
                                    <option value="Villa">{t("form.options.propType.villa")}</option>
                                    <option value="Apartment">{t("form.options.propType.apartment")}</option>
                                    <option value="Townhouse">{t("form.options.propType.townhouse")}</option>
                                </Select>
                            </div>
                            <div className="inputGroup w-full md:flex items-center">
                                <label htmlFor="beds" className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.beds")}</label>
                                <Select {...register('beds')} onChange={onChangeField}
                                    className="px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] md:w-2/3 w-full text-[#2C2D65] text-sm font-medium">
                                    <option>{t("form.placeholders.selectBeds")}</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </Select>
                            </div>
                            <div className="inputGroup w-full md:flex items-center">
                                <label htmlFor="location" className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.location")} <sup className="imp text-[#E35F27]">*</sup></label>
                                <div className="md:w-2/3 w-full">
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
                            {/* mobile progress bar */}
                            <div className="progree-bar md:hidden block justify-items-center">
                                <img src={`${steps[currentStep].progressImg}`} title="progress bar"></img>
                            </div>

                            <div className="flex justify-between gap-5">
                                <button className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" onClick={prev}>{t("form.buttons.previous")}</button>
                                <button className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" onClick={next}>{t("form.buttons.next")}</button>
                            </div>
                        </div>
                    </>
                )}

                {!isSubmitSuccess && currentStep === 2 && (
                    <>
                        <div className="w-full mb-4 flex flex-col gap-5">
                            <div className="inputGroup w-full md:flex items-center">
                                <label htmlFor="property" className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.property")} <sup className="imp text-[#E35F27]">*</sup></label>
                                <div className="md:w-2/3 w-full">
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
                            <div className="inputGroup w-full md:flex items-center">
                                <label htmlFor="unitview" className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.unitView")}</label>
                                <input type="text" {...register('unitview')} onChange={onChangeField} placeholder={t("form.placeholders.unitView")}
                                    className="block md:w-2/3 w-full px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65]" />
                            </div>
                            <div className="inputGroup w-full md:flex items-center">
                                <label htmlFor="unitsize" className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.unitSize")}</label>
                                <input type="text" {...register('unitsize')} onChange={onChangeField} placeholder={t("form.placeholders.unitSize")}
                                    className="block md:w-2/3 w-full px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65]" />
                            </div>
                            <div className="inputGroup w-full md:flex items-center">
                                <label htmlFor="baths" className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.baths")}</label>
                                <Select {...register('baths')} onChange={onChangeField}
                                    className="px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] md:w-2/3 w-full text-[#2C2D65] text-sm font-medium">
                                    <option>{t("form.placeholders.selectBaths")}</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5+</option>
                                </Select>
                            </div>
                            <div className="inputGroup w-full md:flex items-center">
                                <label htmlFor="parking" className="text-sm md:w-1/3  w-full leading-loose">{t("form.labels.parking")}</label>
                                <Select {...register('parking')} onChange={onChangeField}
                                    className="px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] md:w-2/3 w-full text-[#2C2D65] text-sm font-medium">
                                    <option>{t("form.placeholders.selectParking")}</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5+</option>
                                </Select>
                            </div>
                            <div className="inputGroup w-full md:flex items-center">
                                <label htmlFor="unitnumber" className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.unitNumber")}</label>
                                <input type="text" {...register('unitnumber')} onChange={onChangeField} placeholder={t("form.placeholders.unitNumber")}
                                    className="block md:w-2/3 w-full px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65]" />
                            </div>

                            {/* mobile progress bar */}
                            <div className="progree-bar md:hidden block justify-items-center">
                                <img src={`${steps[currentStep].progressImg}`} title="progress bar"></img>
                            </div>

                            <div className="flex justify-between gap-5">
                                <button className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" onClick={prev}>{t("form.buttons.previous")}</button>
                                <button className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" onClick={next}>{t("form.buttons.next")}</button>
                            </div>
                        </div>
                    </>
                )}

                {!isSubmitSuccess && currentStep === 3 && (
                    <>
                        <div className="w-full mb-4 flex flex-col gap-5">
                            <div className="inputGroup w-full md:flex items-center">
                                <label htmlFor="askingprice" className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.askingPrice")}</label>
                                <input type="text" {...register('askingprice')} onChange={onChangeField} placeholder={t("form.placeholders.askingPrice")}
                                    className="block md:w-2/3 w-full px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65]" />
                            </div>
                            <div className="inputGroup w-full md:flex items-center">
                                <label htmlFor="status" className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.status")}</label>
                                <Select {...register('status')} onChange={onChangeField}
                                    className="px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] md:w-2/3 w-full text-[#2C2D65] text-sm font-medium">
                                    <option value="Rented">{t("form.options.status.rented")}</option>
                                    <option value="Vacant">{t("form.options.status.vacant")}</option>
                                    <option value="Owner_Occupied">{t("form.options.status.occupied")}</option>
                                </Select>
                            </div>
                            <div className="inputGroup w-full md:flex items-center">
                                <label htmlFor="service" className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.service")}</label>
                                <Select {...register('service')} onChange={onChangeField}
                                    className="px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] md:w-2/3 w-full text-[#2C2D65] text-sm font-medium">
                                    <option value="">{t("form.placeholders.service")}</option>
                                    <option value="Residential_for_rent">{t("form.options.service.res_rent")}</option>
                                    <option value="Residential_for_sale">{t("form.options.service.res_sale")}</option>
                                    <option value="Commercial_for_rent">{t("form.options.service.com_rent")}</option>
                                    <option value="Commercial_for_sale">{t("form.options.service.com_sale")}</option>
                                </Select>
                            </div>
                            <div className="inputGroup w-full md:flex items-center">
                                <label htmlFor="readytoview" className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.readyToView")}</label>
                                <Select {...register('readytoview')} onChange={onChangeField}
                                    className="px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] md:w-2/3 w-full text-[#2C2D65] text-sm font-medium">
                                    <option value="Yes">{t("form.options.yes")}</option>
                                    <option value="No">{t("form.options.no")}</option>
                                </Select>
                            </div>
                            {/* mobile progress bar */}
                            <div className="progree-bar md:hidden block justify-items-center">
                                <img src={`${steps[currentStep].progressImg}`} title="progress bar"></img>
                            </div>
                            <div className="flex justify-between gap-5">
                                <button className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" onClick={prev}>{t("form.buttons.previous")}</button>
                                <button className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" onClick={next}>{t("form.buttons.next")}</button>
                            </div>
                        </div>
                    </>
                )}

                {!isSubmitSuccess && currentStep === 4 && (
                    <>
                        <div className="w-full mb-4 flex flex-col gap-5">
                            <div className="inputGroup w-full md:flex items-center">
                                <label className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.attachImages")}</label>
                                <div className="relative md:w-2/3 w-full flex items-center">
                                    <input
                                        type="file"
                                        name="propertyimages"
                                        onChange={handleFileChange}
                                        accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                                        multiple
                                        id="propertyimages"
                                        className="hidden"
                                    />
                                    <FontAwesomeIcon icon={faPaperclip} className="fileLableImage absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    <label
                                        htmlFor="propertyimages"
                                        className="w-full px-10 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] flex items-center justify-start"
                                        style={{ cursor: "pointer" }}
                                    >
                                        {propertyImages.length > 0
                                            ? propertyImages.map((image) => image.name).join(", ")

                                            : t("form.labels.attachImages")}

                                    </label>
                                </div>
                            </div>

                            <div className="inputGroup w-full md:flex items-center">
                                <label className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.attachSpa")}</label>
                                <div className="relative md:w-2/3 w-full flex items-center">
                                    <input
                                        type="file"
                                        name="propertyspa"
                                        onChange={handleFileChange}
                                        accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                                        id="propertyspa"
                                        className="hidden"
                                    />
                                    <FontAwesomeIcon icon={faPaperclip} className="fileLableImage absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    <label
                                        htmlFor="propertyspa"
                                        className="w-full px-10 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] flex items-center justify-start"
                                        style={{ cursor: "pointer" }}
                                    >
                                        {propertySpa ? propertySpa.name : t("form.labels.attachSpa")}

                                    </label>
                                </div>
                            </div>

                            <div className="inputGroup w-full md:flex items-center">
                                <label className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.attachDeed")}</label>
                                <div className="relative md:w-2/3 w-full flex items-center">
                                    <input
                                        type="file"
                                        name="propertydeed"
                                        onChange={handleFileChange}
                                        accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                                        id="propertydeed"
                                        className="hidden"
                                    />
                                    <FontAwesomeIcon icon={faPaperclip} className="fileLableImage absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    <label
                                        htmlFor="propertydeed"
                                        className="w-full px-10 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] flex items-center justify-start"
                                        style={{ cursor: "pointer" }}
                                    >
                                        {propertyDeed ? propertyDeed.name : t("form.labels.attachDeed")}

                                    </label>
                                </div>
                            </div>
                            <div className="inputGroup w-full md:flex items-center">
                                <label className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.attachPassport")}</label>
                                <div className="relative md:w-2/3 w-full flex items-center">
                                    <input
                                        type="file"
                                        name="passportfile"
                                        onChange={handleFileChange}
                                        accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                                        id="passportfile"
                                        className="hidden"
                                    />
                                    <FontAwesomeIcon icon={faPaperclip} className="fileLableImage absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    <label
                                        htmlFor="passportfile"
                                        className="w-full px-10 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] flex items-center justify-start"
                                        style={{ cursor: "pointer" }}
                                    >
                                        {passportFile ? passportFile.name : t("form.labels.attachPassport")}

                                    </label>
                                </div>
                            </div>
                            {/* mobile progress bar */}
                            <div className="progree-bar md:hidden block justify-items-center">
                                <img src={`${steps[currentStep].progressImg}`} title="progress bar"></img>
                            </div>

                            <div className="flex justify-between gap-5">
                                <button className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" onClick={prev}>{t("form.buttons.previous")}</button>
                                <button className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" onClick={next}>{t("form.buttons.next")}</button>
                            </div>
                        </div>
                    </>
                )}

                {!isSubmitSuccess && currentStep === 5 && (
                    <>
                        <p className="font-bold mb-5">{t("form.labels.bestTime")}</p>
                        <div className="w-full mb-4 flex flex-col gap-5">
                            <div className="inputGroup w-full md:flex items-center">
                                <label htmlFor="datetoview" className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.date")}</label>
                                <div className="block md:w-2/3 w-full px-5 py-3 border border-[#E2E8F0] rounded-[7px] relative ">
                                    <input type="date"
                                        {...register('datetoview')}
                                        ref={setDateRef}
                                        className="placeholder-[#2C2D65]" />
                                    <FontAwesomeIcon icon={faChevronDown} className="arrowIcon absolute right-3"
                                        onClick={handleDateClick}></FontAwesomeIcon>
                                </div>
                            </div>
                            <div className="inputGroup w-full md:flex items-center">
                                <label htmlFor="timetoview" className="text-sm md:w-1/3 w-full leading-loose">{t("form.labels.time")}</label>
                                <div className="block md:w-2/3 w-full px-5 py-3 border border-[#E2E8F0] rounded-[7px] relative ">
                                    <input type="time"
                                        {...register('timetoview')}
                                        ref={setTimeRef}
                                        className="placeholder-[#2C2D65]" />
                                    <FontAwesomeIcon icon={faChevronDown} className="arrowIcon absolute right-3"
                                        onClick={handleTimeClick}></FontAwesomeIcon>
                                </div>
                            </div>
                            <input type="text" id="propName" value={formValue.propName}
                                {...register('propName')} className="hidden" readOnly />
                            <input type="text" id="cityName" value={formValue.cityName}
                                {...register('cityName')} className="hidden" readOnly />
                            <input type="text" className="hidden gclid_field clid_field" id="gclid_field" name="gclid_field"
                                placeholder="gclid_field" />

                            {/* mobile progress bar */}
                            <div className="progree-bar md:hidden block justify-items-center">
                                <img src={`${steps[currentStep].progressImg}`} title="progress bar"></img>
                            </div>

                            <div className="flex justify-between gap-5">
                                <button className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" onClick={prev}>{t("form.buttons.previous")}</button>
                                <button
                                    type="submit"
                                    className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" disabled={isSubmitting} >{isSubmitting ? t("form.buttons.submitting") : t("form.buttons.submit")}</button>
                            </div>

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

export default ListForm