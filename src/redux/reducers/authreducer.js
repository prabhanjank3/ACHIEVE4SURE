const initialStore = {
    ...JSON.parse(localStorage.getItem("user"))
}
const authReducer = (state = initialStore, action) => {
    switch(action.type){
        case "LOG_IN":
            return {
                ...state,
                ...action.payload,
                loggedIn:true
            }
        case "LOG_OUT":
            return {
                
            }
        default: {
            return state
        }
            
        
    }
}
export default authReducer;