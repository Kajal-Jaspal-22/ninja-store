import React,{useContext, useEffect} from "react";
import "./Cart.css";
import {cartContext} from "../../Context/context";
import Items from "./Items";
import CartCheckout from "./CartCheckout";
import { Link } from "react-router-dom";

const Cart = ()=>{
    const {cartState} = useContext(cartContext);
    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cartState));
    },[cartState])
    
    return(
        <section className="cart-section">
        <div className="main-cart">
            <h1 className="cart-heading">SHOPPING CART</h1>
            <div className="cart-container">
                {(cartState.cart.length === 0) ? <Link to="/">Cart is Empty. Continue Shopping...</Link> : <Items />}
            </div>
        </div>
        <div className="cart-checkout-section">
            {(cartState.cart.length === 0) ? null : <CartCheckout data={cartState.cart} />}
        </div>
        </section>
    )
}

export default Cart;