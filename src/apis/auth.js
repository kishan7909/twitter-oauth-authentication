import axios from "axios"
import { requestTwitterAuth } from "../actions/twitter";
import { SERVER_URL } from "../constant/constant"

export const getTwitterInit_API = async () => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch("http://localhost:3001/connector/twitter/300/covid", requestOptions)
        .then(response => response.text())
        .then(result => { return { data: JSON.parse(result), status: 1 } })
        .catch(error => {
            console.log('error', error)
            return { error, status: 0 }
        });
}

export const getDataList = async (callBackURL) => {
    return axios.post("http://localhost:3001/connector/twitter/300/covid", { authType: "oauth" }, {
        headers: {
            "Referer": callBackURL
        }
    })
}

export const setCallbackURLDataAPI = (params) => {
    axios.get(`${SERVER_URL}/connector/twitter/callback${params}`)
    return true
}