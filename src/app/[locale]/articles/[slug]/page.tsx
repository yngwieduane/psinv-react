import { Clock, Leaf, User } from "lucide-react";
import Breadcrumb from "../../_components/Breadcrumb";
import Image from "next/image";

const MOCK_ARTICLE_DATA = {
    id: 901,
    title: "Green Tech and Sustainability: UAE's Next-Gen Real Estate Developments for Smart Buyers",
    date: "November 1, 2025",
    author: "Dr. Ahmed Al-Mansoori, Sustainability Lead",
    category: "Green Tech & Investment",
    imageUrl: "/assets/images/articles/green-tech-and-sustainability-uaes-next-gen-thumbnail.webp",
    summary: "The UAE is leading the charge in sustainable urban development. This article explores the adoption of green technology in new real estate projects and what it means for conscious investors and homeowners.",
    body: [
        { type: 'paragraph', content: "The United Arab Emirates has set ambitious goals for sustainability, integrating cutting-edge green technology into its massive urban development projects. This shift is not just about environmental responsibility; it's a fundamental change in market value, appealing directly to a new generation of smart, environmentally conscious buyers." },
        { type: 'heading', content: "The Rise of Eco-Certified Buildings" },
        { type: 'paragraph', content: "Major cities like Dubai and Abu Dhabi are prioritizing certified green buildings, such as those meeting LEED or Estidama standards. These certifications ensure rigorous criteria are met regarding energy consumption, water efficiency, indoor air quality, and material selection." },
        { type: 'quote', content: "“Sustainability is no longer a luxury upgrade in the UAE market; it is becoming the baseline expectation for high-value properties and attracting premium investors globally.”" },
        { type: 'heading', content: "Key Green Technologies Driving Value" },
        { type: 'list', items: [
            "Smart Water Management: Implementing greywater recycling systems and low-flow fixtures to achieve water consumption reduction targets.",
            "Solar and Renewable Integration: Utilizing rooftop solar panels (BIPV) and large-scale solar farms to offset energy use and decrease utility bills.",
            "Advanced HVAC Systems: Employing highly efficient cooling systems that dramatically cut down on the energy required for climate control in the hot desert climate.",
            "Intelligent Home Automation: Systems that optimize lighting, heating, and power usage based on occupancy and ambient conditions."
        ]},
        { type: 'paragraph', content: "For buyers, these technologies translate directly into long-term savings and a higher quality of life. Reduced electricity and water bills significantly lower the total cost of ownership, making sustainable properties attractive financial investments." },
        { type: 'heading', content: "Investment Outlook for Sustainable Real Estate" },
        { type: 'paragraph', content: "Studies show that green buildings often command higher resale values and rental yields compared to their conventional counterparts. As global awareness and regulatory pressure increase, the risk associated with non-sustainable assets rises, positioning eco-friendly developments as the safer, future-proof choice for investors." },
        { type: 'paragraph', content: "The future of real estate in the UAE is undeniably green. Smart buyers are advised to prioritize projects that offer quantifiable sustainability metrics and clear commitments to environmental stewardship." }
    ]
};

const renderContent = (part:any, index:any) => {
    switch (part.type) {
        case 'heading':
            return <h2 key={index} className="text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">{part.content}</h2>;
        case 'paragraph':
            return <p key={index} className="text-lg text-gray-600 leading-relaxed mb-6">{part.content}</p>;
        case 'quote':
            return (
                <blockquote key={index} className="border-l-4 border-emerald-500 pl-6 py-4 my-6 bg-emerald-50 italic text-xl text-gray-700 rounded-r-lg">
                    "{part.content}"
                </blockquote>
            );
        case 'list':
            return (
                <ul key={index} className="list-disc pl-8 mb-6 space-y-2 text-lg text-gray-700">
                    {part.items.map((item:any, i:any) => (
                        <li key={i} className="flex items-start">
                             <Leaf className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1 mr-2" />
                            {item}
                        </li>
                    ))}
                </ul>
            );
        default:
            return null;
    }
};
export default async function ArticleSingle({
    params,news
}:{
    params: Promise<{slug:string;}>,news:any;
}){
    const {slug} = await params;
    const article = MOCK_ARTICLE_DATA;
    return (
        <>
            <Breadcrumb />
            <div className="mx-auto container px-6 lg:px-8 mt-5">
                <p className="text-sm font-semibold uppercase text-emerald-600 mb-2 tracking-widest">{article.category}</p>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">{article.title}</h1>
                {/* Metadata */}
                <div className="flex flex-wrap items-center space-x-4 sm:space-x-6 text-gray-500 text-sm mb-8">
                    <span className="flex items-center"><User className="w-4 h-4 mr-1"/> {article.author}</span>
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1"/> {article.date}</span>
                </div>

                {/* Hero Image */}
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-[400px] object-cover rounded-xl shadow-lg mb-10"
                    width={300}
                    height={200}
                    
                />

                {/* Article Body Content */}
                <div className="article-body">
                    <p className="text-xl italic text-gray-700 mb-8 font-semibold">
                        {article.summary}
                    </p>
                    {article.body.map(renderContent)}
                </div>

                {/* Author Box */}
                <div className="mt-12 pt-6 border-t border-gray-200 flex items-start space-x-4 bg-gray-50 p-6 rounded-xl">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <User className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">About the Author</p>
                        <p className="text-sm text-gray-600">
                            {article.author} is a leading expert in sustainable development and smart city integration, focusing on environmental policy in the Gulf region.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}