import React,{useEffect, useState, useContext} from "react";
import { alertContext } from "../../Context/context";
import "./Alerts.css";

const Alerts = ()=>{
    const {alertState, alertDispatch} = useContext(alertContext);
    const [active, setActive] = useState(false);
    const [emoji, setEmoji] = useState();
    
    useEffect(()=>{
        if(alertState.msg){
            setActive(true);
            if(alertState.status === "success"){
                setEmoji("✔️");
            }else setEmoji("❌");
            setTimeout(()=>{alertDispatch({type: "timeout"})}, 2000);
        }else {
            setActive(false);
        }
    }, [alertState, alertDispatch]);

    const AlertCard = ()=>{
        return(<div className="alert-container">
                <h2>{`${emoji}   ${alertState.msg}`}</h2>
        </div>);
    }


    
    return (<>
        {active ? <AlertCard /> : null}
    </>)
}

export default Alerts;