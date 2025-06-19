import Image from "next/image";

export default function Loading(props:any) {
    return (
        <div className="absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-white bg-opacity-70 content-center justify-items-center ">
            <Image
                alt="Property Shop Investment"
                src="/psi-gif.gif"
                className="h-auto w-auto"
                width={200}
                height={200}
            />
        </div>
    );
}