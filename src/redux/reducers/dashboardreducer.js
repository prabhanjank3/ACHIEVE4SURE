import { getNextSunday } from "../../utils/commonfunctions"
import { getDateInFormat, getMonday } from "../../utils/commonfunctions"
const initialStore = {
    startdate: getDateInFormat(getMonday(new Date())),
    closedate: getDateInFormat(getNextSunday(new Date())),
    data:[],
    dailyTaskData:[],
    loading:false
}
const dashboardReducer = (state = initialStore, action) => {
    switch(action.type)
    {
        case "SET_STARTDATE" :
            return {
                ...state,
                startdate:action.payload.startdate
            }
        case "SET_CLOSEDATE":
            return {
                ...state,
                closedate: action.payload.closedate
            }
        case "SET_DATA":
        {
            return {
                ...state,
                data:action.payload.data
            }
        }
        case "SET_DAILY_DATA":
            return {
                ...state,
                dailyTaskData:action.payload.data
            }
        case "LOADING_ON":
            return {
                ...state,
                loading:true
            }
        case "LOADING_OFF":
            return {
                ...state,
                loading:false
            }
        default:
            return state
        
    }
}
export default dashboardReducer;