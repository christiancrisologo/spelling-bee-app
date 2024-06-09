import { fetchWords } from "./lib/data";
import Main from "./ui/Main";
import data from './data.json';

export default async function Home() {
  const words = data;

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <Main words={words} />
    </main>
  );
}
