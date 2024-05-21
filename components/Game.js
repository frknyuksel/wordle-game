import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Wordle from './Wordle';
import useWordle from '../hooks/useWordle';

export default function Game({ lang }) {
    const [solution, setSolution] = useState(null);
    const router = useRouter();

    const fetchNewWord = () => {
        const fileName = lang === 'en' ? 'en.json' : 'tr.json';
        fetch(`data/${fileName}`)
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

    const handleRestart = () => {
        router.push("/");
    };

    const { isCorrect, turn, reset } = useWordle(solution);

    useEffect(() => {
        if (isCorrect || turn > 5) {
            setScore(prevScore => prevScore + 15);
            setTimer(prevTimer => prevTimer + 15);
            fetchNewWord();
            reset();
        }
    }, [isCorrect, turn, fetchNewWord, reset]);

    useEffect(() => {
        fetchNewWord();
    }, []);

    return (
        <div className='App'>
            <h1>Wordle</h1>
            {solution}
            {solution && (
                <Wordle
                    solution={solution}
                    handleRestart={handleRestart}
                    fetchNewWord={fetchNewWord}
                />
            )}
        </div>
    );
}
