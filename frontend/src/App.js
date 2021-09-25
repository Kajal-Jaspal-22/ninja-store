import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const App = ()=>{
    return(
        <BrowserRouter>
        <Route path="/" exact>
            <Navbar />
        </Route>
    </BrowserRouter>
    )
}

export default App;