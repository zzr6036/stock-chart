import actionTypes from "../../actions/action-types";

const initialState = {
    stock_list: {},
    selected_stock: {}
}

const stockReducer = (state = initialState, action) => {
    const actionTypesPrefix = actionTypes.STOCK;
    switch (action.type) {
        case actionTypesPrefix.GET_STOCK_LIST:
            return Object.assign({}, state, { stock_list: action.payload })
        case actionTypesPrefix.GET_SELECT_STOCK:
            return Object.assign({}, state, { selected_stock: action.payload })
        default:
            return state
    }
}

export default stockReducer