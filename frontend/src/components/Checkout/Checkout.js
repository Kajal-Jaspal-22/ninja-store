import React,{useContext} from "react";
import "./Checkout.css";
import OrderSummery from "./OrderSummary";
import Details from "./Details";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/context";

const Checkout = ()=>{
    const {cartState} = useContext(cartContext);
    if(cartState.cart.length === 0){
        return (<Link to="/">0 items in cart. CLICK TO CONTINUE SHOPPING</Link>)
    }
    return(
        <section className="checkout-section">
            <h1 className="title-checkout">Checkout</h1>
            <div className="flex-checkout">
                <OrderSummery />
                <Details />
            </div>
            
        </section>
    );
}

export default Checkout;