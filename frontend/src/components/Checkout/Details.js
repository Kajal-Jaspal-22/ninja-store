import React,{useState, useContext} from "react";
import axios from "axios";
import { cartContext} from "../../Context/context";
import { useHistory } from "react-router-dom";

const Details = ()=>{
    const {cartDispatch} = useContext(cartContext);
    const [details, setDetails] = useState({
        name: "", email:"", address: "", zipcode:"", city:"", country:""
    });
    const history = useHistory();
    
    const handleInput = (t)=>{
        if(t.id === "name"){
            setDetails(prev => ({...prev, name: t.value})); 
        }else if(t.id === "email"){
            setDetails(prev => ({...prev, email: t.value}));
        }else if(t.id === "address"){
            setDetails(prev => ({...prev, address: t.value}));
        }else if(t.id === "zipcode"){
            setDetails(prev => ({...prev, zipcode: t.value}));
        }else if(t.id === "city"){
            setDetails(prev => ({...prev, city: t.value}));
        }else if(t.id === "country"){
            setDetails(prev => ({...prev, country: t.value}));
        }
    };

    const handleCheckout = ()=>{
        axios.post("http://localhost:4000/api/fakepayment", {email: details.email}, 
        {headers:{"content-type": "application/Json"}}
        ).then(r => {
            if(r){
                cartDispatch({type: "paymentDone"});
                history.push("/");
            }
        })
        .catch(e => e.response ? alert("Some ERROR found please try again later.") : null);
    };

    return(
        <div className="checkout-form-container order-summary-container">
            <h1 className="summary-title-container">Billing Address</h1>
            <div className="checkout-form">
                <div className="form-row-container">
                <h2 className="title-form" >NAME</h2>
                <input className="title-form-input" id="name" onChange={(e)=> handleInput(e.target)} placeholder="Your Name" type="text"></input>
                </div>

                <div className="form-row-container">
                <h2 className="title-form" >EMAIL</h2>
                <input className="title-form-input" id="email" onChange={(e)=> handleInput(e.target)} placeholder="Your Email" type="text"></input>
                </div>

                <div className="form-row-container">
                <h2 className="title-form" >ADDRESS</h2>
                <input className="title-form-input" id="address" onChange={(e)=> handleInput(e.target)} placeholder="Your Address" type="text"></input>
                </div>

                <div className="form-row-container">
                <h2 className="title-form" >ZIP-CODE</h2>
                <input className="title-form-input" id="zipcode" onChange={(e)=> handleInput(e.target)} placeholder="e.g 123456" type="text"></input>
                </div>

                <div className="form-row-container">
                <h2 className="title-form" >CITY</h2>
                <input className="title-form-input" id="city" onChange={(e)=> handleInput(e.target)} placeholder="Your City" type="text"></input>
                </div>

                <div className="form-row-container">
                <h2 className="title-form" >COUNTRY</h2>
                <input className="title-form-input" id="country" onChange={(e)=> handleInput(e.target)} placeholder="Your Country" type="text"></input>
                </div>

            </div>
            <div className="payment-container">
                <button onClick={()=>handleCheckout()} disabled={(details.name.length === 0 || details.address.length === 0 || details.zipcode.length === 0 || details.country.length === 0 || details.city.length === 0 || details.email.length === 0)}>Proceed to Pay</button>
            </div>
        </div>
    )
};

export default Details;