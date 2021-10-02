import React,{useState, useEffect} from "react";
import "./Hero.css";

const Hero = ()=>{

    const context = [
        "Dedicated to Gamers Like You.",
        "Equipmets that every gamer needs.",
        "Take your gaming setup to the next level"
    ]

    const [slide, setSlide] = useState(1);
    if(slide > 3){
        setSlide(1)
    }
    useEffect(()=>{
        const slider = ()=>{
        setSlide(slide + 1)
    }
        setTimeout(slider, 9000)
    },[slide]);

    const handleSlide = (e)=>{
        if(e === "first-slide"){
            setSlide(1)
        }else if(e === "second-slide"){
            setSlide(2)
        }else{
            setSlide(3)
        }
    }

    const SlideBar = ()=>{
        if(slide === 1){
            return(<>
                <span id="first-slide" className="active-slide" onClick={(e)=>handleSlide(e.target.id)}></span>
                <span id="second-slide" onClick={(e)=>handleSlide(e.target.id)}></span>
                <span id="third-slide" onClick={(e)=>handleSlide(e.target.id)}></span>
                </>
            )
        }else if(slide === 2){
            return(
                <>
                <span id="first-slide" onClick={(e)=>handleSlide(e.target.id)}></span>
                <span id="second-slide" className="active-slide" onClick={(e)=>handleSlide(e.target.id)}></span>
                <span id="third-slide" onClick={(e)=>handleSlide(e.target.id)}></span>
                </>
            )
        }else {
            return(<>
                <span id="first-slide" onClick={(e)=>handleSlide(e.target.id)}></span>
                <span id="second-slide" onClick={(e)=>handleSlide(e.target.id)}></span>
                <span id="third-slide" className="active-slide" onClick={(e)=>handleSlide(e.target.id)}></span>
                </>)
        }
    }

    const HeroSlider = ()=>{
            return(
                <div className="hero-image" style={{backgroundImage: `url("images/slide-${slide}.jpg")`}}>
                    <div className="hero-context">
                        <h2>{context[slide - 1]}</h2>
                    </div>
                    <div className="hero-slider">
                        <SlideBar />
                    </div>
                </div>
            )
    }
    
    return(
        
        <section className="hero-section">
            <div className="hero-image-slider">
                <HeroSlider />
            </div>
        </section>
    )
}

export default Hero;