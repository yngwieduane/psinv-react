"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faWhatsapp, faTwitter, faInstagram, faSnapchat, faYoutube, faFacebookSquare, faLinkedin, faXTwitter} from "@fortawesome/free-brands-svg-icons";
import { SocialMedia } from "@/types/navigation";

const socialMedia: SocialMedia[] = [
    
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/PropertyShopInvestment',
        icon: faFacebookSquare,
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/psinv',
        icon: faXTwitter,
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/property_shop_investment/',
        icon: faInstagram,
    },
    {
        name: 'Snapchat',
        href: 'https://www.snapchat.com/add/property-shop',
        icon: faSnapchat,
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/property-shop-investment-llc',
        icon: faLinkedin,
    },
    
    {
        name: 'Youtube',
        href: 'https://www.youtube.com/user/propertyshopabudhabi',
        icon: faYoutube,
    }    
    
];

interface HeaderSocialProps {
    color?: "dark" | "white";
}
const HeaderSocial = ({ color = "dark" }: HeaderSocialProps) => {
    return (
        <div className="flex space-x-4 sm:text-[14px] justify-center sm:justify-start">
            {socialMedia.map((item) => (
                <Link title={item.name} target="_blank" href={item.href} key={item.name} aria-label={item.name} 
                className={`${color === 'dark' ? 'text-black' : 'text-white'}  flex items-center justify-center text-sm font-semibold leading-6 hover:bg-indigo-900`}>
                    <FontAwesomeIcon icon={item.icon} width={18} />
                </Link>
            ))}
        </div>

    )
}

export default HeaderSocial