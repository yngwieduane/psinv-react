'use client'

import PropertyCard from "./PropertyCard";

const PropertyCardSlider = ({ data = [] }: any) => {
  return (
    <>
      <ul
        role="list"
        className="mx-4 flex space-x-3 sm:mx-6 overflow-x-auto"
      >
        {data.map((project:any, index:any) => (
          <li
            key={index}
            className="inline-flex flex-col text-center lg:w-auto "
          >
            <PropertyCard csswidth="w-96" data={project} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default PropertyCardSlider;
