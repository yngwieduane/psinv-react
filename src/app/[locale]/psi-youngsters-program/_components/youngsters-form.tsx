'use client';

import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaUser, FaEnvelope, FaSchool, FaMapMarkerAlt } from 'react-icons/fa';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {nationalityOptions,departmentOptions} from '@/data/youngsters';

const FormDataSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  age: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  nationality: z.string().min(1, 'Required'),
  school: z.string().min(1, 'Required'),
  grade: z.string().min(1, 'Required'),
  interest: z.string().min(1, 'Required'),
  career: z.string().min(1, 'Required'),
  department: z.string().min(1, 'Required'),
  fatherName: z.string().min(1, 'Required'),
  fatherContact: z.string().min(1, 'Required'),
  address: z.string().min(1, 'Required'),
  motherName: z.string().min(1, 'Required'),
  motherContact: z.string().min(1, 'Required'),
});

type FormData = z.infer<typeof FormDataSchema>;

const steps = [
  { name: 'Personal Info', fields: ['firstName', 'lastName', 'age', 'email', 'nationality'] },
  { name: 'School Details', fields: ['school', 'grade', 'interest', 'career', 'department'] },
  { name: 'Parent Info', fields: ['fatherName', 'fatherContact', 'address', 'motherName', 'motherContact'] },
];

const iconMap: { [key: string]: React.ReactNode } = {
  firstName: <FaUser />, lastName: <FaUser />, age: <FaUser />, email: <FaEnvelope />,
  school: <FaSchool />, grade: <FaSchool />, interest: <FaSchool />, career: <FaSchool />,
  department: <FaMapMarkerAlt />, nationality: <FaMapMarkerAlt />,
  fatherName: <FaUser />, motherName: <FaUser />, address: <FaMapMarkerAlt />,
};

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
const [currentUrl, setCurrentUrl] = useState('');

useEffect(() => {
  if (typeof window !== 'undefined') {
    setCurrentUrl(window.location.href);
  }
}, []);
  const {
    register,
    handleSubmit,
    trigger,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormDataSchema),
    shouldUnregister: false,
  });

  const next = async () => {
    const fields = steps[step].fields;
    const valid = await trigger(fields as (keyof FormData)[]);
    if (valid) setStep((prev) => prev + 1);
  };

  const prev = () => setStep((prev) => Math.max(prev - 1, 0));

const onSubmit: SubmitHandler<FormData> = async (data) => {
  setIsSubmitting(true);
  try {
    // Submit to CRM
    const crmResponse = await fetch('https://apigateway.psi-crm.com/CrmDfm/Activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apiKey': 'your-api-key-here',
      },
      body: JSON.stringify({
        assignAgentId: '5b885493-786c-4caa-871c-ac600f4f9bb9',
        activityTypeId: '1801',
        subject: `Youngsters Program - ${data.firstName} ${data.lastName}`,
        comments: `Email: ${data.email}\nAge: ${data.age}\n...`,
        isOpen: true,
        createdByName: 'API Integration',
        activityDate: new Date().toISOString(),
      }),
    });

    const crmResult = await crmResponse.json();
    console.log('CRM submission result:', crmResult);

