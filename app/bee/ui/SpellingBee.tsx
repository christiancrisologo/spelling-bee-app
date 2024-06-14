"use client"

import React, { ReactNode, useEffect, useState, Suspense } from 'react';
import { Word  as WordType } from '../../lib/definitions';
import TopBar from './TopBar';
import { SpeechSynthType, getSpeechSynth } from '../../lib/SpeechSynth';
import { getRandomItem, getRandomInt } from '../../lib/utils';
import BottomBar from './BottomBar';
import Spinner from '../../ui/Spinner';
import { useSearchParams } from 'next/navigation';
import { GameSelection, SelectedGameOptionType } from './GameSelection';

export type SpellingBeeProps = {
  words: WordType[]
  // playerName: string
  // enableTimer: boolean
  // totalWords: number
}

type OptButtonType = {
  onClick: () => void
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

const timerOutResponses = [
  "Sorry time is over!",
  "Too slow, time is out",
  "Time out",
  "You have ran out of time"
];

const correctResponses = [
  "You are definitely Correct!",
  "Awesome! to the next one.",
  "That's correct",
  "Too easy, try the next one",
  "Piece of cake!",
  "Correct, No way you will get that wrong"
];

const wrongResponses = [
  "Oops not this time. Try again",
  "That's incorrect",
  "No luck, try again",
  "Sorry, try again",
  "Maybe stop guessing, try again",
  "Hmmm... I dont think that's right"
];

const SpellingBeeComponent = (props: SpellingBeeProps) => {
  const { words } = props;
  const searchParams = useSearchParams()!;
  const [speech, setSpeech] = useState<SpeechSynthType | undefined>();
  const [userAnswerInput, setUserAnswerInput] = useState('');
  const [gameWords, setGameWords] = useState<WordType[]>(words);
  const [currentWord, setCurrentWord] = useState<WordType>();
  const [score, setScore] = useState(0);
  const [roundCount, setRoundCount] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [skippedWords, setSkippeddWords] = useState(0);
  const [gameStatus, setGameStatus] = useState('start');
  const [restartTimer, setRestartTimer] = useState(false);
  const [gameSelection, setGameSelection] = useState<SelectedGameOptionType>({
    totalSeconds: 0,
    totalWords: 0,
    difficulty: 'Easy',
    enableTimer: 'Off'
  });

  // params
  const playerName = searchParams.get('playerName') || 'no-name';
  // const enableTimer = !!searchParams.get('enableTimer') || false;
  // const totalWords = parseInt(searchParams.get('totalWords')!) || 10;
  // const totalSeconds = parseInt(searchParams.get('totalSeconds')!) || 60;

  useEffect( ()=> {
    if (typeof window.speechSynthesis !== undefined && !speech) {
      if (window.speechSynthesis.onvoiceschanged) {
        window.speechSynthesis.onvoiceschanged = function() {
          setSpeech(getSpeechSynth());
        };
      } else {
        setSpeech(getSpeechSynth());
      }

    }
  },[speech]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const speakWord = (wordToSpeak: string) => {
    speech?.speak(wordToSpeak, { pitch: 1.5, rate: 0.8});
  };

  const speakRandomResponse = (responses: string[], defaulWord: string = '') => {
    const pickedResponse = getRandomInt(0, responses.length - 1);
    speakWord(responses[pickedResponse] || defaulWord);
  }

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
    speakRandomResponse(correctResponses, 'correct!');
    setScore(score+10);
    setCorrectWords(correctWords+1);
    setTimeout(() => {
      nextWord();
    }, 3000)   
  }

  const validateAnswer = () => {
    if (userAnswerInput.trim().toLowerCase() === currentWord?.word!.toLowerCase()) {
      answerIsCorrect();
    } else {
      speakRandomResponse(wrongResponses, 'incorrect');
    }
  };
  
  const validateIsGameOver = () => {
    if (roundCount >= gameSelection.totalWords) { 
      return true;
    }
    return false;
  }

  const nextWord = () => {
    setUserAnswerInput('');
    setTimeout(() => {
      setGameStatus('playing');
      setRestartTimer(true);
      setRoundCount(roundCount+1);
    }, 1000);
    setTimeout(() => {
      createNewWord();
    }, 2000);
  }

  const skipWord = () => {
    setGameStatus('skip-word');
    setSkippeddWords(skippedWords+1);
    setRestartTimer(false);
    setTimeout(() => {
      if (validateIsGameOver()) {
        setGameStatus('game-over');
      } else {
        nextWord();
      }
    },3000)
  }

  const gameStart = (gameSelection: SelectedGameOptionType) => {
    setGameSelection(gameSelection);
    setTimeout(() => { nextWord(); },1000);
  }

  const hint = () => {
    const hints = [
      "this word have " + currentWord?.word.length! + " letters",
      "It start with the letter " + currentWord?.word[0],
      "It end with the letter " + currentWord?.word[currentWord?.word.length - 1],
    ];
    if (currentWord?.synonyms?.length) {
      hints.push("This is with a synonyms of " + currentWord?.synonyms.toString());
    }
    if (currentWord?.antonyms?.length) {
      hints.push("This is with a antonyms of " + currentWord?.antonyms.toString());
    }
    if (currentWord?.category && currentWord?.category != 'other') {
      hints.push("This is categorize to a  " + currentWord?.category);
    }
    speakRandomResponse(hints);
  }

  const onQuit = () => {
    window.location.href = '/';
  }

  const onTimerOver = () => {
    setGameStatus('timeout');
    setSkippeddWords(skippedWords+1);
    speakRandomResponse(timerOutResponses);
    setTimeout(() => {
      setRestartTimer(false);
      if (validateIsGameOver()) {
        setGameStatus('game-over');
      } else {
        nextWord();
      }
    },1000);
  }

  const onWordSubmit = () => {
    validateAnswer();
  }

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      onWordSubmit();
    }
  };

  const isReady =  words.length && !!speech; 
  const wordToSpeak = currentWord?.word;


  return (<Suspense>
  <div className="flex flex-col h-screen bg-gray-200 w-full">
    <TopBar
      score={score}
      playerName={playerName}
      onTimerOver={onTimerOver}
      restartTimer={restartTimer}
      enableTimer={gameSelection.enableTimer==='On'}
      totalSeconds={gameSelection.totalSeconds}
    />

    {
      !isReady && (<Spinner />)
    }

    {
     isReady && (
      <div className="p-4 w-11/12 mt-4 self-center">
        <div className="flex flex-col justify-center">
          {
            gameStatus === 'start' && (<GameSelection onStart={gameStart} />)
          }
          {
            gameStatus === 'playing' && (<button
              className="bg-orange-100 p-4 mb-4 rounded-xl text-xl font-bold hover:bg-orange-200 border" 
              onClick={() => {
                skipWord();
              }}>
                Skip the word
            </button>)
          }

          { gameStatus === 'timeout' && (<div
              className="px-5 py-2 rounded-xl text-4xl font-bold text-center">
                TimeOut!
            </div>)
          }
          {
            (gameStatus === 'skip-word' || gameStatus === 'timeout') && (<div
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
                        value={userAnswerInput}
                        onChange={(e) => setUserAnswerInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={!currentWord?.word}
                        autoComplete="off"
                        spellCheck="false" />
                      <button
                        className="mt-1 p-4 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none text-2xl font-bold rounded-xl disabled:bg-gray-400"
                        onClick={onWordSubmit}
                        disabled={!userAnswerInput.length}
                        onKeyDown={handleKeyDown}
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
                        speakWord("this word means " + currentWord?.definition!);
                      }} > Define the word? </OptButton>
                    <OptButton
                      onClick={hint} > Give me a hint?</OptButton>
                  </div>
                </div>)
            }

            {
              gameStatus === "game-over" && (
                <div className="md:w-1/2 self-center mt-2">
                    <h1 className="text-center mb-8 text-4xl font-extrabold">
                      Good Job <span className="text-orange-700">{playerName} </span>!
                    </h1>
                    <div className="mt-4 bg-slate-100 border-gray-400 rounded-xl p-4 border-4 shadow-sm ">
                      <h2 className="text-blue-500 text-center text-2xl font-extrabold">Your Spelling Bee Result</h2>
                      <div className="flex-col mt-4">
                        <div className="p-2 flex flex-row">
                          <span className="text-gray-700 flex py-1 me-2 w-40">Total scores </span>
                          <div className="py-1 px-2 rounded text-white bg-slate-400 font-semibold">{score}</div>
                        </div>
                        <div className="p-2 flex flex-row">
                            <span className="text-gray-700 flex py-1 me-2 w-40">Wrong answers </span>
                            <div className="py-1 px-2 rounded text-white bg-slate-400 font-semibold">{skippedWords}</div>
                        </div>

                      </div>
                  </div>
                </div>
              )
            }

        </div>
      </div>)
    }
    
    <BottomBar
      roundCount={roundCount}
      skippedWords={skippedWords}
      correctWords={correctWords}
      totalWords={gameSelection.totalWords}
      onQuit={onQuit} />
  
  </div>
  </Suspense>);
};

export default function SpellingBee (props:SpellingBeeProps) {
  const { words } = props;

  return <Suspense>
    <SpellingBeeComponent  words={words}/>
    </Suspense>
};