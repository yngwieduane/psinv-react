import Link from "next/link";
import { getWalkinListItems } from "@/utils/walkinListItems";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const items = getWalkinListItems(locale);

  return (
    <div className="min-h-screen">
      <div className="mt-10 mb-5 text-center">
        <h1 className="text-2xl md:text-4xl font-semibold text-[#1d1f5a]">
          Walk-In Registration
        </h1>
        <p className="mt-3 text-gray-600">Browse all walk-in registration forms</p>
      </div>

      <div className="mx-auto max-w-[1140px] px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.href} className="rounded-xl border border-gray-300 p-6">
              <div className="text-xs text-gray-500 uppercase">{item.branch}</div>
              <div className="mt-2 text-lg font-semibold">{item.title}</div>

              <Link
                href={item.href}
                className="mt-4 inline-flex text-orange-600 font-semibold"
              >
                View Page →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}