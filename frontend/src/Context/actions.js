export const catReducer = (state, action)=>{
    switch(action.type){
        case "switch":
            return {active: action.payload}
        default: return state
    }
}