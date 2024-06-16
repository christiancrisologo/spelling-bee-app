"use client"

import React, { ReactNode, useState, Suspense } from 'react';
import { Word  as WordType } from '../../lib/definitions';
import TopBar from './TopBar';
import { getRandomItem, getRandomInt } from '../../lib/utils';
import BottomBar from './BottomBar';
import Spinner from '../../ui/Spinner';
import { useSearchParams } from 'next/navigation';
import { GameSelection, SelectedGameOptionType } from './GameSelection';
import { useSpeechSynthesis } from '@/app/lib/useSpeechSynthesis';
import { asyncFuncTimeout } from '@/app/lib/useAsyncTimeOut';
// import useVoiceRecognition from '@/app/lib/useVoiceRecognition';
import GameResult from './GameResults';

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
  // const { transcript, startListening, stopListening, isListening, error } = useVoiceRecognition();
  const { speak, speechSynth } = useSpeechSynthesis();
  const [userAnswerInput, setUserAnswerInput] = useState('');
  const [gameWords, setGameWords] = useState<WordType[]>(words);
  const [currentWord, setCurrentWord] = useState<WordType>();
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [roundCount, setRoundCount] = useState(0);
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
  const level = searchParams.get('level') || 'expert/senior';
  // const enableTimer = !!searchParams.get('enableTimer') || false;
  // const totalWords = parseInt(searchParams.get('totalWords')!) || 10;
  // const totalSeconds = parseInt(searchParams.get('totalSeconds')!) || 60;


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const speakWord = (wordToSpeak: string) => {
    speak(wordToSpeak, { pitch: 1.5, rate: 0.8});
  };

  const speakRandomResponse = (responses: string[], defaulWord: string = '') => {
    const pickedResponse = getRandomInt(0, responses.length - 1);
    speakWord(responses[pickedResponse] || defaulWord);
  }

  const createNewWord = () => {
    const filteredWords = gameWords.filter((item) => {
      const lvl = level === 'junior' ? "elementary" : `${level}/junior`;
      return lvl.includes(item.level);
    });
    const newWord = getRandomItem(filteredWords);
    setCurrentWord(newWord);
    speakWord(newWord.word);
    // filter with levels , remove the word from the words collection 
    const removeNewWord = gameWords.filter((item) => {
      return item.word != currentWord?.word
    });
    // console.log('filtered words' , filteredWords);
    setGameWords(removeNewWord);
  }

  const answerIsCorrect = async () => {
    setGameStatus('answer-correct');
    speakRandomResponse(correctResponses, 'correct!');
    setCorrectAnswers(correctAnswers+1);
    await asyncFuncTimeout(() => {
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

  const nextWord = async () => {
    setUserAnswerInput('');
    await asyncFuncTimeout(() => {
      setGameStatus('playing');
      setRestartTimer(true);
      setRoundCount(roundCount+1);
    }, 1000);
    await asyncFuncTimeout(() => {
      createNewWord();
    }, 2000);
  }

  const skipWord = async () => {
    setGameStatus('skip-word');
    setSkippeddWords(skippedWords+1);
    setRestartTimer(false);
    await asyncFuncTimeout(() => {
      if (validateIsGameOver()) {
        setGameStatus('game-over');
      } else {
        nextWord();
      }
    }, 3000);
  }

  const gameStart = async (gameSelection: SelectedGameOptionType) => {
    
    await asyncFuncTimeout(() => { 
      setGameSelection(gameSelection);
      nextWord(); 
      },1000);
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

  const onTimerOver = async () => {
    setGameStatus('timeout');
    setWrongAnswers(wrongAnswers+1);
    speakRandomResponse(timerOutResponses);
    setRestartTimer(false);
    await asyncFuncTimeout(() => {
      if (validateIsGameOver()) {
        setGameStatus('game-over');
      } else {
        nextWord();
      }
    },2000);
  }

  const onWordSubmit = () => {
    validateAnswer();
  }

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      onWordSubmit();
    }
  };

  const isReady =  words.length && !!speechSynth; 
  const wordToSpeak = currentWord?.word;

  return (<Suspense>
  <div className="flex flex-col h-screen bg-gray-200 w-full">
    <TopBar
      correctAnswers={correctAnswers}
      playerName={playerName}
      onTimerOver={onTimerOver}
      restartTimer={restartTimer}
      enableTimer={gameSelection.enableTimer==='On'}
      totalSeconds={gameSelection.totalSeconds}
      level={level}
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
                      {/* <button
                        className="mt-1 p-4 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none text-2xl font-bold rounded-xl disabled:bg-gray-400"
                        onClick={isListening ? stopListening : startListening}>
                        {isListening ? 'Stop Listening' : 'Start Listening'}
                      </button> */}
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
               <GameResult
                    correctAnswers={correctAnswers}
                    totalWords={gameSelection.totalWords}
                    playerName={playerName}
                    wrongAnswers={wrongAnswers}
                    skippedWords={skippedWords}                
                />
              )
            }

        </div>
      </div>)
    }
    
    <BottomBar
      roundCount={roundCount}
      skippedWords={skippedWords}
      wrongAnswers={wrongAnswers}
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