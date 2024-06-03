
import { createContext, useState } from "react";
import run from "../config/glow";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt, steRecenetPrompt] = useState("");
    const [previousPromt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    const onSent = async(prompt)=>{

        setResultData("")
        setLoading(true)
        setShowResult(true)
        steRecenetPrompt(input)
        const response = await run(input)
        setResultData(response)
        setLoading(false)
        setInput("")
    }

    

    const ContextValue = {
        previousPromt,
        setPreviousPrompt,
        onSent,
        steRecenetPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput 
    }

    return(
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider