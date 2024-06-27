import { COLORS, FILL_TOOL_TYPES, SIZE_TOOL_TYPES, STROKE_TOOL_TYPES, TOOL_ITEMS } from '../../constants';
import styles from './Toolbox.module.css';
import cx from 'classnames';
import toolboxContext from '../../store/toolbox-context';
import { useContext } from 'react';
import boardContext from '../../store/board-context';

const Toolbox = ()=>{
    const {activeToolItem} = useContext(boardContext);
    const {toolboxState, changeFill, changeStrokeHandler, changeSize} = useContext(toolboxContext);

    const strokeColor = toolboxState[activeToolItem]?.stroke;
    const fillColor = toolboxState[activeToolItem]?.fill;
    const size = toolboxState[activeToolItem]?.size;

    return(
        <div className={styles.container}>
            
                {
                    STROKE_TOOL_TYPES.includes(activeToolItem)
                    &&
                    <div className={styles.selectOptionContainer}>
                        <div className={styles.toolBoxLabel}>Stroke Color</div>
                        <div className={styles.colorsContainer}>
                        {strokeColor===null ? (
                            <div
                                className={cx(styles.colorPicker, styles.noFillColorBox)}
                                onClick={()=>changeStrokeHandler(activeToolItem,COLORS.BLACK)}
                            >
                               
                            </div>
                        ):(
                            <div>
                                <input
                                    className={styles.colorPicker}
                                    type="color"
                                    value={strokeColor}
                                    onChange={(e)=>changeStrokeHandler(activeToolItem,e.target.value)}
                                ></input>
                            </div>
                        )}

                            <div className={cx(styles.colorBox, styles.noFillColorBox,{
                                [styles.activeColorBox]: strokeColor===null,
                                })}
                                onClick={()=>changeStrokeHandler(activeToolItem,null)}
                            ></div> 
                            {Object.keys(COLORS).map((k)=>{
                                return (
                                    <div
                                        className={cx(styles.colorBox, {
                                            [styles.activeColorBox]: strokeColor===COLORS[k]
                                        })}
                                        style = {{backgroundColor: COLORS[k]}}
                                        onClick={()=>changeStrokeHandler(activeToolItem,COLORS[k])}
                                    >

                                    </div>
                                );
                            })}
                        </div>
                    </div>

                  
                }

                {
                    FILL_TOOL_TYPES.includes(activeToolItem)
                    &&
                    <div className={styles.selectOptionContainer}>
                        <div className={styles.toolBoxLabel}>Fill Color</div>
                        <div className={styles.colorsContainer}>
                        {fillColor===null ? (
                            <div
                                className={cx(styles.colorPicker, styles.noFillColorBox)}
                                onClick={()=>changeFill(activeToolItem,COLORS.BLACK)}
                            >
                               
                            </div>
                        ):(
                            <div>
                                <input
                                    className={styles.colorPicker}
                                    type="color"
                                    value={fillColor}
                                    onChange={(e)=>changeFill(activeToolItem,e.target.value)}
                                ></input>
                            </div>
                        )}
                            <div className={cx(styles.colorBox, styles.noFillColorBox,{
                            [styles.activeColorBox]: fillColor===null,
                            })}
                            onClick={()=>changeFill(activeToolItem,null)}
                            ></div> 
                            
                            {Object.keys(COLORS).map((k)=>{
                                return (
                                    <div
                                        className={cx(styles.colorBox, {
                                            [styles.activeColorBox]: fillColor===COLORS[k]
                                        })}
                                        style = {{backgroundColor: COLORS[k]}}
                                        onClick={()=>changeFill(activeToolItem,COLORS[k])}
                                    >

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                }

                {
                    SIZE_TOOL_TYPES.includes(activeToolItem)
                    &&
                    <div className={styles.selectOptionContainer}>
                        <div className={styles.toolBoxLabel}>
                            {
                                activeToolItem===TOOL_ITEMS.TEXT ? "Font Size" : "Brush Size"
                            }
                        </div>
                        <div className={styles.colorsContainer}>
                            <input
                                type = "range"
                                min = {activeToolItem===TOOL_ITEMS.TEXT ? 12 : 1}
                                max = {activeToolItem===TOOL_ITEMS.TEXT ? 64 : 10}
                                step = {1}
                                value = {size}
                                onChange = {(event)=>changeSize(activeToolItem,event.target.value)}
                            >
                            </input>
                        </div>
                    </div>
                }

        </div>
    )
};

export default Toolbox;