import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";


const TablePaymentPlans = (props:any) => {

    const dataplans = props?.data;

    const DP = dataplans.propertyPlanInstallments.find((item: { installmentTypeId: number; }) => item.installmentTypeId == 20681);
    const HO = dataplans.propertyPlanInstallments.find((item: { installmentTypeId: number; }) => item.installmentTypeId == 70071);

    let filtered;
    filtered = dataplans.propertyPlanInstallments.filter((item: { installmentTypeId: number; }) => item.installmentTypeId !== 20681);
    filtered = filtered.filter((item: { installmentTypeId: number; }) => item.installmentTypeId !== 70071);

    return (
        <>
            <div className="inline-block min-w-full py-2 align-middle sm:px-0 lg:px-0">
                <table className="min-w-full divide-y divide-gray-300">
                    <tbody className="divide-y divide-gray-200 bg-white">
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                                Plan Name
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">
                                { dataplans.paymentPlanName }
                            </td>
                        </tr>
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                                Plan Type Name
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">
                                { dataplans.planTypeName }
                            </td>
                        </tr>
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                                Status
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">
                                { dataplans.statusName }
                            </td>
                        </tr>
                        {DP ? (
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                                Downpayment
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">
                                { DP?.amountPercentage * 100 } %
                            </td>
                        </tr>
                        ) : ("")}
                        {HO ? (
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                                Handover
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">
                                { HO?.amountPercentage * 100 } %
                            </td>
                        </tr>
                        ) : ("")}
                        {filtered.map((installment: { amountPercentage: number; instalmentDate: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; frequencyName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: number) => {
                            return (
                                <tr key={index} className="even:bg-gray-50">
                                    <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                                        {index+1}
                                    </td>
                                    <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">
                                        {installment?.amountPercentage * 100}% (every {installment?.instalmentDate} {installment?.frequencyName})
                                    </td>
                                </tr>
                            )}
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
  }


export default TablePaymentPlans;