import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";
import { Link } from "@/i18n/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MapComponent from "@/app/[locale]/_components/MapComponent";
import SwiperMaterial from "@/app/[locale]/_components/SwiperMaterial";


export default async function UnitPage(props: any) {
    return (
        <>
            <div>
                <Breadcrumb/>
            </div>
            <div className="container mx-auto my-8 px-5">
                {props.data.map((post:any,index:any) => { 
                let images, price;
                {post.imageurl !== null
                    ? images = post.imageurl.split('|')
                    : images = '';
                }
                {post.sellprice !== null
                    ? price = post.sellprice
                    : price = post.rent;
                }
                const coordinates = post.pro_google_coordinates.split(",")?? "";
                return(
                <div key={index}>
                    {/* Swiper */}
                    {images !== null ? (
                    <SwiperMaterial slides={images.slice(0, -1)}/>
                    ) : ("")}
                    {/* Stipe content */}
                    <div className="">
                        <h1>{post.marketingTitle}</h1>
                        <div className="grid grid-cols-3">
                            <div>
                                <p>Price</p>
                                <p>{post.sellprice}</p>
                            </div>
                            <div>
                                <a>Price</a>
                                <a>{post.sellprice}</a>
                            </div>
                        </div>
                    </div>
                    {/* MAP */}
                    {coordinates !== null ? (
                    <div className="">
                        <h2 className="font-medium text-center text-3xl my-10">
                            Location Map
                        </h2>
                        <MapComponent
                            latitude={coordinates['1']}
                            longitude={coordinates['0']}
                            fallbackImage={props.data["featuredImages"]}
                        />
                    </div>) : ("")}
                </div>
            )
            })}
            </div>
        </>
    );  
}