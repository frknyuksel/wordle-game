// Game.js
import React, { useState, useEffect } from 'react';
import Wordle from './Wordle';
import useWordle from '../hooks/useWordle';

export default function Game() {
    const [solution, setSolution] = useState(null);

    const { isCorrect, turn } = useWordle(solution);

    // Yeni bir kelime alacak fonksiyon
    const fetchNewWord = () => {
        fetch("data/tr.json")
            .then((res) => res.json())
            .then((json) => {
                const solutions = json.solutions;
                const randomSolution = solutions[Math.floor(Math.random() * solutions.length)];
                setSolution(randomSolution.word);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    // Cevabı doğru bildiğinizde veya oyun bitmediğinde yeni kelime al
    const handleCorrectAnswer = () => {
        if (!isCorrect || turn > 5) { // isCorrect durumunu tersine çevirdik
            fetchNewWord();
        }
    };

    useEffect(() => {
        // İlk yükleme için bir kelime al
        fetchNewWord();
    }, []);

    return (
        <>
            <div className='App'>
                {solution}
                {solution && <Wordle solution={solution} isCorrect={handleCorrectAnswer} />}
            </div>
        </>
    );
}
