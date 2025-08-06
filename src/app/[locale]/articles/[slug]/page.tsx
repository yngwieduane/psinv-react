
export default async function ArticleSingle({
    params
}:{
    params: Promise<{slug:string;}>;
}){

    const {slug} = await params;
    return (
        <>
            Article single {slug}
        </>
    );
}