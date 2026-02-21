'use client'

import Link from "next/link"
import { useState } from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa"

const StickyBottomWidget = () => {
    const [phoneActive, setPhoneActive] = useState(false);
    const [whatsappActive, setWhatsappActive] = useState(false);

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    const message = `*Property*\nI am Interested. Kindly send me more information.\n${currentUrl}\n\n`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappLink = `https://wa.me/97122052888?text=${encodedMessage}`;

  // GA click event
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.ga) {
      window.ga('send', 'event', 'Call to Action', 'Click', 'WhatsApp');
    }
  };

    return(
        <div className="block md:hidden fixed bottom-0 right-0 w-full z-[9999] border-t border-1 border-[#dee2e6] flex justify-between">
            <div
            className={`border-r border-[#dee2e6] w-full p-1 rounded transition-colors duration-200 ${ phoneActive ? "bg-[#014081]" : "bg-[#fff]" }`}
            >
                <Link 
                href="tel:+971600548200" 
                target="_blank" 
                title="call" 
                rel="noopener noreferrer" 
                onMouseEnter={() => setPhoneActive(true)}
                onMouseLeave={() => setPhoneActive(false)}
                onMouseDown={() => setPhoneActive(true)}
                onMouseUp={() => setPhoneActive(false)}
                onFocus={() => setPhoneActive(true)}
                onBlur={() => setPhoneActive(false)}
                className={`pt-2 pb-1 px-4 w-min text-center mx-auto flex flex-col justify-center items-center gap-2 ${
                phoneActive ? "text-white" : "text-[#014081]"
                } text-[15px]`} >
                    <FaPhoneAlt size={19} />Call
                </Link>
            </div>
            
            <div
            className={`border-r border-[#dee2e6] w-full p-1 rounded text-[#075E54] transition-colors duration-200 ${ whatsappActive ? "bg-[#014081]" : "bg-[#fff]" }`}
            >
                <Link 
                onClick={handleClick} 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                title="WhatsApp" 
                id="whatpc" 
                onMouseEnter={() => setWhatsappActive(true)}
                onMouseLeave={() => setWhatsappActive(false)}
                onMouseDown={() => setWhatsappActive(true)}
                onMouseUp={() => setWhatsappActive(false)}
                onFocus={() => setWhatsappActive(true)}
                onBlur={() => setWhatsappActive(false)}
                className={`pt-2 pb-1 px-4 w-min text-center mx-auto flex flex-col justify-center items-center gap-2 ${
                whatsappActive ? "text-white" : "text[#075E54]"
                } text-[15px]`} >
                    <FaWhatsapp size={19} />Whatsapp
                </Link>
            </div>
        </div>
    )
}

export default StickyBottomWidget