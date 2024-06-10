"use client"

import StartScreen, { UserSettings } from "./StartScreen";
import { useState } from "react";
import SpellingBee from './SpellingBee';

type MainProps = {
    words: any[]
}

export default function Main(props: MainProps) {
  const { words } = props;
  const [playerName, setPlayerName] = useState('Chloe');
  const [gameStatus, setGameStatus] = useState('start');
  const [enableTimer, setEnableTimer] = useState(true);
  const [totalWords, setTotalWords] = useState(20);
  
  const onStart = (userSettings: UserSettings) => {
    setPlayerName(userSettings.playerName);
    setEnableTimer(userSettings.enableTimer);
    setTotalWords(userSettings.totalWords);
    setGameStatus('game');
  }

  const isReady = !!words.length;

  return (
    <div className="flex flex-col w-full items-center justify-between">
      {
        gameStatus === 'start' && (<StartScreen onSubmit={onStart} isReady={isReady} />)
      }
      {
        gameStatus === 'game' && (<SpellingBee
                words={words}
                enableTimer={enableTimer}
                playerName={playerName}
                totalWords={totalWords}
            />)
      }
    </div>
  );
}
