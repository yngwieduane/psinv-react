// app/[locale]/walk-in/[slug]/page.tsx
import WalkinHeader from '@/app/[locale]/_components/walkin/WalkinHeader';
import { walkinFormConfig } from '@/utils/walkinConfig';
import { WalkinFormProvider } from '@/context/WalkinFormContext';
import { WalkInFormContents } from '@/app/[locale]/_components/walkin/WalkInFormContents';

type WalkInFormPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function WalkInFormPage({ params }: WalkInFormPageProps) {
  const { slug, locale } = await params;

  const config = walkinFormConfig[slug] ?? {
    title: slug.replace(/-/g, ' '),
    developerLogoUrl: '',
    logo: '',
    showClientProfession: true,
    showContactInformation: true,
    showHostedBy: true,
  };

  return (
    <div className="min-h-screen py-10">
      <div className="mx-auto max-w-[1140px] rounded-md bg-white shadow-xl">
        <WalkinFormProvider>
          <WalkinHeader
            title={config.title}
            logo={config.logo || '/images/psi-logo.png'}
            developerLogoUrl={config.developerLogoUrl}
          />
          <hr className="border-t border-[#dee2e6]" />
          <WalkInFormContents slug={slug} locale={locale} />
        </WalkinFormProvider>
      </div>
    </div>
  );
}
