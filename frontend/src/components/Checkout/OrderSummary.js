import React,{useState, useEffect, useContext} from "react";
import axios from "axios";
import {cartContext} from "../../Context/context";
import {Link} from "react-router-dom";

const OrderSummery = ()=>{
    const [data, setData] = useState();
    const {cartState} = useContext(cartContext);

    useEffect(()=>{ 
        axios.patch("http://localhost:4000/api/checkout", {cart: cartState.cart, total: false}, 
            {headers:{"content-type": "application/Json"}}
        ).then(r => r ? setData(r.data) : null)
        .catch(e => e.response ? console.log(e.response) : null);
    },[cartState]);

    const Container = ()=>{
        if(data){
            return(<div className="order-summary-container">
                <div className="summary-title-container">
                    <h1>Order Summary</h1>
                <Link to="cart" className="link-cart"><p>Go To Cart</p></Link>
                </div>
                
                <div className="orders-container">
                    <h1 className="details-row">Total Items: <span>{data.items}</span></h1>
                    <h1 className="details-row">Total Price: <span>{data.maxTotal}₹</span></h1>
                    <h1 className="details-row">Offered Price: <span>{data.total}₹</span></h1>
                    <h1 className="details-row">Dilivery: <span>0₹</span></h1>
                    <hr />
                    <h1 className="details-row">Order Total: <span>{data.total}₹</span></h1>
                    <div className="details-saved-row">
                    <h1>Your Total Saving on this order: <span>{data.maxTotal - data.total}₹</span></h1>
                    </div>
                </div>
        </div>);
        }else {
            return(<h1>Loading...</h1>)
        }
        
    };

    return(<>
       {Container()} 
    </>);
};

export default OrderSummery;