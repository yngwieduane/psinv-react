const AmenitiesFeatures = (props:any) => { 
    const arrayData = props.content?.slice(0, props.limit);

    const arrayconst = [...new Set(arrayData)]; 
    console.log(arrayconst);
    return (
        <>
        {arrayconst.map((item:any, index:any) => {
            const feat = item.split('^');
            return (
                <p key={index}>{feat[1]}</p>
            )
        })}
        </>
    );
  }


export default AmenitiesFeatures;