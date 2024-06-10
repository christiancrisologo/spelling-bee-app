"use client"

import React, {useCallback, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
// import Spinner from './Spinner';

export type UserSettings = {
  totalWords: number
  playerName: string
  enableTimer: boolean
  totalSeconds: number
}

const StartScreen = () => {
  const searchParams = useSearchParams()!;
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');
  const [enableTimer, setEnableTimer] = useState(true);
  const [totalWords, setTotalWords] = useState(20);
  const [totalSeconds, setTotalSeconds] = useState(120);

  const onSubmit = useCallback(
    () => {
      const params = new URLSearchParams(searchParams);
      params.set('playerName', playerName);
      params.set('enableTimer', String(enableTimer));
      params.set('totalWords', String(totalWords));
      params.set('totalSeconds', String(totalSeconds));
      
      router.push('/bee' + '?' + params.toString());  
    },
    [enableTimer, playerName, router, searchParams, totalSeconds, totalWords],
  );

  return (<Suspense>
  <div className="flex flex-col justify-center"> 
      <div className="flex mt-8 justify-center flex-col md:flex-row mx-6 md:mx-4">
        <input type="text" name="word-input" id="word-input" 
          className="bg-white p-4 rounded-xl text-2xl font-bold md:me-2" 
          placeholder="What's your name?"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)} />
        <button
          className="mt-1 p-4 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none text-2xl font-bold rounded-xl disabled:bg-gray-400"
          onClick={() => { onSubmit(); }}
          disabled={!playerName.length}
          >
            Submit
        </button>
      </div>
      <div className="flex mt-8 justify-center flex-row mx-6 md:mx-4">
        <div className="flex md:w-auto flex-col">
          <div className="flex mt-4 flex-row mx-6 md:mx-4">
              <input id="enable-timer-checkbox" type="checkbox"
                className="w-12 h-12 text-blue-600 self-center bg-gray-100 border-gray-300  focus:ring-blue-500 dark:focus:ring-blue-600 rounded-md"
                checked={enableTimer} 
                onChange={(e)=> {
                  setEnableTimer(e.target.checked);
                }}
              />
              <label htmlFor="enable-timer-checkbox" className="ms-2 self-center text-lg text-blue-900 font-medium">Enable Timer</label>
              <input
                id="total-seconds-number"
                type="number"
                className="ms-4 p-4 w-24 text-black text-lg font-semibold bg-gray-100 border-gray-300  focus:ring-blue-500 rounded-lg disabled:text-gray-200 disabled:bg-gray-300"
                value={totalSeconds}
                placeholder='Total seconds'
                onChange={(e)=> {
                  setTotalSeconds(parseInt(e.target.value));
                }}
                disabled={!enableTimer}
              />
              <label htmlFor="total-seconds-number" className="self-center ms-2 text-lg text-blue-900 font-medium disabled:text-gray-200" >Total Seconds</label>
          </div>
          <div className="flex mt-4 flex-row mx-6 md:mx-4">
              <input
                id="total-words-number"
                type="number"
                className="p-4 w-28 text-black text-lg font-semibold bg-gray-100 border-gray-300  focus:ring-blue-500 rounded-lg"
                value={totalWords}
                placeholder='Total words'
                onChange={(e)=> {
                  setTotalWords(parseInt(e.target.value));
                }}
              />
              <label htmlFor="total-words-number" className="self-center ms-2 text-lg text-blue-900 font-medium">Total Words</label>
          </div>
        </div>
      </div>
  </div>
  </Suspense>);
};

export default StartScreen;