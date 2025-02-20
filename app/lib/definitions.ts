export type User = {
  id: string;
  name: string;
  score: number;
  level: string;
};

export type Word = {
  id?: string
  word: string
  definition: string
  difficulty: string
  level: string
  category: string
  synonyms: string []
  antonyms: string []
};