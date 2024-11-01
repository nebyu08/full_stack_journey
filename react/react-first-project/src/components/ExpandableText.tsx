import { useState } from "react";

interface Prop{
    children:string;
    maxChar:number;
}

function ExpandableText( {children,maxChar=100 }:Prop ){
    const [isExpanded,setExpanded]=useState(false);

    if(children.length<=maxChar){
        return children;
    }


    const toggleText=()=>{
        setExpanded(!isExpanded);
    }

    return (
        <>
        <div>
            if
           { isExpanded ? children +' ' : children.substring(0,maxChar)+ ' ... ' }
            <button onClick={toggleText} > { isExpanded? 'Less' : 'More' }  </button>
        </div>
        </>
    )

}

export default ExpandableText;