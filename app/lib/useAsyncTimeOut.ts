import { useEffect } from 'react';

type AsyncFunction = () => Promise<void>;

export const asyncFuncTimeout = (func: () => void, ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(() => {
    func();
    resolve();
  }, ms));
};

export const asyncTimeout = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const useAsyncTimeout = (asyncFunctions: AsyncFunction[], interval: number) => {
  useEffect(() => {
    let isMounted = true;

    const executeFunctions = async () => {
      for (const asyncFunction of asyncFunctions) {
        if (!isMounted) return;
        try {
          await asyncFunction();
        } catch (error) {
          console.error('Error executing async function:', error);
        }
        await asyncTimeout(interval);
      }
    };

    executeFunctions();

    return () => {
      isMounted = false;
    };
  }, [asyncFunctions, interval]);
};