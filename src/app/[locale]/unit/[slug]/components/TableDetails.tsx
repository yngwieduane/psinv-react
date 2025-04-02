const TableDetails = (props:any) => {
    return (
        <>
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                    <tbody className="divide-y divide-gray-200 bg-white">
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Property Type
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].category}</td>
                        </tr>
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Reference Number
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].refNo}</td>
                        </tr>
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            No of Bedrooms
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].bedrooms}</td>
                        </tr>
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            No of Bathrooms
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].no_of_bathrooms}</td>
                        </tr>
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            No of Parking
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].parking}</td>
                        </tr>
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Developer
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].developerName}</td>
                        </tr>
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Unit View
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].unitView}</td>
                        </tr>
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Unit Model
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].unitModel}</td>
                        </tr>
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Agent
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].agent}</td>
                        </tr>
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            ROI
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].roi}</td>
                        </tr>
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Ownership
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].property_ownership_desc}</td>
                        </tr>
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Last Updated
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].last_updated}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
  }


export default TableDetails;