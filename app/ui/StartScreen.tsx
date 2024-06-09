"use client"

import React, {useState } from 'react';
import Image from 'next/image';
import Spinner from './Spinner';

type StartScreenProps = {
  onSubmit: (userSettings: any) => void
  isReady: boolean
}

const StartScreen = (props: StartScreenProps) => {
  const [userInput, setUserInput] = useState('');
  const [enableTimer, setEnableTimer] = useState(true);
  const { onSubmit, isReady } = props

  return (<div className="flex flex-col h-screen bg-gray-200 w-full">
    {
      !isReady && (<Spinner />)
    }

    {
     isReady && (
      <div className="mt-4 p-4 w-full">
        <div className="flex flex-col justify-center"> 
          <h1 className="text-center mb-8 text-5xl  font-extrabold bg-gradient-to-r from-yellow-500  to-orange-100 inline-block text-transparent bg-clip-text text-shadow-md ">
            Spelling Bee
          </h1>
            <div className="flex justify-center">
                <Image
                    src="/spelling-bee-image.png"
                    alt="Spelling Bee" 
                    width="200" height="200"
                  />
            </div> 
            <div className="flex mt-8 justify-center flex-col md:flex-row mx-6 md:mx-4">
              <input type="text" name="word-input" id="word-input" 
                className="bg-white p-4 rounded-xl text-2xl font-bold md:me-2" 
                placeholder="What's your name?"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)} />
              <button
                className="mt-1 p-4 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none text-2xl font-bold rounded-xl"
                onClick={()=> onSubmit && onSubmit({userInput, enableTimer})}
                disabled={!userInput.length}
                >
                  Submit
              </button>
            </div>
            <div className="flex mt-8 justify-center flex-col md:flex-row mx-6 md:mx-4">
                <input id="default-checkbox" type="checkbox"
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={enableTimer} 
                  onChange={(e)=> {
                    setEnableTimer(e.target.checked);
                  }}
                />
                <label htmlFor="enable-timer-checkbox" className="ms-2 text-lg text-blue-900 font-medium">Enable Timer</label>
            </div>
        </div>
      </div>)
    }
  </div>
  );
};

export default StartScreen;