import Image from 'next/image';
import HomeScreen from "./ui/HomeScreen";

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

            <HomeScreen  />
          </div>
        </div>
      </div>
    </main>
  );
}
