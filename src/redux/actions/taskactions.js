import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadInitialData } from "./dashboardactions";
import {loadingON, loadingOFF} from './dashboardactions';
const url = process.env.REACT_APP_SERVER_URL;


export const updateTask = (data, id) => {
    return function (dispatch){
    dispatch(loadingON())
    axios.patch(`${url}/task/update?id=${id}`, data).then(response => {
        if (response.status >= 200 && response.status < 300)
          toast.success("Task Updated Successfully!");
        dispatch(loadInitialData());
    })
    .catch(error => {
        toast.error(error.message);
    })
    dispatch(loadingOFF())
    }
}
export const addTask = (data) => {
    return function (dispatch, getState){
    dispatch(loadingON())
    const {id} = getState().auth;
    axios.post(`${url}/task/create`, {...data, userid:id}).then(response => {
        if (response.status >= 200 && response.status < 300)
        toast.success("Task Created Successfully!");
      dispatch(loadInitialData());
    })
    .catch(error => {
        toast.error(error.message);
    })
    dispatch(loadingOFF())
    }
}
export const deleteTask = (id) => {
    return function (dispatch){
        dispatch(loadingON())
        axios.delete(`${url}/task/delete?id=${id}`)
        .then(response => {
            if (response.status >= 200 && response.status < 300)
            toast.success("Task Deleted Successfully!");
          dispatch(loadInitialData());
        })
        .catch(error => {
            toast.error(error.message);
        })
        dispatch(loadingOFF())
    }
}