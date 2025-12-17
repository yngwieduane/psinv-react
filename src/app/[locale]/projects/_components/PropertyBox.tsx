import PropertyCard from "../../_components/tools/PropertyCard";
import PropertyCardAI from "../../_components/tools/PropertyCardAI";

const PropertyBox = (props:any) => {

    return (
        <>
            <ul
                role="list"
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
                {props.data.map((project:any, index:any) => (
                <li
                    key={index}
                    className=""
                >
                    <PropertyCardAI csswidth="w-full" data={project} />
                </li>
                ))}
            </ul>
        </>
    );
}

export default PropertyBox;