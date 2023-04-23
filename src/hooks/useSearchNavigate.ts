import { useNavigate } from "react-router"
import { DetailedObject } from "../model/utils"

interface QueryObject {
    pathName: string
    queryObj: DetailedObject<string | number>
}

export const serializeQuery = (obj: DetailedObject<string | number>) => {
    return Object.keys(obj).map(function(key) {
      return [key, obj[key].toString()].map(encodeURIComponent).join("=");
    }).join("&");
  };

export const useSearchNavigate = () => {
    const navigate = useNavigate()

    return ({pathName, queryObj}: QueryObject) => navigate({pathname: `${pathName}`, search: `${serializeQuery(queryObj)}`})
}
