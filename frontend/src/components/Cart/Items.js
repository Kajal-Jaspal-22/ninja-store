import React,{useContext, useState, useEffect} from "react";
import { cartContext } from "../../Context/context";
import axios from "axios";
import {Link} from "react-router-dom";
const Items = ()=>{
    const {cartState, cartDispatch} = useContext(cartContext);
    const [data, setData] = useState();
    
    useEffect(()=>{
        if(cartState.cart.length !== 0){
            const ids = [];
            cartState.cart.forEach((i)=> ids.push(i.id));
            axios.patch("http://localhost:4000/api/items", {ids}, {
                "content-type": "application/Json"
            }).then(r => r.data ? setData(r.data) : null)
            .catch(e => e.response ? console.log(e.response) : null);
        }
    }, [cartState]);

    const handleCartQuantity = (value, id) =>{
        if(value === "+"){
            cartDispatch({type: "addQuantity", payload: {id: id}});
        }else if(value === "-"){
            cartDispatch({type: "decreseQuantity", payload: {id: id}});
        }else {
            cartDispatch({type: "removeItem", payload: {id: id}})
        }
    }

    const mapItems = (i)=>{
        const included = cartState.cart.filter(n => n.id === i._id)[0];
        if(included && included.quantity >= 1){
            const quantity = cartState.cart.filter(n => n.id === i._id)[0].quantity;
            const total = i.currentPrice * quantity;
            const maxTotal = i.maxPrice * quantity;
        
        return(
            
            <div className="cart-item-container" key={i._id}>

            <div className="cart-item-image" style={{backgroundImage: `url("images/store/${i.image}.png")`}}></div>
            <div className="cart-details">
            <Link className="cart-item-name" to={`/product?id=${i.productID}`}>{i.name}</Link>
            <div className="cart-quantity-container">
                <button className="cart-quantity-btn" onClick={(e)=> handleCartQuantity(e.target.innerHTML, i._id)}>+</button>
                <h2 className="cart-item-quantity">{quantity}</h2>
                <button className="cart-quantity-btn" disabled={(quantity === 1)} id="btn-disable" onClick={(e)=> handleCartQuantity(e.target.innerHTML, i._id)}>-</button>
            </div>
            <div className="cart-price-container">
                <h2 id="total-price">{total}₹</h2>
                <p id="max-total-price">{maxTotal}₹</p>
            </div>
            <div className="cart-delete-icon">
            <button className="cart-remove-btn" onClick={(e)=> handleCartQuantity(e.target.innerHTML, i._id)}>Remove Item</button>
            </div>
            </div>
        </div>)
        }else if(included && included.quantity === 0){
            cartDispatch({type: "removeItem", payload: {id: i._id}});
            return null
        }else return null;
    }


    const DisplayItems = ()=>{
        if(cartState.cart.length === 0){
            return(<h1>Cart is Empty.</h1>)
        }else {
            return(<>
               {data.map((i)=> mapItems(i))} 
            </>)
            
        }
    }


    return(<>
        {data ? <DisplayItems /> : <h1>Loading...</h1>}
    </>)
};

export default Items;