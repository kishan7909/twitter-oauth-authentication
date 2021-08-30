import axios from "axios"
import { getDataList, getTwitterInit_API } from "../apis/auth"
import { SERVER_URL } from "../constant/constant"

export const TWITTER_TABLE_LIST_REQUEST = "TWITTER_TABLE_LIST_REQUEST"
export const TWITTER_TABLE_LIST_REQUEST_SUCCESS = "TWITTER_TABLE_LIST_REQUEST_SUCCESS"
export const TWITTER_TABLE_LIST_REQUEST_ERROR = "TWITTER_AUTH_REQUEST_ERROR"

var popWindow

export function requestTwitterAuth(isClickEvent = false) {
    return async dispatch => {
        dispatch({ type: TWITTER_TABLE_LIST_REQUEST })
        try {
            let response = await getTwitterInit_API()
            if (response.status) {
                if (response.data.location && isClickEvent) {
                    popWindow = window.open(response.data.location, "popwindow", "width=600,height=600")
                    popWindow.focus()
                }
                let tableColumns = []
                let tableData = []
                if (response.data.data && response.data.columnSchemas) {
                    tableColumns = response.data.columnSchemas
                    tableData = response.data.data
                }
                dispatch({ type: TWITTER_TABLE_LIST_REQUEST_SUCCESS, payload: { tableData, tableColumns } })
            }
            console.info('---------------------------------')
            console.info('response =>', response)
            console.info('---------------------------------')
        } catch (err) {
            dispatch({ type: TWITTER_TABLE_LIST_REQUEST_ERROR, payload: { error: err.message } })
        }
    }
}