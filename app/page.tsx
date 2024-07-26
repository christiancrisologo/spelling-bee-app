import HomeScreen from './ui/HomeScreen'

export default async function Main() {
  return (
    <main className="flex min-h-screen w-full bg-gray-200">
      <div className="flex flex-col items-center justify-between g-gray-200 w-full">
        <HomeScreen />
      </div>
    </main>
  )
}
