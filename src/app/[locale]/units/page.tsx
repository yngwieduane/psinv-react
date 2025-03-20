import { useLocale } from "next-intl";
import UnitsPage from "./_components/UnitsPage";

export default async function Units(props: {
  searchParams?: Promise<{
    unitid?: string;
    category?: string;
    page?: string;
  }>;
}){
  const searchParams = await props.searchParams;
  const unitid = searchParams?.unitid || '';
  const category = searchParams?.category || '';
  const currentPage = Number(searchParams?.page) || 1;
  console.log("mainPageUnits="+unitid);


    return (
        <>
            <UnitsPage unitid={unitid} category={category} currentPage={currentPage}/>
        </>
    );
}