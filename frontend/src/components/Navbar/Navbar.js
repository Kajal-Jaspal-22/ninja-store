import React,{useState, useContext} from "react";
import {cartContext} from "../../Context/context";
import "./Navbar.css";
import {Link, useHistory} from "react-router-dom";

const Navbar = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const {cartState} = useContext(cartContext);
    const history = useHistory();

    const handleClick = ()=>{
        setIsOpen(!isOpen);
    };

    const handleSearch = (t)=>{
        setSearchTerm(t);
    }

    return(
        <div className="navbar-container">
            <nav>
                <div className="nav-left-container">
                  <Link to="/" className="nav-logo-link">
                      <h1>NINJA <span>STORE</span></h1>
                      </Link>
                    <div className="nav-search-bar hide-for-mobile">
                        <img className="nav-search-icon" alt="search-icon" src="images/search.png"></img>
                        <input className="nav-search-input" value={searchTerm} onChange={(e)=> handleSearch(e.target.value)} type="text" placeholder="SEARCH BY BRAND.."></input>
                        <div className="nav-search-circle" onClick={()=> history.push(`/search?term=${searchTerm}`)}>
                            <img alt="nav-search-icon" src="images/search.png"></img>
                        </div>
                    </div>
                    
                </div>
                
                <div className="nav-right-container hide-for-mobile">
                    <Link to="/cart">
                        <div className="nav-cart-circle">
                        <img className="nav-cart-icon" alt="cart-icon" src="images/shopping-cart.png"></img>
                        <div className="nav-cart-count-cirle">
                            <p className="nav-cart-count">{cartState.cart ? cartState.cart.length : 0}</p>
                        </div>
                    </div>
                    </Link>
                    
                    <div className="btn-nav-login">
                        <button>WELCOME</button>
                    </div>
                </div>
                <div className="nav-hambergur hide-for-desktop">
                    <div className={isOpen ? "hambergur open-menu" : "hambergur"} onClick={()=> handleClick()}><span></span><span></span><span></span></div>
                    <div className="hambergur-menu" style={isOpen ? {} : {display: "none"}}>
                        <Link to="/">Home</Link>
                        <Link to="/cart">Cart</Link>
                        <Link to="/checkout">Checkout</Link>
                        <Link to="/">Catagories</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;