import React, { useEffect, useState } from 'react'
import { Board } from '../components/home/Board'
const emojiList = [...'💣🧤🎩🌮🎱🌶🍕🦖'];

export const Home = () => {
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
  const [selectedMemoBlock, setselectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);
  
  useEffect(() => {
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
    setShuffledMemoBlocks(shuffledEmojiList.map((emoji, i) => ({ index: i, emoji, flipped: false })));
  }, []);

  const shuffleArray = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const handleMemoClick = memoBlock => {
    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setShuffledMemoBlocks(shuffledMemoBlocksCopy);
    if (selectedMemoBlock === null) {
      setselectedMemoBlock(memoBlock);
    } else if (selectedMemoBlock.emoji === memoBlock.emoji) {
      setselectedMemoBlock(null);
    } else {
      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        setselectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
    }
  }

  const handleReset = () => {
    setShuffledMemoBlocks(
      shuffledMemoBlocks.map((memo, i) => {
        memo.flipped = false
        return memo
      })
    )
  }

  const handleCompleted = (memoBlock) => {

  }

  return (
    <>
      <Board 
        onChange={handleCompleted}
        memoBlocks={shuffledMemoBlocks} 
        animating={animating} 
        handleMemoClick={handleMemoClick}
      />
      <button
        onClick={handleReset}
        className={`bg-gray-800 border-gray-500 hover:border-indigo-700 `}
      >
        Reiniciar
      </button>
    </>

  )
}
