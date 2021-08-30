import {
    TWITTER_TABLE_LIST_REQUEST,
    TWITTER_TABLE_LIST_REQUEST_ERROR,
    TWITTER_TABLE_LIST_REQUEST_SUCCESS
} from "../actions/twitter"

const initialState = {
    loading: false,
    tableColumns: [],
    tableData: []
}

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case TWITTER_TABLE_LIST_REQUEST:
            return { ...state, loading: true }

        case TWITTER_TABLE_LIST_REQUEST_SUCCESS:
            return { ...state, tableData: payload.tableData, tableColumns: payload.tableColumns, loading: false }

        case TWITTER_TABLE_LIST_REQUEST_ERROR:
            return { ...state, error: payload.error ? payload.error : null, loading: false }

        default:
            return state
    }
}

export default authReducer