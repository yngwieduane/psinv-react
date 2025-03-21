import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { generateSeoData } from "../../_components/functions/generateSeoData";
import { Link } from "@/i18n/navigation";
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
            {posts.map((post:any,index:any) => { 
                let images, price;
                {post.imageurl !== null
                    ? images = post.imageurl.split('|')
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
                <article key={index} data-currentpage={currentPage} className="relative isolate flex flex-col gap-8 lg:flex-row">
                    <div className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                        <img
                        alt=""
                        src={images[0]}
                        className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                    <div>
                        <div className="flex items-center gap-x-4 text-xs">
                            {/* <time dateTime={post.last_updated} >
                            {post.last_updated}
                            </time> */}
                            <Link
                                href="#"
                                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                            >
                                <FontAwesomeIcon icon={faLocationDot} /> {post.community}
                            </Link>
                        </div>
                        <div className="group relative max-w-xl">
                            <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                <Link href={`/unit/${seoData.seoUrl}`} >
                                    <span className="absolute inset-0 " />
                                    <p className="">{post.propertyname}</p>
                                </Link>
                            </h3>
                            <p className="mt-5 text-normal/6 text-gray-600 truncate ">{post.marketingTitle}</p>
                            <p className="mt-5 text-sm/6 text-gray-500">{price} | {post.category} | {post.bedrooms} Beds | {post.no_of_bathrooms} Baths | {post.parking} Parking</p>
                        </div>
                        <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                            <div className="relative flex items-center gap-x-4">
                                {/* <img alt="" src={post.author.imageUrl} className="size-10 rounded-full bg-gray-50" /> */}
                                <div className="text-sm/6">
                                    <p className="font-semibold text-gray-900">
                                        <Link href="#">
                                            <span className="absolute inset-0" />
                                            {post.salesmanemail}
                                        </Link>
                                    </p>
                                    <p className="text-gray-600">Agent ID: {post.agent_Pk}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            )
            })}
        </>
    );
}
