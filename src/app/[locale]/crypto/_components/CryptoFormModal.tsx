"use client";

import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { X, User, Mail } from 'lucide-react';

import { useTranslations } from 'next-intl';

const CryptoFormModal: React.FC<{ isOpen: boolean; onClose: () => void; projectTitle?: string }> = ({ isOpen, onClose, projectTitle }) => {
    const t = useTranslations('CryptoPage.form');

    const schema = z.object({
        firstName: z.string().min(1, { message: t('validation.firstName') }),
        lastName: z.string().min(1, { message: t('validation.lastName') }),
        email: z.string().email({ message: t('validation.email') }),
        phone: z.string().min(7, { message: t('validation.phone') }),
        message: z.string().optional(),
    });

    type FormData = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [gclidField, setGclidField] = useState('');

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const currentUrl = window.location.href;

        const remarks = `Crypto Currency- Inquiry </br>
        Client Name: ${data.firstName} ${data.lastName} </br>
        Client Email: ${data.email} </br>
        Client Phone: ${data.phone} </br>
        Message: ${data.message || 'No message'} </br>
        ${projectTitle ? `Interested Project: ${projectTitle} </br>` : ''}
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
            Remarks: data.message || "Crypto Page Inquiry",
            RequirementType: "91212",
            ContactType: "3",
            CountryID: "65946",
            StateID: "91823",
            CityID: "91823",
            DistrictID: "",
            CommunityID: "",
            PropertyID: "",
            UnitType: "19",
            MethodOfContact: "115747",
            MediaType: "165232",
            MediaName: "60612",
            DeactivateNotification: "",
            Bedroom: "21935",
            Bathroom: "21935",
            Budget: "3050000",
            Budget2: "5000000",
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
            PropertyCampaignId: "",
            contactClassId: "",
            google_gclid: gclidField,
        };

        try {
            let urlParams = new URLSearchParams(window.location.search);
            let source = urlParams.get('utm_source') || '';
            let gclid = urlParams.get('gclid_field') || '';

            setGclidField(gclid);

            if (gclidField !== '') {
                source = 'google_ads';
            }
            else {
                source = source;
            }

            // CRM Post
            await fetch("https://api.portal.psi-crm.com/leads?APIKEY=160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formDataToSend),
            });

            // Email Post
            const mailRes = await fetch("https://registration.psinv.net/api/sendemail2.php", {
                method: 'POST',
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
                                        Client Name:
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

                                <tr class="">
                                  <td style="background-color:#f4f3f3;  color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                  font-size:12px; font-weight:bold;" class="">
                                      Message:
                                  </td>
                                  <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                  font-size:12px; font-weight:bold;" class="">
                                      ${data.message || '-'}
                                  </td>
                                </tr>
                                
                                ${projectTitle ?
                            `<tr class="">
                                    <td style="background-color:#f4f3f3;  color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                    font-size:12px; font-weight:bold;" class="">
                                        Interested Project::
                                    </td>
                                    <td style="background-color:#f4f3f3; color:#8b8b8b; font-family:Arial, Helvetica, sans-serif;
                                    font-size:12px; font-weight:bold;" class="">
                                        ${projectTitle} 
                                    </td>
                                  </tr>` : ''
                        }

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
                        </td>
                    </tr>
                    </tbody>
                </table>
          `,
                    receiver: "callcenter@psinv.net",
                    subject: "New Enquiry - Crypto Page",
                })
            });

            if (mailRes.ok) {
                setSubmitStatus('success');
                reset();
                setTimeout(() => {
                    onClose();
                    setSubmitStatus('idle');
                }, 3000);
            } else {
                setSubmitStatus('error');
            }

        } catch (error) {
            console.error(error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-999" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#030335] p-6 text-left align-middle shadow-xl transition-all border border-white/10">
                                <div className="flex justify-between items-start mb-6">
                                    <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-white">
                                        {t('title')}
                                    </Dialog.Title>
                                </div>

                                {submitStatus === 'success' && (
                                    <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded text-green-200 text-sm">
                                        {t('success')}
                                    </div>
                                )}
                                {submitStatus === 'error' && (
                                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-200 text-sm">
                                        {t('error')}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                                    {/* First Name */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white">
                                            <User size={18} fill="currentColor" />
                                        </div>
                                        <input
                                            type="text"
                                            {...register("firstName")}
                                            placeholder={t('firstName')}
                                            className="w-full pl-10 pr-4 py-3 bg-[#1A1A4A] border border-transparent focus:border-indigo-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                                        />
                                        {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
                                    </div>

                                    {/* Last Name */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white">
                                            <User size={18} fill="currentColor" />
                                        </div>
                                        <input
                                            type="text"
                                            {...register("lastName")}
                                            placeholder={t('lastName')}
                                            className="w-full pl-10 pr-4 py-3 bg-[#1A1A4A] border border-transparent focus:border-indigo-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                                        />
                                        {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
                                    </div>

                                    {/* Email */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            {...register("email")}
                                            placeholder={t('email')}
                                            className="w-full pl-10 pr-4 py-3 bg-[#1A1A4A] border border-transparent focus:border-indigo-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                                        />
                                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                                    </div>

                                    {/* Phone - adjusting styles to match dark theme */}
                                    <div className="relative [&_.PhoneInputInput]:bg-[#1A1A4A] [&_.PhoneInputInput]:text-white [&_.PhoneInputInput]:border-transparent [&_.PhoneInputInput]:focus:outline-none [&_.PhoneInputInput]:placeholder-gray-400 [&_.PhoneInput]:bg-[#1A1A4A] [&_.PhoneInput]:rounded-lg [&_.PhoneInput]:p-3 [&_.PhoneInputCountryIconImg]:text-white">
                                        <Controller
                                            name="phone"
                                            control={control}
                                            render={({ field }) => (
                                                <PhoneInput
                                                    {...field}
                                                    international
                                                    defaultCountry="AE"
                                                    placeholder={t('phone')}
                                                    className="w-full bg-transparent"
                                                />
                                            )}
                                        />
                                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                                    </div>

                                    {/* Message */}
                                    <div className="relative">
                                        <textarea
                                            {...register("message")}
                                            placeholder={t('message')}
                                            rows={4}
                                            className="w-full p-4 bg-[#1A1A4A] border border-transparent focus:border-indigo-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#E85C29] hover:bg-[#d64f1e] text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                    >
                                        {isSubmitting ? t('submitting') : t('submit')}
                                    </button>

                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CryptoFormModal;
