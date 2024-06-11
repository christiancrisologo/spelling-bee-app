// import { fetchWords } from "./lib/data";
// import Main from "./ui/Main";
// import data from './data.json';
import Image from 'next/image';
import StartScreen from "./ui/StartScreen";

export default async function Main() {

  return (
    <main className="flex min-h-screen w-full bg-gray-200">
      <div className="flex flex-col items-center justify-between g-gray-200 w-full">
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
             { typeof window.speechSynthesis === undefined && 
                <div  className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 w-auto self-center mt-8" role="alert">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <div className="ms-3 text-sm font-medium">
                      Sorry! Your browser does not support <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis" className="font-semibold underline hover:no-underline">SpeechSynthesis</a>.
                    </div>
                </div>
            }
            {
              typeof window.speechSynthesis !== undefined && (<StartScreen  />)
            }
            
          </div>
        </div>
      </div>
    </main>
  );
}
