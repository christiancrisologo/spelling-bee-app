"use client"

import StartScreen from "./StartScreen";
import { useState } from "react";
import SpellingBee from './SpellingBee';

type MainProps = {
    words: any[]
}

export default function Main(props: MainProps) {
  const { words } = props;
  const [playerName, setPlayerName] = useState('Chloe');
  const [gameStatus, setGameStatus] = useState('start');
  
  const onStart = (userInputName: string) => {
    setPlayerName(userInputName);
    setGameStatus('game');
  }

  const isReady = !!words.length;

  return (
    <div className="flex flex-col w-full items-center justify-between">
      {
        gameStatus === 'start' && (<StartScreen onSubmit={onStart} isReady={isReady} />)
      }
      {
        gameStatus === 'game' && (<SpellingBee words={words} playerName={playerName} />)
      }
    </div>
  );
}
