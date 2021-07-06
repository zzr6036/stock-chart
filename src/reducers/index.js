import { combineReducers } from "redux";
import stockReducer from "./stockReducer";

const rootReducers = combineReducers({
    stock: stockReducer
})

export default rootReducers;