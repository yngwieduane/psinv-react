import PropertyCard from "../../_components/tools/PropertyCard";

const PropBox = (props:any) => {

    return (
        <>
            <ul
                role="list"
                className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 gap-4"
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

export default PropBox;