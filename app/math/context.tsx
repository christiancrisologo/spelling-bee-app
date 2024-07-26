import React, { useReducer, ReactNode, createContext, useContext } from 'react'
import { SelectedGameOptionType } from './ui/GameSelection'
import { Word as WordType } from '../lib/definitions'

// Define the shape of your state
export interface State {
  // other global state types
  userAnswerInput: string
  gameQuizes: WordType[]
  currentWord: WordType | undefined
  shuffledWord: string
  level: number
  correctAnswers: number
  wrongAnswers: number
  roundCount: number
  skippedQuizes: number
  gameStatus: string
  gameAction: string
  restartTimer: boolean
  currentTime: number
  totalTime: number
  gameSelection: SelectedGameOptionType
}

export const initialState: State = {
  userAnswerInput: '',
  gameQuizes: [],
  level: 0,
  currentWord: undefined,
  correctAnswers: 0,
  wrongAnswers: 0,
  roundCount: 0,
  skippedQuizes: 0,
  gameStatus: 'selection',
  gameAction: '',
  restartTimer: false,
  currentTime: 0,
  totalTime: 0,
  shuffledWord: '',
  gameSelection: {
    totalSeconds: 0,
    totalQuizes: 0,
    difficulty: 'Easy',
    enableTimer: 'Off',
  },
}

interface StateProviderProps {
  children: ReactNode
}

// Define the actions
export type Action =
  | { type: 'setGameQuizes'; payload: WordType[] }
  | { type: 'setGameLevel'; payload: number }
  | { type: 'setGameSelections'; payload: SelectedGameOptionType }
  | { type: 'setCurrentWord'; payload: WordType }
  | { type: 'setGameQuizes'; payload: WordType[] }
  | { type: 'setGameLevel'; payload: number }
  | { type: 'setGameSelections'; payload: any } // Specify the correct type instead of any
  | { type: 'setCurrentWord'; payload: WordType | undefined }
  | { type: 'setUserAnswerInput'; payload: string }
  | { type: 'setCorrectAnswers'; payload: number }
  | { type: 'setWrongAnswers'; payload: number }
  | { type: 'setRoundCount'; payload: number }
  | { type: 'setSkippedQuizes'; payload: number }
  | { type: 'setGameStatus'; payload: string }
  | { type: 'setGameAction'; payload: string }
  | { type: 'setRestartTimer'; payload: boolean }
  | { type: 'setCurrentTime'; payload: number }
  | { type: 'setTotalTime'; payload: number }
  | { type: 'setShuffledWord'; payload: string }

export type ActionType = Action['type']
// Add other actions here

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setGameQuizes':
      return { ...state, gameQuizes: action.payload }
    case 'setGameLevel':
      return { ...state, level: action.payload }
    case 'setGameSelections':
      return { ...state, gameSelection: action.payload }
    case 'setCurrentWord':
      return { ...state, currentWord: action.payload }
    case 'setCurrentWord':
      return { ...state, currentWord: action.payload }
    case 'setUserAnswerInput':
      return { ...state, userAnswerInput: action.payload }
    case 'setGameQuizes':
      return { ...state, gameQuizes: action.payload }
    case 'setCurrentWord':
      return { ...state, currentWord: action.payload }
    case 'setCorrectAnswers':
      return { ...state, correctAnswers: action.payload }
    case 'setWrongAnswers':
      return { ...state, wrongAnswers: action.payload }
    case 'setRoundCount':
      return { ...state, roundCount: action.payload }
    case 'setSkippedQuizes':
      return { ...state, skippedQuizes: action.payload }
    case 'setGameStatus':
      return { ...state, gameStatus: action.payload }
    case 'setGameAction':
      return { ...state, gameAction: action.payload }
    case 'setRestartTimer':
      return { ...state, restartTimer: action.payload }
    case 'setCurrentTime':
      return { ...state, currentTime: action.payload }
    case 'setTotalTime':
      return { ...state, totalTime: action.payload }
    case 'setShuffledWord':
      return { ...state, shuffledWord: action.payload }
    default:
      return state
  }
}

export const StateContext = createContext<{
  state: State
  dispatch: React.Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null,
})

// Create a function that invokes the context
export const useStateContext = () => {
  return useContext(StateContext)
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}
