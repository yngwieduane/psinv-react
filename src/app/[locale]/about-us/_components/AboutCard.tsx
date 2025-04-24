'use client'

type Props = {
    background: string,
    width ?: string,
    children: React.ReactNode,
}

const AboutCard = ({ background, width, children}: Props) => {
    const isImage = (background:string) => {
        return typeof background === 'string' && /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(background);
    };
    // const isImage = background.startsWith("http") || background.includes("base64");    

    const style = isImage(background) ? {
        backgroundImage: `url(${background})`,
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
    }
    :
    {
        backgroundColor: background,
    };

    return(
        <>
        <div className={`card rounded-xl shadow-md text-white h-full flex items-end min-h-[300px] ${width}`} style={style}>
            {children}
        </div>
        </>
    );
}

export default AboutCard