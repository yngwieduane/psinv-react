import PropertyCard from "../../_components/tools/PropertyCard";

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
                    className="text-center "
                >
                    <PropertyCard csswidth="w-full" data={project} />
                </li>
                ))}
            </ul>
        </>
    );
}

export default PropertyBox;