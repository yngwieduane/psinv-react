const AmenitiesFeatures = (props:any) => { 
    return (
        <>
        {props.content?.slice(0, props.limit).map((item:any, index:any) => {
            const feat = item.split('^');
            return (
                <p key={index}>{feat[1]}</p>
            )
        })}
        </>
    );
  }


export default AmenitiesFeatures;