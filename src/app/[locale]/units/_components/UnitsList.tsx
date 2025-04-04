import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot,faPhone,faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { generateSeoData } from "../../_components/functions/generateSeoData";
import { Link } from "@/i18n/navigation";
import PriceConvert from "../../_components/tools/PriceConvert";
import NumberConvert from "../../_components/tools/NumberConvert";
import SwiperNormal from "../../_components/SwiperNormal";
export default async function UnitsList({
    unitid,
    category,
    currentPage,
  }: {
    unitid: string;
    category: string;
    currentPage: number;
  }) {

    const data = await fetch('https://psinv-react.vercel.app/api/external/units?unitid='+unitid+'&category='+category)
    const posts = await data.json() ;
    return (
        <>
            {posts.slice(0, 11).map((post:any,index:any) => { 
                let images, price;
                {post.imageurl !== null
                    ? images = post.imageurl.split('|').slice(0, -1)
                    : images = '';
                }
                {post.sellprice !== null
                    ? price = post.sellprice
                    : price = post.rent;
                }
                const propertyData = {
                    bedrooms: post.bedrooms,
                    propertyType: post.category,
                    adType: category,
                    name: post.propertyname,
                    community: post.community,
                    emirate: post.city_name,
                    refNo: post.refNo,
                    seoStart: "",
                };
                  
                const seoData = generateSeoData(propertyData);
                return(
                <article key={index} data-currentpage={currentPage} className="relative isolate flex flex-col gap-2 md:gap-8 lg:flex-row bg-gray-50 rounded-2xl">
                    <div className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                        {images.length <= 1 ? (
                            <img
                            alt=""
                            src={images[0]}
                            className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                            />
                        ) : (
                            <SwiperNormal slides={images} width="400" height="300"/>
                        )}
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                        <div className="absolute left-5 md:hidden bottom-5 z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                            <PriceConvert price={price} minDecimal='0' />
                        </div>
                        <div className="absolute right-5 md:hidden bottom-5 z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                            {post.category}
                        </div>
                    </div>
                    <div className="px-5 py-3">
                        <div className="flex items-center gap-x-4 text-xs">
                            <Link
                                href="#"
                                className="absolute top-5 md:top-0 md:relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                            >
                                <FontAwesomeIcon icon={faLocationDot} /> {post.community}
                            </Link>
                        </div>
                        <div className="group relative max-w-xl">
                            <h3 className="mt-0 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                <Link href={`/unit/${seoData.seoUrl}`} >
                                    <span className="absolute inset-0 " />
                                    <p className="">{post.propertyname}</p>
                                </Link>
                            </h3>
                            <p className="mt-2 md:mt-5 text-normal/6 text-gray-600 truncate ">{post.marketingTitle}</p>
                            <p className="hidden md:flex mt-2 md:mt-5 text-sm/6 text-gray-500"><PriceConvert price={price} minDecimal='0' /> | {post.category} | <NumberConvert number={post.built_upArea} minDecimal='0' label='Sqft'/> | {post.bedrooms} Beds | {post.no_of_bathrooms} Baths | {post.parking} Parking</p>
                        </div>
                        <div className="mt-2 md:mt-6">
                            <div className="relative flex items-center gap-x-4">
                                <div className="text-sm/6 hidden md:grid">
                                    <p className="font-semibold text-gray-900">
                                        <span className="absolute inset-0" />
                                        {post.agent}
                                    </p>
                                    <p className="text-gray-600">Agent ID: {post.agent_Pk}</p>
                                </div>
                                <div className="text-lg flex md:hidden">
                                    {post.bedrooms} Beds | {post.no_of_bathrooms} Baths | <NumberConvert number={post.built_upArea} minDecimal='0' label='Sqft'/>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 text-center md:flex items-center justify-end gap-3 mt-3 border-t border-gray-900/5 pt-6">
                            <Link href="#" className="bg-gray-100 px-5 py-3 rounded-lg text-lg"><FontAwesomeIcon icon={faPhone} /> Call</Link>
                            <Link href={`mailto:${post.salesmanemail}`} className="bg-gray-100 px-5 py-3 rounded-lg text-lg"><FontAwesomeIcon icon={faEnvelope} /> Email Agent</Link>
                            <Link href="#" className="col-span-2 bg-green-600 px-5 py-3 rounded-lg text-white text-lg"><FontAwesomeIcon icon={faWhatsapp} /> WhatsApp</Link>
                        </div>
                    </div>
                </article>
            )
            })}
        </>
    );
}
