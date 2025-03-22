import PropertyCardSlider from "./tools/PropertyCardSlider";

export default async function FeaturedProjects(){
    const data = await fetch('https://psinv-react.vercel.app/api/external')
    const posts = await data.json() 
  return (
    <div className="relative">
        <PropertyCardSlider data={posts.result} />
    </div>
  );
};