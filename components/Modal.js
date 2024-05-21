import React from "react";


export default function Modal({ isCorrect, solution, turn, score, handleRestart }) {
    return (
        <div className='modal'>
            <div>
                <h1>{isCorrect ? 'You Win' : 'Time\'s Up'}</h1>
                <p className='solution'>{solution}</p>
                <p>{isCorrect ? `You found the word in ${turn} guesses` : 'Better luck next time'}</p>
                <p>Your score: {score}</p>
                <button onClick={handleRestart}>New Game</button>
            </div>
        </div>
    );
}
