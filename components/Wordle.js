import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import KeyPad from './KeyPad';
import Modal from './Modal';
import useWordle from '../hooks/useWordle';
import keys from './Keys';
import Scoreboard from './Scoreboard';
import Timer from './Timer'; // Timer bileşeni eklendi

export default function Wordle({ solution }) {
    const [showModal, setShowModal] = useState(false);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(10); // Zamanlayıcı başlangıç değeri 60 saniye olarak ayarlandı
    const { currentGuess, handleKeyup, guesses, turn, isCorrect, usedKeys } = useWordle(solution);



    useEffect(() => {
        window.addEventListener("keyup", handleKeyup);

        return () => {
            window.removeEventListener("keyup", handleKeyup);
        };
    }, [handleKeyup]);



    const onTimeUp = () => {
        setShowModal(true);

    }
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTime => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(interval);
                    onTimeUp(); // Süre dolduğunda onTimeUp fonksiyonunu çağır
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, onTimeUp]);






    useEffect(() => {
        if (isCorrect || turn > 5) {
            setShowModal(true);
            setScore(prevScore => prevScore + 15);
            setTimer(prevTimer => prevTimer + 15);
        }
    }, [isCorrect, turn]);

    return (
        <div>
            <Scoreboard score={score} />
            <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
            <KeyPad keys={keys} usedKeys={usedKeys} />
            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
            <Timer timer={timer} /> {/* Timer bileşeni ve başlangıç zamanı */}
        </div>
    );
}
