
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

  
function getRandomItem(items: any[]) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

const actorVoices = ['Daniel', 'Natasha', 'Karen', 'Catherine'];
const defaultVoiceName = 'Daniel';

export const getSpeechSynth = (): SpeechSynthType => {
    // @ts-ignore

    const speechSynth = window.speechSynthesis;
    const voices = speechSynth.getVoices();
    const activeVoices = voices.filter( 
        (voice:any) => voice.lang === 'en-AU' || voice.lang === 'en-GB'
      );
    //   console.log('en-AU voices :: ', activeVoices);
    const speak  = (word: string, options: SpeechSynthOptionsType | undefined) => {
        const utterance = new SpeechSynthesisUtterance(word);
        
        const defaultVoice = activeVoices.find(voice => voice.name === defaultVoiceName);
        // @ts-ignore
        utterance.voice = defaultVoice;

        if (options?.voice === 'random') {
            utterance.voice = getRandomItem(activeVoices);
        }
        if (!!options?.voice) {
            const optionVoice = activeVoices.find(voice => voice.name === options?.voice) ;
            // @ts-ignore
            utterance.voice = optionVoice || defaultVoice;
        }
        utterance.pitch = options?.pitch || 0.2;
        utterance.volume = options?.volume || 1;
        utterance.rate = options?.rate || 0.01;
        // console.log('speaking:: ', options, utterance, word);
        speechSynth.speak(utterance);
    }

    return {
        speak,
        speechSynth
    }
}
