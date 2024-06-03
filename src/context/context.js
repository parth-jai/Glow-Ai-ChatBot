
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

    const delayPara = (index, nextWord)=> {
        setTimeout(function(){
            setResultData(prev=>prev+nextWord)
        },75*index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }


    const onSent = async(prompt)=>{

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response = await run(prompt)
            steRecenetPrompt(prompt)
        }
        else{
            setPreviousPrompt(prev=>[...prev,input])
            steRecenetPrompt(input)
            response = await run(input)
        }
        
        //for spliting the para which was in ** format
        let responseArray = response.split("**");
        let newResponse = "";
        for(let i=0; i<responseArray.length; i++)
        {
            if(i === 0 || i%2 !== 1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>"
            }
        }
        //for adding break line where ever single start was there
        let newResponse2 = newResponse.split("*").join("</br>")
        //for adding typo effect and delay para function
        let newResponseArray = newResponse2.split(" ");
        for(let i=0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
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
        setInput,
        newChat
    }

    return(
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider