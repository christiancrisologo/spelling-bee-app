export function getRandomInt(min: number = 0, max: number = 1): number {
    if (min > max) {
      return min;
    }
  
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
export function getRandomItem(items: any[]): any {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}