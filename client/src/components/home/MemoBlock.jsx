import React from 'react'
import classes from "./styles.module.css";

export const MemoBlock = ({animating, handleMemoClick, memoBlock, onChange}) => {
  return (
    <div 
        className={`${classes.memoBlockstyle} cursor-pointer aspect-square`}
        onClick={() => (!memoBlock.flipped && !animating) && handleMemoClick(memoBlock)}
    >
        <div 
            className={`${classes.memoBlockInner} relative w-full h-full text-center
            ${memoBlock.flipped && classes.memoBlockFlipped}`}
            onChange={onChange(memoBlock)}
        >
            <div 
                className={`${classes.memoBlockFront} absolute w-full h-full rounded bg-gray-800`}
            >
            </div>
            <div 
                className={`${classes.memoBlockBack} absolute w-full h-full rounded bg-indigo-800 flex justify-center items-center text-3xl sm:text-5xl`}
            >
                {memoBlock.emoji}
            </div>
        </div>
    </div>
  )
}
