const TableDetails = (props:any) => {
    return (
        <>
            <div className="inline-block min-w-full py-2 align-middle sm:px-0 lg:px-0">
                <table className="min-w-full divide-y divide-gray-300">
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {props.data[0].category !== null ? (
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Property Type
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].category}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].refNo !== null ? (
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Reference Number
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].refNo}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].bedrooms !== null ? (
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            No of Bedrooms
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].bedrooms}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].no_of_bathrooms !== null ? (
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            No of Bathrooms
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].no_of_bathrooms}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].parking !== null ? (
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            No of Parking
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].parking}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].developerName !== null ? (
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Developer
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].developerName}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].unitView !== null ? (
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Unit View
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].unitView}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].unitModel !== null ? (
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Unit Model
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].unitModel}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].agent !== null ? (
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Agent
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].agent}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].roi !== null ? (
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            ROI
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].roi}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].property_ownership_desc !== null ? (
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Ownership
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].property_ownership_desc}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].last_updated !== null ? (
                        <tr  >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Last Updated
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].last_updated}</td>
                        </tr>
                        ) : ("")}
                    </tbody>
                </table>
            </div>
        </>
    );
  }


export default TableDetails;