import { useState } from "react";
import IFrameContext from "./IFrameContext";
import TextIframe from "./TextIframe";
import style from '../components/style.module.css'

export default function ContainerFrame() {

    const [html, setHtml] = useState(`<!DOCTYPE html>
    <html>
        <head>
            <title>Page Title</title>
        </head>
        <body>
        \t
        </body>
    </html>`);

    const [css, setCss] = useState(`body{
        
    }
    `);
    
    const [js, setJs] = useState(``);

    const [fusion, setFusion] = useState(`<!DOCTYPE html>
    <html>
        <head>
            <style>${css}</style>
            <title>Page Title</title>
        </head>
        <body>
            
        </body>
    </html>`);


    const handlerHTML = (value) => {
        setHtml(value);
    }

    const handlerJS = (value) => {
        setJs(value)
    }

    const handlerCSS = (value) => {
        setCss(value)
    }

    const FusionElements = ()=>{
        let fusionTempCss = html.split("<head>")[1];
        let fusionTempJS = fusionTempCss.split("</body>")[1];

        setFusion(`<!DOCTYPE html>
        <html>
            <head>
                <style>${css}</style>${fusionTempCss.split("</body>")[0]}
                <script>${js}</script>
                    ${fusionTempJS}
                `);
    }

    return (
        <>
        <div>
            <button onClick={FusionElements}>
                Run
            </button>
            <h1>Editor Web</h1>
        </div>
            <div id="editor" className={style.containerEditor}>

                    HTML
                <div>
                    <TextIframe handlerHTML={handlerHTML} html={html} cssEdit={false} />
                </div>

                    CSS
                <div>
                    <TextIframe handlerCSS={handlerCSS} css={css} cssEdit={true} jsEdit={false}/>
                </div>

                    JS
                <div>
                    <TextIframe handlerJS={handlerJS} js={js} cssEdit={true} jsEdit={true}/>
                </div>
            </div>

            <div id="ViewResult">
                <IFrameContext html={fusion} />
            </div>
        </>
    )

}