import axios from "axios";
import { useEffect } from "react";
import { GOOGLE_CALL_BACK, baseURl } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from 'cookie-universal';
export default function GoogleCallback () {
    const location = useLocation();

    const cookie = Cookie();

    useEffect(()=>{
        async function googleCall(){
            try {
                const res = await axios.get(`${baseURl}/${GOOGLE_CALL_BACK}/${location.search}`)
                const token = res.data.access_token;
                cookie.set("e-commerce", token)
            } catch (error) {
                console.log(error)
            }
        }
        googleCall();
    },[])
    return (<h1>Google</h1>);
}

