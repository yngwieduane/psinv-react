import Image from "next/image";

export default function Loading(props: any) {
    return (
        <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <Image
                alt="Property Shop Investment"
                src="/assets/images/psi-gif.gif"
                className="h-auto w-[200px]"
                width={200}
                height={200}
                unoptimized
            />
        </div>
    );
}