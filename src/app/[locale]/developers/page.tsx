import DevelopersList from "../developer/_components/DevelopersList"
import DevPropertyList from "../developer/_components/DevPropertyList"

export default async function AllDevelopersPage()  {
    
    
    return(
        <>
            <div className="mx-auto container px-6 lg:px-8 mt-5">
                <h1 className="text-2xl text-center truncate">Developers</h1>
                <div className="w-full flex my-5 justify-content-center">
                    <DevelopersList slug="" />
                </div>                
                <div className="mb-5 mt-10">
                    <DevPropertyList developer="" />
                </div>
            </div>
        </>
    )
}