import React,{useReducer} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import { catagoryContext } from "./Context/context";
import { catReducer } from "./Context/actions";
import Navbar from "./components/Navbar/Navbar";
import Catagories from "./components/Cat-section/Catagories";
import Hero from "./components/Hero-section/Hero";
import Products from "./components/Products-section/Products";

const App = ()=>{
    const initCat = {active: "MICE"};
    const [catState, catDispatch] = useReducer(catReducer, initCat);

    return(
        <BrowserRouter>
        <catagoryContext.Provider value={{catState, catDispatch}}>
        <Route path="/" exact>
            <Navbar />
            <Catagories />
            <Hero />
            <Products />
        </Route>
        </catagoryContext.Provider>
    </BrowserRouter>
    )
}

export default App;