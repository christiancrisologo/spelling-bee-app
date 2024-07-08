export function getRandomInt(min: number = 0, max: number = 1): number {
  if (min > max) {
    return min
  }

  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomItem(items: any[]): any {
  const randomIndex = Math.floor(Math.random() * items.length)
  return items[randomIndex]
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]] // Swap elements
  }
  return array
}
