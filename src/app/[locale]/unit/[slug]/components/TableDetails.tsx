import { Link } from "@/i18n/navigation";
import { faArrowRight, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import slugify from "react-slugify";

const TableDetails = (props:any) => {
    const subCommunity = props.data[0].sub_community ? props.data[0].sub_community : "n-a";
    const url =  '/projects/' + slugify(props.data[0].city_name) + "/" + slugify(props.data[0].community) + "/" + slugify(subCommunity) + "/" + slugify(props.data[0].propertyname);
    return (
        <>
            <div className="inline-block min-w-full py-2 align-middle sm:px-0 lg:px-0">
                <table className="min-w-full divide-y divide-gray-300">
                    <tbody className="divide-y divide-gray-200 bg-white">
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Property Name
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500"><Link href={url}>{props.data[0].propertyname} <FontAwesomeIcon icon={faArrowRight}/></Link></td>
                        </tr>
                        {props.data[0].category !== null ? (
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Property Type
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].category}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].refNo !== null ? (
                        <tr className="even:bg-gray-50" >
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Reference Number
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].refNo}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].bedrooms !== null ? (
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            No of Bedrooms
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].bedrooms}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].no_of_bathrooms !== null ? (
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            No of Bathrooms
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].no_of_bathrooms}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].parking !== null ? (
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            No of Parking
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].parking}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].developerName !== null ? (
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Developer
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].developerName}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].unitView !== null ? (
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Unit View
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].unitView}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].unitModel !== null ? (
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Unit Model
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].unitModel}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].agent !== null ? (
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Agent
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].agent}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].roi !== null ? (
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            ROI
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].roi}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].property_ownership_desc !== null ? (
                        <tr  className="even:bg-gray-50">
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-90">
                            Ownership
                            </td>
                            <td className="px-2 py-2 text-sm whitespace-nowrap text-gray-500">{props.data[0].property_ownership_desc}</td>
                        </tr>
                        ) : ("")}
                        {props.data[0].last_updated !== null ? (
                        <tr  className="even:bg-gray-50">
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