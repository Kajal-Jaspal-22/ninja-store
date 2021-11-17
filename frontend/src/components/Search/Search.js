import React,{useState, useEffect} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Item from "../Products-section/Item";
import "./Search.css";


const Search = ()=>{
    const [data, setDeta] = useState();
    const search = useLocation().search;
    const searchTerm = new URLSearchParams(search).get("term");
    
    useEffect(()=>{
        axios.patch("http://localhost:4000/api/search", {searchTerm}, {headers:{
            "content-type": "application/Json"
        }}).then(r => {
            if(r){
                setDeta(r.data.doc);
            }
        }).catch(e => e.response ? setDeta({err: true}) : null);
    },[searchTerm]);

    const mapData = (i)=>{
        return(<Item id={i._id} key={i.productID} name={i.name} catagory={i.catagory} image={i.image} maxPrice={i.maxPrice} currentPrice={i.currentPrice} />)
    };

    const DisplaySearch = ()=>{
        if(data.err){
            return(
                <h1 className="search-results-heading">0 search results found.</h1>
            )
        }else {
            return(<div className="search-products-container">
                    {data.map(i => mapData(i))}
            </div>)
        }
    }
    return(<div className="search-results">
        <h1 className="search-heading">Search Results for "{searchTerm}"</h1>
        {!data ? <h1>Loading</h1> : <DisplaySearch />}
    </div>);
};

export default Search;