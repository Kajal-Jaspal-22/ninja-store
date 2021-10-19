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
            setTimeout(()=>{alertDispatch({type: "timeout"})}, 2000);
        }else {
            setActive(false)
        }
    }, [alertState, alertDispatch]);

    const AlertCard = ({success})=>{
        if(success){
            setEmoji("✔️");
        }else setEmoji("❌");
        return(<div className="alert-container">
                <h2>{`${emoji}   ${alertState.msg}`}</h2>
        </div>);
    }

    const DisplayAlert = ()=>{
        if(alertState.status === "success"){
            return <AlertCard success={true}/>
        }else return <AlertCard success={false}/>
    }

    
    return (<>
        {active ? <DisplayAlert /> : null}
    </>)
}

export default Alerts;