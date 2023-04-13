import axios from "axios";
import { getDateInFormat } from "utils/commonfunctions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url = process.env.REACT_APP_SERVER_URL;
const setStartDateAC = (d) => {
    return {
        type: "SET_STARTDATE",
        payload:{
            startdate:d
        }
    }
}
const setCloseDateAC = (d) => {
    return {
        type: "SET_CLOSEDATE",
        payload:{
            closedate:d
        }
    }
}
const setDataAC = (data) => {
    return {
        type: "SET_DATA",
        payload:{
            data:data
        }
    }
}
const setDailyDataAC = (data) => {
    return {
        type: "SET_DAILY_DATA",
        payload:{
            data:data
        }
    }
}
const setLoadingOnAC = () => {
    return {type:"LOADING_ON"};
}
const setLodingOffAC = () => {
    return {type: "LOADING_OFF"};
}
export const setStartDate = (startdate) => {
        return function (dispatch){
            dispatch(setStartDateAC(startdate));
            dispatch(loadInitialData());
        }
}
export const setCloseDate = (closedate) => {
    return function (dispatch) {
        dispatch(setCloseDateAC(closedate));
        dispatch(loadInitialData());
    }
}
export const setData = (data) => {
    return function (dispatch){
        dispatch(setDataAC(data))
    }
}
export const setDailyData = (data) => {
    return function (dispatch){
        dispatch(setDailyDataAC(data))
    }
}
export const loadingON = () => {
    return function(dispatch) {
        dispatch(setLoadingOnAC());
    }
}
export const loadingOFF = () => {
    return function(dispatch){
        dispatch(setLodingOffAC());
    }
}
export const setNextWeek = () => {
    return function(dispatch, getState){
        let {startdate,closedate} = getState().dashboard;
        startdate = new Date(startdate);
        closedate = new Date(closedate);
        let newStartDate = getDateInFormat(new Date(startdate.setDate(startdate.getDate()+7)));
        let newCloseDate = getDateInFormat(new Date(closedate.setDate(closedate.getDate()+7)));
        dispatch(setStartDate(newStartDate))
        dispatch(setCloseDate(newCloseDate))
    }
}
export const setPreviousWeek = () => {
    return function(dispatch, getState){
    let {startdate,closedate} = getState().dashboard;
    startdate = new Date(startdate);
    closedate = new Date(closedate);
    let newStartDate = getDateInFormat(new Date(startdate.setDate(startdate.getDate()-7)));
    let newCloseDate = getDateInFormat(new Date(closedate.setDate(closedate.getDate()-7)));
    dispatch(setStartDate(newStartDate))
    dispatch(setCloseDate(newCloseDate))
    }
}
export const loadInitialData = () => {
    return function (dispatch, getState){
    const {startdate,closedate} = getState().dashboard;
    const {id} = getState().auth;
    dispatch(loadingON());
    axios.get(url+ `/dashboard?from=${startdate}&&to=${closedate}&&userid=${id}`).then(resp => {
        dispatch(setData(resp.data));
        dispatch(loadDailyInitialData())
    }).then(() => {
        dispatch(loadingOFF());
    })
    }
}
export const loadDailyInitialData = () => {
    return function (dispatch, getState){
        const {startdate,closedate} = getState().dashboard;
        const {id} = getState().auth;
        const date= getDateInFormat(new Date());
        dispatch(loadingON());
        axios.get(url+ `/dashboard/daily?from=${startdate}&&to=${closedate}&&userid=${id}&&date=${date}`).then(resp => {
            dispatch(setDailyData(resp.data));
        }).then(() => {
            dispatch(loadingOFF());
        })
    }
}
export const markAttendence = (data) => {
    return function(dispatch, getState){
        const {id} = getState().auth;
        axios.put(url+'/attendence', {...data,userid:id}).then((response) => {
        if (response.status >= 200 && response.status < 300)
        toast.success("Marked Successfully!");
            dispatch(loadDailyInitialData())
        }
        )
    }
}