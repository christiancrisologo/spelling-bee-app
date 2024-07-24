import Image from 'next/image'
import HomeScreen from './ui/HomeScreen'

export default async function Main() {
  return (
    <main className="flex min-h-screen w-full bg-gray-200">
      <div className="flex flex-col items-center justify-between g-gray-200 w-full">
        <div className="mt-4 p-4 w-full">
          <div className="flex md:w-1/2 w-full flex-wrap flex-row justify-center mx-auto">
            <div className="md:w-1/2 p-4 ">
              <div className="hover:bg-yellow-600 bg-gray-800 p-6 rounded-lg sm:flex-row ">
                <h3 className="text-center mb-8 md:text-4xl sm:text-2xl  text-white font-extrabold ">
                  Spelling Bee
                </h3>
                <div className="flex justify-center">
                  <Image
                    src="/pika-spelling-bee.png"
                    alt="Spelling Bee"
                    width="200"
                    height="200"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-4">
              <div className="hover:bg-blue-400 bg-black p-6 rounded-lg">
                <h3 className="text-center mb-8 md:text-4xl sm:text-2xl text-white  font-extrabold ">
                  Math Quiz
                </h3>
                <div className="flex justify-center">
                  <Image
                    src="/eevee-math.png"
                    alt="Math Quiz"
                    width="200"
                    height="200"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            {/* <div className="flex justify-center min-w-80">
              <h1 className="text-center mb-8 text-5xl   font-extrabold bg-gradient-to-r from-yellow-50 0  to-orange-100 inline-block text-transparent bg-clip-text text-shadow-m
                Spelling Bee
              </h1>
              <div className="flex justify-center">
                <Image
                  src="/spelling-bee-image.png"
                  alt="Spelling Bee"
                  width="200"
                  height="200"
                />
              </div>
              <div className="flex justify-center min-w-80"> MATH </div>
            </div> */}

            <HomeScreen />
          </div>
        </div>
      </div>
    </main>
  )
}
