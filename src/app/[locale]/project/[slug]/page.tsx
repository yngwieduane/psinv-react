import RegistrationHeroImage from "../../_components/RegistrationHeroImage";
import RegistrationForm from "../../_components/RegistrationForm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Registration: ${slug}`,
  };
}
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const locale = "en";

  if (!slug) return notFound();

  return (
    <div>
      <RegistrationHeroImage slug={slug} locale={locale} />
      <RegistrationForm slug={slug} />
    </div>
  );
}
