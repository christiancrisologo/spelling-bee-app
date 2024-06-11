import React, { ReactNode, useEffect, useState } from 'react';
import Spinner from '../ui/Spinner';
import data from '../data.json';
import SpellingBee from './ui/SpellingBee';
import { Word  as WordType } from '../lib/definitions';


export default function Page () {

    const isReady =  data?.length;
    return (<div className="flex flex-col h-screen bg-gray-200 w-full">
        {
            !isReady && (<Spinner />)
        }
        {
            isReady && <SpellingBee words={data as WordType[]} />
        }
  
  </div>
  );
};