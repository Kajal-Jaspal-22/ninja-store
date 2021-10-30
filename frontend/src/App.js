import React,{useReducer} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import { catagoryContext, cartContext, alertContext } from "./Context/context";
import { catReducer, cartReducer, alertReducer } from "./Context/actions";
import Navbar from "./components/Navbar/Navbar";
import Catagories from "./components/Cat-section/Catagories";
import Hero from "./components/Hero-section/Hero";
import Products from "./components/Products-section/Products";
import Alerts from "./components/Alerts/Alerts";
import Cart from "./components/Cart/Cart";

const App = ()=>{
    const initCat = {active: "MICE"};
    const [catState, catDispatch] = useReducer(catReducer, initCat);
    const initCart = {cart: []};
    const [cartState, cartDispatch] = useReducer(cartReducer, initCart, ()=>{
        const localCart = localStorage.getItem("cart");
        if(localCart){
            return JSON.parse(localCart);
        }else{
            return initCart;
        };
    });
    const [alertState, alertDispatch] = useReducer(alertReducer, {});

    
    return(
        <BrowserRouter>
        <catagoryContext.Provider value={{catState, catDispatch}}>
        <cartContext.Provider value={{cartState, cartDispatch}}>
        <alertContext.Provider value={{alertState, alertDispatch}}>
        <Route path="/" exact>
            <Alerts />
            <Navbar />
            <Catagories />
            <Hero />
            <Products />
        </Route>
        <Route path="/cart" exact>
            <Cart />
        </Route>
        </alertContext.Provider>
        </cartContext.Provider >
        </catagoryContext.Provider>
    </BrowserRouter>
    )
}

export default App;