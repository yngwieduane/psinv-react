'use client'

import PropertyCard from "./PropertyCard";

const PropertyCardSlider = (props:any) => {
  return (
    <>
      <ul
        role="list"
        className="mx-4 inline-flex space-x-3 sm:mx-6"
      >
        {props.data.map((project:any, index:any) => (
          <li
            key={index}
            className="inline-flex flex-col text-center lg:w-auto "
          >
            <PropertyCard data={project} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default PropertyCardSlider;
