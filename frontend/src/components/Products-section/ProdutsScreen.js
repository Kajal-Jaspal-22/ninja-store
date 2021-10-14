import React, { useState, useEffect, useContext } from "react";
import { catagoryContext } from "../../Context/context";
import {Link} from "react-router-dom";
import axios from "axios";



const ProductsScreen = ()=>{
    const {catState} = useContext(catagoryContext);
    const [data, setData] = useState();
    
    
    useEffect(()=>{

        const patchData = ()=>{
        axios.patch("http://localhost:4000/api/products", {filter:{key: "catagory", value: catState.active}}, {
            'content-type': 'application/Json'
        }).then(r=>{
            if(r){
                setData(r.data.doc);
            }
        }).catch(e=>{
            if(e.response){
                console.log(e.response);
            }
        });
    }
        patchData();
    },[catState]);
    
    const Products = ()=>{

        const handleCart = (e)=>{
            if(e.children.length === 1){
                e.classList.add("added-item");
            }else {
                e.parentElement.classList.add('added-item');
            }
        }
        const Item = ({id, image, name, maxPrice, currentPrice, catagory})=>{
            return(
                <Link to={`/product?id=${image}`}>
                    <div className="item-container" key={id}>
                    <div className="item-context">
                        <h2 className="item-catagory">{catagory}</h2>
                        <div onClick={(e)=> handleCart(e.target)} className="item-cart-container"><div className="item-cart" style={{backgroundImage: `url("images/shopping-cart.png")`}}></div></div>
                        <div className="item-image" style={{backgroundImage: `url("images/store/${image}.png")`}} alt="product-image"></div>
                        <h1 className="item-name">{name}</h1>
                    </div>
                    <div className="item-price-details">
                        <h2 className="more-details-btn">View Details</h2>
                        <div className="item-price">
                            <p className="max-price">{maxPrice}₹</p>
                            <p className="current-price">{currentPrice}₹</p>
                        </div>
                    </div>
                </div>
                </Link>
            )
        };

        const mapItems = (i)=>{
            return(
                <Item id={i._id} key={i.productID} name={i.name} catagory={i.catagory} image={i.image} maxPrice={i.maxPrice} currentPrice={i.currentPrice} />
            )
        };


        return(
            <div className="products-container">
                {/* <Item id="1" name="rayzer gaming mouse." catagory={rawData[0].catagory} image="rayzer" maxPrice={rawData[0].maxPrice} currentPrice={rawData[0].currentPrice} /> */}
                {data ? data.map(i=> mapItems(i)) : <h1>loading..</h1>}
            </div>
        )
    }



    const Filters = ()=>{
        const [isOpen, setIsOpen] = useState(false);
        const [activeFilter, setActiveFilter] = useState({SORT: false, DISCOUNTS:false, BRANDS:false});

        const toogleFilters = ()=>{
            setIsOpen(!isOpen);
        }
        const handleFilterClick = (i)=>{
            if(i === "SORT"){
                setActiveFilter({SORT: !activeFilter.SORT, DISCOUNTS: activeFilter.DISCOUNTS, BRANDS: activeFilter.BRANDS});
            }else if(i === "BRANDS"){
                setActiveFilter({SORT: activeFilter.SORT, DISCOUNTS: activeFilter.DISCOUNTS, BRANDS: !activeFilter.BRANDS});
            }else {
                setActiveFilter({SORT: activeFilter.SORT, DISCOUNTS: !activeFilter.DISCOUNTS, BRANDS: activeFilter.BRANDS});
            }
        };
        return(<>
                <div className="mobile-filters-container">
                    <div onClick={()=>{toogleFilters()}} className="filters-bar">
                        <h1>Filters:</h1>
                    </div>
                    <div className={isOpen ? "mobile-filters" : "main-filters"} >
                        <button onClick={()=>setIsOpen(false)} className="filters-close-btn">Close</button>
                        <div className="sub-filers">
                                <h2 onClick={(e)=>handleFilterClick(e.target.innerHTML)}>SORT</h2>                        
                            <div onClick={(e)=>{e.target.classList.add('active-filter'); setIsOpen(false)}} className={activeFilter.SORT ? "open-filter" : "close-filter"}>
                                <p>Price: High to Low</p>
                                <p>Price: Low to High</p>
                            </div>
                        </div>
                        <div className="sub-filers">
                            <h2 onClick={(e)=>handleFilterClick(e.target.innerHTML)}>BRANDS</h2>
                            <div onClick={(e)=>{e.target.classList.add('active-filter')}} className={activeFilter.BRANDS ? "open-filter" : "close-filter"}>
                                    <p>Rayzr</p>
                                    <p>Corsair</p>
                                    <p>OnePlus</p>
                                    <p>Dodge</p>
                            </div>
                        </div>
                        <div className="sub-filers">
                            <h2 onClick={(e)=>handleFilterClick(e.target.innerHTML)}>DISCOUNTS</h2>
                            <div onClick={(e)=>{e.target.classList.add('active-filter'); setIsOpen(false)}} className={activeFilter.DISCOUNTS ? "open-filter" : "close-filter"}>
                                <p>50% and more</p>
                                <p>20% and more</p>
                            </div>
                        </div>
                    </div>
                </div>
        </>)
    }

    //Produts Screen Render
    return(
        <>
        <section className="filters-section">
            <Filters />
        </section>
        <section className="product-section">
            <Products />
        </section>
        </>
    )
};

export default ProductsScreen;
