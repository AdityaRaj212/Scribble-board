import { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import styles from './Board.module.css';
import rough from 'roughjs';
import boardContext from '../../store/board-context';
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from '../../constants';
import toolboxContext from '../../store/toolbox-context';

const Board = ()=>{
    const canvasRef = useRef();
    const textAreaRef = useRef();
    const {undo, redo, textAreaBlurHandler,elements, boardMouseDownHandler, boardMouseMoveHandler, boardMouseUpHandler, toolActionType} = useContext(boardContext);
    const {toolboxState} = useContext(toolboxContext);

    useEffect(()=>{
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const context = canvas.getContext('2d');
        // context.fillStyle = "red";
        // context.fillRect(0,0,150,75);
    },[]); 

    useEffect(()=>{
        function handleKeyDown(event){
            if(event.ctrlKey && event.key==='z'){
                undo();
            }else if(event.ctrlKey && event.key==='y'){
                redo();
            }
        }
        document.addEventListener("keydown", handleKeyDown);

        return ()=>{
            document.removeEventListener("keydown", handleKeyDown);
        }
    },[undo,redo]);

    useLayoutEffect(()=>{
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.save();
        const roughCanvas = rough.canvas(canvas);
        const generator = roughCanvas.generator;
        // let rect1 = generator.rectangle(10,10,100,100);
        // let rect2 = generator.rectangle(10,120,100,100,{fill:'red'});
        // roughCanvas.draw(rect1);
        // roughCanvas.draw(rect2);
        elements.forEach(element=>{
            switch(element.type){
                case TOOL_ITEMS.LINE:
                case TOOL_ITEMS.RECTANGLE:
                case TOOL_ITEMS.CIRCLE:
                case TOOL_ITEMS.ARROW:{
                    roughCanvas.draw(element.roughEle);
                    break;
                }

                case TOOL_ITEMS.BRUSH:{
                    context.fillStyle = element.stroke;
                    context.fill(element.path);
                    context.restore();
                    break;
                }

                case TOOL_ITEMS.TEXT:{
                    context.textBaseline = "top";
                    context.font = `${element.size}px Caveat`;
                    context.fillStyle = element.stroke;
                    context.fillText(element.text, element.x1, element.y1);
                    context.restore();
                    break;
                }

                default: 
                    throw new Error('Type not recognised');
            }
        });

        return ()=>{
            context.clearRect(0,0, canvas.width, canvas.height);
        }
    },[elements]);

    useEffect(()=>{
        const textArea = textAreaRef.current;
        if(toolActionType===TOOL_ACTION_TYPES.WRITING){
            setTimeout(()=>{
                textArea.focus();
            },0)
        }
    })

    const handleMouseDown = (event)=>{
       boardMouseDownHandler(event, toolboxState);
    }

    const handleMouseMove = (event)=>{
        boardMouseMoveHandler(event);    
    }

    const handleMouseUp = ()=>{
        boardMouseUpHandler();
    }

    return (
        <div className={styles.container}>
            {toolActionType===TOOL_ACTION_TYPES.WRITING &&
                <textarea
                    type="text"
                    ref={textAreaRef}
                    className={styles.textElementBox}
                    style={{
                        top : elements[elements.length-1].y1,
                        left: elements[elements.length-1].x1,
                        fontSize: `${elements[elements.length-1]?.size}px`,
                        color: elements[elements.length-1]?.stroke,
                    }}
                    onBlur={(event)=>textAreaBlurHandler(event.target.value, toolboxState)}
                />
            }
            <canvas id="canvas" ref={canvasRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}/>
            <h1>My whiteboard</h1>
        </div>
    )
};

export default Board;