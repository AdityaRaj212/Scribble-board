import { useReducer } from "react"
import { COLORS, TOOLBOX_ACTIONS, TOOL_ITEMS } from "../constants";
import toolboxContext from "./toolbox-context";

function toolboxReducer(state, action){
    switch(action.type){
        case TOOLBOX_ACTIONS.CHANGE_STROKE:{
            const newState = {...state};
            newState[action.payload.tool].stroke = action.payload.stroke;
            return newState;
        }

        case TOOLBOX_ACTIONS.CHANGE_FILL:{
            const newState = {...state};
            newState[action.payload.tool].fill = action.payload.fill;
            return newState;
        }

        case TOOLBOX_ACTIONS.CHANGE_SIZE: {
            const newState = {...state};
            newState[action.payload.tool].size = action.payload.size;
            return newState;
        }

        default: 
            throw new Error('Cannot recognise action');
    }
}

const initialToolboxState = {
    [TOOL_ITEMS.BRUSH]:{
        stroke: COLORS.BLACK,
    },
    [TOOL_ITEMS.LINE]:{
        stroke: COLORS.BLACK,
        size: 1
    },
    [TOOL_ITEMS.RECTANGLE]: {
        stroke: COLORS.BLACK,
        fill: null,
        size: 1
    },
    [TOOL_ITEMS.CIRCLE]: {
        stroke: COLORS.BLACK,
        fill: null,
        size: 1
    },
    [TOOL_ITEMS.ARROW]: {
        stroke: COLORS.BLACK,
        size: 1
    },
    [TOOL_ITEMS.TEXT]: {
        stroke: COLORS.BLACK,
        size: 16
    },
}

const ToolboxProvider = ({children}) => {
    
    const [toolboxState, dispatchToolboxAction] = useReducer(toolboxReducer, initialToolboxState);
    
    const changeStrokeHandler = (tool, stroke)=>{
        dispatchToolboxAction({
            type: TOOLBOX_ACTIONS.CHANGE_STROKE,
            payload: {
                tool,
                stroke
            }
        })
    }

    const changeFill = (tool, fill) => {
        dispatchToolboxAction({
            type: TOOLBOX_ACTIONS.CHANGE_FILL,
            payload: {
                tool,
                fill
            }
        })
    }

    const changeSize = (tool, size) => {
        dispatchToolboxAction({
            type: TOOLBOX_ACTIONS.CHANGE_SIZE,
            payload: {
                tool,
                size
            }
        })
    }

    const toolboxContextValue = {
        toolboxState,
        changeStrokeHandler,
        changeFill,
        changeSize,
    }

    return (
        <toolboxContext.Provider value={toolboxContextValue}>
            {children}
        </toolboxContext.Provider>
    )
};

export default ToolboxProvider;