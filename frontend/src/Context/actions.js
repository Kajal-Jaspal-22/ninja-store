export const catReducer = (state, action)=>{
    switch(action.type){
        case "switch":
            return {active: action.payload}
        default: return state;
    }
};

export const cartReducer = (state, action)=>{
    switch(action.type){
        case "addItem":
            return {
                ...state,
                cart: [...state.cart, {...action.payload, quantity: 1}]
            }
        case "addQuantity":
            return {
                ...state,
                cart: state.cart.filter((e)=> e.id === action.payload.id ? e.quantity++ : e.quantity)
            }
        case "decreseQuantity":
            return {
                ...state,
                cart: state.cart.filter((e)=> e.id === action.payload.id ? e.quantity-- : e.quantity)
            }
        case "removeItem": 
            return {
                ...state,
                cart: state.cart.filter((e)=> e.id !== action.payload.id)
            }
        case "paymentDone":
            return {
                cart: []
            }
        default: return state;
    }
};

export const alertReducer = (state, action)=>{
    switch (action.type) {
        case "alert":
            return {
                ...state,
                msg: action.payload.msg,
                status: action.payload.status               
            }
        case "timeout":
            return {}
        default: return state;
    }
}
