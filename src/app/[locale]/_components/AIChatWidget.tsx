'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Sparkles, Minimize2, Phone, Mail, User, Send } from 'lucide-react';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const schema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(7, { message: "Invalid phone number" }),
    message: z.string().optional(),
    agreement1: z.boolean().refine((val) => val, { message: "You must agree to this" }),
});

type FormData = z.infer<typeof schema>;

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
    const pathname = usePathname();
    const locale = pathname.split("/")[1] || "en";
    const t = useTranslations('Common_Form_Agreements');

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        const currentUrl = window.location.href;

        // Construct standard payload
        const remarks = `
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
            MobilePhone: data.phone,
            Email: data.email,
            NationalityID: "65946",
            LanguageID: "115915",
            Remarks: data.message,
            RequirementType: "91212",
            ContactType: "3",
            CountryID: "65946",
            StateID: "91823",
            CityID: "91823",
            DistrictID: "102625",
            UnitType: "19",
            MethodOfContact: "115747",
            MediaType: "129475",
            MediaName: "165233",
            ActivityTypeId: "167234",
            ActivitySubject: "Website Floating Widget Inquiry",
            ActivityRemarks: remarks,
            ReferredToID: "3458",
            ReferredByID: "3458",
            ActivityAssignedTo: "3458",
        };

        try {
            const response = await fetch("https://api.portal.psi-crm.com/leads?APIKEY=160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formDataToSend),
            });

            if (response.ok) {
                setSubmitStatus('success');
                reset();
                setTimeout(() => {
                    window.location.href = `/${locale}/thankyou?email=${encodeURIComponent(data.email)}`;
                }, 1500);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error("Error:", error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed bottom-17 right-6 z-[9999] flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white pointer-events-auto rounded-3xl shadow-2xl border border-gray-100 w-[90vw] md:w-[380px] mb-4 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-[#0c1445] p-5 flex items-center justify-between text-white shadow-md relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/10 pointer-events-none" />

                            <div className="flex items-center gap-3 relative z-10">
                                <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 shadow-inner">
                                    <Sparkles size={20} className="text-yellow-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">Get in Touch</h3>
                                    <p className="text-xs text-blue-200/80 font-medium hidden">We usually reply within minutes</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors relative z-10 text-white/70 hover:text-white"
                            >
                                <Minimize2 size={20} />
                            </button>
                        </div>

                        {/* Form Content */}
                        <div className="p-6 bg-white max-h-[60vh] overflow-y-auto scrollbar-thin">
                            {submitStatus === 'success' ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                        <Sparkles className="text-green-600 w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                                    <p className="text-gray-500 text-sm max-w-[200px]">Thank you for reaching out. One of our agents will contact you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    {submitStatus === 'error' && (
                                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
                                            Something went wrong. Please try again.
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <div className="relative">
                                                <User size={16} className="absolute left-3 top-3.5 text-gray-400" />
                                                <input
                                                    {...register("firstName")}
                                                    placeholder="First Name"
                                                    className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0c1445]/10 focus:border-[#0c1445]"
                                                />
                                            </div>
                                            {errors.firstName && <p className="text-red-500 text-[10px] ml-1">{errors.firstName.message}</p>}
                                        </div>
                                        <div className="space-y-1">
                                            <input
                                                {...register("lastName")}
                                                placeholder="Last Name"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0c1445]/10 focus:border-[#0c1445]"
                                            />
                                            {errors.lastName && <p className="text-red-500 text-[10px] ml-1">{errors.lastName.message}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="relative">
                                            <Mail size={16} className="absolute left-3 top-3.5 text-gray-400" />
                                            <input
                                                type="email"
                                                {...register("email")}
                                                placeholder="Email Address"
                                                className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0c1445]/10 focus:border-[#0c1445]"
                                            />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-[10px] ml-1">{errors.email.message}</p>}
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
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0c1445]/10 focus-within:border-[#0c1445]"
                                                    numberInputProps={{
                                                        className: "w-full bg-transparent focus:outline-none text-sm placeholder:text-gray-400"
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.phone && <p className="text-red-500 text-[10px] ml-1">{errors.phone.message}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <textarea
                                            {...register("message")}
                                            rows={3}
                                            placeholder="How can we help you?"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0c1445]/10 focus:border-[#0c1445] resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#0c1445] hover:bg-[#0c1445]/90 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Send Message
                                                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                    {/* Consent text like screenshot */}
                                    <div>
                                        <span className="text-[10px] text-gray-500 space-y-2 mt-4 italic">{t('byclickingsubmit.part1')} 
                                            <Link href="/terms" title="terms" className="underline">{t('byclickingsubmit.terms')}</Link> {t('byclickingsubmit.and')} <Link href="/privacy" title="privacy" className="underline">{t('byclickingsubmit.privacy')}</Link>
                                        </span>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Footer Branding */}
                        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                            <p className="text-[10px] text-gray-400 font-medium">Powered by Property Shop Investment</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`pointer-events-auto p-4 rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-md transition-all duration-300 z-[10000] relative group ${isOpen
                    ? 'bg-gray-800 text-white rotate-90'
                    : 'bg-[#0c1445] text-white hover:bg-[#0c1445]/90'
                    }`}
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}

                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                    </span>
                )}

                {/* Text Label on Hover */}
                {!isOpen && (
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-3 py-1.5 rounded-lg shadow-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Chat with us
                        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 transform" />
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default AIChatWidget;
