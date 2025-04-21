"use client";

import { useState } from "react";

const tabs = [
  { label: "Emirati Hub", key: "emirati" },
  { label: "Youngsters Program", key: "youngsters" },
  { label: "Crypto", key: "crypto" },
  { label: "PSI International", key: "international" },
  { label: "Company Profile", key: "company" },
];

const WhyPSI = () => {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-[1320px] mx-auto">

        {/* Tabs Header */}
        <div className="flex border-b border-gray-200 overflow-x-auto mb-10 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-[18px] font-medium px-4 py-2 transition-all duration-200 ${
                activeTab === tab.key
                  ? "text-[#033f80] border-b-[2px] border-[#ea5b27] font-semibold"
                  : "text-[#6c757d] hover:text-[#033f80]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "company" && (
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Text Section */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose PSI?
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                With a unique blend of vision, expertise, dedicated teams, enthusiasm, and transparency,
                Property Shop Investment sets the benchmark in Abu Dhabi's real estate sector,
                establishing itself as a market leader and influencer.
              </p>
              <a
                href="#"
                className="inline-block bg-[#ea5b27] text-white px-6 py-3 rounded-md font-medium hover:bg-[#d94f1f] transition"
              >
                Learn more about PSI
              </a>
            </div>

            {/* Image Section */}
            <div className="flex-1 rounded-xl p-4 md:p-6"
      style={{
        backgroundImage: "url('/assets/bg-cover.webp')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
              <img
                src="/images/corporate_cover.webp"
                alt="Property Shop Investment"
                className="w-full rounded-xl"
              />
            </div>
          </div>
        )}

        {activeTab === "emirati" && (
          <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PSI?
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              With a unique blend of vision, expertise, dedicated teams, enthusiasm, and transparency,
              Property Shop Investment sets the benchmark in Abu Dhabi's real estate sector,
              establishing itself as a market leader and influencer.
            </p>
            <a
              href="#"
              className="inline-block bg-[#ea5b27] text-white px-6 py-3 rounded-md font-medium hover:bg-[#d94f1f] transition"
            >
              Learn more about PSI
            </a>
          </div>

          {/* Image Section */}
          <div className="flex-1 rounded-xl p-4 md:p-6"
      style={{
        backgroundImage: "url('/assets/img/icons/bg-cover.webp')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
            <img
              src="/images/national-hub-home.webp"
              alt="Property Shop Investment"
              className="w-full rounded-xl"
            />
          </div>
        </div>
        )}

        {activeTab === "youngsters" && (
          <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PSI?
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              With a unique blend of vision, expertise, dedicated teams, enthusiasm, and transparency,
              Property Shop Investment sets the benchmark in Abu Dhabi's real estate sector,
              establishing itself as a market leader and influencer.
            </p>
            <a
              href="#"
              className="inline-block bg-[#ea5b27] text-white px-6 py-3 rounded-md font-medium hover:bg-[#d94f1f] transition"
            >
              Learn more about PSI
            </a>
          </div>

          {/* Image Section */}
          <div className="flex-1 rounded-xl p-4 md:p-6"
      style={{
        backgroundImage: "url('/assets/img/icons/bg-cover.webp')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      >
            <img
              src="/images/youngster_cover2.webp"
              alt="Property Shop Investment"
              className="w-full rounded-xl"
            />
          </div>
        </div>
        )}

        {activeTab === "crypto" && (
          <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PSI?
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              With a unique blend of vision, expertise, dedicated teams, enthusiasm, and transparency,
              Property Shop Investment sets the benchmark in Abu Dhabi's real estate sector,
              establishing itself as a market leader and influencer.
            </p>
            <a
              href="#"
              className="inline-block bg-[#ea5b27] text-white px-6 py-3 rounded-md font-medium hover:bg-[#d94f1f] transition"
            >
              Learn more about PSI
            </a>
          </div>

          {/* Image Section */}
          <div className="flex-1 rounded-xl p-4 md:p-6"
      style={{
        backgroundImage: "url('/assets/img/icons/bg-cover.webp')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
            <img
              src="/images/crypto_cover-new.webp"
              alt="Property Shop Investment"
              className="w-full rounded-xl"
            />
          </div>
        </div>
        )}

        {activeTab === "international" && (
          <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PSI?
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              With a unique blend of vision, expertise, dedicated teams, enthusiasm, and transparency,
              Property Shop Investment sets the benchmark in Abu Dhabi's real estate sector,
              establishing itself as a market leader and influencer.
            </p>
            <a
              href="#"
              className="inline-block bg-[#ea5b27] text-white px-6 py-3 rounded-md font-medium hover:bg-[#d94f1f] transition"
            >
              Learn more about PSI
            </a>
          </div>

          {/* Image Section */}
          <div className="flex-1 rounded-xl p-4 md:p-6"
      style={{
        backgroundImage: "url('/assets/img/icons/bg-cover.webp')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
            <img
              src="/images/international_cover.webp"
              alt="Property Shop Investment"
              className="w-full rounded-xl"
            />
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default WhyPSI;
