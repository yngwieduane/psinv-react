const AmenitiesFeatures = (props:any) => { 
    return (
        <>
        {props.content?.map((item:any, index:any) => {
            const feat = item.split('^');
            return (
                <p key={index}>{feat[1]}</p>
            )
        })}
        </>
    );
  }


export default AmenitiesFeatures;