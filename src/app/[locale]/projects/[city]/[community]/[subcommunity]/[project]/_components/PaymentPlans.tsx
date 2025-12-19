
'use client'
import { generateSeoData } from "@/app/[locale]/_components/functions/generateSeoData";
import UnitBox from "@/app/[locale]/units/_components/UnitBox";
import { useState, useEffect } from "react";
import { PaymentPlansResponse } from "@/types/types";
import DrawerDetails from "@/app/[locale]/unit/[slug]/components/DrawerDetails";

const PaymentPlans = ({
    propid
  }: {
    propid: number;
  }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<PaymentPlansResponse | null>(null);
    const [loading, setLoading] = useState(0);
    const [showDrawer, setShowDrawer] = useState(false);
    const [dwDataContent, setDwDataContent] = useState('details');
    const [dwDataTitle, setDwDataTitle] = useState('details');
    const drawerHandler = (content:string,valuesarray:any) => (e:any) => {
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
            <div
                role="list"
                className="grid grid-cols-1 md:grid-cols-3 gap-3"
            >
                {results?.result.map((plan, index) => {

                    const DP = plan.propertyPlanInstallments.find(item => item.installmentTypeId == 20681);
                    const HO = plan.propertyPlanInstallments.find(item => item.installmentTypeId == 70071);

                    let filtered;
                    filtered = plan.propertyPlanInstallments.filter(item => item.installmentTypeId !== 20681);
                    filtered = filtered.filter(item => item.installmentTypeId !== 70071);


                    return (
                        <div key={plan.propertyPaymentPlanId} className="overflow-hidden rounded-lg bg-gray-50">
                            <div className="px-4 py-5 sm:p-6">
                                <h2 className="font-semibold mb-4">Payment Plan {index+1}</h2>
                                <div className="grid grid-cols-2 gap-4 flex-wrap items-center">
                                    {DP && (
                                        <div className="grid gap-x-2 gap-y-0 items-center ">
                                            <p className="text-xl">{ DP?.amountPercentage * 100 } %</p>
                                            <p className="text-sm">Downpayment</p>
                                        </div>
                                    )}
                                    {HO && (
                                        <div className="grid gap-x-2 gap-y-0 items-center ">
                                            <p className="text-xl">{ HO?.amountPercentage * 100 } %</p>
                                            <p className="text-sm">Handover</p>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-2">
                                    <button
                                        type="button"
                                        onClick={drawerHandler('paymentplan', plan)}
                                        name="details"
                                        className="rounded-sm bg-[#0c1445] border px-2 py-1 text-xs font-semibold text-white shadow-xs hover:bg-white hover:border-[#0c1445] hover:text-[#0c1445] cursor-pointer"
                                    >View full</button>
                                </div>
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


export default PaymentPlans;