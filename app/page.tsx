import { fetchWords } from "./lib/data";
import Main from "./ui/Main";

export default async function Home() {
  const words = await fetchWords();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <Main words={words} />
    </main>
  );
}
