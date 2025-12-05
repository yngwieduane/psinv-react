import Breadcrumb from "../_components/Breadcrumb";
import ArticlesPage from "./_components/ArticlesPage";


export default function Articles() {
    return(
        <>
            <Breadcrumb />
            <div className="mx-auto container px-6 lg:px-8 mt-5">
                <ArticlesPage />
            </div>
        </>
    )
}