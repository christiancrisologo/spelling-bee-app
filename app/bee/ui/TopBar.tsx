import { useEffect, useMemo, useState } from "react";
import GameTimer from "./GameTimer";

type TopBarProps = {
    score: number
    playerName: string
    restartTimer: boolean
    enableTimer: boolean
    totalSeconds: number
    onTimerOver: () => void
}


export default function TopBar(props:TopBarProps) {
    const { score, playerName, restartTimer, onTimerOver, enableTimer, totalSeconds } = props;

    const timer = useMemo(() => {
        const _timer = {
            startTime: totalSeconds,
            endTime: 0,
            isCountdown: true,
            start: true           
        }; 
        if (restartTimer) {
            _timer.startTime = totalSeconds;
             _timer.start = true;
        } else {
            // _timer.startTime = 0;
            _timer.start = false;
        }
        return _timer;
    }, [restartTimer, totalSeconds])
    

    return(
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
            <span>🏅 Score : {score}</span>
            {/* <span>Completed words: {completedWords}</span>
            <span>Skipped words: {skippedWords}</span> */}
            <span className="text-fuchsia-600 text-xl font-bold">{playerName}</span>
            {
                enableTimer ? (
                    <GameTimer
                        startTime={timer.startTime}
                        isCountdown={timer.isCountdown}
                        endTime={timer.endTime}
                        start={timer.start}
                        onTimerOver={onTimerOver}/>
                ) : <span>No timer</span>
            }
            
        </div>
    )
}