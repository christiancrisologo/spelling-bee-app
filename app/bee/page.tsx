import React, { ReactNode, useEffect, useState } from 'react';
import Spinner from '../ui/Spinner';
import data from '../data.json';
import SpellingBee from './ui/SpellingBee';


export default async function Page() {

    const words = data;

    return (<div className="flex flex-col h-screen bg-gray-200 w-full">
        {
            !words.length && (<Spinner />)
        }
        {
            words.length && <SpellingBee words={words} />
        }
  
  </div>
  );
};