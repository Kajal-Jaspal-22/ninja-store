import React,{useState, useEffect, useContext} from "react";
import "./ProductPage.css";
import axios from "axios";
import Item from "../Products-section/Item";
import { cartContext } from "../../Context/context";
import { useHistory, useLocation, Link } from "react-router-dom";


const ProductPage = ()=> {
    const [data, setData] = useState();
    const {cartState, cartDispatch} = useContext(cartContext);
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");
    const history = useHistory();

    useEffect(()=>{
        axios.patch("http://localhost:4000/api/details", {productID: id}, {headers:{
            "content-type": "application/Json"
        }}).then(r=> r ? setData(r.data) : null)
        .catch(e=> e.response ? setData({err: true}) : null);
    },[id]);
    console.log(data);

    const handleAddToCart = ()=>{
        const container = cartState.cart.filter(e => e.id===data.item._id);
        if(container.length === 0){
            cartDispatch({type:"addItem", payload:{id: data.item._id}});
            history.push("/cart");
        }else {
            cartDispatch({type: "addQuantity", payload:{id: data.item._id}});
            history.push("/cart");
        }
    }

    const handleBuyNow = ()=>{
        const container = cartState.cart.filter(e => e.id===data.item._id);
        if(container.length === 0){
            cartDispatch({type:"addItem", payload:{id: data.item._id}});
            history.push("/checkout");
        }else {
            cartDispatch({type: "addQuantity", payload:{id: data.item._id}});
            history.push("/checkout");
        }
    }

    const mapItems = (i)=>{
        return(
            <Item id={i._id} key={i.productID} name={i.name} catagory={i.catagory} image={i.image} maxPrice={i.maxPrice} currentPrice={i.currentPrice} />
        )
    };

    const SimilarProducts = ()=>{
        if(!data.other){
            return(<h1 className="similar-products-heading">No Similar Products Found.</h1>);
        }else {
            return(<div className="similar-products-container">
                    <h1 className="similar-products-heading">Similar Products</h1>
                    <div className="similar-items-container">
                        {data.other.map(i => mapItems(i))}
                    </div>
            </div>)
        }
    };
    const DisplayProducts = ()=>{
        if(data.err){
            return(
                <h1 className="product-notfound-heading">Product not found</h1>
            )
        }else {
            return(<div className="product-container">
                    <img className="product-image" src={`/images/store/${data.item.image}.png`} alt="product"></img>

                    <div className="product-details-container">
                        <h1 className="product-heading">{data.item.name}</h1>
                        <Link to={`/search?term=${data.details.brand}`}><h1 className="product-brand"><span>BY </span> {data.details.brand}</h1></Link>
                        
                        <div className="product-price-container">
                            <div className="product-price">
                                <p>{data.item.maxPrice}₹</p>
                                <h2>{data.item.currentPrice}₹</h2>
                            </div>
                            <div className="product-savings">
                                <h2>You will save  {data.item.maxPrice - data.item.currentPrice}₹ on this order.</h2>
                            </div>
                        </div>
                        
                        <p className="product-description">{data.details.description}.</p>
                        
                        <div className="products-buttons-conatiner">
                            <button className="product-addtocart-btn" onClick={()=> handleAddToCart()}>ADD TO CART</button>
                            <button className="product-buy-btn" onClick={()=> handleBuyNow()}>BUY NOW</button>
                        </div>
                    </div>
            </div>)
        }
    }
    return(<div>
    {data ? <> <DisplayProducts /> <SimilarProducts /> </> : <h1>Loading..</h1>}
    </div>)
};

export default ProductPage;