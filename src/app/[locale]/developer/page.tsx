import DevPropertyList from "./_components/DevPropertyList"

export default async function DeveloperPage()  {
    
    return(
        <>
            <div className="mx-auto container px-6 lg:px-8 mt-5">
                <div className="grid grid-cols-1 gap-4">
                    <div className="">
                        <h1 className="text-2xl text-center truncate">Developers</h1>
                        <div className="mt-4">
                            <DevPropertyList masterDeveloper="Emaar" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}