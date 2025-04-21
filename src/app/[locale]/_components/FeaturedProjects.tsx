import PropertyCardSlider from "./tools/PropertyCardSlider";

export default async function FeaturedProjects(){
    const data = await fetch('https://api.portal.psi-crm.com/leads?APIKEY=${process.env.NEXT_PUBLIC_API_KEY}')
    const posts = await data.json() 
  return (
    <div className="relative">
        <PropertyCardSlider data={posts.result} />
    </div>
  );
};