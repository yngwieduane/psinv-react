import { Poppins } from "next/font/google";
import Link from "next/link";
import SocialMediaTabs from "../SocialMediaTabs";
import FooterBannerCarousel from "../FooterBannerCarousel";
import FeedbackForm from "../FeedbackForm";
import { Mail, MapPin, Phone } from "lucide-react";
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
type TermsPageProps = {
  locale: string;
};
export default function TermsPage({ locale }: TermsPageProps) {
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-3xl text-left mb-6 text-[#00194A]">
          Terms & Conditions
        </h1>
        <div className={`max-w-5xl mx-auto px-4 py-10 text-gray-800 ${poppins.className}`}>
          <div
            className="px-6 py-8"
            style={{
              border: "1px solid #dee2e6",
            }}
          >
            <h2 className="text-2xl mt-8 mb-2">
              Introduction
            </h2>

            <p className="mb-4 text-sm">Thank you for visiting the PSI Group Terms and Conditions page . Through PSI, we offer a variety of services, and we allow requesting our services online through the website, social networking applications and other channels of communication with the group. We provide these terms and conditions to govern and regulate the legal relations between the company and its customer, so please read these terms with due care before agreeing to the terms and conditions.</p>
            <h2 className="text-2xl mt-8 mb-2">
              Tariffs
            </h2>
            <p className="mb-4 text-sm">
              "Company", "PSI", "we", "us" or " pronouns of addressee" refers to PSI Group, Property Shop Investment LLC, its subsidiaries, partners and companies using the same trade mark (PSI) in the State of U.A.E..
            </p>
            <p className="mb-4 text-sm">"Agreement" refers to this document and its terms and conditions, as well as the Privacy Policy.</p>
            <p className="mb-4 text-sm">"User", "you" or "addressee" refers to a person who uses or visits the Company's social media sites or website or visits the Company's content.</p>
            <p className="mb-4 text-sm">"Client" refers to individuals, institutions, companies, and public and private firms that submit requests for services provided by the Company in accordance with the terms and conditions of this Agreement.</p>
            <p className="mb-4 text-sm">"Services" or "Product" refers to the services offered by the Company that are provided in accordance with the specifications and requirements discussed with the Client.</p>
            <p className="mb-4 text-sm">"Agreement (Terms and Conditions)" refers to an agreement that is signed in writing, electronically, or by registering interest through the Company's website, social media channels and Automated communication systems from the company side and the Client on the other side, "Any terms or conditions that are implicitly included when the client requests the service from the company are considered binding. This applies to any submitted or executed contracts, whether expressed or implied."</p>
            <h2 className="text-2xl mt-8 mb-2">
              Communications & Notices
            </h2>
            <ul className="list-none pl-8 space-y-2 text-sm">
              <li className="tick-before">The company may contact you using the contact information you provided when expressing interest in our services. By agreeing to this, you authorize us to communicate with you via electronic or phone communication according to the laws of the U.A.E.</li>
              <li className="tick-before">The client or user authorizes the company to communicate with them if they have shown interest in the company's services through the company's communication channels, even if the client or user has previously registered in the "Do Not Call" Register (DNCR).</li>
              <li className="tick-before">The user or customer has the right to request not to communicate with him by officially notifying the company through the company's communication channels.</li>
              <li className="tick-before">Any notices, Offers, and promotions that the Company wants to communicate to the users are made through their contact details and no permission from the Customer or the User is required to do so.</li>
              <li className="tick-before">Agree to receive calls and communications via various channels from PSI from 09:00 am to 09:00 pm</li>
              <li className="tick-before">Agree to receive multiple calls and communications via various channels regarding my enquiry</li>
              <li className="tick-before">Agree to receive calls and communications via various channels on various projects ,products and services</li>
            </ul>
            <h2 className="text-2xl mt-8 mb-2">Modifications and additions</h2>
            <p className="mb-4 text-sm">Please note that our services may be continually modified or updated, and our terms and conditions and privacy policy may be modified, updated, or added to from time to time. The company will not be obligated to notify any of its users or customers. Therefore, it is essential to review this agreement before conducting any transactions with the company. Additionally, you acknowledge the right of PSI to review these Terms and Conditions or impose new terms and conditions relating to the PSI Services at any time and solely at its discretion. It is your responsibility to periodically review these Terms and Conditions for any amendments, and any use of PSI Products or Services constitutes your acceptance of any revisions or additions.</p>
            <h2 className="text-2xl mt-8 mb-2">Copy Rights</h2>
            <ul className="list-none pl-8 space-y-2 text-sm">
              <li className="tick-before">The website and all of its materials and components are privately owned by us and may not be imitated, copied, or exploited in any way. All content (including but not limited to lists, texts, images, videos, symbols, numbers, letters, icons, buttons, music, data, and information) is legally protected under the laws of the State of U.A.E. and international conventions. We reserve the right to take legal action in the event of any infringement.</li>
              <li className="tick-before">"PSI" is a trademark owned by us and must not be infringed, imitated, copied, or used illegally on goods or services not associated with us. In the event of trademark infringement, we reserve the right to take all necessary legal actions to protect our commercial rights.</li>
            </ul>
            <h2 className="text-2xl mt-8 mb-2">Disclaimer</h2>
            <ul className="list-none pl-8 space-y-2 text-sm">
              <li className="tick-before">You agree to waive the liability of PSI, its employees and personnel for the use of the Website and social media channels, or the inability of the User to use it optimally.</li>
              <li className="tick-before">"The disclaimer applies to the fullest extent permitted by law."</li>
            </ul>
            <h2 className="text-2xl mt-8 mb-2">Jurisdiction</h2>
            <p className="mb-4 text-sm">The UAE judiciary has the authority to resolve any disputes arising from the interpretation of any provision in this document. If any clause is found to be invalid by a court ruling, it will not affect the validity of the other clauses, which will remain in force and produce their legal effects unless the application cancels the agreement.</p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {/* Inquiry Form */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-center text-[#00194A]">INQUIRE</h2>
                <FeedbackForm />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-6 text-center text-[#00194A]">CONTACT US</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center justify-center text-[#111954] border border-[#014081] rounded-[3px] bg-transparent hover:text-white hover:bg-[#111954] hover:border-[#111954] px-4 py-2">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">600 548 200</span>
                  </div>
                  <div className="flex items-center justify-center text-[#111954] border border-[#014081] rounded-[3px] bg-transparent hover:text-white hover:bg-[#111954] hover:border-[#111954] px-4 py-2">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">02 205 2999</span>
                  </div>
                </div>
                <div className="flex items-center justify-center text-[#111954] border border-[#014081] rounded-[3px] bg-transparent hover:text-white hover:bg-[#111954] hover:border-[#111954] px-4 py-2 mb-6">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">info@psinv.net</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2 text-[#00194A]">Office Address</h3>
                  <div className="flex items-start justify-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 mt-1 text-blue-900" />
                    <div className="text-gray-700 text-sm leading-5 text-left">
                      <p>Office No. 4410 & 4411</p>
                      <p>Addax Tower Level 44</p>
                      <p>Al Reem Island, City of Lights</p>
                      <p>Abu Dhabi, United Arab Emirates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Social media */}
      <section className="container max-w-[1320px] mx-auto px-4 mt-10 md:mt-20 mt-0 hidden md:block">
        <SocialMediaTabs />
      </section>
      <section className="container max-w-[1320px] mx-auto px-4 mt-10 md:mt-20 mt-10 hidden md:block">
        <FooterBannerCarousel />
      </section>
    </>
  );
}
