import React from 'react'
import { MemoBlock } from './MemoBlock'

export const Board = ({ animating, handleMemoClick, memoBlocks, onChange }) => {
    return (
        <div className="grid grid-cols-4 gap-2.5 max-w-xl my-7 mx-auto" onChange={onChange}>
            {memoBlocks.map((memoBlock, i) => {
                return <MemoBlock key={`${i}_${memoBlock.emoji}`} animating={animating} handleMemoClick={handleMemoClick} memoBlock={memoBlock} onChange={onChange}/>
            })}
        </div>
    );
}
