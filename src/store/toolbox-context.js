import { createContext } from "react";

const toolboxContext = createContext({
    toolboxState: {},
    changeStrokeHandler: ()=>{},
    changeFill: ()=>{},
    changeSize: ()=>{},
});

export default toolboxContext;