import React, {useState, useContext} from "react";
import { catagoryContext } from "../../Context/context";
import "./Catagories.css";


const Catagories = ()=>{
    const {catState, catDispatch} = useContext(catagoryContext);
    const [isOpen, setIsOpen] = useState(false);
    

    const handleClick = ()=>{
        setIsOpen(!isOpen);
    }

    const handleCatagory = (e)=>{
        catDispatch({type: "switch", payload: e});
        setIsOpen(false);
    }

    const CarItem = ({item, index})=>{
        if(item === catState.active){
            return(
                <div className="cat-item">
                <h2 key={index} className="active-catagory" onClick={(e)=>handleCatagory(e.target.innerText)}>{item}</h2>
                </div>
            )
        }else {
            return (
                <div className="cat-item">
                <h2 key={index} onClick={(e)=>handleCatagory(e.target.innerText)}>{item}</h2>
                </div>
            )
        }
    } 

    

    return(
        <section className="cat-section">
            <div className="cat-container">
                <div onClick={()=>handleClick()} className={isOpen ? "cat-up-arrow" : "cat-down-arrow"}>
                    <span></span>
                    <span></span>
                </div>
                <h2 className="cat-selected">{catState.active}</h2>
                
                <div className={isOpen ? "cat-active" : "cat-inactive"}>
                    <CarItem item="MICE" index={1}/>
                    <CarItem item="KEYBOARDS" index={2}/>
                    <CarItem item="CHAIRS" index={3}/>
                    <CarItem item="HEADPHONES" index={4}/>
                    <CarItem item="CONTROLLERS" index={5}/>
                </div>
            </div>
        </section>
    )
};


export default Catagories;