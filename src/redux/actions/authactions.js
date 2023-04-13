import axios from "axios";
import { toast } from "react-toastify";
import {loadingON, loadingOFF} from './dashboardactions';
import "react-toastify/dist/ReactToastify.css";
const url = process.env.REACT_APP_SERVER_URL;

const logInAC = (userdata) => ({
    type:"LOG_IN",
    payload:userdata
})
const logOutAC = () => ({
    type: "LOG_OUT"
})

export const setUserLoggedIn = (data) => {
    return function (dispatch)
    {
        dispatch(logInAC(data));
    }
}
export const setUserLoggedOut = () => {
    return function (dispatch){
        dispatch(logOutAC());
    }
}

export const authenticateUser = (data) => {
    return function (dispatch)
    {
        dispatch(loadingON());
        axios.post(url+'/auth/login', data)
        .then(resp => {
            if(resp.data !== "" && 'id' in resp.data)
            {
                dispatch(setUserLoggedIn({...resp.data, token:data.token, imageUrl: data.imageUrl}))
            }
            else
            {
                toast.error(`No User Found!`);
            }
            dispatch(loadingOFF())
        })
        
    }
    
}