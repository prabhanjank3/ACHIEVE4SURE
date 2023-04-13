import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadInitialData } from "./dashboardactions";
import {loadingON, loadingOFF} from './dashboardactions';
const url = process.env.REACT_APP_SERVER_URL;


export const updateGoal = (data, id) => {
    return function (dispatch){
    dispatch(loadingON())
    axios.patch(`${url}/goal/update?id=${id}`, data).then(response => {
        if (response.status >= 200 && response.status < 300)
          toast.success("Goal Updated Successfully!");
        dispatch(loadInitialData());
    })
    .catch(error => {
        toast.error(error.message);
    })
    dispatch(loadingOFF())
    }
}
export const addGoal = (data) => {
    return function (dispatch){
    dispatch(loadingON())
    axios.post(`${url}/goal/create`, data).then(response => {
        if (response.status >= 200 && response.status < 300)
        toast.success("Goal Created Successfully!");
      dispatch(loadInitialData());
    })
    .catch(error => {
        toast.error(error.message);
    })
    dispatch(loadingOFF())
    }
}
export const deleteGoal = (id) => {
    return function (dispatch){
        dispatch(loadingON())
        axios.delete(`${url}/goal/delete?id=${id}`)
        .then(response => {
            if (response.status >= 200 && response.status < 300)
            toast.success("Goal Deleted Successfully!");
          dispatch(loadInitialData());
        })
        .catch(error => {
            toast.error(error.message);
        })
        dispatch(loadingOFF())
    }
}