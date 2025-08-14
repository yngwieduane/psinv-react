// app/[locale]/walk-in/[slug]/page.tsx
import WalkinHeader from '@/app/[locale]/_components/walkin/WalkinHeader';
import { walkinFormConfig } from '@/utils/walkinConfig';
import { WalkinFormProvider } from '@/context/WalkinFormContext';
import { WalkInFormContents } from '@/app/[locale]/_components/walkin/WalkInFormContents';


type WalkInFormPageProps = {
  params: Promise<{ slug: string }>;
  locale: string;
};

export default async function WalkInFormPage({ params, locale }: WalkInFormPageProps) {
  const { slug } = await params;

  const config = walkinFormConfig[slug] || {
    title: slug.replace(/-/g, " "),
    developerLogoUrl: "",
    logo: "",
    showClientProfession: true,
    showContactInformation: true,
    showHostedBy: true,
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-[1140px] mx-auto bg-white shadow-xl rounded-md">
        <WalkinFormProvider>
          <WalkinHeader title={config.title} logo={config.logo || '/images/psi-logo.png'} developerLogoUrl={config.developerLogoUrl}/>
          <hr className="border-t border-[#dee2e6]" />
          <WalkInFormContents slug={slug} locale={locale} />
        </WalkinFormProvider>
      </div>
    </div>
  );
}

