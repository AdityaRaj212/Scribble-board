import { createContext } from "react";
import { TOOL_ACTION_TYPES } from "../constants";

const boardContext = createContext({
    activeToolItem: "",
    elements: [],
    history: [[]],
    index: 0,
    toolActionType: TOOL_ACTION_TYPES.NONE,
    boardMouseDownHandler: ()=>{},
    changeToolHandler: ()=>{},
    boardMouseMoveHandler: ()=>{},
    boardMouseUpHandler: ()=>{},
    textAreaBlurHandler: ()=>{},
    undo: ()=>{},
    redo: ()=>{},
});

export default boardContext;