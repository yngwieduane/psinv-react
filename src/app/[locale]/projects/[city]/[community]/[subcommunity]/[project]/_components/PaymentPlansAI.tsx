
'use client'
import { useState, useEffect } from "react";
import { PaymentPlansResponse } from "@/types/types";
import DrawerDetails from "@/app/[locale]/unit/[slug]/components/DrawerDetails";
import { FileText } from "lucide-react";

const PaymentPlansAI = ({
    propid,
    propname
}: {
    propid: number;
    propname: string;
}) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<PaymentPlansResponse | null>(null);
    const [loading, setLoading] = useState(0);
    const [showDrawer, setShowDrawer] = useState(false);
    const [dwDataContent, setDwDataContent] = useState('details');
    const [dwDataTitle, setDwDataTitle] = useState('details');
    const drawerHandler = (content: string, valuesarray: any) => (e: any) => {
        console.log(showDrawer);
        console.log(content);
        setDwDataContent(valuesarray);
        setDwDataTitle(content);
        setShowDrawer(true);
    }

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await fetch(`/api/external/projects/paymentplan?propertyId=${propid}`);
                const data: PaymentPlansResponse = await res.json();
                setResults(data);
                setLoading(data.result.length);
            } catch (error) {
                console.error('Error fetching payment plans:', error);
            }
        };

        fetchPlans();
    }, []);

    return (
        <>
            {loading > 0 && (
                <>
                    <h3 className="text-3xl font-bold text-primary relative inline-block dark:text-white">Payment Plan</h3>
                    <h2 className="text-xl text-gray-500 mb-8">{propname}</h2>
                    <div
                        role="list"
                        className="grid grid-cols-1 gap-3"
                    >
                        {results?.result.map((plan, index) => {

                            const DP = plan.propertyPlanInstallments.find(item => item.installmentTypeId == 20681);
                            const HO = plan.propertyPlanInstallments.find(item => item.installmentTypeId == 70071);

                            let filtered;
                            filtered = plan.propertyPlanInstallments.filter(item => item.installmentTypeId !== 20681);
                            filtered = filtered.filter(item => item.installmentTypeId !== 70071);


                            return (
                                <div key={plan.propertyPaymentPlanId} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700/50">
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                                        {/* Connector Line */}
                                        <div className="absolute top-1/2 left-10 right-10 h-1 bg-gray-100 -z-0 hidden md:block"></div>
                                        {DP && (
                                            <div className="flex flex-col items-center text-center bg-white z-10 px-4 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700/50">
                                                <div className="w-16 h-16 rounded-full bg-secondary text-black flex items-center justify-center font-bold text-xl mb-4 border-4 border-orange-100 shadow-lg dark:text-white">
                                                    {DP?.amountPercentage * 100} %
                                                </div>
                                                <h4 className="font-bold text-gray-900 text-lg mb-1 dark:text-white">Downpayment</h4>
                                                <p className="text-gray-500 text-sm">On Booking</p>
                                            </div>
                                        )}
                                        <div className="flex flex-col items-center text-center bg-white z-10 px-4 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700/50">
                                            <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xl mb-4 border-4 border-orange-100 shadow-lg">

                                            </div>
                                            <h4 className="font-bold text-gray-900 text-lg mb-1 dark:text-white">During Construction</h4>
                                            <p className="text-gray-500 text-sm">Installments</p>
                                        </div>
                                        {HO && (
                                            <div className="flex flex-col items-center text-center bg-white z-10 px-4 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700/50">
                                                <div className="w-16 h-16 rounded-full bg-secondary text-black flex items-center justify-center font-bold text-xl mb-4 border-4 border-orange-100 shadow-lg dark:text-white">
                                                    {HO?.amountPercentage * 100} %
                                                </div>
                                                <h4 className="font-bold text-gray-900 text-lg mb-1 dark:text-white">Handover</h4>
                                                <p className="text-gray-500 text-sm">Upon Completion</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-12 text-center">
                                        <button className="bg-black text-white px-8 py-3 rounded-full font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
                                            onClick={drawerHandler('paymentplan', plan)}
                                            name="details">
                                            <FileText size={18} /> View detailed payment plan
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <DrawerDetails open={showDrawer} onClose={setShowDrawer} drawerTitle={dwDataTitle} drawerContent={dwDataContent} />
                </>
            )}
        </>
    );
};


export default PaymentPlansAI;