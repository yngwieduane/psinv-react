import PropertyCardSlider from "./tools/PropertyCardSlider";

export default async function FeaturedProjects(){
    const data = await fetch('http://localhost:3000/api/external')
    const posts = await data.json() 
  return (
    <div className="relative">
        <PropertyCardSlider data={posts.result} />
    </div>
  );
};