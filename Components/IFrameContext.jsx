import { useState } from "react";

export default function IFrameContext(props){
    return(
        <>
        <iframe srcDoc={props.html.split("<title>")[1].split("</title>")[0]} style={{
                width: '250px',
                height: '3rem'
            }}/>
            <iframe srcDoc={props.html} style={{
                width: '100%',
                height: '33rem'
            }}/>
        </>
    )

}