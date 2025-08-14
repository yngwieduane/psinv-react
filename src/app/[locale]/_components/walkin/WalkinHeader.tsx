import Image from 'next/image';

type WalkinHeaderProps = {
  title: string;
  developerLogoUrl?: string;
  logo?: string;
};

export default function WalkinHeader({ title, developerLogoUrl, logo }: WalkinHeaderProps) {
  return (
    <header className="w-full py-6 bg-white">
      <div className="max-w-[1140px] mx-auto border-[#dee2e6] px-6 flex flex-col items-center">
        <div className="flex w-full items-center justify-between mb-4">
          <div className="w-24">
            <Image
              src={logo || '/images/psi-logo.png'}
              alt="PSI Logo"
              width={80}
              height={40}
              className="object-contain"
            />
          </div>
          {developerLogoUrl && (
            <div className="w-32 text-right">
              <Image
                src={developerLogoUrl}
                alt="Developer Logo"
                width={120}
                height={40}
                className="object-contain ml-auto"
              />
            </div>
          )}
        </div>
        <h2 className="text-xl md:text-3xl font-semibold text-center text-[#2C2D65]">
          {title}
        </h2>

      </div>
    </header>
  );
}
