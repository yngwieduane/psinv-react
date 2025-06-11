'use client';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { notFound } from "next/navigation";
import { Audrey, BrittanySignature } from "@/utils/fonts";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

interface Params {
  params: { slug: string; locale: string };
}

interface Job {
  name: string;
  qualification: string;
  responsibilities: string;
  skills: string;
  description: string;
}

export default function JobDetailsPage() {
const params = useParams();
const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : '';
const locale = typeof params?.locale === 'string' ? params.locale : '';

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
console.log("Slug:", slug);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

useEffect(() => {
  const fetchJob = async () => {
    const id = slug?.split("-").pop();
    if (!id) return;

    try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseURL}/api/external/jobdetail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
if (!res.ok) {
  const text = await res.text();
  console.error("Fetch failed:", text);
  throw new Error("Failed to fetch job detail");
}
      const data = await res.json();
      setJob(data?.result?.[0] ?? null);
    } catch (err) {
      console.error("Error fetching job details:", err);
      setJob(null);
    } finally {
      setLoading(false);
    }
  };

  fetchJob();
}, [slug]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!job) return notFound();
const tempDiv = document.createElement("div");
tempDiv.innerHTML = job.qualification;
const plainText = tempDiv.textContent || tempDiv.innerText || "";
console.log("Qualification Text:", plainText);
  return (
    <div className="w-full mb-5">
      {/* Header Section */}
      <section className="relative bg-cover bg-center flex flex-col justify-center items-center text-white text-center h-[310px]" style={{ backgroundImage: "url('/images/job-single-bg.webp')" }}>
        <div className="absolute inset-0 bg-[#00000066] z-10" />
        <div className="relative z-20">
          <h1 className="text-[64px] md:text-[96px] font-bold">CAREERS</h1>
          <p className="text-lg mt-4">Home &gt; Careers &gt; {job.name}</p>
        </div>
      </section>

      {/* Application Intro */}
      <section className="max-w-[1320px] mx-auto mb-10 px-4 md:px-10 py-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 border-2 border-[#2C2D65] rounded-full flex items-center justify-center">
            <span className="text-[#2C2D65] text-xl">&#8592;</span>
          </div>
          <h2 className="text-[#272963] text-[18px] leading-[1.5] md:text-[40px] md:leading-[52px] uppercase font-bold">
            RECRUITMENT APPLICATION<span className={`${BrittanySignature.className} capitalize text-orange-600`}>Form</span>
          </h2>
        </div>
        <p className={`text-[#1A1A1A] text-[14px] leading-[1.5] md:text-[16px] md:leading-[30.4px] ${poppins.className}`}>
          This Application is to provide the employer with the information required to evaluate your profile transparently. Keeping a high level of confidentiality of the given information, all fields are required to be filled, which will help you as a candidate to achieve your goals in terms of the employer recommendations.
        </p>
      </section>

      {/* Job Content */}
      <section className="max-w-[1320px] mx-auto px-4 md:px-10 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="bg-[#F5F5F8] rounded-2xl p-6 w-full md:max-w-[340px]">
          <div className="flex flex-col gap-10">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center pt-1">
                <div className="w-4 h-4 bg-[#E35F27] rounded-full"></div>
                <div className="h-10 w-[2px] bg-gray-300 mt-1"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              </div>
              <div>
                <p className="text-[#E35F27] font-semibold">Job Overview</p>
                <p className="text-sm text-[#9DA4AE] mt-1">Apply now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Details */}
        <div className="w-full">
          {/* Job Overview */}
          <div className="bg-[#F5F5F8] rounded-2xl p-6 relative">
            <h2 className="text-[20px] md:text-[24px] font-semibold text-[#E35F27] mb-4">{job.name}</h2>
            <p className="text-[#1A1A1A] text-[14px] md:text-[16px] leading-[1.5] md:leading-[30.4px] font-poppins">
              {job.description}
            </p>
            <div className="absolute top-6 right-6 w-10 h-10 border-2 border-[#E35F27] rounded-full flex items-center justify-center">
              <span className="text-[#E35F27] text-lg">↑</span>
            </div>
          </div>

          {/* Accordion Sections */}
          {[
            { title: "Qualifications", content: job.description },
            { title: "Key Responsibilities", content: job.responsibilities },
            { title: "Skills & Competencies", content: job.skills },
          ].map((section, index) => (
            <div key={index} className="bg-[#F5F5F8] mt-4 p-6 rounded-2xl">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-[#2C2D65] text-lg md:text-xl font-semibold">
                  {section.title}:
                </h3>
                <div className="w-10 h-10 border-2 border-[#2C2D65] rounded-full flex items-center justify-center">
                  <span className="text-[#2C2D65] text-xl">
                    {openIndex === index ? "↑" : "↓"}
                  </span>
                </div>
              </div>
              {openIndex === index && (
                <div
                  className="mt-4 text-[#1A1A1A] text-sm leading-[1.5] md:text-base md:leading-[30.4px] font-poppins"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
