import React from "react";
import {Link} from "react-router-dom";
import "./Footer.css";

const Footer = ()=>{

    const SocialLink = ({url, name})=>{
        return(<Link  to={{pathname: url}} target="_blank">
            <div className="footer-social-link">
            <img className="footer-social-img" src={`images/${name}.png`} alt="name"></img>
            </div>
                
        </Link>)
    }
    return(<footer>
            <div className="footer-container">
                <div className="footer-logo-container">
                <Link to="/" className="nav-logo-link">
                      <h1>NINJA <span>STORE</span></h1>
                      </Link>
                    <p>Build your gaming setup with us.</p>
                </div>
                <div className="footer-links-container">
                    <h1 className="footer-heading">Quick Links.</h1>
                    <Link to="/">HOME</Link>
                    <Link to="/cart">CART</Link>
                    <Link to="/checkout">CHECKOUT</Link>
                </div>
                <div className="footer-about-container">
                    <h1 className="footer-heading">About</h1>
                    <p>My name is Shubham and i love to code 💜</p>
                    <h1 className="footer-heading">Follow Me</h1>
                    <div className="footer-social-container">
                        <SocialLink url="https://www.instagram.com/shubham_ubarhande" name="instagram"/>
                        <SocialLink url="https://www.linkedin.com/in/mr-potter" name="linkedin"/>
                        <SocialLink url="https://github.com/MrPotterOP" name="github"/>
                    </div>
                </div>
            </div>
    </footer>);
}

export default Footer;