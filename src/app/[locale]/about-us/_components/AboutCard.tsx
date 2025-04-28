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

    const style = isImage(background) 
    ? {
        '--bg-image': `url(${background})`, // use `background` directly if it's already the URL
      }
    :
    {
        backgroundColor: background,
    };

    return(
        <>
        <div className={`card group relative rounded-xl shadow-md text-white h-full flex items-end min-h-[300px] overflow-hidden ${width}`} style={style}>
            {children}
        </div>
        </>
    );
}

export default AboutCard