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

type FormData = z.infer<typeof FormDataSchema2>

const steps : { id: string, name: string, progressValue: string, progressImg: string, fields: (keyof FormData)[] }[] = [
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


const ListModalForm: React.FC<ListFormProps> = ({fromModal}) => {
    
    const pathname = usePathname();
    const locale = pathname.split("/")[1] || 'en';
    const baseURL = typeof window !== 'undefined' ? window.location.origin : '';

    const [currentStep, setCurrentStep] = useState(0);

    const [allProps, setAllProps] = useState<any[]>([]);
    const [props, setProps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);    

    const[isSubmitting, setIsSubmitting] = useState(false);
    const[isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [postId, setPostId] = useState<string | null>(null);
    const [cityName, setCityName] = useState('');
    const [propName, setPropName] = useState('');
    const [gclidField, setGclidField] = useState('');
    const [apiUrl, setApiUrl] = useState('');
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
        agreement1 : true,
        agreement2 : true,
        agreement3 : true,
    },
    });

    const next = async() => {
        const fields = steps[currentStep].fields;
        if(fields && fields.length >0) {
            const isValid = await trigger(fields, { shouldFocus: true});
            if(!isValid) { console.log(fields ,"Empty.."); return }
        }
        
        if(currentStep < steps.length - 1) {                        
            setCurrentStep(step => step + 1);
        }
    }

    const prev = () => {
        if(currentStep > 0) {
            setCurrentStep(step => step - 1);
        }
    }     

    const[formValue, setFormValue] = useState<FormValue>({
        fname: '',
        lname:'',
        email:'',
        phone:'',
        purpose:'',
        proptype:'',
        beds: '',
        location:'',
        property:'',
        cityName: "",
        propName: "",
        });

    useEffect(() => {
        const fetchAllProperties = async () => {
            setLoading(true); 

            try {
                const totalPages = 36;      //From API "totalCount":845
                const pageNumbers = Array.from({length:totalPages}, (_, i) => i + 1);

                const batchSize = 5;
                const allFetched : any[] = []; 

                for(let i = 0; i < pageNumbers.length; i+= batchSize){
                    const batch =  pageNumbers.slice(i, i + batchSize);
                    const fetchPromises = batch.map(page =>
                        fetch(`/api/external/allprojects?page=${page}`).then(res => res.json())
                    );
                    const responses = await Promise.all(fetchPromises);

                    responses.forEach(res => {
                        if(res?.result?.length != 0) {
                            allFetched.push( ...res.result);
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

    const onChangeField = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormValue({...formValue, [e.target.name]:e.target.value });
    }
    const onChangeLocation = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLocation = e.target.options[e.target.selectedIndex];
        const city = selectedLocation.getAttribute('data-value') || '';
        const locationValue = e.target.value;
        setFormValue(prev => ({ 
            ...prev, 
            location:locationValue,
            cityName: city,
        }));
        setCityName(city);
        setValue('cityName', city);
    }
    const onChangeProperty = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProperty = e.target.options[e.target.selectedIndex];
        const property_id = selectedProperty.value || '';
        setFormValue({ ...formValue, property:property_id, propName: selectedProperty.text });
        setPropName(selectedProperty.text);
        setValue('propName',selectedProperty.text);
    }

    useEffect(() => {
        if (!formValue.cityName) return;

        switch (formValue.cityName) {
        case 'Dubai':
            setApiUrl('https://api.portal.dubai-crm.com/leads?APIKEY=d301dba69732065cd006f90c6056b279fe05d9671beb6d29f2d9deb0206888c38239a3257ccdf4d0');
            break;
        default:
            setApiUrl('https://api.portal.psi-crm.com/leads?APIKEY=160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a');
            break;
        }
    }, [formValue.cityName]);

    const onSubmit = async (data: FormData) => {
        if (typeof window === 'undefined') return; //ensure code runs only in browser

        const lastSubmitTime = localStorage.getItem("formSubmitTime");
        const now = Date.now();
        const cooldown = 10 * 60 * 1000; // 10 minutes 

        if(lastSubmitTime && now - parseInt(lastSubmitTime) < cooldown ) {  
            setIsAlreadySubmitted(true);          
            return;
        }

        try{
            setIsSubmitting(true); 
            let bedrooms, bathrooms, contactType, requirementType,ReferredByID, 
            ReferredToID, ActivityAssignedTo, Budget, Budget2, unitType, sendtomail;

            //console.log("Final submission data:", finalData);                   
            
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

            // switch (campaign) {
            //     case '':
            //         propertyCampaignId = "";
                
            //     default:
            //         propertyCampaignId = propertyCampaignId;
            // } 

            switch(data.beds){
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
                    ReferredToID=3458;
                    ReferredByID=3458;
                    ActivityAssignedTo=3458;
                    Budget=2000000;
                    Budget2=7000000;
                    break;
                case 'Rent':
                    contactType = 2;
                    requirementType = 91213;
                    ReferredToID=4794;
                    ReferredByID=3458;
                    ActivityAssignedTo=4794;
                    Budget=65000;
                    Budget2=1000000;
                    break;
                case 'Manage':
                    contactType = 2;
                    requirementType = 537;
                    ReferredToID=3458;
                    ReferredByID=3458;
                    ActivityAssignedTo=3458;
                    Budget=2000000;
                    Budget2=7000000;
                    break;
                default:
                    contactType = 1;
                    requirementType = 91212;
                    ReferredToID=3458;
                    ReferredByID=3458;
                    ActivityAssignedTo=3458;
                    Budget=2000000;
                    Budget2=7000000;
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
            
            switch (cityName) {
                case 'Abu Dhabi':	    		
                    ReferredToID=3458;
                    ReferredByID=3458;
                    sendtomail='callcenter@psinv.net';
                    break;
                case 'Dubai':	    		
                    ReferredToID=4421;
                    ReferredByID=4421;
                    ActivityAssignedTo=4421;
                    sendtomail = "callcenter@psidubai.com";
                    break;	    	
                default:
                    ReferredToID= ReferredToID;
                    ReferredByID=ReferredByID;
                    ActivityAssignedTo=ActivityAssignedTo;
                    sendtomail = "callcenter@psinv.net";
                    break;
            }
            
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
                ActivityRemarks: remarks,
                IsForAutoRotation: "",
                PropertyCampaignId: propertyCampaignId,
                contactClassId: "",
                google_gclid: gclidField,
            };

            try {
                const response = await fetch(`${apiUrl}` , {
                    method: "POST",
                    headers : {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formDataToSend),
                });
                
                const mailRes = await fetch("https://psinv.net/api/sendemail.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        body: `
                        List Your Property<br><br>
                        Name: ${data.fname} ${data.lname}<br>
                        Email: ${data.email}<br>
                        Phone: ${data.phone}<br>
                        Purpose: ${data.purpose}<br>
                        Property Type: ${data.proptype}<br>
                        Bedroom: ${data.beds}<br>
                        Location: ${data.cityName}<br>
                        Property: ${data.propName}<br>
                        URL coming from: ${currentUrl}<br>
                        `,
                        receiver: sendtomail,
                        subject: "New inquiry - List Your Property",
                        filename: "",
                        filedata: ""
                    }),
                });
    
                if(response.ok && mailRes.ok) {
                    setPostId("success");
                    setIsSubmitSuccess(true);
                    setIsAlreadySubmitted(false);
                    //window.location.href = `/${locale}/thankyou?${encodeURIComponent(data.email)}`
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

        } catch(error){
            console.error("Submission failed:", error);
        }finally{
            setIsSubmitting(false);
        }        
    }    

return(
    <>
    <div className="flex justify-between mb-5 relative">
        <h2 className={fromModal ? 
        'hidden text-4xl text-[#E35F27] font-bold leading-normal' 
        : 'text-4xl text-[#E35F27] font-bold leading-normal'}>List Your Property</h2>
        {isSubmitSuccess !== true && (
            <div className=" absolute right-0 bottom-[-30px]">           
                <p>{currentStep + 1} of {steps.length}</p>
            </div>
            )
        }
    </div> 
    <form onSubmit={handleSubmit(onSubmit)} className="listForm">
        {!isSubmitSuccess && currentStep === 0 && (
            <>                                                    
                <div className="inputGroup  w-full mb-4">
                    <label htmlFor="fname" className="text-sm block">First Name <sup className="imp text-[#E35F27]">*</sup></label>
                    <input type="text" 
                    {...register('fname')} placeholder="First Name"
                    className="block w-full px-5 py-3 border border-[#A6A6A6] rounded-[7px] placeholder-[#A6A6A6]" />
                    {errors.fname?.message && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.fname.message}
                        </p>
                    )}
                </div>

                <div className="inputGroup w-full mb-4">
                    <label htmlFor="lname" className="text-sm block">Last Name <sup className="imp text-[#E35F27]">*</sup></label>
                    <input type="text" placeholder="Last Name"
                    {...register('lname')}
                    className="block w-full px-5 py-3 border border-[#A6A6A6] rounded-[7px] placeholder-[#A6A6A6]" />
                    {errors.lname?.message && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.lname.message}
                        </p>
                    )}
                </div>
                           
                <div className="inputGroup w-full">
                    <label htmlFor="lname" className="text-sm block">Phone Number <sup className="imp text-[#E35F27]">*</sup></label>
                    <Controller name="phone"
                    control={control}                        
                    render={({field}) => (
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
                    <label htmlFor="email" className="text-sm block">Email Address <sup className="imp text-[#E35F27]">*</sup></label>
                    <input type="email" placeholder="Email Address"
                    {...register('email')}
                    className="block w-full px-5 py-3 border border-[#A6A6A6] rounded-[7px] placeholder-[#A6A6A6]" />
                    {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
                </div>
                <button className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" onClick={next}>Next</button>
            </>
        )}

        {!isSubmitSuccess && currentStep === 1 && (
            <>
                <div className="w-full mb-5 mt-3">
                    <div className="inputGroup">
                        <label htmlFor="purpose" className="text-sm block">Property Purpose</label>
                        <Select {...register('purpose')} onChange={onChangeField}
                        className="w-full px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] text-[#2C2D65] text-sm font-medium">
                            <option>Purpose</option>
                            <option value="Sale">Sale</option>
                            <option value="Rent">Rent</option>
                            <option value="Manage">Manage</option>
                        </Select>
                    </div>        
                </div>
                <div className="w-full mb-5 mt-3">
                    <div className="inputGroup">
                        <label htmlFor="location" className="text-sm w-1/3">Location<sup className="imp text-[#E35F27]">*</sup></label>                    
                        <Select
                        {...register('location')} required onChange={onChangeLocation}
                        className="w-full px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] text-[#2C2D65] text-sm font-medium">
                            <option>Select location</option>
                            <option value="91823" data-value="Abu Dhabi">Abu Dhabi</option>
                            <option value="91578" data-value="Dubai">Dubai</option>
                            <option value="166131" data-value="Sharjah">Sharjah</option>
                            <option value="58467" data-value="Ras Al Khaimah">RAK</option>
                        </Select> 
                        {errors.location && <p className="block text-red-500 text-sm mt-3">{errors.location.message}</p>}
                    </div>
                </div>
                <div className="w-full mb-5 mt-3">
                    <div className="inputGroup">
                        <label htmlFor="prop-type" className="text-sm w-1/3">Property Type</label>
                        <Select {...register('proptype')} onChange={onChangeField}
                        className="w-full px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] text-[#2C2D65] text-sm font-medium">
                            <option>Select property type</option>
                            <option value="Villa">Villa</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Townhouse">Townhouse</option>
                        </Select>
                    </div>
                </div>                
                
                <div className="w-full mb-5 mt-3">
                    <div className="inputGroup">
                        <label htmlFor="property" className="text-sm w-1/3">Property <sup className="imp text-[#E35F27]">*</sup></label>
                        {loading ? (
                                <p>Loading properties...</p>
                            ) : (
                                <Select
                                    value={formValue.property}
                                    {...register('property')}
                                    onChange={onChangeProperty}
                                    className="px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] w-full text-[#2C2D65] text-sm font-medium required"
                                >
                                    <option value="">Select a property</option>
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
                        <label htmlFor="beds" className="text-sm w-1/3">Beds</label>
                        <Select {...register('beds')} onChange={onChangeField}
                        className="w-full px-5 py-3 border border-[#E2E8F0] rounded-[7px] placeholder-[#2C2D65] text-[#2C2D65] text-sm font-medium">
                            <option>Select number of bedrooms</option>
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
                        {...register('propName')}  className="hidden" readOnly />                    
                <input type="text" id="cityName" value={formValue.cityName}
                    {...register('cityName')} className="hidden" readOnly />
                <input type="text" className="hidden gclid_field clid_field" id="gclid_field" name="gclid_field" 
                    placeholder= "gclid_field" />
                
                <div className="flex justify-between gap-5 mb-4">
                    <button className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" onClick={prev}>Previous</button>
                    <button 
                    type="submit" 
                    className="bg-orange-600 text-white px-6 py-3 rounded-[8px] w-full mt-4 cursor-pointer" disabled={isSubmitting} >{isSubmitting ? "Submitting.." : "Submit"}</button>                        
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
            </>
        )}

        {isSubmitSuccess && (
            <>
                <div className="w-full items-center">
                    <img src="/assets/images/list-property/list-thankyou.svg" alt="thank you" className="mb-5 mx-auto"></img>
                    <div className="thankyou-text text-center bg-[#e35f271a] px-15 py-10 rounded-[16px] w-full">
                        <h2 className="text-5xl text-[#272963] font-bold mb-4">Thank You!</h2>
                        <p className="text-[#525151] text-lg">Your submission has been sent.<br/>
                        Our agent will contact you shortly.</p>
                    </div>
                </div>
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
    {!isSubmitSuccess && (
         <p className="text-sm text-[#8A8A8A] mt-5">By clicking Submit, you agree to our <a href="terms">Terms & Conditions</a> and <a href="privacy">Privacy Policy</a></p>
    )}
   
    </>
)
}

export default ListModalForm