"use client"

import React, {useState } from 'react';
import Image from 'next/image';
import Spinner from './Spinner';

type StartScreenProps = {
  onSubmit: (userInputName:string) => void
  isReady: boolean
}

const StartScreen = (props: StartScreenProps) => {
  const [userInput, setUserInput] = useState('');
  const { onSubmit, isReady } = props


  return (<div className="flex flex-col h-screen bg-gray-200 w-11/12">
    
    {
      !isReady && (<Spinner />)
    }

    {
     isReady && (
      <div className="mt-4 p-4 w-full">
        <div className="flex flex-col justify-center"> 
            <div className="flex justify-center">
                <Image
                    src="/spelling-bee-image.png"
                    alt="Spelling Bee" 
                    width="200" height="200"
                  />
            </div> 
            <div className="m-4 flex justify-center">
              <input type="text" name="word-input" id="word-input" 
                className="bg-white p-4 rounded-xl text-2xl font-bold me-2" 
                placeholder="What's your name?"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)} />
              <button
                className="mt-1 p-4 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none text-2xl font-bold rounded-xl"
                onClick={()=> onSubmit && onSubmit(userInput)}
                disabled={!userInput.length}
                >
                  Submit
              </button>
            </div>
        </div>
      </div>)
    }
  </div>
  );
};

export default StartScreen;