const mailRes = await fetch("https://registration.psinv.net/api/sendemail2.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    body: `
      <h2>New Youngster Submission</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Age:</strong> ${data.age}</p>
      <p><strong>School:</strong> ${data.school}</p>
      <p><strong>Grade:</strong> ${data.grade}</p>
      <p><strong>Department:</strong> ${data.department}</p>
      <p><strong>Father Contact:</strong> ${data.fatherContact}</p>
      <p><strong>Mother Contact:</strong> ${data.motherContact}</p>
      <p><strong>Address:</strong> ${data.address}</p>
      <p><strong>Form Submitted From:</strong> ${currentUrl}</p>
    `,
    receiver: "callcenter@psinv.net",
    subject: `New Youngster Submission - ${data.firstName} ${data.lastName}`,
    filename: "",
    filedata: "",
  }),
});

    if (!mailRes.ok) {
      const text = await mailRes.text();
      throw new Error(`Email API failed: ${text}`);
    }


    setIsSubmitted(true);
  } catch (error) {
    console.error('Submission error:', error);
  } finally {
    setIsSubmitting(false);
  }
};


  const handleFormSubmit = async () => {
    const fields = steps[step].fields;
    const valid = await trigger(fields as (keyof FormData)[]);
    if (valid) handleSubmit(onSubmit)();
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h2>
        <p className="text-red-700">Your information has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="w-full max-w-2xl bg-[#333A7B] p-8 rounded-lg text-white">
        <h2 className="text-3xl font-bold mb-1 text-center">Apply Now</h2>
        <p className="text-orange-400 text-center mb-6">Limited Spots Available</p>
        <h3 className="text-base md:text-xl font-bold text-left mt-10 my-10">Get Your Spot For The Upcoming Program</h3>
        {step > 0 && (
          <div className="flex justify-start mt-4 mb-6">
            <button type="button" onClick={prev} className="text-white text-xl">
              ←
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps[step].fields.map((field) => (
            <div
              key={field}
              className={`relative ${
                field === 'department' || field === 'nationality' || field === 'address' ? 'md:col-span-2' : ''
              }`}
            >
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300">
                {iconMap[field]}
              </div>
              {field === 'nationality' ? (
                <select
                  {...register(field as keyof FormData)}
                  className="w-full pl-10 pr-4 py-3 bg-[#2e3170] border border-transparent rounded placeholder-gray-300 text-white"
                >
                  <option value="">Select Nationality</option>
                  {nationalityOptions.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              ) : field === 'department' ? (
                <select
                  {...register(field as keyof FormData)}
                  className="w-full pl-10 pr-4 py-3 bg-[#2e3170] border border-transparent rounded placeholder-gray-300 text-white"
                >
                  <option value="">Preferred Department to experience in the Program</option>
                  {departmentOptions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              ) : field === 'address' ? (
                <textarea
                  {...register(field as keyof FormData)}
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 bg-[#2e3170] border border-transparent rounded placeholder-gray-300 text-white"
                  placeholder="Residential Address *"
                />
              ) : field === 'fatherContact' || field === 'motherContact' ? (
                <Controller
                  name={field as 'fatherContact' | 'motherContact'}
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      defaultCountry="AE"
                      className="w-full! pl-12! pr-4! py-3! bg-[#2e3170]! border-transparent! rounded! text-white! placeholder-gray-300"
                      placeholder={
                        field.name === 'fatherContact'
                          ? "Father’s Contact number *"
                          : "Mother’s Contact *"
                      }
                    />
                  )}
                />
              ) : (
                <input
                  {...register(field as keyof FormData)}
                  className="w-full pl-10 pr-4 py-3 bg-[#2e3170] border border-transparent rounded placeholder-gray-300 text-white"
                  type={field === 'age' ? 'number' : 'text'}
                  placeholder={(() => {
                    if (field === 'firstName') return 'First Name *';
                    if (field === 'lastName') return 'Last Name *';
                    if (field === 'age') return 'Age *';
                    if (field === 'email') return 'Email *';
                    if (field === 'school') return 'School *';
                    if (field === 'grade') return 'Current Grade/Class *';
                    if (field === 'interest') return 'Interest/Hobby *';
                    if (field === 'career') return 'Dream Career *';
                    if (field === 'fatherName') return 'Father’s Full Name *';
                    if (field === 'motherName') return 'Mother’s Full Name *';
                    return field;
                  })()}
                />
              )}
              {errors[field as keyof FormData]?.message && (
                <p className="text-red-400 text-sm mt-1 col-span-2">
                  {errors[field as keyof FormData]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="grow">
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded text-white w-full"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFormSubmit}
                disabled={isSubmitting}
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded text-white w-full"
              >
                {isSubmitting ? 'Submitting...' : 'Submit!'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
