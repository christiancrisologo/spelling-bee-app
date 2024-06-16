import { useCallback, useEffect, useState } from "react";

export type SpeechSynthType = {
    speak: (word: string, options: SpeechSynthOptionsType) => void
    speechSynth: any
} 

export type SpeechSynthOptionsType = {
    rate?: number
    pitch?: number
    volume?: number
    voice?: string
};
  
type Voice = {
    name: string | undefined
}
function getRandomItem(items: any[]) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

const actorVoices = ['Daniel', 'Natasha', 'Karen', 'Catherine'];
const defaultVoiceName = 'Daniel';

export const useSpeechSynthesis = (): SpeechSynthType => {
    const [speechSynth, setSpeech] = useState<any>(null);
    
    //   console.log('en-AU voices :: ', activeVoices);
    const speak  = useCallback((word: string, options: SpeechSynthOptionsType | undefined) => {
      if (!speechSynth) {
        console.warn('SpeechSynthesis not ready!');
        return 
      }
      const voices = speechSynth.getVoices();
      const activeVoices = voices.filter( 
          (voice:any) => voice.lang === 'en-AU' || voice.lang === 'en-GB'
      );
      const utterance = new SpeechSynthesisUtterance(word);
      
        const defaultVoice = activeVoices.find((voice: Voice) => voice.name === defaultVoiceName);
        utterance.voice = defaultVoice;

        if (options?.voice === 'random') {
            utterance.voice = getRandomItem(activeVoices);
        }
        if (!!options?.voice) {
            const optionVoice = activeVoices.find((voice: Voice) => voice.name === options?.voice) ;
            utterance.voice = optionVoice || defaultVoice;
        }
        utterance.pitch = options?.pitch || 0.2;
        utterance.volume = options?.volume || 1;
        utterance.rate = options?.rate || 0.01;
        // console.log('speaking:: ', options, utterance, word);
        speechSynth.speak(utterance);
    },[speechSynth]);

    useEffect( ()=> {
        if (typeof window.speechSynthesis !== undefined && !speechSynth) {
          if (window.speechSynthesis.onvoiceschanged) {
            window.speechSynthesis.onvoiceschanged = function() {
              setSpeech(window.speechSynthesis);
            };
          } else {
            setSpeech(window.speechSynthesis);
          }
    
        }
      },[]);
      
    return {
        speak,
        speechSynth
    }
}
