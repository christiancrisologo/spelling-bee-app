"use client"

import React, { ReactNode, useEffect, useState } from 'react';
import { Word  as WordType } from '../lib/definitions';
import TopBar from './TopBar';
import { SpeechSynthType, getSpeechSynth } from '../lib/SpeechSynth';
import { getRandomItem, getRandomInt } from '../lib/utils';
import BottomBar from './BottomBar';
import Spinner from './Spinner';

export type SpellingBeeProps = {
  words: any[]
  playerName: string
}

type OptButtonType = {
  onClick: () => void,
  children: ReactNode
}

const OptButton = (props: OptButtonType) => {
  const { onClick, children } = props;

  return (
    <button
    className="flex grow bg-white p-4 m-1 border-gray-500 hover:border-blue-500 hover:text-blue-500 border-gray-40 border-4 rounded-xl text-lg font-bold text-center" 
    onClick={onClick}>
      {children}
  </button>
  )
}

const correctResponse = [
  "You are definitely Correct!",
  "Awesome! to the next one.",
  "That's correct",
  "Too easy, try the next one",
  "Piece of cake!",
  "Correct, No way you will get that wrong"
];

const wrongResponse = [
  "Oops not this time. Try again",
  "That's incorrect",
  "No luck, try again",
  "Sorry, try again",
  "Maybe stop guessing, try again",
  "Hmmm... I dont think that's right"
];

const SpellingBee = (props: SpellingBeeProps) => {
  const { words, playerName } = props;
  const router = useRouter();
  const [speech, setSpeech] = useState<SpeechSynthType | undefined>();
  const [userInput, setUserInput] = useState('');
  const [gameWords, setGameWords] = useState<WordType[]>(words);
  const [currentWord, setCurrentWord] = useState<WordType>();
  const [score, setScore] = useState(0);
  const [completedWords, setCompletedWords] = useState(0);
  const [skippedWords, setSkippeddWords] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // Adjust timer duration here
  const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState('start');

  useEffect( ()=> {
    if (typeof window !== undefined && !speech) {
        window.speechSynthesis.onvoiceschanged = function() {
            setSpeech(getSpeechSynth());
        };
    }
  },[speech]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const speakWord = (wordToSpeak: string) => {
    speech?.speak(wordToSpeak, { pitch: 1.5, rate: 0.8});
  };

  const createNewWord = () => {
    const newWord = getRandomItem(gameWords);
    setCurrentWord(newWord);
    speakWord(newWord.word);
    // remove the word from the words collection
    setGameWords(gameWords.filter((item) => {
      return item.word !== currentWord?.word
    }));
  }

  const answerIsCorrect = () => {
    setGameStatus('answer-correct');
    const pickedCorrectResponse = getRandomInt(0, correctResponse.length);
    speakWord(correctResponse[pickedCorrectResponse]);
    setScore(score+10);
    setCompletedWords(completedWords+1);
    setTimeout(() => {
      nextWord();
    }, 2000)   
  }

  const checkSpelling = () => {
    if (userInput.trim().toLowerCase() === currentWord?.word!.toLowerCase()) {
      answerIsCorrect();
    } else {
      const pickedWrongResponse = getRandomInt(0, wrongResponse.length);
      speakWord(wrongResponse[pickedWrongResponse]);
    }
  };

  const nextWord = () => {
    setUserInput('');
    setTimeout(() => {
      createNewWord();
      setGameStatus('playing');
    },1000);
  }

  const skipWord = () => {
    setGameStatus('skip-word');
    setSkippeddWords(skippedWords+1);
    setTimeout(() => {
      nextWord();
    },3000)
  }

  const gameStart = () => {
    setTimeout(() => {
      createNewWord();
    },1000);
    setGameStatus('playing');
  }


  const hint = () => {
    const hints = [
      "this word have " + currentWord?.word.length! + " letters",
      "It start with the letter " + currentWord?.word[0],
      "It end with the letter " + currentWord?.word[currentWord?.word.length - 1],
    ];
    speakWord(hints[getRandomInt(0, hints.length)]);
  }

  const onQuit = () => {
    window.location.reload();
  }

  // TODO: create a ready state
  const isReady =  words.length && !!speech; 
 
  // TODO: 
  // - componetize every section
  // - handles next, start, submit, score, timer

  const wordToSpeak = currentWord?.word;

  return (<div className="flex flex-col h-screen bg-gray-200 w-11/12">
    <TopBar score={score} timeLeft={timeLeft} playerName={playerName} />

    {
      !isReady && (<Spinner />)
    }

    {
     isReady && (
      <div className="p-4 w-full mt-10">
        <div className="flex flex-col justify-center">
          {
            gameStatus === 'start' && (<div className='flex justify-center flex-col'>
              <button
                className="bg-white px-5 py-3 rounded-xl text-2xl font-bold" 
                onClick={() => {
                  gameStart();
                }}>
                Start a New Game
              </button>
            </div>)
          }
          {
            gameStatus === 'playing' && (<button
              className="bg-gray-100 p-4 mb-4 rounded-xl text-xl font-bold hover:bg-orange-200 border" 
              onClick={() => {
                skipWord();
              }}>
                Skip the word
            </button>)
          }
          {
            gameStatus === 'skip-word' && (<div
              className=" px-5 py-3 rounded-xl text-2xl font-bold text-center">
                The correct answer is <span className='text-red-500'>{currentWord?.word}</span>
            </div>)
          }
          {
            gameStatus === 'answer-correct' && (<div
              className=" px-5 py-3 rounded-xl text-2xl font-bold text-center">
                You are correct!
            </div>)
          }

          {
            gameStatus === 'playing' && 
                (<div className='game-container mt-2'>
                  <div className="flex justify-center flex-col">
                    <div className="flex justify-center flex-col">
                      <input  type="text" name="word-input" id="word-input" 
                        className="bg-white p-4 rounded-xl text-2xl font-bold" 
                        placeholder="Spell the word here!"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        disabled={!currentWord?.word} />
                      <button
                        className="mt-1 p-4 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none text-2xl font-bold rounded-xl"
                        onClick={()=> checkSpelling()}
                        disabled={!userInput.length}
                        >
                          Submit
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between mt-2">
                    <OptButton
                      onClick={() => {
                        speakWord(wordToSpeak!);
                      }} > Say it again? </OptButton>
                    <OptButton
                      onClick={() => {
                        speakWord("this word means " + currentWord?.dictionary!);
                      }} > Define the word? </OptButton>
                    <OptButton
                      onClick={hint} > Give me a hint?</OptButton>
                  </div>
                </div>)
            }
        </div>
      </div>)
    }
    
    <BottomBar  skippedWords={skippedWords} completedWords={completedWords} onQuit={onQuit} />
  
  </div>
  );
};

export default SpellingBee;