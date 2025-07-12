// app/psi-youngsters-program/_components/Footer.tsx

const Footer = () => {
  return (
<section id="footer-section" className="bg-orange-600 text-white font-[Lato]">
  <div className="container max-w-7xl mx-auto px-4 py-10">
    <div className="md:flex md:justify-between md:items-start text-center md:text-left space-y-8 md:space-y-0 md:space-x-16">
      <div className="md:w-1/3 flex flex-col items-center md:items-start">
        <a href="https://psinv.net/">
          <img
            src="/images/logo-psi-white.svg"
            alt="PSI White Logo"
            title="PSI White"
            className="mb-2 w-[60px]"
            loading="lazy"
          />
        </a>
        <span className="mt-1 text-lg font-[Lato]">Youngster&apos;s Program</span>
      </div>
      <div className="md:w-2/3 grid grid-cols-2 gap-8 text-left">
        {/* Company */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-bold mb-2">Company</h4>
          <a href="/en/about-us/" className="hover:underline">About Us</a>
          <a href="/en/services/" className="hover:underline">Services</a>
          <a href="/en/projects/" className="hover:underline">Community</a>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-bold mb-2">Contact Us</h4>
          <a href="mailto:youngster@psinv.net" className="hover:underline">youngster@psinv.net</a>
          <a href="tel:600548200" className="hover:underline">Local Tel: 600 548 200</a>
        </div>
      </div>
    </div>
  </div>
</section>


  );
};

export default Footer;
