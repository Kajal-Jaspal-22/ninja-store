import React,{useState, useContext, useEffect} from "react";
import { cartContext, alertContext } from "../../Context/context";
import { Link, useHistory } from "react-router-dom";

const Item = ({id, image, name, maxPrice, currentPrice, catagory})=>{
    const history = useHistory();
    const [added, setAdded] = useState(false);
    const {cartState, cartDispatch} = useContext(cartContext);
    const {alertDispatch} = useContext(alertContext);
    

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cartState));
        const cartFilter = cartState.cart.filter(i=> i.id===id);
        if(cartFilter.length === 0){
            setAdded(false);
        }else {
            setAdded(true);
        }
    },[cartState, id]);

    const handleProductClick = (i)=>{
        history.push(`/product?id=${i}`);
    }
    const dispatchCart = (id)=>{
        cartDispatch({type:"addItem", payload:{id: id}});
        alertDispatch({type:"alert", payload:{msg:"Item added to Cart.", status:"success"}});
    }
    const handleCart = (id)=>{
        const container = cartState.cart.filter(e => e.id===id);
        if(container.length === 0){
            dispatchCart(id);
        }else {
            cartDispatch({type: "addQuantity", payload:{id: id}});
            alertDispatch({type:"alert", payload:{msg:"Item Quantity incresed.", status:"success"}});
            }
    }
    return(
            <div className="item-container" key={id}>
            <div className="item-context">
                <Link to={`/${catagory}`}><h2 className="item-catagory">{catagory}</h2></Link>
                <div onClick={()=> {handleCart(id)}} className={added ? "item-cart-container added-item": "item-cart-container"}><div className="item-cart" style={{backgroundImage: `url("images/shopping-cart.png")`}}></div></div>
                <div onClick={()=>{handleProductClick(image)}} className="item-image" style={{backgroundImage: `url("images/store/${image}.png")`}} alt="product-image"></div>
                <Link to={`/product?id=${image}`}><h1 className="item-name">{name}</h1></Link>
            </div>
            <Link to={`/product?id=${image}`}>
                <div className="item-price-details">
                <h2 className="more-details-btn">View Details</h2>
                <div className="item-price">
                    <p className="max-price">{maxPrice}₹</p>
                    <p className="current-price">{currentPrice}₹</p>
                </div>
            </div>
            </Link>
        </div>
    )
};

export default Item;