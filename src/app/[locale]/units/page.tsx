import UnitsPage from "./_components/UnitsPage";

export default async function Units(props: {
  searchParams?: Promise<{
    unitid?: string;
    category?: string;
    propertyName?: string;
    propertyId?: string;
    beds?: string;
    page?: string;
  }>;
}){
  const searchParams = await props.searchParams;
  const unitid = searchParams?.unitid || '';
  const category = searchParams?.category || '';
  const currentPage = Number(searchParams?.page) || 1;
  const propertyId = searchParams?.propertyId || '';
  const beds = searchParams?.beds || '';
  console.log("mainPageUnits="+unitid);
  console.log("propertyId="+propertyId);


    return (
        <>
            <UnitsPage unitid={unitid} category={category} propertyId={propertyId} beds={beds} currentPage={currentPage}/>
        </>
    );
}