
import Breadcrumb from '../_components/Breadcrumb';
import AgentsClient from './_components/AgentsClient';


const AgentsPage = async () => {
    return (
        <div className="">
            <div className="pt-28 md:pt-36 border-b border-gray-100 bg-white dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="container mx-auto">
                    <Breadcrumb
                    />
                </div>
            </div>
            <div className="container mx-auto p-5">
                <AgentsClient />
            </div>
        </div>
    );
};

export default AgentsPage;
