const AmenitiesFeatures = (props:any) => { 
    const arrayData = props.content?.slice(0, props.limit);

    const arrayconst = [...new Set(arrayData)]; 
    console.log(arrayconst);
    return (
        <>
        {arrayconst.map((item:any, index:any) => {
            const feat = item.split('^');
            return (
                <div key={index} className="overflow-hidden rounded-lg bg-gray-50">
                    <div className="px-4 py-5 sm:p-6 flex align-items-center">
                        <p className="text-sm ps-2">{feat[1]}</p>
                    </div>
                </div>
            )
        })}
        </>
    );
  }


export default AmenitiesFeatures;