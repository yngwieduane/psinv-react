import Image from "next/image";

export default function Loading(props:any) {
    return (
        <div className="inline-grid absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-white opacity-50 content-center justify-items-center ">
            <Image
                alt="Property Shop Investment"
                src="/assets/images/psi-gif.gif"
                className="h-auto w-[400] mx-auto"
                width={400}
                height={400}
            />
        </div>
    );
}