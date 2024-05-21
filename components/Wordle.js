import React, { useEffect, useState, useCallback } from 'react';
import Grid from './Grid';
import KeyPad from './KeyPad';
import Modal from './Modal';
import useWordle from '../hooks/useWordle';
import keys from './Keys';
import Scoreboard from './Scoreboard';
import Timer from './Timer';

export default function Wordle({ solution, handleRestart, fetchNewWord }) {
    const [showModal, setShowModal] = useState(false);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(60);
    const { currentGuess, handleKeyup, guesses, turn, isCorrect, usedKeys, reset } = useWordle(solution);

    const resetTimer = useCallback(() => {
        setTimer(60);
        const interval = setInterval(() => {
            setTimer((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(interval);
                    setShowModal(true);
                    return 0;
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyup);
        return () => window.removeEventListener("keyup", handleKeyup);
    }, [handleKeyup]);

    useEffect(() => {
        if (isCorrect && !showModal) {
            setScore(prevScore => prevScore + 15);
            setTimer(prevTimer => prevTimer + 15);
        }
    }, [isCorrect, showModal]);

    useEffect(() => {
        if (showModal) {
            resetTimer();
        }
    }, [showModal]);

    useEffect(() => {
        resetTimer();
    }, [resetTimer]);

    useEffect(() => {
        if (isCorrect || turn > 5) {
            fetchNewWord();
            reset();
        }
    }, [isCorrect, turn, fetchNewWord, reset]);


    return (
        <div>
            <Scoreboard score={score} />
            <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
            <KeyPad keys={keys} usedKeys={usedKeys} />
            {showModal && (
                <Modal
                    isCorrect={isCorrect}
                    turn={turn}
                    solution={solution}
                    score={score}
                    handleRestart={handleRestart}
                />
            )}
            <Timer timer={timer} />
        </div>
    );
}
