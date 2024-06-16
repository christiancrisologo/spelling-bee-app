import Image from 'next/image';

export type GameResultProps = {
    playerName: string
    correctAnswers: number
    wrongAnswers: number
    skippedWords: number
    totalWords: number
}

const GameResult = (props:GameResultProps) => {
    const { playerName, correctAnswers, wrongAnswers, skippedWords, totalWords } = props;
    const rating = (correctAnswers/totalWords);

    return (
        (
            <div className="md:w-1/2 self-center mt-2">
                <h1 className="text-center mb-8 text-4xl font-extrabold">
                  Good Job <span className="text-orange-700">{playerName} </span>!
                </h1>
                <div className="mt-4 bg-slate-100 border-gray-400 rounded-xl p-4 border-4 shadow-sm ">
                  <h2 className="text-blue-500 text-center text-2xl font-extrabold">Your Spelling Bee Result</h2>
                  <div className="flex-col mt-4">
                    <div className="p-2 flex flex-row">
                      <span className="text-gray-700 flex py-1 me-2 w-40">Correct Answers</span>
                      <div className="py-1 px-2 rounded text-white bg-slate-400 font-semibold">{correctAnswers}</div>
                    </div>
                    <div className="p-2 flex flex-row">
                      <span className="text-gray-700 flex py-1 me-2 w-40">Wrong answers </span>
                      <div className="py-1 px-2 rounded text-white bg-slate-400 font-semibold">{wrongAnswers}</div>
                    </div>
                    <div className="p-2 flex flex-row">
                      <span className="text-gray-700 flex py-1 me-2 w-40">Skipped answers </span>
                      <div className="py-1 px-2 rounded text-white bg-slate-400 font-semibold">{skippedWords}</div>
                    </div>
                    <div className="p-2 flex flex-row">
                      <span className="text-gray-700 flex py-1 me-2 w-40">Total Rating</span>
                      <div className="py-1 px-2 rounded text-white bg-slate-400 font-semibold">{rating.toFixed(0)}%</div>
                    </div>
                    <div className="p-2 flex flex-row">
                      {
                        [...Array(5)].map( (_, index) => {
                          return index < Math.ceil(rating * 5) ? 
                          (<Image
                            src="/star-fill.png"
                            alt="fill star" 
                            width="32" height="32"
                          />) : 
                          (                <Image
                            src="/star-empty.png"
                            alt="empty star" 
                            width="32" height="32"
                          />)
                        })
                      }
                    </div>
                    
                  </div>
              </div>
            </div>
          )
    )
};

export default GameResult;