type TopBarProps = {
    score: number
    timeLeft: number
    playerName: string
}

export default function TopBar(props:TopBarProps) {
    const { score, timeLeft, playerName } = props;

    return(
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
            <span>🏅 Score : {score}</span>
            {/* <span>Completed words: {completedWords}</span>
            <span>Skipped words: {skippedWords}</span> */}
            <span className="text-fuchsia-600 font-bold">{playerName}</span>
            <span> ⏱️ Time: {timeLeft}s</span>
        </div>
    )
}