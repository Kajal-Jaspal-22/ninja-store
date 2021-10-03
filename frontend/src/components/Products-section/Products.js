import React,{useContext} from "react";
import "./Products.css";
import { catagoryContext } from "../../Context/context";

const Products = ()=>{
    const {catState} = useContext(catagoryContext);
    return(
        <section className="products-section">
            <div className="discount-bar">
                <h1>*USE CODE 'NINJA20' TO GET 20% OFF ON YOUR FIRST ORDER*</h1>
            </div>
            <h1 className="products-catagory-heading">BEST {catState.active} FOR YOU</h1>
            
        </section>
    )
}

export default Products;