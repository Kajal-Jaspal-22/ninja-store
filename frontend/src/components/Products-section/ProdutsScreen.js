import React, { useState } from "react";
import rawData from "./RawJsonData";



const ProductsScreen = ()=>{
    
    const Products = ()=>{

        const Item = ({id, image, name, maxPrice, currentPrice, catagory})=>{
            return(
                <div className="item-container" key={id}>
                    <div className="item-context">
                        <h2 className="item-catagory">{catagory}</h2>
                        <div className="item-cart-container"><div className="item-cart" style={{backgroundImage: `url("images/shopping-cart.png")`}}></div></div>
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
            )
        };

        const mapItems = (i)=>{
            return(
                <Item id={i.id} name={i.name} catagory={i.catagory} image={i.image} maxPrice={i.maxPrice} currentPrice={i.currentPrice} />
            )
        };


        return(
            <div className="products-container">
                {/* <Item id="1" name="rayzer gaming mouse." catagory={rawData[0].catagory} image="rayzer" maxPrice={rawData[0].maxPrice} currentPrice={rawData[0].currentPrice} /> */}
                {rawData.map(i=> mapItems(i))}
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
