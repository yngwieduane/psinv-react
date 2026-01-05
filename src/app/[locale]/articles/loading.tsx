import Image from "next/image";

export default function Loading(props: any) {
    return (
        <div className="flex items-center justify-center w-full min-h-[70vh] bg-white">
            <Image
                alt="Property Shop Investment"
                src="/assets/images/psi-gif.gif"
                className="h-auto w-[400px]"
                width={400}
                height={400}
                unoptimized
            />
        </div>
    );
}