"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { Audrey, BrittanySignature } from "@/utils/fonts";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useRef } from "react";
import JobApplicationForm from "../../_components/JobApplicationForm";
import CareerJourney from "../../_components/CareerJourney";
const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface Params {
  params: { slug: string; locale: string };
}
interface Job {
  id: number;
  name: string;
  description: string;
  qualification?: string;
  job_must_have?: ({ name: string } | number)[];
  responsibilities?: ({ name: string } | number)[];
  job_skills?: ({ name: string } | number)[];
}

export default function JobDetailsPage() {
  const params = useParams();
  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray(params?.slug)
        ? params.slug[0]
        : "";
  const locale = typeof params?.locale === "string" ? params.locale : "";

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [resolvedResponsibilities, setResolvedResponsibilities] = useState<
    { id: number; name: string }[]
  >([]);
  const [resolvedMustHave, setResolvedMustHave] = useState<
    Array<{ name: string; id?: number }>
  >([]);

  const formRef = useRef<HTMLDivElement | null>(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchJob = async () => {
      const id = slug?.split("-").pop();
      if (!id) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/external/jobdetail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (!res.ok) throw new Error("Failed to fetch job detail");

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

  useEffect(() => {
    if (!job || !Array.isArray(job.job_skills)) return;
    const skillIds = job.job_skills.filter(
      (id): id is number => typeof id === "number"
    );
    if (skillIds.length === 0) return;

    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/external/jobmetadata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: "job.skills", ids: skillIds }),
        });
        const data = await res.json();
        setJob((prev) =>
          prev ? { ...prev, job_skills: data.result || [] } : prev
        );
      } catch (err) {
        console.error("Failed to fetch skill names:", err);
      }
    };

    fetchSkills();
  }, [job]);

  useEffect(() => {
    if (!job || !Array.isArray(job.responsibilities)) return;
    const responsibilityIds = job.responsibilities.filter(
      (id: any) => typeof id === "number"
    );
    if (responsibilityIds.length === 0) return;

    const fetchResponsibilities = async () => {
      try {
        const res = await fetch("/api/external/jobmetadata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "job.ratings",
            ids: responsibilityIds,
          }),
        });
        const data = await res.json();
        setResolvedResponsibilities(data.result || []);
        setJob((prev) =>
          prev ? { ...prev, responsibilities: data.result || [] } : prev
        );
      } catch (err) {
        console.error("Failed to fetch responsibilities:", err);
      }
    };

    fetchResponsibilities();
  }, [job]);

  useEffect(() => {
    if (!job?.job_must_have || !Array.isArray(job.job_must_have)) return;

    const mustHaveIds = job.job_must_have.filter(
      (item): item is number => typeof item === "number"
    );
    if (mustHaveIds.length === 0 || resolvedMustHave.length > 0) return;

    const fetchMustHave = async () => {
      try {
        const res = await fetch("/api/external/jobmetadata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: "job.ratings", ids: mustHaveIds }),
        });

        const data = await res.json();
        console.log("Full response from jobmetadata:", data);
        setResolvedMustHave(data?.result || []);
      } catch (err) {
        console.error("Failed to fetch job must-have data:", err);
      }
    };

    fetchMustHave();
  }, [job?.job_must_have, resolvedMustHave.length]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!job) return notFound();
  return (
    <div className="w-full mb-5">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/job-single-bg.webp')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 text-center text-white mt-16 px-4">
          <Link href="/" className="hover:text-orange-300 transition">
            Home
          </Link>
          <span>&gt;</span>
          <Link
            href={`/${locale}/careers`}
            className="hover:text-orange-300 transition"
          >
            Careers
          </Link>
          <span>&gt;</span>
          <span>{job.name}</span>
        </div>
      </div>

      {/* Application Intro */}
      <section className="max-w-[1320px] mx-auto mb-10 px-4 md:px-10 py-10">
        <div className="flex items-center gap-4 mb-6">
          <Link href={`/${locale}/careers`}>
            <div className="w-10 h-10 border-2 border-[#2C2D65] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
              <span className="text-[#2C2D65] text-xl">&#8592;</span>
            </div>
          </Link>
          <h2 className="text-[#272963] text-[18px] leading-normal md:text-[40px] md:leading-[52px] uppercase font-bold">
            RECRUITMENT APPLICATION
            <span
              className={`${BrittanySignature.className} capitalize text-orange-600`}
            >
              Form
            </span>
          </h2>
        </div>
        <p
          className={`text-[#1A1A1A] text-[14px] leading-normal md:text-[16px] md:leading-[30.4px] ${poppins.className}`}
        >
          This Application is to provide the employer with the information
          required to evaluate your profile transparently. Keeping a high level
          of confidentiality of the given information, all fields are required
          to be filled, which will help you as a candidate to achieve your goals
          in terms of the employer recommendations.
        </p>
      </section>

      {/* Job Content */}
      <section className="max-w-[1320px] mx-auto px-4 md:px-10 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="bg-[#F5F5F8] rounded-2xl p-6 w-full md:max-w-[340px]">
          <div className="flex flex-col gap-10">
            <div className="flex items-start gap-3">
              <div className="flex flex-col gap-6">
                {/* Top: Job Overview */}
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-[#E35F27]"></div>
                    <div className="h-6 w-[2px] border-l-2 border-dashed border-gray-400 mt-1"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-400 mt-1"></div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <p className="text-[#E35F27] font-semibold text-base">
                      Job Overview
                    </p>
                    <button
                      onClick={scrollToForm}
                      className="text-gray-500 hover:text-[#2C2D65] text-sm font-normal transition underline text-left"
                    >
                      Apply now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Details */}
        <div className="w-full">
          {/* Job Overview */}
          {job.description && (
            <div className="bg-[#F5F5F8] rounded-2xl p-6 relative">
              <h2 className="text-[20px] md:text-[24px] font-semibold text-[#E35F27] mb-4">
                {job.name}
              </h2>
              <div
                className="text-[#1A1A1A] text-[14px] md:text-[16px] leading-normal md:leading-[30.4px] font-poppins"
                dangerouslySetInnerHTML={{ __html: job.description }}
              ></div>

              <div className="absolute top-6 right-6 md:w-10 md:h-10 w-7 h-7 border-2 border-[#E35F27] rounded-full flex items-center justify-center">
                <span className="text-[#E35F27] text-sm md:text-xl">↑</span>
              </div>
            </div>
          )}

          {/* Qualifications */}
          {Array.isArray(resolvedMustHave) && resolvedMustHave.length > 0 && (
            <div className="bg-[#F5F5F8] mt-4 p-6 rounded-2xl">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleAccordion(0)}
              >
                <h3 className="text-[#2C2D65] text-lg md:text-xl font-semibold">
                  Qualifications:
                </h3>
                <div className="md:w-10 md:h-10 w-7 h-7 border-2 border-[#2C2D65] rounded-full flex items-center justify-center">
                  <span className="text-[#2C2D65] text-sm md:text-xl">
                    {openIndex === 0 ? "↑" : "↓"}
                  </span>
                </div>
              </div>
              {openIndex === 0 && (
                <div className="mt-4 text-[#1A1A1A] text-sm md:text-base md:leading-[30.4px] font-poppins">
                  {resolvedMustHave.map((item, i) => (
                    <div key={i} className="mb-2">
                      {item.name
                        .replace(/\uF0A0/g, "•")
                        .split(/[\n\r•\-]+/)
                        .map((line, j) => (
                          <p
                            key={j}
                            className={`text-[14px] leading-[1.42857] text-[#333] ${poppins.className}`}
                          >
                            {line.trim()}
                          </p>
                        ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Key Responsibilities */}
          {Array.isArray(job.responsibilities) &&
            job.responsibilities.length > 0 && (
              <div className="bg-[#F5F5F8] mt-4 p-6 rounded-2xl">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleAccordion(1)}
                >
                  <h3 className="text-[#2C2D65] text-lg md:text-xl font-semibold">
                    Key Responsibilities:
                  </h3>
                  <div className="md:w-10 md:h-10 w-7 h-7 border-2 border-[#2C2D65] rounded-full flex items-center justify-center">
                    <span className="text-[#2C2D65] text-sm md:text-xl">
                      {openIndex === 1 ? "↑" : "↓"}
                    </span>
                  </div>
                </div>
                {openIndex === 1 && (
                  <div className="mt-4 text-[#1A1A1A] text-sm md:text-base md:leading-[30.4px] font-poppins">
                    {job.responsibilities.map((item, i) => (
                      <p
                        className={`text-[14px] leading-[1.42857] text-[#333] ${poppins.className}`}
                        key={i}
                      >
                        {typeof item === "object" && "name" in item
                          ? item.name
                          : `Unknown responsibility ID: ${item}`}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

          {/* Skills & Competencies */}
          {Array.isArray(job.job_skills) && job.job_skills.length > 0 && (
            <div className="bg-[#F5F5F8] mt-4 p-6 rounded-2xl">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleAccordion(2)}
              >
                <h3 className="text-[#2C2D65] text-lg md:text-xl font-semibold">
                  Skills & Competencies:
                </h3>
                <div className="md:w-10 md:h-10 w-7 h-7 border-2 border-[#2C2D65] rounded-full flex items-center justify-center">
                  <span className="text-[#2C2D65] text-sm md:text-xl">
                    {openIndex === 2 ? "↑" : "↓"}
                  </span>
                </div>
              </div>
              {openIndex === 2 && (
                <div className="mt-4 text-[#1A1A1A] text-sm md:text-base md:leading-[30.4px] font-poppins">
                  {job.job_skills.map((item, i) => (
                    <p
                      className={`text-[14px] leading-[1.42857] text-[#333] ${poppins.className}`}
                      key={i}
                    >
                      {typeof item === "object" && "name" in item
                        ? item.name
                        : `Unknown skill ID: ${item}`}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <div ref={formRef}>
        <section className="max-w-[1320px] mx-auto px-4">
          {job?.id && <JobApplicationForm jobId={job.id} />}
        </section>
      </div>
    </div>
  );
}
