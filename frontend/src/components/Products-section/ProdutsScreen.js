import React, { useState, useEffect, useContext } from "react";
import { catagoryContext } from "../../Context/context";
import Item from "./Item";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";



const ProductsScreen = ()=>{
    const {catState} = useContext(catagoryContext);
    const [data, setData] = useState();
    const search = useLocation().search;
    const sort = new URLSearchParams(search).get("filter");
    
    useEffect(()=>{
        const patchData = ()=>{
        axios.patch("http://localhost:4000/api/products", {filter:{key: "catagory", value: catState.active}}, {
            'content-type': 'application/Json'
        }).then(r=>{
            if(r){
                if(sort === null){
                    setData(r.data.doc);
                }else if(sort === "lth"){
                    const newData = r.data.doc.sort((a, b)=> a.currentPrice - b.currentPrice);
                    setData(newData);
                }else if(sort === "htl"){
                    const newData = r.data.doc.sort((a,b)=> b.currentPrice - a.currentPrice);
                    setData(newData);
                }else if(sort.includes("BRAND")){
                    const brand = sort.slice(5, sort.length).toUpperCase();
                    const newData = r.data.doc.filter((t)=> t.brand === brand);
                    setData(newData);
                }
                
            }
        }).catch(e=>{
            if(e.response){
                console.log(e.response);
            }
        });
    }
        patchData();
    },[catState, sort]);
    

    const Products = ()=>{

        const mapItems = (i)=>{
            return(
                <Item id={i._id} key={i.productID} name={i.name} catagory={i.catagory} image={i.image} maxPrice={i.maxPrice} currentPrice={i.currentPrice} />
            )
        };


        return(
            <div className="products-container">
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
                                <Link to="/"><p>Default</p></Link>
                                <Link to="/?filter=htl"><p>Price: High to Low</p></Link>
                                <Link to="/?filter=lth"><p>Price: Low to High</p></Link>
                            </div>
                        </div>
                        <div className="sub-filers">
                            <h2 onClick={(e)=>handleFilterClick(e.target.innerHTML)}>BRANDS</h2>
                            <div onClick={(e)=>{e.target.classList.add('active-filter')}} className={activeFilter.BRANDS ? "open-filter" : "close-filter"}>
                                    <Link to="/?filter=BRANDcorsair"><p>CORSAIR</p></Link>
                                    <Link to="/?filter=BRANDrazer"><p>RAZER</p></Link>
                                    <Link to="/?filter=BRANDlogitech"><p>LOGITECH</p></Link>
                                    <Link to="/?filter=BRANDhyperx"><p>HYPERX</p></Link>
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
