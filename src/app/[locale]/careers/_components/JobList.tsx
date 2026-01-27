"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import { useTranslations } from "next-intl";

interface Job {
  id: number;
  name: string;
  website_url: string;
}

interface JobListProps {
  jobs?: Job[];
}

export default function JobList({ jobs: initialJobs }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs || []);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations("Job_List");

  useEffect(() => {
    fetch("/api/external/getjobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pages: 0 }),
    })
      .then((res) => res.json())
      .then((data) => setJobs(data.result || []))
      .catch((err) => console.error("Failed to load jobs:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">{t("loading")}</div>
    );
  }

  if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <div className="relative w-full py-12 overflow-hidden transition-all duration-700">
        <div className="absolute inset-0 w-1/4 left-0 bg-left bg-[url('/images/career/pattern.svg')] bg-cover bg-no-repeat z-0 opacity-40" />
        <div className="relative flex flex-col md:flex-row items-center max-w-[1320px] mx-auto gap-12 justify-center z-10">
          <div className="w-full md:w-1/2 flex justify-center transition-all duration-700">
            <Image
              src="/images/career/PSI-Logo.svg"
              alt="PSI Logo"
              width={470}
              height={300}
              className="w-[200px] md:w-[300px] h-auto transition-all duration-700"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full py-12 overflow-hidden transition-all duration-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 w-1/4 left-0 bg-left bg-[url('/images/career/pattern.svg')] bg-cover bg-no-repeat z-0 transition-all duration-700 ${isHovered ? "opacity-0" : "opacity-40"
          }`}
      />
      <div
        className={`absolute inset-0 w-1/4 right-0 ml-auto bg-right bg-[url('/images/career/pattern.svg')] bg-cover bg-no-repeat z-0 transition-all duration-700 ${isHovered ? "opacity-100" : "opacity-0"
          }`}
      />
      <div
        className={`relative flex flex-col md:flex-row items-center max-w-[1320px] mx-auto gap-12 transition-all duration-700 ${isHovered ? "justify-between" : "justify-center"
          } z-10`}
      >
        <div
          className={`w-full md:w-1/2 flex transition-all duration-700 ${isHovered ? "justify-start" : "justify-center"
            }`}
        >
          <Image
            src="/images/career/PSI-Logo.svg"
            alt="PSI Logo"
            width={470}
            height={300}
            className="w-auto h-auto"
          />
        </div>
        <div
          className={`w-full md:w-1/2 transition-all duration-700 ${isHovered
            ? "opacity-100 max-w-full pl-5"
            : "opacity-0 max-w-0 overflow-hidden"
            }`}
        >
          <Swiper
            direction="vertical"
            slidesPerView={3}
            spaceBetween={16}
            centeredSlides
            mousewheel
            loop
            modules={[Mousewheel]}
            className="h-[280px] md:h-[330px]"
            breakpoints={{
              768: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {jobs.map((job, index) => (
              <SwiperSlide key={job.id}>
                <a
                  href={`/en/careers${job.website_url}#jobform`}
                  className={`block text-center border-2 py-4 rounded-md font-semibold transition mx-auto ${activeIndex === index
                    ? "bg-[#E35F27] text-white w-[90%] border-[#E35F27]"
                    : "bg-white text-[#272963] border-[#272963] w-[80%] hover:text-[#212529]"
                    }`}
                >
                  {job.name} <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
