import PropertyCard from "../../_components/tools/PropertyCard";

export default async function PropertyList({
    page,
    city,
    community,
    subcommunity,
    project,
    propertyname,
    isFeaturedProjectOnWeb
  }: {
    page: number;
    city: string;
    community: string;
    subcommunity: string;
    project: string;
    propertyname: string;
    isFeaturedProjectOnWeb: string;
  }) {

    const data = await fetch('https://psi.properties/api/external/allprojects?page='+page+'&propertyname='+propertyname+'&isFeaturedProjectOnWeb='+isFeaturedProjectOnWeb)
    const posts = await data.json() ;
    return (
        <>
            <div className="container mx-auto my-5 px-5">
                <ul
                    role="list"
                    className="mx-4 grid grid-cols-4 gap-4"
                >
                    {posts['result'].map((project:any, index:any) => (
                    <li
                        key={index}
                        className="text-center "
                    >
                        <PropertyCard csswidth="w-full" data={project} />
                    </li>
                    ))}
                </ul>
            </div>
        </>
    );
}