import { host_url } from "./host";
import axios from 'axios'

export default async function RestAPI(youtUrl :string) {

    const data = await axios(`${host_url}${youtUrl}`).then((res :any)=>{
        return res
    }).catch((err) => {
        return err
    })
    return {
        url : data && data.data?.url,
        info : data && data.data?.info,
        messageError : data.message
    }


}
