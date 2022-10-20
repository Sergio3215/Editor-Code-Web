import style from './style.module.css';

export default function TextIframe(props) {

    const handlerKeydown = (e)=>{
        //Tab Magnament
        if (e.key == 'Tab') {
            e.preventDefault();
            var start = e.target.selectionStart;
            var end = e.target.selectionEnd;

            e.target.value = e.target.value.substring(0, start) +
              "\t" + e.target.value.substring(end);
        
            // put caret at right position again
            e.target.selectionStart =
            e.target.selectionEnd = start + 1;
          }

          
        if (e.key == 'Enter') {
            e.preventDefault();
            var start = e.target.selectionStart;
            var end = e.target.selectionEnd;

            e.target.value = e.target.value.substring(0, start) +
              "\n\t\t" + e.target.value.substring(end);
        
            // put caret at right position again
            e.target.selectionStart =
            e.target.selectionEnd = start + 3;
          }

          //Tag Autocomplete
          if (e.key == '>') {
            e.preventDefault();
            var start = e.target.selectionStart;
            var end = e.target.selectionEnd;

            let startIndex = e.target.value.substring(0, start).split("<")[e.target.value.substring(0, start).split("<").length -1];

            let autocomplet = `></${startIndex}>`;
            
            if(startIndex.includes("/")||startIndex.includes(">") || (props.cssEdit || props.jsEdit)){
                autocomplet = ">"
            }

            e.target.value = e.target.value.substring(0, start) +
              autocomplet + e.target.value.substring(end);
        
            // put caret at right position again
            e.target.selectionStart =
            e.target.selectionEnd = start + 1;
          }
    }

    return (
        <>
            {
                (props.cssEdit) ?
                    (props.jsEdit) ?
                        <textarea onChange={(e) => props.handlerJS(e.target.value)}
                            value={props.js} className={style.textAreaCode} 
                            onKeyDown={(e)=>handlerKeydown(e)} />
                        :
                        <textarea onChange={(e) => props.handlerCSS(e.target.value)}
                            value={props.css} className={style.textAreaCode} 
                            onKeyDown={(e)=>handlerKeydown(e)} />
                    :
                    <textarea onChange={(e) => props.handlerHTML(e.target.value)}
                        value={props.html} className={style.textAreaCode} 
                        onKeyDown={(e)=>handlerKeydown(e)}/>
            }
        </>
    )

}