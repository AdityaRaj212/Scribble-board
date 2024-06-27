import React, {useContext, useState} from 'react';
import { MdOutlineRectangle } from "react-icons/md";
import { FaSlash } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { FaEraser } from "react-icons/fa6";
import { IoText } from "react-icons/io5";
import { IoArrowUndo } from "react-icons/io5";
import { IoArrowRedo } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
import styles from './Toolbar.module.css';
import cx from 'classnames';   
import boardContext from '../../store/board-context';
import { TOOL_ITEMS } from '../../constants';

const Toolbar = ()=>{
    const {activeToolItem, changeToolHandler, undo, redo} = useContext(boardContext);

    const handleDownloadClick = ()=>{
        const canvas = document.getElementById('canvas');
        const data = canvas.toDataURL("image/png");
        const anchor = document.createElement('a');
        anchor.href = data;
        anchor.download = "board.png";
        anchor.click();
    }

    return (
        <div className={styles.container}>

            <div className={cx(styles.toolItem,{
                [styles.active]: activeToolItem===TOOL_ITEMS.BRUSH
            })}
            onClick={()=>changeToolHandler(TOOL_ITEMS.BRUSH)}>
                <FaPaintBrush />
            </div>

            <div className={cx(styles.toolItem,{
                [styles.active]: activeToolItem===TOOL_ITEMS.LINE
            })}
            onClick={()=>changeToolHandler(TOOL_ITEMS.LINE)}>
                <FaSlash />
            </div>

            <div className={cx(styles.toolItem,{
                [styles.active]: activeToolItem===TOOL_ITEMS.RECTANGLE
            })}
            onClick={()=>changeToolHandler(TOOL_ITEMS.RECTANGLE)}>
                <MdOutlineRectangle />
            </div>

            <div className={cx(styles.toolItem,{
                [styles.active]: activeToolItem===TOOL_ITEMS.CIRCLE
            })}
            onClick={()=>changeToolHandler(TOOL_ITEMS.CIRCLE)}>
                <FaRegCircle />
            </div>

            <div className={cx(styles.toolItem,{
                [styles.active]: activeToolItem===TOOL_ITEMS.ARROW
            })}
            onClick={()=>changeToolHandler(TOOL_ITEMS.ARROW)}>
                <FaArrowRight />
            </div>

            <div className={cx(styles.toolItem,{
                [styles.active]: activeToolItem===TOOL_ITEMS.ERASER
            })}
            onClick={()=>changeToolHandler(TOOL_ITEMS.ERASER)}>
                <FaEraser />
            </div>

            <div className={cx(styles.toolItem,{
                [styles.active]: activeToolItem===TOOL_ITEMS.TEXT
            })}
            onClick={()=>changeToolHandler(TOOL_ITEMS.TEXT)}>
                <IoText />
            </div>

            <div className={cx(styles.toolItem)}
            onClick={undo}>
                <IoArrowUndo />
            </div>

            <div className={cx(styles.toolItem)}
            onClick={redo}>
                <IoArrowRedo />
            </div>

            <div className={cx(styles.toolItem)}
            onClick={handleDownloadClick}>
                <FaDownload />
            </div>
            
        </div>
    )
};

export default Toolbar;