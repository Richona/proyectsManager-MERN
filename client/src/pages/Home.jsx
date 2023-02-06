import React, { useEffect, useState } from 'react'
import { Board } from '../components/home/Board'
const emojiList = [...'💣🧤🎩🌮🎱🌶🍕🦖'];
import Swal from "sweetalert2"

export const Home = () => {
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
  const [selectedMemoBlock, setselectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [sumCompleted, setSumCompleted] = useState(0);

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
    let contador = 0
    shuffledMemoBlocks.map((memo) => {
      memo.flipped === true && contador++
      if (contador === 16) {
        console.log("hola")
        Swal.fire({
          icon: "info",
          title: "Felicitaciones!",
          text: "Lograste un gran reto",
          confirmButtonText: "Comenzar de nuevo",
          allowOutsideClick: false
        }).then(result => {
          if (result.isConfirmed) {
            setSumCompleted(sumCompleted + 1)
            handleReset()
          }
        })
      }
    })
  }

  return (
    <>
      <Board
        onChange={handleCompleted}
        memoBlocks={shuffledMemoBlocks}
        animating={animating}
        handleMemoClick={handleMemoClick}
      />
      <div className='flex justify-center items-center gap-10'>
        <button
          onClick={handleReset}
          className={`py-3 bg-gray-800 border-gray-500 hover:border-indigo-700 `}
        >
          Reiniciar
        </button>
        <div className='py-3 px-6 rounded-lg bg-gray-800 border border-gray-500'>
          Completados: {sumCompleted} 
        </div>
      </div>
    </>

  )
}
