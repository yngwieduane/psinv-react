import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoadingIcon(props:any) {
    return (
        <div className="flex h-full w-full items-center justify-center ">            
            <FontAwesomeIcon icon={faSpinner} className="text-2xl fa-spin" color="#c19a5b" />
        </div>
    );
}