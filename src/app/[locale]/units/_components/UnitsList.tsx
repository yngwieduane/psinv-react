import { generateSeoData } from "../../_components/functions/generateSeoData";
import UnitListBox from "./UnitListBox";
export default async function UnitsList({
    unitid,
    category,
    propertyId,
    currentPage,
  }: {
    unitid: string;
    category: string;
    propertyId: string;
    currentPage: number;
  }) {

    const data = await fetch('http://localhost:3000/api/external/units?unitid='+unitid+'&propertyId='+propertyId+'&category='+category)
    const posts = await data.json() ;
    return (
        <>
            {posts.slice(0, 11).map((post:any,index:any) => { 
                let maincategory;
                {post.sellprice !== null
                    ? maincategory = "Sale"
                    : maincategory = "Rent";
                }
                const propertyData = {
                    bedrooms: post.bedrooms,
                    propertyType: post.category,
                    adType: maincategory,
                    name: post.propertyname,
                    community: post.community,
                    emirate: post.city_name,
                    refNo: post.refNo,
                    seoStart: "",
                };
                const seoData = generateSeoData(propertyData);
                return <UnitListBox key={index} data={post} seoUrl={seoData.seoUrl}/>
            })}
        </>
    );
}
