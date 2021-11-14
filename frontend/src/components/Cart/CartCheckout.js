import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CartCheckout = ({data})=>{
    const [cart, setCart] = useState();
    const [total, setTotal] = useState();

    useEffect(()=>{
        setCart(data);
            axios.patch('http://localhost:4000/api/checkout', {cart, total: true}, {
            headers:{'content-type': 'application/json'}
        }).then((r)=> r ? setTotal(r.data.total) : null);
    }, [data, cart]);

    const DisplayCheckout = ()=>{
        return(<div className="cart-checkout-conatiner">
                <div className="checkout-hr-line"></div>
                <div className="cart-checkout-total">
                    <h2 className="grand-total">Grand Total: <span>{`${total} ₹`}</span></h2>
                    <Link className="link-to-checkout" to="/checkout">Proceed to checkout.</Link>
                </div>
        </div>)
    }
    
    return(<>
     {data ? <DisplayCheckout /> : <h1>Loading</h1>}   
    </>)
};

export default CartCheckout;