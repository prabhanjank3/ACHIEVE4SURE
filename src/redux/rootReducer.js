import {combineReducers} from "redux";
import authReducer from "./reducers/authreducer";
import dashboardReducer from "./reducers/dashboardreducer";
const rootReducer = combineReducers({
    auth:authReducer,
    dashboard: dashboardReducer
});
export default rootReducer;