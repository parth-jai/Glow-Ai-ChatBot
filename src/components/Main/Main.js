import React, { useContext } from "react";
import './Main.css'
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)
    return (
        <div className="main">
            <div className="nav">
                <p>Glow AI</p>
                <img src={assets.user_icon} alt=""></img>
            </div>
            <div className="main-container">

                {!showResult?<>
                    <div className="great">
                    <p><span>Hello, Developers</span></p>
                    <p>How can I help you today</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Suggest beautiful place to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt=""></img>
                    </div>
                    <div className="card">
                        <p>Summarize this concept : Urban Planning</p>
                        <img src={assets.bulb_icon} alt=""></img>
                    </div>
                    <div className="card">
                        <p>Brainstrome team boabnding activities for our work retreat</p>
                        <img src={assets.message_icon} alt=""></img>
                    </div>
                    <div className="card">
                        <p>Improve readability of the following code</p>
                        <img src={assets.code_icon} alt=""></img>
                    </div>
                </div></>
                :<div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt=""></img>
                        <p>{recentPrompt}</p>

                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt=""></img>
                        {loading
                        ?<div className="loader">
                            <hr></hr>
                            <hr></hr>
                            <hr></hr>
                        </div>
                    :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                        
                    </div>
                </div>
                }

                
                

                <div className="main-bottom">
                    <div className="serach-box">
                        <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here"></input>
                        <div>
                            <img src={assets.gallery_icon} alt=""></img>
                            <img src={assets.mic_icon} alt=""></img>
                            {input?<img onClick={()=>onSent()} src={assets.send_icon} alt=""></img>:null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Glow may display inaccurate info, Including about people, so double check by youerself
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main