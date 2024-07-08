const ShuffleWord = ({ word = '' }: { word: string }) => {
  return (
    <div className="flex flex-row mt-3 flex-wrap justify-center">
      {word.split('')!.map((letter, index, array) => {
        const blockWidth = `calc((100% - ${array.length * 2 * 0.25}rem) / ${
          array.length
        })`

        return (
          <div
            style={{
              width: blockWidth,
              maxWidth: 70,
            }}
            className="p-4 border-solid border-2 border-orange-500 mx-0 md:mx-1 bg-white shadow-lg rounded-md flex justify-center items-center"
          >
            <h1 className="text-3xl font-bold text-orange-500">
              {letter.toUpperCase()}
            </h1>
          </div>
        )
      })}
    </div>
  )
}

export default ShuffleWord
