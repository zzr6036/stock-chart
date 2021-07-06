import actionTypes from "../action-types";
import axios from "axios";
import { stockService } from "../../service/stock-service";
import keys from "../../configs/keys";
import { notification } from "antd";

const { apiKey } = keys
export const getStockList = (params) => async dispatch => {
    try {
        params = Object.assign({ function: 'TIME_SERIES_DAILY', apikey: apiKey }, params)
        let baseUrl = stockService.getStockList
        await axios.get(baseUrl, { params }).then(res => {
            // console.log('res===>', res)
            if (res && res.status === 200 && res.data && res.data['Time Series (Daily)']) {
                localStorage.setItem('symbol', params.symbol)
                dispatch({
                    type: actionTypes.STOCK.GET_STOCK_LIST,
                    payload: res.data && res.data['Time Series (Daily)']
                })
                dispatch({
                    type: actionTypes.STOCK.GET_SELECT_STOCK,
                    payload: res.data && res.data['Meta Data']
                })
            } else if (res && res.data && res.data.Note) {
                localStorage.setItem('symbol', params.symbol)
                dispatch({
                    type: actionTypes.STOCK.GET_STOCK_LIST,
                    payload: {}
                })
                dispatch({
                    type: actionTypes.STOCK.GET_SELECT_STOCK,
                    payload: {}
                })
                return notification.warning({
                    message: 'Warning',
                    description: res.data.Note,
                    duration: 10,
                })
            } else {
                return notification.error({
                    message: 'Fail',
                    description: 'Error with API',
                    duration: 3,
                })
            }
        })
    } catch (error) {
        console.log('error===>', error)
        return notification.error({
            message: 'Fail',
            description: 'Error!'
        })
    }
}