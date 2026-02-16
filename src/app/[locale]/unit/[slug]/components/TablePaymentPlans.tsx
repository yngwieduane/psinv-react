import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";


const TablePaymentPlans = (props: any) => {

    const dataplans = props?.data;

    const DP = dataplans.propertyPlanInstallments.find((item: { installmentTypeId: number; }) => item.installmentTypeId == 20681);
    const HO = dataplans.propertyPlanInstallments.find((item: { installmentTypeId: number; }) => item.installmentTypeId == 70071);

    let filtered;
    filtered = dataplans.propertyPlanInstallments.filter((item: { installmentTypeId: number; }) => item.installmentTypeId !== 20681);
    filtered = filtered.filter((item: { installmentTypeId: number; }) => item.installmentTypeId !== 70071);

    return (
        <>
            <div className="inline-block min-w-full py-2 align-middle sm:px-0 lg:px-0">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-white">
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-white dark:bg-gray-800">
                        <tr className="even:bg-gray-50 dark:even:bg-gray-700">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90 dark:text-white">
                                Plan Name
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500 dark:text-white">
                                {dataplans.paymentPlanName}
                            </td>
                        </tr>
                        <tr className="even:bg-gray-50 dark:even:bg-gray-700">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90 dark:text-white">
                                Plan Type Name
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500 dark:text-white">
                                {dataplans.planTypeName}
                            </td>
                        </tr>
                        <tr className="even:bg-gray-50 dark:even:bg-gray-700">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90 dark:text-white">
                                Status
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500 dark:text-white">
                                {dataplans.statusName}
                            </td>
                        </tr>
                        {DP ? (
                            <tr className="even:bg-gray-50 dark:even:bg-gray-700">
                                <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90 dark:text-white">
                                    Downpayment
                                </td>
                                <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500 dark:text-white">
                                    {DP?.amountPercentage * 100} %
                                </td>
                            </tr>
                        ) : ("")}
                        {filtered.map((installment: { amountPercentage: number; instalmentDate: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; frequencyName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: number) => {
                            return (
                                <tr key={index} className="even:bg-gray-50 dark:even:bg-gray-700">
                                    <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90 dark:text-white">
                                        {index + 1}
                                    </td>
                                    <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500 dark:text-white">
                                        {installment?.amountPercentage * 100}% (every {installment?.instalmentDate} {installment?.frequencyName})
                                    </td>
                                </tr>
                            )
                        }
                        )}
                        {HO ? (
                            <tr className="even:bg-gray-50 dark:even:bg-gray-700">
                                <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90 dark:text-white">
                                    Handover
                                </td>
                                <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500 dark:text-white">
                                    {HO?.amountPercentage * 100} %
                                </td>
                            </tr>
                        ) : ("")}
                    </tbody>
                </table>
            </div>
        </>
    );
}


export default TablePaymentPlans;