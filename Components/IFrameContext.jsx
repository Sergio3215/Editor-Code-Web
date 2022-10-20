import style  from './style.module.css';

export default function IFrameContext(props){
    return(
        <>
        <iframe srcDoc={
            `<div style="color:white;text-align:center;">${props.html.split("<title>")[1].split("</title>")[0]}</div>`
            } className={style.iframeCodeTitle}/>
            <iframe srcDoc={props.html} className={style.iframeCodeArea}/>
        </>
    )

}